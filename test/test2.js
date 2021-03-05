var assert = require('assert');
var mongoose= require('../config/conexion');
var User =require('../models/user.model');
var Personal =require('../models/personal.model');
var Control=require('../controllers/personal.controller');
const controlController = require('../controllers/control.controller');
describe('productos', function() {
  describe('calculos2', function() {
    it('1 debe encontrar el dato', function() {
      assert.equal([1, 2, 3].indexOf(3), 2);
    });
    it('2 el productos de 2 numeros', function() {
        assert.equal(2*6, 12);
    });
    it('3 debe Insertar un elemento en usuario', function(done) {
        let u=new User({login:'aaaa',password:'aaaaa',nombre:'aaaa'});
        u.save(done)
        //assert.equal();
    });
    it('4 buscar a pancho', async function() {
        let dato= await Personal.find({login:"pancho"});
        assert.equal(dato.length,1);
    });
  });
  describe('#integration', function() {
    /*it('4 buscar a pancho', async function() {
        let u=new Compra({login:'aaaa',password:'aaaaa',nombre:'aaaa'});
        u.save()

        let dato= await al.find({login:"aaaaa"});
        assert.equal(dato.length,1);
    });*/
    it('lista de personal',function(){
        Control.indexPersonal();

    })
  });
});