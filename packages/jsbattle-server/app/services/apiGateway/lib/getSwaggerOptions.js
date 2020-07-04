const pkgInfo = require('../../../../package.json');
const path = require('path');
const fs = require('fs');

module.exports = (authProviders) => {
  authProviders = authProviders || [];

  let entityData = fs
    .readdirSync(path.resolve(__dirname, '..', '..', '..', 'entities'))
    .map((filename) => path.resolve(__dirname, '..', '..', '..', 'entities', filename))
    .reduce((data, entityPath) => {
      let entityName = path.basename(entityPath, '.js');
      data.schemas[entityName] = require(entityPath).schema;
      let examplesInput = require(entityPath).examples;
      let examples = {};
      let names = Object.keys(examplesInput);
      for(let i of names) {
        let exampleName = i == 'default' ? entityName : entityName + "_" + i;
        examples[exampleName] = examplesInput[i];
      }
      data.examples = {
        ...data.examples,
        ...examples
      };
      return data;
    }, {schemas: {}, examples: {}});

  let securitySchemes = authProviders.reduce((def, provider) => {
      def['oauth_' + provider.name] = {
        type: "oauth2",
        description: "Login via " + provider.name,
        flows: {
          implicit: {
            authorizationUrl: '/auth/' + provider.name,
            scopes: {}
          }
        }
      }
      return def;
    }, {});
  let securitySchemaNames = Object.keys(securitySchemes);
  if(securitySchemaNames.length > 0) {
    securitySchemes.oauth_default = securitySchemes[securitySchemaNames[0]];
  }

  return {
   swaggerDefinition: {
     openapi: '3.0.3',
     info: {
       title: 'JsBattle server API',
       description: 'Internal API of JsBattle ([Swagger File](../api-docs.json))',
       version: pkgInfo.version
     },
     components: {
       securitySchemes: securitySchemes,
       schemas: entityData.schemas,
       examples: entityData.examples,
     }
   },
   apis: [path.resolve(__dirname, 'routing.js')]
 };
};
