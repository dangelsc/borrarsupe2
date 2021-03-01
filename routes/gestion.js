var express = require('express');
var router = express.Router();
var gestion = require('../controllers/gestion.controller');

router.get('/',gestion.index);
router.get('/admin',gestion.indexAdmin);
router.get('/nuevo',gestion.nuevo);
router.post('/nuevo',gestion.nuevoPost);
router.get('/edit/:id',gestion.edit);
router.post('/edit/:id',gestion.editPost);
router.get('/borrar/:id',gestion.borrar);

module.exports = router;