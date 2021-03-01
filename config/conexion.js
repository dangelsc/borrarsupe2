var mongoose=require("mongoose");
mongoose.set('debug', true);
module.exports=
mongoose.connect('mongodb://localhost:27017/super', {useNewUrlParser: true, useUnifiedTopology: true});
