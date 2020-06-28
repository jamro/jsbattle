const path = require('path');
const exec = require('child_process').exec;


module.exports = async (logger) => {
  let scriptPath = path.resolve(__dirname, 'puppeteer-install-script.js')
  let cmd = `node ${scriptPath}`;

  await new Promise((resolve) => {
    logger.info('Downloading local chromium...')
    exec(cmd, (error, stdout, stderr) => {
     if (error) {
      logger.warn(error);
     }
     logger.debug(stdout? stdout : stderr);
     resolve();
    });
   });
}
