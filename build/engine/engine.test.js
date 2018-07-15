require('babel-register')();
const through = require('through2');
const Mocha = require('mocha');

module.exports = function (gulp, config, plugins) {
  return function(done) {
    var mocha = new Mocha();
    return gulp.src(config.engine.test, { read: false })
      .pipe(through.obj(
        function(file, enc, cb) {
          mocha.addFile(file.path);
          cb(null, file);
        },
        function() {
          mocha.run(function(failures){
            if(failures) {
              done("Tests failed");
            } else {
              done();
            }
          });
        }              
      ));
  };
};
