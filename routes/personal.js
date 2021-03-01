var express = require('express');
var router = express.Router();
var control = require('../controllers/personal.controller');
var auth =require('../middleware/auth');

router.get('/',auth,control.index);
router.get('/personal',auth,control.indexPersonal);
router.get('/nuevo',auth,control.nuevo);
router.post('/nuevo',auth,control.nuevoPost);
router.get('/edit/:id',auth,control.edit);
router.post('/edit/:id',auth,control.editPost);
router.get('/buscar',auth,control.buscar);
router.post('/buscar',auth,control.buscar);
router.get('/borrar/:id',auth,control.borrar);
router.get('/detalle/:id',auth,control.detalleForm);
router.post('/detalle/:id',auth,control.detalle);



module.exports = router;