import AiRepository from "./AiRepository.js";
import JsBattle from 'jsbattle-engine';

class ChallengeDefinition {
  constructor(initData) {
    this._aiDefList = [];
    this.id = initData.id || 0;
    this.level = initData.level || 0;
    this.description = initData.description || "";
    this.name = initData.name || "";
    this._rngSeed = initData.rngSeed || Math.random();
    this._timeLimit = initData.timeLimit || 30000;
    this.isCompleted = false;
    this._modifier = initData.modifier || function() {};
    let tankList = initData.tankList || [];

    tankList.forEach((tank) => {
      let aiDef = JsBattle.createAiDefinition();
      switch(tank.source) {
        case 'file':
          aiDef.fromFile(tank.name);
          break;
        case 'code':
          aiDef.fromCode(tank.name, tank.code);
          break;
      }
      this._aiDefList.push(aiDef);
    });
  }

  getRngSeed() {
    return this._rngSeed;
  }

  getTimeLimit() {
    return this._timeLimit;
  }

  getTeamMode() {
    return false;
  }

  getAiDefList() {
    return this._aiDefList;
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
        description: 'Let\'s get started. It should be a piece of cake. Your enemy is in front of you, the gun is pointed at it. All you need to do is to pull the trigger and fire! \n\n![preview](./img/challenge01.png)\n\nNo idea where to start? Read [the docs](./docs/manual/ai_script.html).',
        tankList: [{source: 'file', name: 'dummy'}],
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
      }),
      new ChallengeDefinition({
        id: 'challenge-Du7tyrCB',
        level: 2,
        name: 'Look at me',
        description: 'You know how to shoot, right? Now it\'s time to move a little bit. Your enemy is located on the southern-east. Point your gun at that direction, then... you know what to do next :) Notice that your tank is slightly rotated what needs to be taken into account during aiming. \n\n![preview](./img/challenge02.png) \n\nNeed more help? You\'ll find it in [the docs](./docs/manual/algorithms_aiming.html).',
        tankList: [{source: 'file', name: 'dummy'}],
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
      }),
      new ChallengeDefinition({
        id: 'challenge-4syTf6ph',
        level: 3,
        name: 'Scan me',
        description: 'There is usually no targets at predefined positions in the battlefield. In this case, your enemy will be located at a random spot somewhere nearby. Your job is to use the radar attached to your tank, locate the enemy and eliminate it. \n\n![preview](./img/challenge03.png) \n\nAs always, more guidelines in [the docs](./docs/manual/algorithms_aiming.html).',
        tankList: [{source: 'file', name: 'dummy'}],
        rngSeed: 0.430984523409582730,
        modifier: (simulation) => {
          simulation.tankList.forEach((tank) => {
            let x, y, a;
            switch(tank.name.toLowerCase()) {
              case "player":
                x = (simulation.battlefield.minX + simulation.battlefield.maxX)/2;
                y = (simulation.battlefield.minY + simulation.battlefield.maxY)/2;
                tank.moveTo(x, y, 180 + 180*Math.random());
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
      }),
      new ChallengeDefinition({
        id: 'challenge-hXMwLdZw',
        level: 4,
        name: 'Predict me',
        description: 'Things get complicated - your target is moving back and forth. Since it takes some time for the bullet to travel the distance and hit it, you need to consider that and predict your enemy\'s future position before shooting. \n\n![preview](./img/challenge04.png) \n\nMore guidelines in [the docs](./docs/manual/algorithms_aiming.html).',
        tankList: [{source: 'code', name: 'Mover', code: 'importScripts("lib/tank.js");var direction=0.8,isTurning=!1;tank.init(function(i,a){i.SKIN="forest"}),tank.loop(function(i,a){let n=null===i.radar.wallDistance||i.radar.wallDistance>120,t=direction>0?0:180,r=Math.deg.normalize(t-i.radar.angle);a.RADAR_TURN=r;let e=Math.abs(r)>1;e||n||(e=!0,direction*=-1),a.THROTTLE=!e&&n?direction:0});'}],
        rngSeed: 0.7113695353800222,
        modifier: (simulation) => {
          simulation.tankList.forEach((tank) => {
            let x, y, a;
            switch(tank.name.toLowerCase()) {
              case "player":
                x = (simulation.battlefield.minX + simulation.battlefield.maxX)/2;
                y = (simulation.battlefield.minY + simulation.battlefield.maxY)/2;
                tank.moveTo(x, y, 180 + 180*Math.random());
                break;
              case "mover":
                a = -115;
                x = (simulation.battlefield.minX + simulation.battlefield.maxX)/2 + 140;
                y = (simulation.battlefield.minY + simulation.battlefield.maxY)/2;
                tank.moveTo(x, y, a);
                break;
              default:
                console.log(tank.name);
            }
          });
        }
      }),
      new ChallengeDefinition({
        id: 'challenge-tV3fKHBw',
        level: 5,
        name: 'Chase me',
        description: 'Your opponent drives around trying to run away from you. Can you catch it? \n\n![preview](./img/challenge05.png) \n\nIf you need the manual, it is available [here](./docs/manual/README.html)',
        tankList: [{source: 'file', name: 'crawler'}],
        rngSeed: 0.38835849114718024,
        modifier: (simulation) => {
          simulation.tankList.forEach((tank) => {
            let x, y;
            switch(tank.name.toLowerCase()) {
              case "player":
                x = (simulation.battlefield.minX + simulation.battlefield.maxX)/2 - 350;
                y = (simulation.battlefield.minY + simulation.battlefield.maxY)/2;
                tank.moveTo(x, y, 0);
                break;
              case "crawler":
                x = (simulation.battlefield.minX + simulation.battlefield.maxX)/2 - 100;
                y = (simulation.battlefield.minY + simulation.battlefield.maxY)/2;
                tank.moveTo(x, y, 0);
                break;
              default:
                console.log(tank.name);
            }
          });
        }
      }),
      new ChallengeDefinition({
        id: 'challenge-6iZxC1FP',
        level: 6,
        name: 'Find me',
        description: 'Time for some explotation of the battlefield. The opponent is not difficult - it will stand still and wait for you. You just need to find it. Remember that the radar has limited range so you need to move around the battlefield a little bit. \n\n![preview](./img/challenge06.png) \n\nIf you need the manual, it is available [here](./docs/manual/README.html)',
        tankList: [
          {source: 'file', name: 'dummy'},
          {source: 'file', name: 'dummy'},
          {source: 'file', name: 'dummy'},
          {source: 'file', name: 'dummy'}
        ],
        timeLimit: 60000,
        rngSeed: 0.18940819134692157
      })
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
