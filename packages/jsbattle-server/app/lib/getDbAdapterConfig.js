const DbService = require("moleculer-db");
const MemoryAdapter = DbService.MemoryAdapter;
const MongoDBAdapter = require("moleculer-db-adapter-mongo");
const path = require('path')

module.exports = function(dbConfig = {}, name = 'data') {
  let adapterConfig;
  switch(dbConfig.adapter) {
    case 'nedb':
      if(dbConfig.path) {
        adapterConfig = {
          filename: path.join(dbConfig.path, name + '.db')
        };
      }
      return {
        adapter: new MemoryAdapter(adapterConfig)
      };
    case 'mongo':
      if(!dbConfig.uri) {
        throw new Error(`Mongo URI is required!`);
      }
      return {
        adapter: new MongoDBAdapter(dbConfig.uri, dbConfig.options || {}),
        collection: name
      }
    default:
      throw new Error(`DB Adapter '${dbConfig.adapter}' is not supported`);
  }
}
