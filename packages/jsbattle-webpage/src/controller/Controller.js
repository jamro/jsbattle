import openCodeRepository from './action/navi/openCodeRepository.js';
import openCodeEditor from './action/navi/openCodeEditor.js';
import closeCodeEditor from './action/navi/closeCodeEditor.js';
import openTankList from './action/navi/openTankList.js';
import openProfile from './action/navi/openProfile.js';
import openQuickBattle from './action/navi/openQuickBattle.js';
import openBattle from './action/navi/openBattle.js';
import openBattleResults from './action/navi/openBattleResults.js';
import openChallenges from './action/navi/openChallenges.js';
import openChallengeEditor from './action/navi/openChallengeEditor.js';
import openChallengeBattle from './action/navi/openChallengeBattle.js';
import openChallengeResult from './action/navi/openChallengeResult.js';
import replayBattle from './action/navi/replayBattle.js';

import createTank from './action/codeRepository/createTank.js';
import removeTank from './action/codeRepository/removeTank.js';

import editCurrentAiScript from './action/editor/editCurrentAiScript.js';
import saveCurrentAiScript from './action/editor/saveCurrentAiScript.js';
import renameAiScript from './action/editor/renameAiScript.js';
import setAiScript from './action/editor/setAiScript.js';

import toggleTeamMode from './action/battle/toggleTeamMode.js';
import assignTanksToBattle from './action/battle/assignTanksToBattle.js';
import shareBattle from './action/battle/shareBattle.js';

import saveCurrentChallengeScript from './action/challenge/saveCurrentChallengeScript.js';
import unlockAllChallenges from './action/challenge/unlockAllChallenges.js';

import loadSettings from './action/loadSettings.js';
import setSimulationSpeed from './action/setSimulationSpeed.js';
import setSimulationQuality from './action/setSimulationQuality.js';


export default class Controller  {

  constructor(stateHolder, aiRepository, challengeLibrary) {
    this.stateHolder = stateHolder;

    this.addActon('openCodeRepository',      openCodeRepository(this.stateHolder));
    this.addActon('openCodeEditor',          openCodeEditor(this.stateHolder, aiRepository));
    this.addActon('closeCodeEditor',         closeCodeEditor(this.stateHolder, this));
    this.addActon('openTankList',            openTankList(this.stateHolder));
    this.addActon('openQuickBattle',         openQuickBattle(this.stateHolder, aiRepository));
    this.addActon('openBattle',              openBattle(this.stateHolder));
    this.addActon('openBattleResults',       openBattleResults(this.stateHolder));
    this.addActon('openChallenges',          openChallenges(this.stateHolder, challengeLibrary));
    this.addActon('openChallengeEditor',     openChallengeEditor(this.stateHolder, challengeLibrary));
    this.addActon('openChallengeBattle',     openChallengeBattle(this.stateHolder, challengeLibrary));
    this.addActon('openChallengeResult',     openChallengeResult(this.stateHolder, challengeLibrary));
    this.addActon('replayBattle',            replayBattle(this.stateHolder, this));

    this.addActon('createTank',              createTank(this.stateHolder, aiRepository));
    this.addActon('removeTank',              removeTank(this.stateHolder, aiRepository));

    this.addActon('editCurrentAiScript',     editCurrentAiScript(this.stateHolder));
    this.addActon('saveCurrentAiScript',     saveCurrentAiScript(this.stateHolder, aiRepository));
    this.addActon('setAiScript',             setAiScript(this.stateHolder, aiRepository));
    this.addActon('renameAiScript',          renameAiScript(this.stateHolder, aiRepository));

    this.addActon('toggleTeamMode',          toggleTeamMode(this.stateHolder));
    this.addActon('assignTanksToBattle',     assignTanksToBattle(this.stateHolder));
    this.addActon('shareBattle',             shareBattle(this.stateHolder));

    this.addActon('saveCurrentChallengeScript', saveCurrentChallengeScript(this.stateHolder, challengeLibrary));
    this.addActon('unlockAllChallenges',     unlockAllChallenges(this.stateHolder, challengeLibrary));

    this.addActon('loadSettings',            loadSettings(this.stateHolder, aiRepository, challengeLibrary));
    this.addActon('setSimulationSpeed',      setSimulationSpeed(this.stateHolder));
    this.addActon('setSimulationQuality',    setSimulationQuality(this.stateHolder));

    this.addActon('openProfile',    openProfile(this.stateHolder));

  }

  addActon(name, callback) {
    let self = this;
    this[name] = function() {
      console.log(`Controller.${name}(...);`);
      callback.apply(null, arguments);
      return self;
    };
  }

}
