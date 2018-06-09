const through = require("through2");
const child_process = require('child_process');

module.exports = function (gulp, config, plugins) {
  return function() {

    plugins.connect.server({
      name: 'Test Server',
      root: config.tmp + 'dist/',
      port: 8070
    });


    return gulp.src(config.webpage.test)
      .pipe(through.obj(function (file, enc, callback) {

        const casperBin = './node_modules/.bin/casperjs';

        let args = [
          '--log-level=warning',
          'test',
          file.path
        ];

        let child = child_process.execFile(casperBin, args, (error, stdout, stderr) => {
          this.push(file);
          callback();
        });

        child.stdout.on('data', function(data) {
          plugins.util.log("CasperJS: " + data.toString().replace(/[\n\r]+$/, ""));
        });

      }))
      .on('error', function(){
        process.emit('exit');
      })
      .on('end', function () {
        plugins.connect.serverClose();
      });
  }
};
