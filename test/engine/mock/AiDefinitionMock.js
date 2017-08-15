var sinon = require('sinon');

module.exports = class AiDefinitionMock {

  constructor(name) {
    this.name = name ? name : "ai_" + Math.round(Math.random()*1000000);
    this.teamName = "team_" + Math.round(Math.random()*1000000);
    this.executionLimit = 1000;
    this.useSandbox = true;
    this.code = "";
    this.initData = null;
  }

};
