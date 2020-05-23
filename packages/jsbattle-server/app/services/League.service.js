const Service = require("moleculer").Service;
const DbService = require("moleculer-db");
const { ValidationError } = require("moleculer").Errors;
const _ = require('lodash');
const getDbAdapterConfig = require("../lib/getDbAdapterConfig.js");
const fs = require('fs');
const path = require('path');
const RankTable = require('./league/RankTable.js');

class LeagueService extends Service {

  constructor(broker) {
    super(broker);
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
      dependencies: ['scriptStore'],
      actions: {
        pickRandomOpponents: this.pickRandomOpponents,
        seedLeague: this.seedLeague,
        getUserSubmission: this.getUserSubmission,
        joinLeague: this.joinLeague,
        leaveLeague: this.leaveLeague,
        getLeagueSummary: this.getLeagueSummary,
        updateRank: this.updateRank
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

          this.logger.info('Initializing Rank able');
          let initData = await ctx.call('league.find', {
            sort: '-score',
            fields: [
              "id",
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
          });
          this.ranktable.init(initData);
          this.logger.info('Rank Table initialized');
        }
      }
    });
  }

  async updateRank(ctx) {
    if(!ctx || !ctx.params || !ctx.params.results) {
      throw new ValidationError('results parameter is required!');
    }

    let updateCalls = ctx.params.results.map((entity) => ctx.call('league.update', {
      id: entity.id,
      fights_total: entity.fights_total,
      fights_win: entity.fights_win,
      fights_lose: entity.fights_lose,
      score: entity.score,
    }));
    updateCalls = updateCalls.map((callback) => new Promise(async (resolve) => {
      try {
        await callback;
      } catch (err) {
        this.logger.warn('unable to update league entry. Entry not found')
      }
      resolve();
    }));
    await Promise.all(updateCalls);

    ctx.params.results.forEach((entity) => this.ranktable.updateScore(
      entity.id,
      entity.score,
      entity.fights_total,
      entity.fights_win,
      entity.fights_lose
    ));

  }

  async pickRandomOpponents(ctx) {
    let opponents = this.ranktable.pickRandom();

    let opponent1 = await ctx.call('league.get', {id: opponents[0].id})
    let opponent2 = await ctx.call('league.get', {id: opponents[1].id})

    return [
      opponent1,
      opponent2
    ]
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

    const entity = await ctx.call('league.create', {
      ownerId: script.ownerId,
      ownerName: script.ownerName,
      scriptId: script.id,
      scriptName: script.scriptName,
      code: script.code
    });

    this.ranktable.add({
      id: entity.id,
      ownerId: entity.ownerId,
      ownerName: entity.ownerName,
      scriptId: entity.scriptId,
      scriptName: entity.scriptName,
      joinedAt: entity.joinedAt,
      fights_total: entity.fights_total,
      fights_win: entity.fights_win,
      fights_lose: entity.fights_lose,
      fights_error: entity.fights_error,
      score: entity.score
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

    for(let submission of submissions) {
      this.ranktable.remove(submission.id)
    }

    await Promise.all(removals);

    return this.getLeagueSummary(ctx);
  }

  async getLeagueSummary(ctx) {
    const userId = ctx.meta.user ? ctx.meta.user.id : null;
    if(!userId) {
      throw new ValidationError('Not Authorized!', 401);
    }

    const fields = [
      "id",
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
    ];

    let submission = await this.getUserSubmission(ctx)
    submission = _.pick(submission, fields);

    return {
      submission,
      ranktable: this.ranktable.slice(submission.id, 7)
    }
  }

}

module.exports = LeagueService;
