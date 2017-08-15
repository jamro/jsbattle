var sinon = require('sinon');

module.exports = class TeamMock {

  constructor(name) {
    this.name = name ? name : "bravo_" + Math.round(Math.random()*1000000);
    this.members = [];
    this.size = 0;
  }

};
