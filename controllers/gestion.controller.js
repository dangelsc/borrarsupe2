var gestion = require('../models/gestion.model');
var tabla='gestion';
function  indexAdmin(req,res,next){
    gestion.find({estado:1},(err,lista)=>{
        if(err)
            return res.render('./'+tabla+'/indexAdmin',{lista:[],error:err});
        return res.render('./'+tabla+'/indexAdmin',{lista:lista,error:''});
    });
}
function  indexUser(req,res,next){
    gestion.find({estado:1},(err,lista)=>{
        if(err)
            return res.render('./'+tabla+'/index',{lista:[],error:err});
        return res.render('./'+tabla+'/index',{lista:lista,error:''});
    });
}
function  nuevo(req,res,next){
    let x= new gestion();
    x._id=null;
    x.error=null;
    return res.render('./'+tabla+'/form',x);
}
function  nuevoPost(req,res,next){
    req.body.estado=1;
    console.log(req.body);
    let aux = new gestion(req.body);
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
    gestion.findById(req.params.id,(err,dato)=>{
        if(err)
            return res.redirect('./'+tabla);
        else{
            dato.error   =null;
            return res.render('./'+tabla+'/form',dato);
        }
    })
}
function  editPost(req,res,next){
    let aux = new gestion(req.body);
    if(err=aux.validateSync()){
        req.body._id=req.params.id;
        req.body.error=err;
        return res.render('./'+tabla+'/form',req.body);
    }
    gestion.findByIdAndUpdate(req.params.id,req.body,(err,dato)=>{
        if(err){
            req.body.error=err;
            return res.render('./'+tabla+'/form',req.body);
        }
        return res.redirect('/'+tabla);
    })
}
function  borrar(req,res,next){
    gestion.findByIdAndUpdate(req.params.id,{estado:0},(err,dato)=>{
        if(err){
            req.body.error=err;
            return res.redirect('/'+tabla);
        }
        return res.redirect('/'+tabla);
    })
}
module.exports={
    indexAdmin:indexAdmin,
    index:indexUser,
    nuevo:nuevo,
    nuevoPost:nuevoPost,
    edit:edit,
    editPost:editPost,
    borrar:borrar
}