var cone= require("../config/conexion");
var mongoose = require("mongoose");
const schema = new mongoose.Schema(
    {   nombre: String, 
        cant: Number,
        marca: String,
        precio:Number,
        codigobarra:String,
        estado:Number
    },{
        collection:'producto'
    }
    );
module.exports = mongoose.model('producto', schema);