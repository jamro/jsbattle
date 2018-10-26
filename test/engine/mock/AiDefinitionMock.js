import sinon from "sinon";

export default class AiDefinitionMock {

  constructor(name) {
    this.name = name ? name : "ai_" + Math.round(Math.random()*1000000);
    this.teamName = "team_" + Math.round(Math.random()*1000000);
    this.executionLimit = 1000;
    this.useSandbox = true;
    this.code = "";
    this.initData = null;

    this.toJSON = sinon.stub().returns({
      name: "AiNameMock",
      code: null,
      team: "abc",
      initData: null,
      useSandbox: true,
      executionLimit: 100
    });
    this.fromJSON = sinon.spy();
    this.clone = sinon.spy();
  }

};
