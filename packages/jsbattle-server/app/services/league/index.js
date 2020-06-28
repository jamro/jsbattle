const Service = require("moleculer").Service;
const DbService = require("moleculer-db");
const _ = require('lodash');
const getDbAdapterConfig = require("../../lib/getDbAdapterConfig.js");
const RankTable = require('./lib/RankTable.js');
const validators = require("../../validators");

const onAppSeed = require('./events/onAppSeed.js');
const pickRandomOpponents = require('./actions/pickRandomOpponents.js');
const seedLeague = require('./actions/seedLeague.js');
const getUserSubmission = require('./actions/getUserSubmission.js');
const getHistory = require('./actions/getHistory.js');
const leaveLeague = require('./actions/leaveLeague.js');
const getLeagueSummary = require('./actions/getLeagueSummary.js');
const getUserRankTable = require('./actions/getUserRankTable.js');
const getScript = require('./actions/getScript.js');
const joinLeague = require('./actions/joinLeague.js');
const updateRank = require('./actions/updateRank.js');
const listRankTable = require('./actions/listRankTable.js');

class LeagueService extends Service {

  constructor(broker) {
    super(broker);
    this.borker = broker;
    this.ranktable = new RankTable();
    this.config = broker.serviceConfig.league;
    let adapterConfig = getDbAdapterConfig(broker.serviceConfig.data, 'league')
    this.parseServiceSchema({
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
        ]
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
        pickRandomOpponents: pickRandomOpponents.bind(this),
        seedLeague: seedLeague.bind(this),
        getUserSubmission: getUserSubmission.bind(this),
        getHistory: getHistory.bind(this),
        leaveLeague: leaveLeague.bind(this),
        getLeagueSummary: getLeagueSummary.bind(this),
        getUserRankTable: getUserRankTable.bind(this),
        getScript: {
          params: {
            id: validators.entityId()
          },
          handler: getScript.bind(this)
        },
        joinLeague: {
          scriptId: validators.entityId(),
          handler: joinLeague.bind(this)
        },
        updateRank: {
          params: {
            id: validators.entityId(),
            winner: { type: "boolean" }
          },
          handler: updateRank.bind(this)
        },
        listRankTable: {
          params: {
            page: {type: "number", positive: true, min: 1, optional: true, convert: true},
            pageSize: {type: "number", positive: true, min: 1, max: 50, optional: true, convert: true}
          },
          handler: listRankTable.bind(this)
        },
      },
      hooks: {
        before: {
          create: [
            function addDefaults(ctx) {
              ctx.params.joinedAt = new Date();
              ctx.params.fights_total = 0;
              ctx.params.fights_win = 0;
              ctx.params.fights_lose = 0;
              ctx.params.fights_error = 0;
              ctx.params.score = ctx.params.score || 0;
              ctx.params = _.omit(ctx.params, ['id']);
              return ctx;
            }
          ]
        }
      },
      events: {
        "app.seed": onAppSeed.bind(this)
      }
    });
  }

}
module.exports = LeagueService;
