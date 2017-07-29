module.exports = function() {
  Math.deg2rad = function(v) {
    return v*(Math.PI/180)
  }
  Math.rad2deg = function(v) {
    return v*(180/Math.PI)
  }
  Math.deg = {};
  Math.rad = {};
  Math.deg.normalize = function(a) {
    while(a > 180) a -= 360;
    while(a < -180) a += 360;
    return a;
  }
  Math.rad.normalize = function(a) {
    while(a > Math.PI) a -= Math.PI*2;
    while(a < -Math.PI) a += Math.PI*2;
    return a;
  }
  Math.rad.atan2 = Math.atan2;
  Math.deg.atan2 = function(y, x) {
    return Math.rad2deg(Math.rad.atan2(y, x));
  }
  Math.distance = function(x1, y1, x2, y2) {
    var dx = x2 - x1;
    var dy = y2 - y1;
    return Math.sqrt(dx*dx + dy*dy);
  }
  Math.randomRange = function(a, b) {
    return a + Math.random()*(b-a);
  }

}
