var express = require('express');
var router = express.Router();
var control=  require("../controllers/cliente.controller");
var auth =require('../middleware/auth');

router.get('/buscar',auth,control.buscar);
router.post('/buscar',auth,control.buscar);
module.exports = router;
