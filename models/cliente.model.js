var cone= require("../config/conexion");
var mongoose = require("mongoose");
const schema = new mongoose.Schema(
    {   
        cliente: String, 
        nit: String,
        estado:Number
    },{
        collection:'cliente'
    }
    );
module.exports = mongoose.model('cliente', schema);