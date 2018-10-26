const express = require('express');
const uuidv1 = require('uuid/v1');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const seneca = require('seneca');
const senecaEntity = require('seneca-entity');
const senecaJsonFileStore = require('seneca-jsonfile-store');
const SenecaLogger = require('../lib/SenecaLogger.js');


class Gateway {

  init(options) {
    return new Promise((resolve, reject) => {
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
        .use(require(__dirname + '/battleStore/battleStore.js'), {data: this.options.data})
        .ready((err) => {
          if(err) {
            console.error(err);
          }
          resolve();
        });
    });
  }

  start() {
    return new Promise((resolve, reject) => {

      this.app = express();
      this.app.use(express.static(this.options.webroot, { maxAge: 12*60*60*1000, etag: true }));
      this.app.use(bodyParser.json());
      this.app.use(bodyParser.urlencoded({
        extended: true
      }));
      this.app.post('/share',  (req, res) => {

        this._mapSenecaCall(
          res,
          {role:"battleStore", cmd:"write", ubd: req.body.ubd},
          "Cannot write battle data to the store",
          (result) => { return {battleId: result.battleId}; }
        );

      });
      this.app.get('/replay/:battleId', (req, res) => {

        this._mapSenecaCall(
          res,
          {role:"battleStore", cmd:"read", battleId:req.params.battleId},
          "Cannot read battle data from the store",
          (result) => { return {ubd: result.ubd}; }
        );

      });
      this.app.listen(
        this.options.port,
        this.options.host,
        () => {
          this.seneca.log.info({notice: `webserver started at http://${this.options.host}:${this.options.port}`});
          resolve();
        }
      );
      console.log('reload');
      reload(this.app);

    });
  }

  _mapSenecaCall(res, msg, errMessage, responseMapper) {
    this.seneca
      .act(msg, (err, result) => {
        if(err) {
          res.status(500);
          res.send("Error 500: " + errMessage);
          this.seneca.log.error({notice: err});
          return;
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(responseMapper(result)));
      });
  }

}

module.exports = Gateway;
