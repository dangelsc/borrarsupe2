var cone = require("../config/conexion");

var mongoose= require('mongoose');

const schema = new mongoose.Schema({
    tipo:String,
    nombre:String,
    cantidad:Number,
    precio:Number,
    marca:String,
    proveedor:String,
    presentacion: String,
    vencimiento:Date,
    estado:Boolean,
},{
    collection:'recepcion'
});
const model =mongoose.model('recepcion',schema);
module.exports = model;