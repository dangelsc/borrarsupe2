var Venta = require("../models/venta.model");
var Producto = require("../models/producto.model");
var mongoose = require("mongoose");
module.exports={
    nuevoform:async function(req,res,next){
        let listaproducto= await Producto.find({estado:1});
        console.log(listaproducto);
        res.render('venta/nuevoform',
            {
                msg:req.query.msg===undefined?null:req.query.msg,
                listaproducto:listaproducto,
                error:''
            });

    },
    //
//   passport  ->google, fcebook,... ,redes sociales,local
//  sessiones -> 
    ///
    nuevo:async function(req,res,next){
        console.log(req.body);
        let listaproducto= await Producto.find({estado:1});
        req.body.detalle=JSON.parse(req.body.detalle);
        
        req.body.empleado=req.user._id;//req.session.user;
        let n=new Venta(req.body);
        try{
            const session = await mongoose.startSession();
            session.startTransaction();
            let dato=await n.save();
            for(i=0;i<req.body.detalle.length;i++){
                let prod=await Producto.findById(req.body.detalle[i].producto);
                console.log(prod);
                prod.cant=Number(prod.cant)-Number(req.body.detalle[i].cant);
                await prod.save();
            }

            await session.commitTransaction();
            session.endSession();
            /*transacciones inicio
            50
            50-5
            10-1
            10-2
            ...
            2-2 = 0  
            fin transacccione
            commit

            rollback
            */



            //console.log("dato","insertado");
            
            res.redirect('/venta/nuevo?msg=Venta realizada');
        }catch(err){
            console.log("erro",err);
            res.render('venta/nuevoform',{error:err,msg:'',listaproducto:listaproducto});
            
        }
    }
}
