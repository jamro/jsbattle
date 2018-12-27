import assert from "assert";
const senecaFactory = require('seneca');
const senecaEntity = require('seneca-entity');
const SenecaLogger = require('./lib/SenecaLogger');
const UbdJsonMock = require('./mock/UbdJsonMock.js');

describe('ubdValidator', function() {

  var seneca;

  var logger = SenecaLogger('error');

  beforeEach((done) => {
    logger.setLogLevel('error');
    seneca = senecaFactory({
      internal: {
        logger: logger
      }
    });
    seneca
      .use(senecaEntity)
      .use(require(__dirname + '/../../src/server/services/ubdValidator/ubdValidator.js'), {schemaPath: __dirname + '/../../src/schema'})
      .ready((err) => {
        if(err) {
          console.error(err);
        }
        done();
      });
  })

  describe('schema ver 1', function() {
    let ubd = new UbdJsonMock(1);
    it('should pass proper UBDv1', (done) => {
      seneca.act({
        role: 'ubdValidator',
        cmd: 'validate',
        ubd: ubd
      }, function (error, result) {
        assert(result.valid, "validation failed");
        done();
      });
    });
    it('should fail improper UBDv1', (done) => {
      logger.setLogLevel('none');
      let ubd = new UbdJsonMock(1);
      ubd.rngSeed = "INVALID_VALUE";
      seneca.act({
        role: 'ubdValidator',
        cmd: 'validate',
        ubd: ubd
      }, function (error, result) {
        assert(!result.valid, "validation pass");
        done();
      });
    });
  });

  describe('schema ver 2', function() {
    let ubd = new UbdJsonMock(2);
    it('should pass proper UBDv2', (done) => {
      seneca.act({
        role: 'ubdValidator',
        cmd: 'validate',
        ubd: ubd
      }, function (error, result) {
        assert(result.valid, "validation failed");
        done();
      });
    });
    it('should fail improper UBDv2', (done) => {
      logger.setLogLevel('none');
      let ubd = new UbdJsonMock(1);
      ubd.rngSeed = "INVALID_VALUE";
      seneca.act({
        role: 'ubdValidator',
        cmd: 'validate',
        ubd: ubd
      }, function (error, result) {
        assert(!result.valid, "validation pass");
        done();
      });
    });
  });


});
