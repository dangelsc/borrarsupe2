var express = require('express');
var router = express.Router();
var control=  require("../controllers/venta.controller");
var auth =require('../middleware/auth');
///url dominio.com/venta/nuevo
/*                      /lista
                        /editar
                        /anular
                        /reimprimir
*/

/* GET home page. */
router.get('/nuevo',auth,control.nuevoform);
router.post('/nuevo',auth,control.nuevo);
module.exports = router;
