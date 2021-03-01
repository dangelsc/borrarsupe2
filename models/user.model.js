var mongoose = require('mongoose');
const schema = new mongoose.Schema({
    nombre:{type:String,required:[true,'Campo obligatorio']},
    login:{type:String,required:[true,'Campo obligatorio']},
    password:{type:String,required:[true,'Campo obligatorio']},
    estado:Boolean,
    userMod:{type:mongoose.Schema.Types.ObjectId,ref:'user'}
},{
    collection:'user'
});
module.exports = mongoose.model('user', schema);