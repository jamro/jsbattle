const pkgInfo = require('../../../../package.json');
const path = require('path');
const fs = require('fs');

module.exports = (authProviders) => {
  authProviders = authProviders || [];
  let convertFormat = (f) => {
    let map = {
      number: {type: 'number'},
      boolean: {type: 'boolean'},
      string: {type: 'string'},
      date: {type: 'string', format: 'date-time'}
    };
    let result;
    if(map[f.type]) {
      result = map[f.type];
    } else {
      result = {type: 'string'}
    }
    if(result.type == 'string' && f.pattern) {
      result.pattern = f.pattern.toString();
    }
    if(result.type == 'string' && f.min) {
      result.minLength = f.min;
    }
    if(result.type == 'string' && f.max) {
      result.maxLength = f.max;
    }
    if(result.type == 'number' && f.min) {
      result.min = f.min;
    }
    if(result.type == 'number' && f.max) {
      result.max = f.max;
    }
    return result;
  }

  let entities = fs
    .readdirSync(path.resolve(__dirname, '..', '..'))
    .map((name) => path.resolve(__dirname, '..', '..', name, 'entity.js'))
    .filter((entityPath) => fs.existsSync(entityPath))
    .map((entityPath) => require(entityPath))
    .filter((entity) => entity.entityName)
    .reduce((result, entity) => {
      let properties = entity.fields.reduce((schema, field) => {
        let fieldFormat = { type: 'string'};
        if(entity.entityValidator && entity.entityValidator[field]) {
          fieldFormat = convertFormat(entity.entityValidator[field]);
        }
        schema[field] = fieldFormat;
        return schema;
      }, {});
      result[entity.entityName] = {
        type: "object",
        properties
      }
      return result;
    }, {});


  return {
   swaggerDefinition: {
     openapi: '3.0.3',
     info: {
       title: 'JsBattle server API',
       description: 'Internal API of JsBattle ([Swagger File](../api-docs.json))',
       version: pkgInfo.version
     },
     components: {
       securitySchemes: authProviders.reduce((def, provider) => {
           def['oauth_' + provider.name] = {
             type: "oauth2",
             flows: {
               implict: {
                 authorizationUrl: 'http://localhost:9000/auth/' + provider.name,
                 scopes: {}
               }
             }
           }
           return def;
         }, {}),
       schemas: entities
     }
   },
   apis: [path.resolve(__dirname, 'routing.js')]
 };
};
