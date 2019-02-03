import AiRepository from "./AiRepository.js";
import BattleSet from "./BattleSet.js";

class ChallengeDefinition {
  constructor(initData, aiRepository) {
    this.id = initData.id || 0;
    this.level = initData.level || 0;
    this.name = initData.name || "";
    this.isCompleted = false;
    this._aiRepository = aiRepository;
    this._battleSet = new BattleSet();
    this._battleSet.addTank(this.id, 1, true);
    this._battleSet.setTankDisplayName(this.id, "Player");

    let tankList = initData.tankList || [];
    tankList.forEach((tank) => {
      this._battleSet.addTank(tank, 1, false);
    });
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
}


export default class ChallengeLibrary {

  constructor(stateless) {
    this._aiRepository = new AiRepository(stateless, 'challengeLibrary.scriptMap');

    this._challengeList = [
      new ChallengeDefinition({
        id: 'challenge-kjFrZAUe',
        level: 1,
        name: 'Dummy Duel',
        tankList: ['dummy']
      }, this._aiRepository),
      new ChallengeDefinition({
        id: 'challenge-My6Lj5RF',
        level: 2,
        name: 'Crawler Duel',
        tankList: ['crawler']
      }, this._aiRepository),
      new ChallengeDefinition({
        id: 'challenge-y87hO9aT',
        level: 3,
        name: 'Crazy Duel',
        tankList: ['crazy']
      }, this._aiRepository),
      new ChallengeDefinition({
        id: 'challenge-pFmJhcrV',
        level: 4,
        name: 'Chicken Duel',
        tankList: ['chicken']
      }, this._aiRepository),
      new ChallengeDefinition({
        id: 'challenge-aSdf9xP',
        level: 5,
        name: 'Sniper Duel',
        tankList: ['sniper']
      }, this._aiRepository),
      new ChallengeDefinition({
        id: 'challenge-M1nsn8s3',
        level: 6,
        name: 'Kamikaze Duel',
        tankList: ['kamikaze']
      }, this._aiRepository),
      new ChallengeDefinition({
        id: 'challenge-i8s2UnS9',
        level: 7,
        name: 'Dodge Duel',
        tankList: ['dodge']
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
