var Personal = require("../models/personal.model");
var Informes= require('./informe.personal/informe');
var Roles= require('../models/roles.model');
var bcrypt = require('bcrypt');

//const { catch } = require("../config/conexion");
var tabla='personal';
indexPersonal = async function(req,res,next){
    
    Personal
    .find({estado:1})
    //.populate('Rol')
    .exec((err,lista)=>{
        if(err)
            return res.render('./'+tabla+'/indexPersonal',{lista:[],error:err});
        console.log(lista);
        return res.render('./'+tabla+'/indexPersonal',{lista:lista,error:null});

    });
    
}
indexUser = function(req,res,next){
    Personal.find({estado:true})
    .populate('Rol')
    .exec((err,lista)=>{
    
        if(err)
            return res.render('./'+tabla+'/index',{lista:[],error:err});
        else
        return res.render('./'+tabla+'/index',{lista:lista,error:null});
        
    });
   
}
nuevo = async function(req,res,next){
    let listaRoles=await Roles.find({estado:1});
    let aux= new Personal();
    aux._id=null;
    aux.error=null;
    aux.listaRoles=listaRoles;
    console.log(aux.listaRoles)
    aux.Nombre=aux.Apellido_pat=aux.Apellido_mat=aux.Ci=aux.Genero=aux.Rol='';
    return res.render('./'+tabla+'/form',aux,);
}
nuevoPost=async function(req,res,next){
    req.body.creadoPor=req.user._id;
    req.body.modificadoPor=req.user._id;
    let nuevo = new Personal(req.body);
    nuevo.estado=1;
    nuevo.password=bcrypt.hashSync(req.body.password,10);
    let listaRoles=await Roles.find({estado:1});

    if (!req.files  || Object.keys(req.files ).length === 0) {
        nuevo.avatar='default.jpg';
        nuevo.save((err,dato)=>{
            if(err)
            {
                nuevo.error=err;
                nuevo._id=null;
                nuevo.listaRoles=listaRoles;
                return res.render('./'+tabla+'/form',nuevo);
            }
            if(dato)
                return res.redirect('/'+tabla);
            else{
                nuevo.error='Paso algo';
                nuevo.listaRoles=listaRoles;
                return  res.render('./'+tabla+'/form',nuevo);
            }
            
                
        });
      }
    else{
    sampleFile = req.files.avatar;
    uploadPath = __dirname + '\\..\\public\\avatar\\' + nuevo._id+".jpg";
      
        console.log("archivo");
        console.log("path",uploadPath);
        // Use the mv() method to place the file somewhere on your server
        sampleFile.mv(uploadPath, function(err) {

          if (err){
            console.log("archivo2", err);
            nuevo.error=err;
            nuevo._id=null;
            nuevo.listaRoles=listaRoles;
            return  res.render('./'+tabla+'/form',nuevo);
          }
        nuevo.avatar=nuevo._id+".jpg";
        nuevo.save((err,dato)=>{
            if(err)
            {
                nuevo.error=err;
                nuevo._id=null;
                nuevo.listaRoles=listaRoles;
                return res.render('./'+tabla+'/form',nuevo);
            }
            if(dato)
                return res.redirect('/'+tabla);
            else{
                nuevo.error='Paso algo';
                nuevo.listaRoles=listaRoles;
                return res.render('./'+tabla+'/form',nuevo);
            }
            
                
        });

        });
    }
}
edit= async function(req,res,next){
    let listaRoles=await Roles.find({estado:1});
    Personal.findById(req.params.id,(err,dato)=>{
        if(err)
            return res.redirect('/'+tabla);
        else{
            dato.error=null;
            dato.listaRoles=listaRoles;
            res.render('./'+tabla+'/form',dato);
        }
    })
}
editPost =async function(req,res,next){
    req.body.modificadoPor=req.user._id;
    let listaRoles=await Roles.find({estado:1});
    let validar=new Personal(req.body);
    if(err=validar.validateSync()){
        validar._id=null;
        validar.error=err;
        validar.Fecha_nac;
        validar.listaRoles=listaRoles;
        return res.render('./'+tabla+'/form',validar);
    }
    if (req.files  && Object.keys(req.files ).length >= 0) {
        sampleFile = req.files.avatar;
        uploadPath = __dirname + '\\..\\public\\avatar\\' + req.params.id+".jpg";
      
        console.log("archivo");
        console.log("path",uploadPath);
        try{
        // Use the mv() method to place the file somewhere on your server
        let file= await sampleFile.mv(uploadPath)/*, function(err) {

          if (err){
            console.log("archivo2", err);
            nuevo.error=err;
            nuevo._id=null;
            nuevo.listaRoles=listaRoles;
            return  res.render('./'+tabla+'/form',nuevo);
          }*/
        }catch(err){
            nuevo.error=err;
            nuevo._id=null;
            nuevo.listaRoles=listaRoles;
            return  res.render('./'+tabla+'/form',nuevo);
        }
          req.body.avatar=req.params.id+".jpg";
    }
        //req.body.avatar=req.params.id+".jpg";
    //req.body.userMod=req.user._id;
    Personal.findByIdAndUpdate(req.params.id,req.body,(err,dato)=>{
        if(err){
            req.body.error=err;
            //req.body._id=req.params.id;
            req.body.listaRoles=listaRoles;
            res.render('./'+tabla+'/form',req.body);
        }
        return res.redirect('/'+tabla);
    })
}
buscar=async function(req,res,next){
    let q={estado:1};
    if(req.body.buscar){
        q={
            estado:true,
            $or:[
                {Nombre:{$regex:req.body.buscar}},
                {Ci:{$regex:req.body.buscar}},
            ]
        }
        
    }
    let listapersonal= await Personal.find(q);
    console.log(listapersonal);
    res.render('./'+tabla,
        {
            msg:req.query.msg===undefined?null:req.query.msg,
            lista:listapersonal,
            error:''
        });
}
borrar = function(req,res,next){
    Personal.findByIdAndUpdate(req.params.id,{estado:0},(err,dato)=>{
        if(err){
            req.body.error=err;
            return res.redirect('/'+tabla);
        }
        return res.redirect('/'+tabla);
    })
}
detalleForm=function(req,res){
    Personal.findById(req.params.id,(err,dato)=>{
        if(err)
            return res.redirect('/'+tabla);
        else{
            dato.error=null;
            res.render('./'+tabla+'/detalleForm',dato);
        }
    })
}
detalle=function(req,res){
    console.log(req.body);
    Personal.findById(req.params.id,(err,dato)=>{
        if(err)
            return res.render('./'+tabla+'/detalleForm',dato);
        else{
            
            
            dato.detalle.push({fecha:new Date(),
                informe:req.body.informe,
                observaciones:req.body.observaciones,
                
                
            });
            dato.save((err,dato)=>{
                if(err){
                    req.body.error=err;
                    req.body._id=eq.params.id;
                    const count= Personal.countDocuments();
                    return res.render('./'+tabla+'/detalleForm',req.body);
                }
                if(req.body.pdf){
                    let doc="Informer_.pdf"
                    Informes.informe1(dato,req.body.detalleForm,doc,res);
                    
                }
                else
                    return res.redirect('/'+tabla);
            });
        }
    })
    
  
}
reportePerfil=async function(req,res){
    let doc="Perfil.pdf";
    try{
        let p=await Personal.findById(req.params.id);

        Informes.perfil(p,doc,res);
    }
    catch(err){

    }
}
module.exports={
    indexPersonal:indexPersonal,
    index:indexUser,
    nuevo:nuevo,
    nuevoPost:nuevoPost,
    edit:edit,
    editPost:editPost,
    borrar:borrar,
    detalleForm:detalleForm,
    detalle:detalle,
    buscar:buscar,
    reportePerfil:reportePerfil
    
}