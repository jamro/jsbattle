const {Before, After, BeforeAll, AfterAll} = require('cucumber');
const pm2 = require('pm2');
const path = require('path');


BeforeAll(function (done) {
  console.log('----------------------');
  console.log('Connecting to PM2');
  pm2.connect(function(err) {
    if (err) {
      console.error(err);
      process.exit(2);
    }
    console.log('Removing PM2 app');
    pm2.delete('jsbattle-test-server', (err, app) => {
      let rootPath = path.resolve(__dirname, '..', '..', '..');
      let config = {
        name: 'jsbattle-test-server',
        wait_ready: true,
        script: path.resolve(rootPath, 'dist', 'jsbattle.js'),
        args: ' start -c ' + path.resolve(rootPath, 'test', 'jsbattle.config.json')
      };
      console.log('Starting PM2 app');
      pm2.start(config, (err, app) => {
        if (err) {
          console.error(err);
          process.exit(2);
        }
        console.log('Disconnecting from PM2');
        console.log('----------------------');
        pm2.disconnect();
        done();
      });
    });
  });
});

AfterAll(function (done) {
  console.log('----------------------');
  console.log('Connecting to PM2');
  pm2.connect(function(err) {
    if (err) {
      console.error(err);
      process.exit(2);
    }
    console.log('Removing PM2 app');
    pm2.delete('jsbattle-test-server', (err, app) => {
      console.log('Disconnecting from PM2');
      console.log('----------------------');
      pm2.disconnect();
      done();
    });
  });
});

Before(function (scenario, done) {
  pm2.connect(function(err) {
    if (err) {
      console.error(err);
      process.exit(2);
    }

    pm2.restart('jsbattle-test-server', (err, app) => {
      if (err) {
        console.error(err);
        process.exit(2);
      }
      pm2.disconnect();
      done();
    });
  });

})
