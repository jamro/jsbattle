module.exports = function() {
  var result = {};
  var items = ["LN10", "PI", "E", "LOG10E", "SQRT2", "LOG2E", "SQRT1_2", "LN2", "cos", "pow", "log", "tan", "sqrt", "ceil", "asin", "abs", "max", "exp", "atan2", "random", "round", "floor", "acos", "atan", "min", "sin"];
  for(var i in items) {
    result[items[i]] = Math[items[i]];
  }

  result.deg = {};

  result.rad = {};

  result.deg.normalize = function(a) {
    a = Number(a);
    while(a > 180) a -= 360;
    while(a <= -180) a += 360;
    return a;
  };

  result.rad.normalize = function(a) {
    a = Number(a);
    while(a > result.PI) a -= result.PI*2;
    while(a <= -result.PI) a += result.PI*2;
    return a;
  };

  result.deg2rad = function(v) {
    return result.rad.normalize(v*(result.PI/180));
  };

  result.rad2deg = function(v) {
    return result.deg.normalize(v*(180/result.PI));
  };

  result.rad.atan2 = result.atan2;

  result.deg.atan2 = function(y, x) {
    return result.rad2deg(result.rad.atan2(y, x));
  };

  result.distance = function(x1, y1, x2, y2) {
    var dx = x2 - x1;
    var dy = y2 - y1;
    return result.sqrt(dx*dx + dy*dy);
  };

  result.randomRange = function(a, b) {
    if(a > b) throw "The range is incorrect. First number must be lower than second";
    return a + result.random()*(b-a);
  };
  return result;
};
