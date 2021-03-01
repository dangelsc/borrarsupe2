var express = require('express');
var router = express.Router();
var control=  require("../controllers/control.controller");

router.get('/buscar',control.buscar);
router.post('/buscar',control.buscar);

router.get('/',control.index);
router.get('/admin',control.indexAdmin);
router.get('/nuevo',control.nuevo);
router.post('/nuevo',control.nuevoPost);
router.get('/edit/:id',control.edit);
router.post('/edit/:id',control.editPost);
router.get('/borrar/:id',control.borrar);
module.exports = router;