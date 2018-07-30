class Tank {

  constructor(name) {
    this.name = name;
    this.count = 0;
    this.userCreated = false;
  }

}

export default class BattleSet {

  constructor() {
    this.data = [];
  }

  addTank(name) {
    let tank = new Tank(name);
    this.data.push(tank);
    this.sort();
    return tank;
  }

  getTankByIndex(index) {
    return this.data[index];
  }

  getTankByName(name) {
    return this.data.filter((tank) => (tank.name == name))[0];
  }

  removeTankByName(name) {
    this.data = this.data.filter((item) => {
      return item.name != name;
    });
  }

  get length() {
    return this.data.length;
  }

  getTankCount() {
    return this.data.reduce((sum, tank) => (sum + tank.count), 0);
  }

  toJSON() {
    return JSON.parse(JSON.stringify(this.data));
  }

  fromJSON(data) {
    this.data = JSON.parse(JSON.stringify(data));
    this.sort();
  }

  map(callback) {
    return this.data.map(callback);
  }

  sort() {
    function getDifficulty(tankName) {
      let difficultyMap = {};
      difficultyMap.dummy = 1;
      difficultyMap.crazy = 1;
      difficultyMap.crawler = 1;
      difficultyMap.chicken = 2;
      difficultyMap.sniper = 2;
      difficultyMap.dodge = 2;
      difficultyMap.kamikaze = 3;
      difficultyMap.jamro = 3;

      if(difficultyMap[tankName]) return difficultyMap[tankName];
      return 0;
    }

    this.data.sort((a, b) => {
      let diff = getDifficulty(a.name) - getDifficulty(b.name);
      if(diff != 0) {
        return diff;
      } else {
        return a.name.localeCompare(b.name);
      }
    });
  }

  getAiDefList(aiRepository) {
    let i, j, tank;
    let aiDefList = [];
    for(i=0; i < this.length; i++) {
      tank = this.getTankByIndex(i);
      for(j=0; j < tank.count; j++) {
        let aiDef = JsBattle.createAiDefinition();
        if(tank.userCreated) {
          aiDef.fromCode(tank.name, aiRepository.getCompiledScript(tank.name));
        } else {
          aiDef.fromFile(tank.name);
        }
        aiDefList.push(aiDef);
      }
    }
    return aiDefList;
  }
}
