const Service = require("moleculer").Service;
const DbService = require("moleculer-db");
const { ValidationError } = require("moleculer").Errors;
const _ = require('lodash');
const getDbAdapterConfig = require("../lib/getDbAdapterConfig.js");
const fs = require('fs');
const path = require('path');

class LeagueService extends Service {

  constructor(broker) {
    super(broker);

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
          "rank",
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
        rank: "number",
        fights_total: "number",
        fights_win: "number",
        fights_lose: "number",
        fights_error: "number",
        score: "number",
        code: { type: "string", min: 0, max: 65536 },
      },
      dependencies: ['scriptStore'],
      actions: {
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
              ctx.params.rank = 0;
              ctx.params.fights_total = 0;
              ctx.params.fights_win = 0;
              ctx.params.fights_lose = 0;
              ctx.params.fights_error = 0;
              ctx.params.score = 0;
              ctx.params = _.omit(ctx.params, ['id']);
              return ctx;
            }
          ]
        }
      },
      events: {
        "app.seed": async (ctx) => {
          await ctx.call('league.seedLeague', {})
        }
      }
    });
  }

  async seedLeague(ctx) {
    const seedPath = path.resolve(__dirname, 'league', 'seed');
    const seedFiles = fs.readdirSync(seedPath)
      .map((filename) => ({
        ownerId: 0,
        ownerName: 'jsbattle',
        scriptId: 0,
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
      sort: 'rank'
    });
    ranktable = ranktable.map((item) => _.pick(item, [
      "rank",
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
    ]));

    let submission = await this.getUserSubmission(ctx)
    submission = _.pick(submission, [
      "rank",
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
    ]);

    return {
      submission,
      ranktable
    }
  }

}

module.exports = LeagueService;
