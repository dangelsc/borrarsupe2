var cone= require("../config/conexion");
var mongoose = require("mongoose");
const schema = new mongoose.Schema(
    {   cliente: String, 
        nit: String,
        fecha: Date,
        total:Number,
        codigocontrol:String,
        empleado:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'empleado'
        },
        detalle:[
            {
                producto:{
                    //type:String
                    type:mongoose.Schema.Types.ObjectId,
                    ref:'producto'
                },
                cant:Number,
                precio:Number,
                importe:Number
            }
        ]
    },{
    collection:'venta'
    }
    );
module.exports = mongoose.model('venta', schema);