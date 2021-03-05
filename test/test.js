var assert = require('assert');
var User =require("../models/user.model");
const app=require("../bin/www");
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});
describe('User', function() {
    describe('#save()', function() {
    it('server',(done)=>{
        
    });
      it('should save without error', function(done) {
        var user = new User({nombre:"juan",password:'123',login:"asd"});
        //this.retries(4);
        //this.slow(300000);
        this.timeout(10000);
        console.log(user);
        user.save(done);
      });
    });
  });