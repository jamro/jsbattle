const Service = require("moleculer").Service;
const validators = require("../validators");

class StatsService extends Service {

  constructor(broker) {
    super(broker);

    this.parseServiceSchema({
      name: "stats",
      actions: {
        "getSummary": this.getSummary,
        "getUserSummary": {
          params: {
            id: validators.entityId()
          },
          handler: this.getUserSummary
        }
      }
    });
  }

  async getUserSummary(ctx) {
    const userId = ctx.params.id;
    let account = await ctx.call('userStore.get', {id: userId});
    let scripts = await ctx.call('scriptStore.find', {
      query: {
        ownerId: userId, namespace: 'user'
      },
      fields: [
        'id',
        'scriptName',
        'createdAt',
        'modifiedAt',
        'hash'
      ]
    });
    let league = await ctx.call('league.find', {
      query: {
        ownerId: userId
      },
      fields: [
        'id',
        'scriptId',
        'scriptName',
        'joinedAt',
        'fights_total',
        'fights_win',
        'fights_lose',
        'fights_error',
        'score'
      ]
    });
    league = league.length ? league[0] : null;
    let battles = [];
    if(league) {
      battles = await ctx.call('battleStore.find', {
        query: {
          owner: {$in: [league.id]}
        },
        sort: '-createdAt',
        fields: [
          "id",
          "meta",
          "description",
          "createdAt",
          "expiresAt"
        ]
      });
    }

    let challenges = await ctx.call('challenges.find', {
      query: {
        userId,
        completed: true
      },
      fields: [
        'challengeId',
        'modifiedAt'
      ]
    })

    return {
      account,
      scripts,
      league,
      battles,
      challenges
    }
  }

  async getSummary(ctx) {
    let lastWeek = new Date().getTime() - 5*24*60*60*1000;
    let lastDay = new Date().getTime() - 24*60*60*1000;
    let lastHour = new Date().getTime() - 60*60*1000;

    return {
      users: {
        all: await ctx.call('userStore.count', {}),
        registered: await ctx.call('userStore.count', {query: {registered: true}}),
        active: await ctx.call('userStore.count', {query: {registered: true, lastLoginAt: {$gt: new Date(lastWeek)}}}),
        online: (await ctx.call('activityMonitor.listActiveSessions', {})).length
      },
      league: {
        size: await ctx.call('league.count', {}),
        entriesPerDay: await ctx.call('league.count', {query: {joinedAt: {$gt: new Date(lastDay)}}}),
        battlesPerHour: await ctx.call('battleStore.count', {query: {createdAt: {$gt: new Date(lastHour)}}}),
        battlesStored: await ctx.call('battleStore.count', {})
      },
      scriptCount: await ctx.call('scriptStore.count', {}),
      nodes: (await ctx.call('node.getInfo', {})).nodeCount,
      challenges: {
        'challenge-8UCUaNvC': await ctx.call('challenges.count', {query:{challengeId: 'challenge-8UCUaNvC', completed: true}}),
        'challenge-Du7tyrCB': await ctx.call('challenges.count', {query:{challengeId: 'challenge-Du7tyrCB', completed: true}}),
        'challenge-4syTf6ph': await ctx.call('challenges.count', {query:{challengeId: 'challenge-4syTf6ph', completed: true}}),
        'challenge-hXMwLdZw': await ctx.call('challenges.count', {query:{challengeId: 'challenge-hXMwLdZw', completed: true}}),
        'challenge-tV3fKHBw': await ctx.call('challenges.count', {query:{challengeId: 'challenge-tV3fKHBw', completed: true}}),
        'challenge-6iZxC1FP': await ctx.call('challenges.count', {query:{challengeId: 'challenge-6iZxC1FP', completed: true}})
      }
    }
  }


}

module.exports = StatsService;
