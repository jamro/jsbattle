module.exports = class UbdJsonMock {

  constructor(version) {
    version = version === undefined ? 3 : version;

    this.version = version;
    this.rngSeed = 0.43;
    this.aiList = [
      {
        name: "alpha",
        team: "asdfrvw423",
        initData: null,
        useSandbox: true,
        code: "var a = 2;",
        executionLimit: 100
      },
      {
        name: "beta",
        team: "ncsu8a7d3",
        initData: null,
        useSandbox: true,
        code: "var a = 2;",
        executionLimit: 100
      }
    ];

    if(version >= 2) {
      this.teamMode = false;
    }
    if(version >= 3) {
      this.timeLimit = 30000;
    }
  }
};
