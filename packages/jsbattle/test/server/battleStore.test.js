import assert from "assert";
const senecaFactory = require('seneca');
const senecaEntity = require('seneca-entity');
const SenecaLogger = require('./lib/SenecaLogger.js');
const UbdJsonMock = require('./mock/UbdJsonMock.js');

describe('battleStore', function() {

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
      .use(require(__dirname + '/../../src/server/services/battleStore/battleStore.js'))
      .use(require(__dirname + '/../../src/server/services/ubdValidator/ubdValidator.js'), {schemaPath: __dirname + '/../../src/schema'})
      .ready((err) => {
        if(err) {
          console.error(err);
        }
        done();
      });
  })

  it('should store battle JSON data', (done) => {
    let ubd = new UbdJsonMock();
    seneca.act({
      role: 'battleStore',
      cmd: 'write',
      ubd: ubd
    }, function (error, writeResult) {
      assert(!error, 'There is no errors in storing the battle');
      if(error) {
        return done();
      }
      seneca.act({
        role: 'battleStore',
        cmd: 'read',
        battleId: writeResult.battleId
      }, function (error, readResult) {
        assert(!error, 'There is no errors in reading the battle');
        assert.equal(writeResult.battleId, readResult.battleId);
        assert.equal(JSON.stringify(ubd), JSON.stringify(readResult.ubd));
        done();
      })
    })
  });

  it('should store battle text data', (done) => {
    let ubd = new UbdJsonMock();
    seneca.act({
      role: 'battleStore',
      cmd: 'write',
      ubd: JSON.stringify(ubd)
    }, function (error, writeResult) {
      assert(!error, 'There is no errors in storing the battle');
      if(error) {
        return done();
      }
      seneca.act({
        role: 'battleStore',
        cmd: 'read',
        battleId: writeResult.battleId
      }, function (error, readResult) {
        assert(!error, 'There is no errors in reading the battle');
        assert.equal(writeResult.battleId, readResult.battleId);
        assert.equal(JSON.stringify(ubd), JSON.stringify(readResult.ubd));
        done();
      });
    });
  });


  it('should return error when a battle does not exists', (done) => {
    logger.setLogLevel('none');
    seneca.act({
      role: 'battleStore',
      cmd: 'read',
      battleId: '00000'
    }, function (error, readResult) {
      assert(error, 'returns error if battle is not found');
      done();
    });
  });

});
