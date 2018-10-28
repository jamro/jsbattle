const NotFoundError = require('./httpError/NotFoundError.js');
const InternalServerError = require('./httpError/InternalServerError.js');

module.exports = function api( options ) {

  this.add('role:api,cmd:ping,method:get', ping);
  this.add('role:api,cmd:battleReplay,method:get', replayBattle);
  this.add('role:api,cmd:battleReplay,method:post', shareBattle);
  this.add('role:api', notFound);


  function ping(msg, respond ) {
    respond(null, {"ping": "pong"});
  }

  function replayBattle(msg, respond ) {
    this.act({
      role:"battleStore",
      cmd:"read",
      battleId: msg.req.query.battleId
    }, (error, result) => {
      if(error) {
        return respond(new InternalServerError("Cannot read battle replay", error));
      }
      respond(result);
    });
  }

  function shareBattle(msg, respond ) {
    this.act({
      role:"battleStore",
      cmd:"write",
      ubd: msg.req.body.ubd
    }, (error, result) => {
      if(error) {
        return respond(new InternalServerError("Cannot save battle replay", error));
      }
      respond(result);
    });
  }

  function notFound(msg, respond) {
    let method = msg.method;
    let cmd = msg.cmd;
    respond(new NotFoundError(`Service ${method}:${cmd} not found`, null));
  }

  return {
    name: "api"
  };
};
