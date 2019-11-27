const express = require('express');
const stringReplace = require('../lib/stringReplaceMiddleware.js');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const seneca = require('seneca');
const senecaEntity = require('seneca-entity');
const senecaJsonFileStore = require('seneca-jsonfile-store');
const SenecaLogger = require('../lib/SenecaLogger.js');

class Gateway {

  init(options) {
    return new Promise((resolve) => {
      this.options = options;

      this.seneca = seneca({
        internal: {
          logger: SenecaLogger(options.loglevel)
        }
      });

      // make sure that data dir exists
      var mkdir = function(dir){
        if (fs.existsSync(dir)){
          return;
        }
        try {
          fs.mkdirSync(dir);
        } catch(err) {
          if(err.code == 'ENOENT'){
            mkdir(path.dirname(dir));
            mkdir(dir);
          }
        }
      };
      let dataPath = path.resolve(this.options.data);
      this.seneca.log.info({notice: `Creating data folder for battle store at ${dataPath}`});
      mkdir(dataPath);

      this.seneca
        .use(senecaEntity)
        .use(senecaJsonFileStore, {
          folder: this.options.data
        })
        .use(require(__dirname + '/battleStore/battleStore.js'), this.options)
        .use(require(__dirname + '/ubdValidator/ubdValidator.js'), this.options)
        .use(require(__dirname + '/api/api.js'), this.options)
        .ready((err) => {
          if(err) {
            console.error(err);
          }
          resolve();
        });
    });
  }

  start() {
    return new Promise((resolve) => {
      let replacements = {};

      if(this.options.gaCode) {
        this.seneca.log.info({notice: `GA tracking enabled: ${this.options.gaCode}`});
        replacements['GA:XX-XXXXXXXXX-X'] = this.options.gaCode;
      }

      this.app = express();
      this.app.use(stringReplace(replacements));
      this.app.use(express.static(this.options.webroot, { maxAge: 12*60*60*1000, etag: true }));
      this.app.use(bodyParser.json());
      this.app.use(bodyParser.urlencoded({
        extended: true
      }));
      this.app.get('/api/:action', (req, res) => {
        this._senecaApiCall(req, res, req.params.action, 'get');
      });
      this.app.post('/api/:action', (req, res) => {
        this._senecaApiCall(req, res, req.params.action, 'post');
      });
      this.app.listen(
        this.options.port,
        this.options.host,
        () => {
          this.seneca.log.info({notice: `webserver started at http://${this.options.host}:${this.options.port}`});
          resolve();
        }
      );

    });
  }

  _senecaApiCall(req, res, action, method) {
    this.seneca
      .act({
        role:"api",
        cmd: action,
        req:req,
        method: method || 'get'
      }, (err, result) => {
        if(err) {
          let status = err.httpStatus || 500;
          res.status(status);
          res.send(`Error ${status}: ${err.message}`);
          this.seneca.log.error({notice: err});
          return;
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(result));
      });
  }

}

module.exports = Gateway;
