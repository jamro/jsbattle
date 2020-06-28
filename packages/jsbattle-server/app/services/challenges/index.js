const Service = require("moleculer").Service;
const DbService = require("moleculer-db");
const _ = require('lodash');
const getDbAdapterConfig = require("../../lib/getDbAdapterConfig.js");
const validators = require("../../validators");
const listUserChallenges = require('./actions/listUserChallenges.js');
const getUserChallenge = require('./actions/getUserChallenge.js');
const updateUserChallenge = require('./actions/updateUserChallenge.js');

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
        listUserChallenges: listUserChallenges.bind(this),
        getUserChallenge: {
          params: {
            challengeId: validators.entityId()
          },
          handler: getUserChallenge.bind(this)
        },
        updateUserChallenge: {
          params: {
            challengeId: validators.entityId(),
            completed: { type: "boolean", optional: true},
            code: validators.code({optional: true})
          },
          handler: updateUserChallenge.bind(this)
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

}

module.exports = ChallengeService;
