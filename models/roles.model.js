var mongoose = require('mongoose');
const schema = new mongoose.Schema({
    nombre:{type:String,required:[true,'Campo obligatorio']},
    estado:Number

},{
    collection:'roles'
});
module.exports = mongoose.model('roles', schema);