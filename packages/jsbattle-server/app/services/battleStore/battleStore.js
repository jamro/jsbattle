const uuidv1 = require('uuid/v1');

// eslint-disable-next-line no-unused-vars
module.exports = function battleStore( options ) {

  this.add('role:battleStore,cmd:write', write);
  this.add('role:battleStore,cmd:read', read);

  function write(msg, respond ) {
    if(!msg.ubd) {
      return respond(new Error('msg.ubd is required'));
    }

    if(typeof msg.ubd == 'object') {
      msg.ubd = JSON.stringify(msg.ubd);
    }

    this.act({
      role: 'ubdValidator',
      cmd: 'validate',
      ubd: msg.ubd
    }, (err, result) => {
      if(err) {
        return respond(err);
      }
      if(!result.valid) {
        return respond(new Error(result.error));
      }

      let battleId = uuidv1();
      this.log.info({notice: `Storing battle data for ${battleId}`});

      let battle = this.make('UltimateBattleDescriptor');
      battle.id = battleId;
      battle.ubd = msg.ubd;
      battle.save$( (err, result) => {
        if(err) {
          return respond(new Error(err));
        }
        respond(null, {
          battleId: result.id,
          ubd: result.ubd
        });
      });
    });
  }

  function read( msg, respond ) {
    if(!msg.battleId) {
      return respond(new Error('msg.battleId is required'));
    }
    this.log.info({notice: `Reading battle data for ${msg.battleId}`});

    this.make('UltimateBattleDescriptor')
      .load$( msg.battleId, (err, result) => {
        if(err) {
          return respond(new Error(err));
        }

        if(!result) {
          return respond(new Error(`Battle ${msg.battleId} not found!`));
        }

        let ubdJson;
        try {
          ubdJson = JSON.parse(result.ubd);
        } catch(err) {
          return respond(new Error(err));
        }

        respond(null, {
          battleId: result.id,
          ubd: ubdJson
        });
      });
  }

  return {
    name: "battleStore"
  };
};
