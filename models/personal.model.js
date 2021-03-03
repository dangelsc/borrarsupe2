var cone= require("../config/conexion");
var mongoose = require("mongoose");
const schema = new mongoose.Schema(
    {
        Nombre:{type:String,required:[true,'Es necesario']},
        Apellido_pat:{type:String,required:[true,'Es necesario']},
        Apellido_mat:{type:String,required:[true,'Es necesario']},
        Ci:{type:String,required:[true,'Es necesario']},
        Fecha_nac:{type:Date,required:[true,'Es necesario']},
        Genero:{type:String,required:[true,'Es necesario']},
        Celular:{type:Number,required:[true,'Es necesario']},
        Rol:{type:mongoose.Schema.Types.ObjectId,ref:'roles',required:[true,'Es necesario']},
        estado:Boolean,
        login:{type:String},
        password:{type:String},
        creadoPor:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
        modificadoPor:{type:mongoose.Schema.Types.ObjectId,
            ref:'user'},
        detalle:[
            {
                fecha:Date,
                informe:String,
                observaciones:String

            }
        ]


    },{
        collection:'personal',
        timestamps:true 
    }
    );
module.exports = mongoose.model('personal', schema);