#!/usr/bin/env node
const swaggerJsDoc = require("swagger-jsdoc");
const getSwaggerOptions = require('../../app/services/apiGateway/lib/getSwaggerOptions.js');

const options = getSwaggerOptions();
const doc = swaggerJsDoc(options)
console.log(JSON.stringify(doc,null,2));
