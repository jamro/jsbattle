const pm2 = require('pm2');
const Tail = require('tail').Tail;

module.exports = function (gulp, config, plugins) {

  var logTails = []

  gulp.task('reload-server', function(done) {
    pm2.restart('jsbattle-watch', function(err) {
      if (err) {
        console.error(err)
        process.exit(2)
      }
      done();
    });
  });

  gulp.task('rebuild-engine', function(done) {
    plugins.sequence(
      'engine.sources.min',
      'engine.sprites',
      'engine.docs',
      'reload-server',
      'beep',
      done
    );
  });

  gulp.task('rebuild-webpage', function(done) {
    plugins.sequence(
      'webpage.copy',
      'webpage.sources',
      'reload-server',
      'beep',
      done
    );
  });

  gulp.task('rebuild-tanks', function(done) {
    plugins.sequence(
      'tanks.sources',
      'tanks.copy',
      'reload-server',
      'beep',
      done
    );
  });

  gulp.task('rebuild-server', function(done) {
    plugins.sequence(
      'server.copy',
      'reload-server',
      'beep',
      done
    );
  });

  return function() {

    pm2.connect(true, function(err) {
      if (err) {
        console.error(err)
        process.exit(2)
      }

      pm2.start({
        name: 'jsbattle-watch',
        script: config.tmp + '/dist/jsbattle.js',
        args: "start -h localhost -p 8080 -l debug -d " + config.tmp + "/jsbattle-test-data",
        wait_ready: true
      }, (err, apps) => {
        if (err) {
          console.error(err)
          process.exit(2)
        }
        let logPaths = apps.reduce((agregator, app) => {
          if(app.pm2_env.pm_err_log_path) {
            agregator.push(app.pm2_env.pm_err_log_path);
          }
          if(app.pm2_env.pm_out_log_path) {
            agregator.push(app.pm2_env.pm_out_log_path);
          }
          return agregator;
        }, []);
        logTails = logPaths.map((logPath) => {
          console.log(`Monitoring logfile: ${logPath}`)
          let tail = new Tail(logPath);
          tail.on("line", function(data) {
            console.log(data);
          });
          tail.on("error", function(error) {
            console.log('ERROR: ', error);
          });
          return tail;
        })
        gulp.watch('app/engine/**/*', ['rebuild-engine'])
        gulp.watch('app/webpage/**/*', ['rebuild-webpage'])
        gulp.watch('docs/**/*', ['rebuild-webpage'])
        gulp.watch('app/tanks/**/*', ['rebuild-tanks'])
        gulp.watch('app/server/**/*', ['rebuild-server'])
      });
    })
  }
};
