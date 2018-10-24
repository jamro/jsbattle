import 'babel-polyfill';
require('babel-register')();
const through = require("through2");
const child_process = require('child_process');
const Mocha = require('mocha');
const pm2 = require('pm2')

module.exports = function (gulp, config, plugins) {
  return function(done) {

    var mocha = new Mocha();
    return gulp.src(config.webpage.test)
      .pipe(through.obj(
        function(file, enc, cb) {
          mocha.addFile(file.path);
          cb(null, file);
        },
        function() {

          pm2.connect(function(err) {
            if (err) {
              console.error(err)
              process.exit(2)
            }

            pm2.start({
              name: 'jsbattle-test',
              script: config.tmp + '/dist/jsbattle.js',
              args: "start -h localhost -p 8070 -d " + config.tmp + "/jsbattle-test-data",
              wait_ready: true
            }, (err, apps) => {
              if (err) {
                throw err
              }

              mocha.run(function(failures){
                plugins.connect.serverClose();
                pm2.stop('jsbattle-test', (err, apps) => {
                  pm2.delete('jsbattle-test', (err, apps) => {
                    pm2.disconnect();
                  });
                });
                if(failures) {
                  done("Tests failed");
                } else {
                  done();
                }
              });
            })
          })
        }
      ))
      .on('error', function(){
        process.emit('exit');
      })
  }
};
