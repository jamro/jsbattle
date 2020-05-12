const Service = require("moleculer").Service;
const DbService = require("moleculer-db");
const { ValidationError } = require("moleculer").Errors;
const _ = require('lodash');
const getDbAdapterConfig = require("../lib/getDbAdapterConfig.js");
const fs = require('fs');
const path = require('path');
const selectOpponents = require('./league/selectOpponents.js');
const updateScores = require('./league/updateScores.js');

class LeagueService extends Service {

  constructor(broker) {
    super(broker);
    this.config = broker.serviceConfig.league;
    this.queueLimit = broker.serviceConfig.ubdPlayer.queueLimit;
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
          "code"
        ]
      },
      entityValidator: {
        joinedAt: "date",
        ownerId: "string",
        ownerName: { type: "string", min: 1, max: 255 },
        scriptId: "string",
        scriptName: { type: "string", min: 1, max: 255 },
        fights_total: "number",
        fights_win: "number",
        fights_lose: "number",
        fights_error: "number",
        score: "number",
        code: { type: "string", min: 0, max: 65536 },
      },
      dependencies: [
        'scriptStore',
        'ubdPlayer'
      ],
      actions: {
        scheduleBattle: this.scheduleBattle,
        seedLeague: this.seedLeague,
        getUserSubmission: this.getUserSubmission,
        joinLeague: this.joinLeague,
        leaveLeague: this.leaveLeague,
        getLeagueSummary: this.getLeagueSummary
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
              ctx.params.score = 1000;
              ctx.params = _.omit(ctx.params, ['id']);
              return ctx;
            }
          ]
        }
      },
      events: {
        "app.seed": async (ctx) => {
          await ctx.call('league.seedLeague', {})
        },
        "ubdPlayer.battle.league": async (ctx) => {
          if(ctx.params.error) {
            this.logger.warn('Battle failed between: ' + Object.keys(ctx.params.refData).join(' and '));
            return;
          }
          await updateScores(ctx, this.logger);
        }
      },
      started: () => {
        this.loop = setInterval(async () => {
          try {
            let queueLength = await broker.call('ubdPlayer.getQueueLength', {});
            if(queueLength >= this.queueLimit) {
              return;
            }
            await broker.call('league.scheduleBattle', {})
          } catch(err) {
            this.logger.warn(err)
          }
        }, this.config.scheduleInterval)
      },
      stopped: () => {
        clearInterval(this.loop)
      }
    });
  }

  async scheduleBattle(ctx) {
    // pick random opponents
    let opponents = await selectOpponents(ctx);

    // build UBD
    let ubd = {
      version: 3,
      rngSeed: Math.random(),
      teamMode: true,
      timeLimit: this.config.timeLimit,
      aiList: []
    };

    let i;
    for(i=0; i < this.config.teamSize; i++) {
      for(let opponent of opponents) {
        ubd.aiList.push({
          name: opponent.ownerName === 'jsbattle' ? opponent.scriptName : opponent.ownerName,
          team: opponent.ownerName + '/' + opponent.scriptName,
          code: opponent.code,
          initData: null,
          useSandbox: true,
          executionLimit: 100
        });
      }
    }

    this.logger.debug(`Scheduling battle ${opponents[0].scriptName} vs ${opponents[1].scriptName}`)

    try {
      let refData = {};
      refData[opponents[0].ownerName + '/' + opponents[0].scriptName] = opponents[0].id;
      refData[opponents[1].ownerName + '/' + opponents[1].scriptName] = opponents[1].id;
      await ctx.call('ubdPlayer.scheduleBattle', {
        ubd: ubd,
        event: 'league',
        refData: refData
      });
    } catch(err) {
      this.logger.debug('Unable to schedule battle due to: ' + err.message)
    }

  }

  async seedLeague(ctx) {
    const seedPath = path.resolve(__dirname, 'league', 'seed');
    const seedFiles = fs.readdirSync(seedPath)
      .map((filename, index) => ({
        ownerId: 'int-user-0000-1',
        ownerName: 'jsbattle',
        scriptId: 'int-script-0000-' + (index+1),
        scriptName: filename.replace(/\.tank$/, ''),
        code: fs.readFileSync(path.resolve(seedPath, filename), 'utf8')
      }))
      .map((entry) => new Promise(async (resolve) => {
        let existingEntry = await ctx.call('league.find', {
          query: {
            ownerName: 'jsbattle',
            scriptName: entry.scriptName,
          }
        });
        if(existingEntry.length == 0) {
          await ctx.call('league.create', entry);
        }
        resolve();
      }));

    await Promise.all(seedFiles);
  }

  async getUserSubmission(ctx) {
    const userId = ctx.meta.user ? ctx.meta.user.id : null;
    if(!userId) {
      throw new ValidationError('Not Authorized!', 401);
    }

    let response = await ctx.call('league.find', {
      query: {
        ownerId: userId
      },
      limit: 1
    });

    if(response.length === 0) {
      return {}
    }
    return response[0]
  }

  async joinLeague(ctx) {
    const userId = ctx.meta.user ? ctx.meta.user.id : null;
    if(!userId) {
      throw new ValidationError('Not Authorized!', 401);
    }

    let script = await ctx.call('scriptStore.getUserScript', { id: ctx.params.scriptId });
    if(script.ownerId != userId) {
      throw new ValidationError('Not Authorized!', 401);
    }

    await this.leaveLeague(ctx);

    await ctx.call('league.create', {
      ownerId: script.ownerId,
      ownerName: script.ownerName,
      scriptId: script.id,
      scriptName: script.scriptName,
      code: script.code
    });

    return this.getLeagueSummary(ctx);
  }

  async leaveLeague(ctx) {
    const userId = ctx.meta.user ? ctx.meta.user.id : null;
    if(!userId) {
      throw new ValidationError('Not Authorized!', 401);
    }

    let submissions = await ctx.call('league.find', {
      query: {
        ownerId: userId
      }
    });

    let removals = submissions.map((submission) => ctx.call('league.remove', {
        id: submission.id
    }));

    await Promise.all(removals);

    return this.getLeagueSummary(ctx);
  }

  async getLeagueSummary(ctx) {
    const userId = ctx.meta.user ? ctx.meta.user.id : null;
    if(!userId) {
      throw new ValidationError('Not Authorized!', 401);
    }

    let ranktable = await ctx.call('league.find', {
      sort: '-score'
    });
    const fields = [
      "ownerId",
      "ownerName",
      "scriptId",
      "scriptName",
      "joinedAt",
      "fights_total",
      "fights_win",
      "fights_lose",
      "fights_error",
      "score"
    ]
    ranktable = ranktable.map((item) => _.pick(item, fields));

    let submission = await this.getUserSubmission(ctx)
    submission = _.pick(submission, fields);

    return {
      submission,
      ranktable
    }
  }

}

module.exports = LeagueService;
