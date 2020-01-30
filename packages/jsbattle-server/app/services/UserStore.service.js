const Service = require("moleculer").Service;
const DbService = require("moleculer-db");
const { ValidationError } = require("moleculer").Errors;
const _ = require('lodash');
const getDbAdapterConfig = require("../lib/getDbAdapterConfig.js");

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
          "role",
          "createdAt",
          "lastLoginAt"
        ],
        entityValidator: {
          extUserId: "string",
          username: "string",
          displayName: "string",
          email: "string",
          provider: "string",
          role: "string",
          createdAt: "date",
          lastLoginAt: "date"
        }
      },
      actions: {
        findOrCreate: this.findOrCreate
      },
      hooks: {
        before: {
          create: [
            function addDefaults(ctx) {
              ctx.params.createdAt = new Date();
              ctx.params.lastLoginAt = new Date();
              ctx.params.username = ctx.params.username || ctx.params.email.replace(/@.*$/, '').toLowerCase() || ctx.params.displayName.replace(' ', '').toLowerCase()
              ctx.params.displayName = ctx.params.displayName || ctx.params.username;
              ctx.params.role = ctx.params.role || 'user';
              ctx.params = _.omit(ctx.params, ['id']);
              return ctx;
            }
          ],
          update: [
            function omitReadOnly(ctx) {
              ctx.params = _.omit(ctx.params, ['createdAt']);
              return ctx;
            }
          ]
        }
      }
    });
  }

  async findOrCreate(ctx) {
    let user = ctx.params.user;
    if(!user) {
      throw new ValidationError('user parameter is required', 400);
    }
    if(!user.extUserId) {
      throw new ValidationError('user.extUserId parameter is required', 400);
    }
    if(!user.username && !user.email && !user.displayName) {
      throw new ValidationError('user.usernamem, user.email or user.displayName parameter is required', 400);
    }
    if(!user.provider) {
      throw new ValidationError('user.provider parameter is required', 400);
    }

    let response;
    response = await ctx.call('userStore.find', {query: {
      extUserId: user.extUserId
    }});

    if(response.length > 0) {
      return response[0];
    }
    let admins = ctx.broker.serviceConfig.auth.admins;
    let role = 'user';
    admins = admins.find((admin) => admin.provider == user.provider && admin.username == user.username);

    if(admins) {
      role = 'admin';
    }
    let userModel = {
      extUserId: user.extUserId,
      username: user.username,
      provider: user.provider,
      email: user.email || '',
      displayName: user.displayName || user.username,
      createdAt: new Date(),
      role: role,
      lastLoginAt: new Date()
    }
    response = await ctx.call('userStore.create', userModel);
    return response;
  }
}

module.exports = UserStoreService;
