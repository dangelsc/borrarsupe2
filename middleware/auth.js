module.exports=(req,res,next)=>{
    if(req.isAuthenticated()){
        console.log(req.baseUrl);
        res.locals.user=req.user;
        console.log(req.user.Rol.nombre+'--'+"Vendedor")
        //vendedor
        if(req.user.Rol.nombre==="Vendedor"){
            if(req.baseUrl==="/venta"
            ||req.baseUrl==="/personal"){
                res.locals.menu=[{
                    titulo:'Venta',
                    url:'/venta/nuevo',
                    icon:'nav-icon fas fa-th'
                },{
                    titulo:'Personal',
                    url:'/personal',
                    icon:'nav-icon fas fa-chart-pie'
                },
            ]
                console.log(res.locals.menu);
                return next();
            }else
            return res.redirect('/venta/nuevo');
        }
        else if(req.user.Rol.nombre==="Gerente"){
            res.locals.menu=[{
                titulo:'Venta',
                url:'/venta/nuevo',
                icon:'nav-icon fas fa-th'
            },{
                titulo:'Personal',
                url:'/personal',
                icon:'nav-icon fas fa-chart-pie'
            },
            ]
            console.log(res.locals.menu);
            return next();
        }else if(req.user.Rol.nombre==="Almacen"){
            res.locals.menu=[{
                titulo:'Venta',
                url:'/venta/nuevo',
                icon:'nav-icon fas fa-th'
            },{
                titulo:'Personal',
                url:'/personal',
                icon:'nav-icon fas fa-chart-pie'
            },
            ]
            console.log(res.locals.menu);
            return next();
        }
        //return res.redirect('/cliente');
    }
    else
        return res.redirect('/login');
}