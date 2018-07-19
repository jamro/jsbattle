require('babel-register')();
const through = require("through2");
const child_process = require('child_process');
const Mocha = require('mocha');

module.exports = function (gulp, config, plugins) {
  return function(done) {

    plugins.connect.server({
      name: 'Test Server',
      root: config.tmp + 'dist/public/',
      port: 8070
    });

    var mocha = new Mocha();
    return gulp.src(config.webpage.test)
      .pipe(through.obj(
        function(file, enc, cb) {
          mocha.addFile(file.path);
          cb(null, file);
        },
        function() {
          mocha.run(function(failures){
            plugins.connect.serverClose();
            if(failures) {
              done("Tests failed");
            } else {
              done();
            }
          });
        }
      ))
      .on('error', function(){
        process.emit('exit');
      })
  }
};
