const DbService = require("moleculer-db");
const getDbAdapterConfig = require("../../lib/getDbAdapterConfig.js");
const validators = require("../../validators");

module.exports = (config) => {
  let adapterConfig = getDbAdapterConfig(config.data, 'league');

  return {
    ...adapterConfig,
    name: "league",
    mixins: [DbService],
    settings: {
      idField: 'id',
      fields: [
        "id",
        "joinedAt",
        "ownerId",
        "ownerName",
        "scriptId",
        "scriptName",
        "fights_total",
        "fights_win",
        "fights_lose",
        "fights_error",
        "score",
        "code",
        "hash"
      ],
      obfuscate: config.league.obfuscate
    },
    entityValidator: {
      id: validators.entityId({optional: true}),
      joinedAt: validators.createDate(),
      ownerId: validators.entityId(),
      ownerName: validators.entityName(),
      scriptId: validators.entityId(),
      scriptName: validators.entityName(),
      fights_total: {type: "number", positive: true},
      fights_win: {type: "number", positive: true},
      fights_lose: {type: "number", positive: true},
      fights_error: {type: "number", positive: true},
      score: {type: "number", positive: true},
      code: validators.code(),
      hash: validators.hash()
    },
    actions: {
      pickRandomOpponents: require('./actions/pickRandomOpponents.js'),
      seedLeague: require('./actions/seedLeague.js'),
      getUserSubmission: require('./actions/getUserSubmission.js'),
      getHistory: require('./actions/getHistory.js'),
      leaveLeague: require('./actions/leaveLeague.js'),
      getLeagueSummary: require('./actions/getLeagueSummary.js'),
      getUserRankTable: require('./actions/getUserRankTable.js'),
      getScript: {
        params: {
          id: validators.entityId()
        },
        handler: require('./actions/getScript.js')
      },
      joinLeague: {
        scriptId: validators.entityId(),
        handler: require('./actions/joinLeague.js')
      },
      updateRank: {
        params: {
          id: validators.entityId(),
          winner: { type: "boolean" }
        },
        handler: require('./actions/updateRank.js')
      },
      listRankTable: {
        params: {
          page: {type: "number", positive: true, min: 1, optional: true, convert: true},
          pageSize: {type: "number", positive: true, min: 1, max: 50, optional: true, convert: true}
        },
        handler: require('./actions/listRankTable.js')
      },
    },
    hooks: {
      before: {
        create: [require('./hooks/create.js')]
      }
    },
    events: {
      "app.seed": require('./events/onAppSeed.js')
    },
    started: require('./events/onStart.js')
  };
};
