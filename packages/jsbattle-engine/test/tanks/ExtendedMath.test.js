var assert = require('assert');
var sinon = require('sinon');

var extendedMath = require('../../src/tanks/lib/extendedMath.js');
var Math = extendedMath();

describe('ExtendedMath', function() {

  describe('deg2rad', function() {

    it('should convert degrees to radians', function() {
      var input = [];
      input[0] = 0;
      input[180] = Math.PI;
      input[-180] = Math.PI; // normalization in (-180;180]
      input[90] = 0.5*Math.PI;
      input[-90] = -0.5*Math.PI;
      input[13.5] = 13.5*Math.PI/180;

      for(var i in input) {
        assert.equal(input[i].toFixed(5), Math.deg2rad(i).toFixed(5));
      }
    });

    it('should normalize output', function() {
      var input = [];
      input[-360] = 0;
      input[180+360] = Math.PI;
      input[-180-5*360] = Math.PI; // normalization in (-180;180]
      input[90+2*360] = 0.5*Math.PI;
      input[-90-10*360] = -0.5*Math.PI;
      input[13.5+360] = 13.5*Math.PI/180;

      for(var i in input) {
        assert.equal(input[i].toFixed(5), Math.deg2rad(i).toFixed(5));
      }
    });

  });

  describe('rad2deg', function() {

    it('should convert radians to degrees', function() {
      var input = [];
      input[0] = 0;
      input[180] = Math.PI;
      input[180] = -Math.PI; // normalization in (-180;180]
      input[90] = 0.5*Math.PI;
      input[-90] = -0.5*Math.PI;
      input[13.5] = 13.5*Math.PI/180;

      for(var i in input) {
        assert.equal(Number(i).toFixed(5), Math.rad2deg(input[i]).toFixed(5));
      }
    });

    it('should normalize output', function() {
      var input = [];
      input[0] = 0;
      input[180] = Math.PI;
      input[180] = -Math.PI; // normalization in (-180;180]
      input[90] = 0.5*Math.PI;
      input[-90] = -0.5*Math.PI;
      input[13.5] = 13.5*Math.PI/180;

      for(var i in input) {
        assert.equal(Number(i).toFixed(5), Math.rad2deg(input[i]).toFixed(5));
      }
    });

  });

  describe('deg.normalize', function() {

    it('should normalize angles', function () {
      var input = [];
      input[0+360] = 0;
      input[180+3*360] = 180;
      input[-180] = 180; // normalization in (-180;180]
      input[-179-9*360] = -179;
      input[-43+2*360] = -43;
      input[13.5-13*360] = 13.5;

      for(var i in input) {
        assert.equal(Number(input[i]).toFixed(5), Math.deg.normalize(i).toFixed(5));
      }
    });

  });

  describe('rad.normalize', function() {

    it('should normalize angles', function () {
      var input = [];
      input[2*Math.PI] = 0;
      input[-2*Math.PI] = 0;
      input[Math.PI] = Math.PI;
      input[-Math.PI] = Math.PI; // normalization in (-PI;PI]
      input[0.3+4*2*Math.PI] = 0.3;
      input[-0.01-7*2*Math.PI] = -0.01;
      input[2.2-10*2*Math.PI] = 2.2;

      for(var i in input) {
        assert.equal(Number(input[i]).toFixed(5), Math.rad.normalize(i).toFixed(5));
      }
    });

  });

  describe('rad.atan2', function() {

    it('should calculate arcus tangens in radians', function() {

      for(var i=0; i < 20; i++) {
        var x = Math.random()*100-50;
        var y = Math.random()*100-50;
        assert.equal(Math.atan2(y, x), Math.rad.atan2(y, x));
        assert.equal(Math.atan2(0, x), Math.rad.atan2(0, x));
        assert.equal(Math.atan2(y, 0), Math.rad.atan2(y, 0));
      }
      assert.equal(Math.atan2(0, 0), Math.rad.atan2(0, 0));

    });

  });

  describe('deg.atan2', function() {

    it('should calculate arcus tangens in degrees', function() {

        for(var i=0; i < 20; i++) {
          var x = Math.random()*100-50;
          var y = Math.random()*100-50;
          assert.equal(Math.atan2(y, x)*(180/Math.PI), Math.deg.atan2(y, x));
          assert.equal(Math.atan2(0, x)*(180/Math.PI), Math.deg.atan2(0, x));
          assert.equal(Math.atan2(y, 0)*(180/Math.PI), Math.deg.atan2(y, 0));
        }
        assert.equal(Math.atan2(0, 0)*(180/Math.PI), Math.deg.atan2(0, 0));

    });

  });

  describe('distance', function() {

    it('should calculate distance between points', function() {
      assert.equal(10, Math.distance(5, 7, 15, 7));
      assert.equal(10, Math.distance(15, 7, 5, 7));
      assert.equal(4, Math.distance(3, -2, 3, 2));

      assert.equal('19.9249', Math.distance(-4, 75, 2, 94).toFixed(4));
    });

  });

  describe('randomRange', function() {
    it('should return values in defined range', function() {
      for(var i=0; i < 1000; i++) {
        var rand = Math.randomRange(-4, 5);
        assert(rand < 5);
        assert(rand >= -4);
      }
    });

    it('should return random values', function() {
      var values = [];
      for(var i=0; i < 10; i++) {
        var rand = Math.randomRange(-4, 5);
        values.push(rand);
      }

      assert.equal(10, values.length);
    });

    it('should throw error if range not deffined correctly', function() {
      assert.throws(function() {
        Math.randomRange(5, 4);
      })
    });

  });

});
