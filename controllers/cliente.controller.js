var Cliente = require("../models/cliente.model");
//var Producto = require("../models/producto.model");
var mongoose = require("mongoose");
module.exports={
    buscar:async function(req,res,next){
        console.log("user:",req.user);
        let q={estado:1};
        if(req.body.buscar){
            q.cliente={$regex:req.body.buscar};
        }
        let listacliente= await Cliente.find(q);
        console.log(listacliente);
        res.render('cliente/buscar',
            {
                msg:req.query.msg===undefined?null:req.query.msg,
                listacliente:listacliente,
                error:''
            });
    }
}