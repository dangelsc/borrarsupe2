var control = require("../models/control.model");
//var Producto = require("../models/producto.model");
var mongoose = require("mongoose");


var control = require('../models/control.model');
var tabla='control';
function  indexAdmin(req,res,next){
    control.find({estado:1},(err,lista)=>{
        if(err)
            return res.render('./'+tabla+'/indexAdmin',{lista:[],error:err});
        return res.render('./'+tabla+'/indexAdmin',{lista:lista,error:''});
    });
}
function  indexUser(req,res,next){
    control.find({estado:1},(err,lista)=>{
        if(err)
            return res.render('./'+tabla+'/index',{lista:[],error:err});
        return res.render('./'+tabla+'/index',{lista:lista,error:''});
    });
}
function  nuevo(req,res,next){
    let x= new control();
    x._id=null;
    x.error=null;
    x.nombre=x.ape_pat=x.ape_mat=x.direccion=x.Rol='';
    return res.render('./'+tabla+'/form',x);
}
function  nuevoPost(req,res,next){
    req.body.estado=1;
    let aux = new control(req.body);
    aux.save((err,dato)=>{
        if(err){
            req.body.error=err;
            //console.log(err.errors['titulo'].message)
            req.body._id=null;
            return res.render('./'+tabla+'/form',req.body);
        }else
        {
            if(dato)
                return res.redirect('/'+tabla+'/');
            else
            {   req.body.error='Paso algo malo,';
                return res.render('./'+tabla+'/form',req.body);
            }
        }
    });
}
function  edit(req,res,next){
    control.findById(req.params.id,(err,dato)=>{
        if(err)
            return res.redirect('./'+tabla);
        else{
            dato.error   =null;
            return res.render('./'+tabla+'/form',dato);
        }
    })
}
function  editPost(req,res,next){
    let aux = new control(req.body);
    if(err=aux.validateSync()){
        req.body._id=req.params.id;
        req.body.error=err;
        return res.render('./'+tabla+'/form',req.body);
    }
    control.findByIdAndUpdate(req.params.id,req.body,(err,dato)=>{
        if(err){
            req.body.error=err;
            return res.render('./'+tabla+'/form',req.body);
        }
        return res.redirect('/'+tabla);
    })
}
function  borrar(req,res,next){
    control.findByIdAndUpdate(req.params.id,{estado:0},(err,dato)=>{
        if(err){
            req.body.error=err;
            return res.redirect('/'+tabla);
        }
        return res.redirect('/'+tabla);
    })
}
buscar=async function(req,res,next){
            let q={estado:1};
            if(req.body.buscar){
                q={
                    estado:1,
                    $or:[
                        {nombre:{$regex:req.body.buscar}},
                        {ci:{$regex:req.body.buscar}},
                    ]
                }
            }
            let listacontrol= await control.find(q);
            console.log(listacontrol);
            res.render('control/buscar',
                {
                    msg:req.query.msg===undefined?null:req.query.msg,
                    lista:listacontrol,
                    error:''
                });
 }
module.exports={
    indexAdmin:indexAdmin,
    index:indexUser,
    nuevo:nuevo,
    nuevoPost:nuevoPost,
    edit:edit,
    editPost:editPost,
    borrar:borrar,
    buscar:buscar
}