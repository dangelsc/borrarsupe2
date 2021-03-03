var express = require('express');
var router = express.Router();
var gestion = require('../controllers/gestion.controller');
var auth =require('../middleware/auth');
router.get('/',auth,gestion.index);
router.get('/admin',auth,gestion.indexAdmin);
router.get('/nuevo',auth,gestion.nuevo);
router.post('/nuevo',auth,gestion.nuevoPost);
router.get('/edit/:id',auth,gestion.edit);
router.post('/edit/:id',auth,gestion.editPost);
router.get('/borrar/:id',auth,gestion.borrar);

module.exports = router;