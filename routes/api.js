//api/cliente
var Cliente = require('../models/cliente.model');
var express = require('express');
var router = express.Router();
var auth =require('../middleware/auth');

/* GET home page. */
router.get('/cliente',auth, function(req, res, next) {
    console.log("buscar",req.query.search);
    var dato = req.query.search;
    Cliente.find({nit: new RegExp(dato,'i'),estado:1},(err,lista)=>{
        if(err)
            res.json({item:[],error:err});
        else
            res.json({item:lista});
    })
    
});

module.exports = router;