import AiRepository from "./AiRepository.js";
import BattleSet from "./BattleSet.js";

class ChallengeDefinition {
  constructor(initData, aiRepository) {
    this.id = initData.id || 0;
    this.level = initData.level || 0;
    this.name = initData.name || "";
    this._rngSeed = initData.rngSeed || Math.random();
    this.isCompleted = false;
    this._aiRepository = aiRepository;
    this._battleSet = new BattleSet();
    this._battleSet.addTank(this.id, 1, true);
    this._battleSet.setTankDisplayName(this.id, "Player");
    this._modifier = initData.modifier || function() {};
    let tankList = initData.tankList || [];
    tankList.forEach((tank) => {
      this._battleSet.addTank(tank, 1, false);
    });
  }

  getRngSeed() {
    return this._rngSeed;
  }

  getTeamMode() {
    return false;
  }

  getBattleSet() {
    return this._battleSet;
  }

  getAiDefList() {
    return this._battleSet.getAiDefList(this._aiRepository);
  }


  getModifier() {
    return this._modifier;
  }
}


export default class ChallengeLibrary {

  constructor(stateless) {
    this._aiRepository = new AiRepository(stateless, 'challengeLibrary.scriptMap');

    this._challengeList = [
      new ChallengeDefinition({
        id: 'challenge-8UCUaNvC',
        level: 1,
        name: 'Shoot me',
        tankList: ['dummy'],
        rngSeed: 0.98287429583523,
        modifier: (simulation) => {
          simulation.tankList.forEach((tank) => {
            let x, y;
            switch(tank.name.toLowerCase()) {
              case "player":
                x = (simulation.battlefield.minX + simulation.battlefield.maxX)/2-150;
                y = (simulation.battlefield.minY + simulation.battlefield.maxY)/2;
                tank.moveTo(x, y, 0);
                break;
              case "dummy":
                x = (simulation.battlefield.minX + simulation.battlefield.maxX)/2+150;
                y = (simulation.battlefield.minY + simulation.battlefield.maxY)/2;
                tank.moveTo(x, y, 180);
                break;
              default:
                console.log(tank.name);
            }
          });
        }
      }, this._aiRepository),
      new ChallengeDefinition({
        id: 'challenge-aTNm3rf4',
        level: 2,
        name: 'Look right',
        tankList: ['dummy'],
        rngSeed: 0.7958237450923,
        modifier: (simulation) => {
          simulation.tankList.forEach((tank) => {
            let x, y;
            switch(tank.name.toLowerCase()) {
              case "player":
                x = (simulation.battlefield.minX + simulation.battlefield.maxX)/2-100;
                y = (simulation.battlefield.minY + simulation.battlefield.maxY)/2-100;
                tank.moveTo(x, y, 0);
                break;
              case "dummy":
                x = (simulation.battlefield.minX + simulation.battlefield.maxX)/2+100;
                y = (simulation.battlefield.minY + simulation.battlefield.maxY)/2+100;
                tank.moveTo(x, y, 45);
                break;
              default:
                console.log(tank.name);
            }
          });
        }
      }, this._aiRepository),
      new ChallengeDefinition({
        id: 'challenge-Du7tyrCB',
        level: 3,
        name: 'Look right 2',
        tankList: ['dummy'],
        rngSeed: 0.2590328450293485,
        modifier: (simulation) => {
          simulation.tankList.forEach((tank) => {
            let x, y;
            switch(tank.name.toLowerCase()) {
              case "player":
                x = (simulation.battlefield.minX + simulation.battlefield.maxX)/2-100;
                y = (simulation.battlefield.minY + simulation.battlefield.maxY)/2-100;
                tank.moveTo(x, y, 180 + 180*Math.random());
                break;
              case "dummy":
                x = (simulation.battlefield.minX + simulation.battlefield.maxX)/2+100;
                y = (simulation.battlefield.minY + simulation.battlefield.maxY)/2+100;
                tank.moveTo(x, y, 45);
                break;
              default:
                console.log(tank.name);
            }
          });
        }
      }, this._aiRepository),
      new ChallengeDefinition({
        id: 'challenge-4syTf6ph',
        level: 4,
        name: 'Scan me',
        tankList: ['dummy'],
        rngSeed: 0.430984523409582730,
        modifier: (simulation) => {
          simulation.tankList.forEach((tank) => {
            let x, y, a;
            switch(tank.name.toLowerCase()) {
              case "player":
                x = (simulation.battlefield.minX + simulation.battlefield.maxX)/2;
                y = (simulation.battlefield.minY + simulation.battlefield.maxY)/2;
                tank.moveTo(x, y, 0);
                break;
              case "dummy":
                a = Math.random()*2*Math.PI;
                x = (simulation.battlefield.minX + simulation.battlefield.maxX)/2+200*Math.cos(a);
                y = (simulation.battlefield.minY + simulation.battlefield.maxY)/2+200*Math.sin(a);
                tank.moveTo(x, y, a*180/Math.PI+180);
                break;
              default:
                console.log(tank.name);
            }
          });
        }
      }, this._aiRepository),
      new ChallengeDefinition({
        id: 'challenge-kjFrZAUe',
        level: 5,
        name: 'Dummy Duel',
        tankList: ['dummy'],
        rngSeed: 0.34408169134692157,
        modifier: (simulation) => {
          simulation.tankList.forEach((tank) => {
            let x, y;
            switch(tank.name.toLowerCase()) {
              case "player":
                x = simulation.battlefield.minX + Math.random()*250+50;
                y = simulation.battlefield.minY + Math.random()*250+50;
                tank.moveTo(x, y, 360*Math.random());
                break;
              case "dummy":
                x = simulation.battlefield.maxX - Math.random()*250 - 50;
                y = simulation.battlefield.maxY - Math.random()*250 - 50;
                tank.moveTo(x, y, 360*Math.random());
                break;
              default:
                console.log(tank.name);
            }
          });
        }
      }, this._aiRepository),
      new ChallengeDefinition({
        id: 'challenge-My6Lj5RF',
        level: 6,
        name: 'Crawler Duel',
        tankList: ['crawler'],
        rngSeed: 0.38835849114718024
      }, this._aiRepository),
      new ChallengeDefinition({
        id: 'challenge-y87hO9aT',
        level: 7,
        name: 'Crazy Duel',
        tankList: ['crazy'],
        rngSeed: 0.6793472503409135
      }, this._aiRepository),
      new ChallengeDefinition({
        id: 'challenge-pFmJhcrV',
        level: 8,
        name: 'Chicken Duel',
        tankList: ['chicken'],
        rngSeed: 0.8940944190401741
      }, this._aiRepository),
      new ChallengeDefinition({
        id: 'challenge-aSdf9xP',
        level: 9,
        name: 'Sniper Duel',
        tankList: ['sniper'],
        rngSeed: 0.9972155038002273
      }, this._aiRepository),
      new ChallengeDefinition({
        id: 'challenge-M1nsn8s3',
        level: 10,
        name: 'Kamikaze Duel',
        tankList: ['kamikaze'],
        rngSeed: 0.7613653519041235
      }, this._aiRepository),
      new ChallengeDefinition({
        id: 'challenge-i8s2UnS9',
        level: 11,
        name: 'Dodge Duel',
        tankList: ['dodge'],
        rngSeed: 0.5448669137930873
      }, this._aiRepository)
    ];

    this._completedChallenges = [];
  }

  getAll() {
    return JSON.parse(JSON.stringify(this._challengeList));
  }

  updateScript(challengeId, code) {
    this._aiRepository.updateScript(challengeId, code);
  }

  getChallenge(id) {
    return this._challengeList.filter((c) => c.id == id)[0];
  }

  completeChallenge(id) {
    this._completedChallenges.push(id);
    this._challengeList
      .filter((item) => item.id == id)
      .forEach((item) => item.isCompleted = true);
  }

  getCompletedChallenges() {
    return this._completedChallenges;
  }

  getCode(challengeId) {
    let exists = this._aiRepository.existsScript(challengeId);
    if(!exists) {
      this._aiRepository.createScript(challengeId);
    }
    return this._aiRepository.getScript(challengeId).code;
  }

}
