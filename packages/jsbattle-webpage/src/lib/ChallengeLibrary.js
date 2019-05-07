import AiRepository from "./AiRepository.js";
import BattleSet from "./BattleSet.js";

class ChallengeDefinition {
  constructor(initData, aiRepository) {
    this.id = initData.id || 0;
    this.level = initData.level || 0;
    this.description = initData.description || "";
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
        description: 'Let\'s get started. It should be a piece of cake. Your enemy is in front of you, the gun is pointed at him. All you need to do is to pull the trigger and fire! \n\nNo idea where to start? Read [the docs](./docs/manual/ai_script.html).',
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
        id: 'challenge-Du7tyrCB',
        level: 2,
        name: 'Look right',
        description: 'You know how to shoot, right? Now it\'s time to move a little bit. Your enemy is located on the southern-east. Point your gun at that direction, then... you know what to do next :) Notice that your tank is slightly rotated what needs to be taken into account during aiming. \n\nNeed more help? You\'ll find it in [the docs](./docs/manual/algorithms_aiming.html).',
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
        level: 3,
        name: 'Scan me',
        description: 'There is usually no static targets at predefined positions in the battlefield. In this case, your target will be located at a random spot. Your job is to use the radar attached to your tank, locate the enemy and eliminate it. \n\nAs always, more guidelines in [the docs](./docs/manual/algorithms_aiming.html).',
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
        level: 4,
        name: 'Dummy Duel',
        description: 'Time for the first duel! The opponent is not difficult - it will stand still and wait for you. You just need to find and destroy it. Remember that the radar has limited range so you need to move around the battlefield a little bit. \n\nIf you need the manual, it is available [here](./docs/manual/README.html)',
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
        level: 5,
        name: 'Crawler Duel',
        description: 'Things get a little bit more complicated. Your opponent drives around and will shoot you when there is a good chance. \n\nIf you need the manual, it is available [here](./docs/manual/README.html)',
        tankList: ['crawler'],
        rngSeed: 0.38835849114718024
      }, this._aiRepository),
      new ChallengeDefinition({
        id: 'challenge-y87hO9aT',
        level: 6,
        name: 'Crazy Duel',
        description: 'That guy got crazy and shoot around in all directions. It should not be hard to take him down. \n\nIf you need the manual, it is available [here](./docs/manual/README.html)',
        tankList: ['crazy'],
        rngSeed: 0.6793472503409135
      }, this._aiRepository),
      new ChallengeDefinition({
        id: 'challenge-pFmJhcrV',
        level: 7,
        name: 'Chicken Duel',
        description: 'This coward tries to hide in a corner and shoot from the safe spot. Put that camper in his place. \n\nIf you need the manual, it is available [here](./docs/manual/README.html)',
        tankList: ['chicken'],
        rngSeed: 0.8940944190401741
      }, this._aiRepository),
      new ChallengeDefinition({
        id: 'challenge-aSdf9xP',
        level: 8,
        name: 'Sniper Duel',
        description: 'The sniper is not mobile, but when you are in the range of his gun, he will track you quickly. \n\nIf you need the manual, it is available [here](./docs/manual/README.html)',
        tankList: ['sniper'],
        rngSeed: 0.9972155038002273
      }, this._aiRepository),
      new ChallengeDefinition({
        id: 'challenge-M1nsn8s3',
        level: 9,
        name: 'Kamikaze Duel',
        description: 'Nothing will stop Kamikaze to take you down. Even if it means significant damage to himself. Try to keep him at distance. \n\nIf you need the manual, it is available [here](./docs/manual/README.html)',
        tankList: ['kamikaze'],
        rngSeed: 0.7613653519041235
      }, this._aiRepository),
      new ChallengeDefinition({
        id: 'challenge-i8s2UnS9',
        level: 10,
        name: 'Dodge Duel',
        description: 'It\'s hard to take that guy down since he is avoiding bullets at all cost. Do you accept that challenge? \n\nIf you need the manual, it is available [here](./docs/manual/README.html)',
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

  unlockAll() {
    this._challengeList.forEach((el) => this.completeChallenge(el.id));
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
