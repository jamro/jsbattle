const fs = require('fs');

module.exports = function (gulp, config, plugins) {
    return function (done) {
      let filename = __dirname + '/../build_number.json';
      let buildInfo = JSON.parse(fs.readFileSync(filename, 'utf8'));
      buildInfo.build++;
      buildInfo.timestamp = (new Date()).getTime();
      console.log("Build number: " + buildInfo.build);
      fs.writeFile(filename, JSON.stringify(buildInfo), 'utf8', function(err, ok)  {
        if(err) {
          console.error(err);
        }
        done();
      });
    }
}
