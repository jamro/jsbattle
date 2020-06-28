const Service = require("moleculer").Service;
const DbService = require("moleculer-db");
const { ValidationError } = require("moleculer").Errors;
const _ = require('lodash');
const getDbAdapterConfig = require("../../lib/getDbAdapterConfig.js");
const validators = require("../../validators");
const findOrCreate = require("./actions/findOrCreate.js");
const register = require("./actions/register.js");

class UserStoreService extends Service {

  constructor(broker) {
    super(broker);
    let adapterConfig = getDbAdapterConfig(broker.serviceConfig.data, 'userStore')
    this.parseServiceSchema({
      ...adapterConfig,
      name: "userStore",
      mixins: [DbService],
      settings: {
        idField: 'id',
        fields: [
          "id",
          "username",
          "displayName",
          "provider",
          "extUserId",
          "email",
          "registered",
          "role",
          "createdAt",
          "lastLoginAt"
        ],
        entityValidator: {
          extUserId: {type: "string", min: 1, max: 1024},
          username: validators.entityName(),
          displayName: validators.userFullName({optional: true}),
          email: validators.email({optional: true}),
          registered: {type: "boolean", optional: true},
          provider: validators.entityName(),
          role: validators.entityName({optional: true}),
          createdAt: validators.createDate({optional: true}),
          lastLoginAt: validators.modifyDate({optional: true})
        }
      },
      actions: {
        findOrCreate: findOrCreate.bind(this),
        register: register.bind(this)
      },
      hooks: {
        before: {
          create: [
            function addDefaults(ctx) {
              ctx.params.registered = false;
              ctx.params.createdAt = new Date();
              ctx.params.lastLoginAt = new Date();
              ctx.params.username = ctx.params.username || ctx.params.email.replace(/@.*$/, '').toLowerCase() || ctx.params.displayName.replace(' ', '').toLowerCase() || 'anonymous';
              ctx.params.displayName = ctx.params.displayName || ctx.params.username || 'Anonymous';
              ctx.params.role = ctx.params.role || 'user';
              ctx.params = _.omit(ctx.params, ['id']);
              return ctx;
            }
          ],
          update: [
            function omitReadOnly(ctx) {
              ctx.params = _.omit(ctx.params, [
                'createdAt',
                'extUserId',
                'provider'
              ]);
              return ctx;
            }
          ]
        }
      }
    });
  }

  validateUserName(username) {
    if(!username) {
      throw new ValidationError('username parameter is required', 400);
    }
    if(username.length < 3) {
      throw new ValidationError('username must be at least 3 characters long', 400);
    }
    if(!(/^[A-Za-z0-9_.-]+$/).test(username)) {
      throw new ValidationError('username contains invalid characters', 400);
    }
    const reservedNames = [
      'jsbattle',
      'sandbox',
      'user',
      'admin'
    ];
    const isNameReserved = reservedNames.indexOf(username.toLowerCase()) != -1;
    if(isNameReserved) {
      throw new ValidationError(`username must be unique! Chose a different one.`, 400);
    }
  }

  validateDisplayName(displayName) {
    if(!displayName) {
      throw new ValidationError('displayName parameter is required', 400);
    }
    if(displayName.length < 3) {
      throw new ValidationError('displayName must be at least 3 characters long', 400);
    }
    if(!(/^[A-Za-z0-9_. -]+$/).test(displayName)) {
      throw new ValidationError('displayName contains invalid characters', 400);
    }
  }

}

module.exports = UserStoreService;
