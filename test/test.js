var assert = require('assert');
describe('ventas', function() {
  describe('calculos', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1, 2, 3].indexOf(3), 2);
    });
    it('sumar 2 valores', function() {
        assert.equal(2+6, 8);
      });
  });
});