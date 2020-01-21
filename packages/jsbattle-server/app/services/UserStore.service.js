const Service = require("moleculer").Service;
const DbService = require("moleculer-db");
const path = require("path");
const { ValidationError } = require("moleculer").Errors;
const MemoryAdapter = DbService.MemoryAdapter;

class UserStoreService extends Service {

  constructor(broker) {
    super(broker);

    let dbAdapter;
    if(broker.serviceConfig.data && broker.serviceConfig.data.path) {
      dbAdapter = new MemoryAdapter({filename: path.join(broker.serviceConfig.data.path, 'userStore.db')});
    } else {
      dbAdapter = new MemoryAdapter();
    }

    this.parseServiceSchema({
      name: "userStore",
      mixins: [DbService],
      adapter: dbAdapter,
      settings: {
        idField: 'userId',
        fields: [
          "userId",
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
    if(!user.username) {
      throw new ValidationError('user.username parameter is required', 400);
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
