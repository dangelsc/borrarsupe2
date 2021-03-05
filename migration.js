var Personal= require("./models/personal.model");
var bcrypt=require('bcrypt');
var Roles= require("./models/roles.model");

let rol1=new Roles({nombre:'Gerente',estado:1});
rol1.save();

let p=new Personal({
    Nombre:'pancho',
    login:'pancho',
    Celular:123123,
    Genero:'Hombre',
    Fecha_nac:'12/12/2000',
    Ci:123123,
    Apellido_mat:'pancho',
    Apellido_pat:'pancho',
    password:bcrypt.hashSync('pancho',10),
    estado:true,
    Rol:rol1._id
});
p.save();