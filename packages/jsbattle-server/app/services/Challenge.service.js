const Service = require("moleculer").Service;
const DbService = require("moleculer-db");
const { ValidationError } = require("moleculer").Errors;
const _ = require('lodash');
const getDbAdapterConfig = require("../lib/getDbAdapterConfig.js");
const validators = require("../validators");

class ChallengeService extends Service {

  constructor(broker) {
    super(broker);
    let adapterConfig = getDbAdapterConfig(broker.serviceConfig.data, 'challenge')

    this.parseServiceSchema({
      ...adapterConfig,
      name: "challenges",
      mixins: [DbService],
      settings: {
        idField: 'id',
        fields: [
          "id",
          "challengeId",
          "userId",
          "code",
          "completed",
          "modifiedAt"
        ],
        entityValidator: {
          id: validators.entityId({optional: true}),
          userId: validators.entityId(),
          challengeId: validators.entityId(),
          completed: { type: "boolean" },
          code: validators.code(),
          modifiedAt: validators.modifyDate()
        }
      },
      actions: {
        listUserChallanges: this.listUserChallanges,
        getUserChallange: {
          params: {
            challengeId: validators.entityId()
          },
          handler: this.getUserChallange
        },
        updateUserChallange: {
          params: {
            challengeId: validators.entityId(),
            completed: { type: "boolean", optional: true},
            code: validators.code({optional: true})
          },
          handler: this.updateUserChallange
        },
      },
      hooks: {
        before: {
          create: [
            function addDefaults(ctx) {
              const userId = ctx.meta.user ? ctx.meta.user.id : '';
              ctx.params.userId = ctx.params.userId || userId;
              ctx.params.completed = false;
              ctx.params.code = "importScripts('lib/tank.js');\n\n// Don't know where to start?\n// Read Getting Started in \"Docs\" section \n\ntank.init(function(settings, info) {\n\t// initialize tank here\n  \n});\n\ntank.loop(function(state, control) {\n\t// write your tank logic here\n  \n});\n\n\n";
              ctx.params.modifiedAt = new Date();
              ctx.params = _.omit(ctx.params, ['id']);
              return ctx;
            }
          ],
          update: [
            function omitReadOnly(ctx) {
              ctx.params = _.omit(ctx.params, ['userId']);
              return ctx;
            }
          ]
        }
      }
    });
  }

  async listUserChallanges(ctx) {
    const userId = ctx.meta.user ? ctx.meta.user.id : null;
    if(!userId) {
      throw new ValidationError('Not Authorized!', 401);
    }
    let result = await ctx.call('challenges.list', {
      query: {
        userId: userId
      },
      fields: [
        "challengeId",
        "completed"
      ]
    });
    return result.rows;
  }

  async getUserChallange(ctx) {
    const userId = ctx.meta.user ? ctx.meta.user.id : null;
    if(!userId) {
      throw new ValidationError('Not Authorized!', 401);
    }
    let user = await ctx.call('userStore.get', { id: userId });
    if(!user.registered) {
      throw new ValidationError('You must finish registration process to perform that action', 401);
    }
    const challengeId = ctx.params.challengeId
    let response = await ctx.call('challenges.find', {query: {
      userId: userId,
      challengeId: challengeId
    }});
    if(response.length > 0) {
      return response[0];
    }
    return ctx.call('challenges.create', {
      userId: userId,
      challengeId: challengeId
    });
  }

  async updateUserChallange(ctx) {
    const userId = ctx.meta.user ? ctx.meta.user.id : null;
    if(!userId) {
      throw new ValidationError('Not Authorized!', 401);
    }
    let user = await ctx.call('userStore.get', { id: userId });
    if(!user.registered) {
      throw new ValidationError('You must finish registration process to perform that action', 401);
    }
    const challengeId = ctx.params.challengeId
    let response = await ctx.call('challenges.find', {query: {
      userId: userId,
      challengeId: challengeId
    }});
    let challenge;
    if(response.length > 0) {
      challenge = response[0]
    } else {
      challenge = await ctx.call('challenges.create', {
        userId: userId,
        challengeId: challengeId
      });
    }

    let updateData = {
      id: challenge.id,
      modifiedAt: new Date()
    }
    if(ctx.params.code !== undefined) {
      updateData.code = ctx.params.code;
    }
    if(ctx.params.completed !== undefined) {
      updateData.completed = ctx.params.completed;
    }

    return ctx.call('challenges.update', updateData);

  }

}

module.exports = ChallengeService;
