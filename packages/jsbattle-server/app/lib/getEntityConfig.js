const path = require('path')

let transforms = [];
transforms.push({
  match: (s) => s.type == 'string' && s.format == 'date-time',
  exec: () => ({
    type: 'date',
    convert: true
  })
});
transforms.push({
  match: (s) => s.type == 'boolean',
  exec: () => ({ type: 'boolean'})
});
transforms.push({
  match: (s) => s.type == 'number',
  exec: (s) => {
    let result = { type: 'number'};
    if(s.maximum !== undefined) {
      result.max = s.maximum;
    }
    if(s.minimum !== undefined) {
      result.min = s.minimum;
    }
    return result;
  }
});
transforms.push({
  match: (s) => s.type == 'string',
  exec: (s) => {
    let result = { type: 'string'};
    if(s.maxLength !== undefined) {
      result.max = s.maxLength;
    }
    if(s.minLength !== undefined) {
      result.min = s.minLength;
    }
    if(s.pattern !== undefined) {
      result.pattern = new RegExp(s.pattern);
    }
    return result;
  }
});


function loadSchema(name) {
  let data = require(path.resolve(__dirname, '..', 'entities', name + '.js'));
  return data.schema;
}

function translateSchema(fieldSchema) {
  if(fieldSchema.$ref) {
    let entityName = fieldSchema.$ref.split('/').pop();
    return translateSchema(loadSchema(entityName));
  }
  for(let transform of transforms) {
    if(transform.match(fieldSchema)) {
      return transform.exec(fieldSchema)
    }
  }
  return {type: 'any'};
}


module.exports = function(entityName) {
  let result = {};
  let schema = loadSchema(entityName);
  result.idField = 'id';
  result.fields = Object.keys(schema.properties)
  result.entityValidator = {};
  let required = schema.required || [];
  for(let field of result.fields) {
    result.entityValidator[field] = translateSchema(schema.properties[field]);
    if(required.indexOf(field) == -1) {
      result.entityValidator[field].optional = true;
    }
  }
  return result
}
