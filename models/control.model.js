var cone= require("../config/conexion");
var mongoose = require("mongoose");
const schema = new mongoose.Schema(
    {   
        ci:String,
        nombre:String,
        ape_pat:String,
        ape_mat:String,
        direccion:String,
        telefono:Number,
        estado:Number,
    },{
        collection:'control'
    }
    );
module.exports = mongoose.model('control', schema);