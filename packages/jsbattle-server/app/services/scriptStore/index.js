const Service = require("moleculer").Service;
const DbService = require("moleculer-db");
const _ = require('lodash');
const getDbAdapterConfig = require("../../lib/getDbAdapterConfig.js");
const validators = require("../../validators");
const crypto = require("crypto");
const listUserScripts = require('./actions/listUserScripts.js');
const createUserScript = require('./actions/createUserScript.js');
const updateUserScript = require('./actions/updateUserScript.js');
const getUserScript = require('./actions/getUserScript.js');
const deleteUserScript = require('./actions/deleteUserScript.js');

class ScriptStoreService extends Service {

  constructor(broker) {
    super(broker);
    let adapterConfig = getDbAdapterConfig(broker.serviceConfig.data, 'scriptStore')
    this.parseServiceSchema({
      ...adapterConfig,
      name: "scriptStore",
      mixins: [DbService],
      settings: {
        idField: 'id',
        fields: [
          "id",
          "ownerId",
          "ownerName",
          "scriptName",
          "namespace",
          "code",
          "createdAt",
          "modifiedAt",
          "hash",
        ],
        entityValidator: {
          ownerId: validators.entityId(),
          ownerName: validators.entityName(),
          scriptName: validators.entityName(),
          code: validators.code(),
          namespace: validators.entityName(),
          createdAt: validators.createDate(),
          modifiedAt: validators.modifyDate(),
          hash: validators.hash({optional: true})
        }
      },
      actions: {
        listUserScripts: listUserScripts.bind(this),
        createUserScript: {
          params: {
            scriptName: validators.entityName({optional: true}),
            code: validators.code({optional: true})
          },
          handler: createUserScript.bind(this)
        },
        updateUserScript: {
          params: {
            id: validators.entityId(),
            scriptName: validators.entityName({optional: true}),
            code: validators.code({optional: true})
          },
          handler: updateUserScript.bind(this)
        },
        getUserScript: {
          params: {
            id: validators.entityId()
          },
          handler: getUserScript.bind(this)
        },
        deleteUserScript: {
          params: {
            id: validators.entityId()
          },
          handler: deleteUserScript.bind(this)
        }
      },
      hooks: {
        before: {
          create: [
            function addDefaults(ctx) {
              const userId = ctx.meta.user ? ctx.meta.user.id : '';
              const username = ctx.meta.user ? ctx.meta.user.username : '';
              ctx.params.ownerId = ctx.params.ownerId || userId;
              ctx.params.ownerName = ctx.params.ownerName || username;
              ctx.params.namespace = ctx.params.namespace || 'none';
              ctx.params.code = ctx.params.code || '';
              ctx.params.createdAt = new Date();
              ctx.params.modifiedAt = new Date();
              ctx.params.hash = crypto.createHash('md5').update(ctx.params.code).digest("hex");
              ctx.params = _.omit(ctx.params, ['id']);
              return ctx;
            }
          ],
          update: [
            function omitReadOnly(ctx) {
              ctx.params = _.omit(ctx.params, [
                'createdAt',
                'ownerName',
                'ownerId'
              ]);
              if(ctx.params.code !== undefined) {
                ctx.params.hash = crypto.createHash('md5').update(ctx.params.code).digest("hex");
              }
              return ctx;
            }
          ]
        }
      }
    });
  }
}

module.exports = ScriptStoreService;
