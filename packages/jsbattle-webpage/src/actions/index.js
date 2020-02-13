import {getChallengeList} from "../lib/ChallengeLibrary.js";
import AiRepository from "../lib/AiRepository.js";
import Stats from '../lib/Stats.js';

const challengeAiRepo = new AiRepository(false, 'challengeLibrary.scriptMap');
const aiRepository = new AiRepository(false, 'aiRepository.scriptMap');

export const notifyStatsChallengeComplete = (level) => {
  Stats.onChallengeComplete(level);
  return {
    type: "STATS_CHALLENGE_COMPLETE",
    payload: {
      level
    }
  };
};

export const notifyStatsChallengeOpen = (level) => {
  Stats.onChallengeOpen(level);
  return {
    type: "STATS_CHALLENGE_OPEN",
    payload: {
      level
    }
  };
};

export const unlockAllChallenges = () => {
  return (dispatch) => {
    let challenges = getChallengeList();
    for(let challenge of challenges) {
      dispatch({
        type: "COMPLETE_CHALLENGE",
        payload: {
          challengeId: challenge.id
        }
      });
    }
  };

};


export const setSimQuality = (quality) => {
  localStorage.setItem("settings.quality", quality);
  console.log("Quality changed to " + quality);
  return {
    type: "SET_SIM_QUALITY",
    payload: quality
  };
};

export const setSimSpeed = (speed) => {
  localStorage.setItem("settings.simSpeed", speed);
  console.log("Speed changed to " + speed);
  return {
    type: "SET_SIM_SPEED",
    payload: speed
  };
};

export const getSettings = () => {
  return async (dispatch) => {
    dispatch({type: "SETTINGS_REQUEST"});

    let settings = {};

    settings.simSpeed = localStorage.getItem("settings.simSpeed");
    settings.qualitySettings = localStorage.getItem("settings.quality");
    settings.teamMode = localStorage.getItem("settings.teamMode");
    settings.battleSetData = localStorage.getItem("settings.battleSet");
    let completedChallenges = localStorage.getItem("challenges.completed");

    settings.simSpeed = settings.simSpeed ? settings.simSpeed : 1;
    settings.qualitySettings = settings.qualitySettings ? settings.qualitySettings : 0.5;
    settings.teamMode = (settings.teamMode == 'true');
    completedChallenges = completedChallenges ? JSON.parse(completedChallenges) : [];

    console.log('completedChallenges: Array(' + completedChallenges.length + ')');

    settings.challengeList = getChallengeList();
    settings.challengeList.map((challenge) => {
      challenge.isCompleted = (completedChallenges.indexOf(challenge.id) != -1);
      return challenge;
    });

    settings.aiRepo = aiRepository.getScriptNameList();

    let result = await fetch("tanks/index.json");
    let bundledTanks = await result.json();
    settings.bundledTanks = bundledTanks;

    dispatch({type: "SETTINGS_SUCCESS", payload: settings});

  };
};

export const completeChallenge = (challengeId) => {
  console.log(`Complete challenge (ID: ${challengeId})`);

  let completedChallenges = localStorage.getItem("challenges.completed");
  completedChallenges = completedChallenges ? JSON.parse(completedChallenges) : [];
  completedChallenges.push(challengeId);

  localStorage.setItem("challenges.completed", JSON.stringify(completedChallenges));

  return {
    type: "COMPLETE_CHALLENGE",
    payload: {
      challengeId
    }
  };
};

export const getChallengeCode = (id) => {
  return (dispatch) => {
    dispatch({type: "CHALLENGE_CODE_REQUEST"});

    let exists = challengeAiRepo.existsScript(id);
    if(!exists) {
      challengeAiRepo.createScript(id);
    }
    let code = challengeAiRepo.getScript(id).code;

    // need to be done async to reload code area with new value
    setTimeout(() => {
      dispatch({type: "CHALLENGE_CODE_SUCCESS", payload: {code}});
    }, 100);
  };
};

export const updateChallengeCode = (id, code) => {
  return (dispatch) => {
    challengeAiRepo.updateScript(id, code);
    dispatch({
      type: "CHALLENGE_CODE_CHANGED",
      payload: {
        id: id,
        code: code
      }
    });
  };
};

export const createAiScript = (scriptName) => {

  let name = scriptName || aiRepository.getRandomScriptName();
  let retry = 0;
  while(!aiRepository.isNameAllowed(name)) {
    name = aiRepository.getRandomScriptName();
    retry++;
    if(retry > 100) {
      throw "Cannot find unique name for the script";
    }
  }
  Stats.onAiScriptCreate();
  aiRepository.createScript(name);

  console.log('Creating new tank: ' + name);
  return {
    type: "CREATE_AI_SCRIPT",
    payload: {
      name
    }
  };
};

export const deleteAiScript = (name) => {
  console.log('Deleting tank: ' + name);
  Stats.onAiScriptRemove();
  aiRepository.deleteScript(name);

  return {
    type: "DELETE_AI_SCRIPT",
    payload: {
      name
    }
  };
};

export const getAiScript = (name) => {
  return (dispatch) => {
    dispatch({type: "AI_SCRIPT_REQUEST"});

    let exists = aiRepository.existsScript(name);
    if(!exists) {
      setTimeout(() => {
        dispatch({type: "AI_SCRIPT_FAILURE", payload: {message: `AI Script '${name}' does not exist!`}});
      }, 100);
      return;
    }
    let ai = aiRepository.getScript(name);

    // need to be done async to reload code area with new value
    setTimeout(() => {
      dispatch({type: "AI_SCRIPT_SUCCESS", payload: {name: ai.name, code: ai.code}});
    }, 100);
  };
};

export const clearError = (type) => ({
  type: type + "_CLEAR_ERROR"
});

export const updateAiScript = (name, code) => {
  return (dispatch) => {
    aiRepository.updateScript(name, code);
    dispatch({
      type: "AI_SCRIPT_CHANGED",
      payload: {
        name: name,
        code: code
      }
    });
  };
};

export const setSandboxOpponent = (type, name) => {
  return (dispatch) => {
    let code = '';
    if(type == 'user') {
      code = aiRepository.getScript(name).code;
    }
    dispatch({
      type: "SANDBOX_OPPONENT_CHANGE",
      payload: {
        type,
        name,
        code
      }
    });
  };
};

export const setSandboxBattleMode = (teamMode) => {
  return (dispatch) => {
    dispatch({
      type: teamMode ? "SANDBOX_OPPONENT_TEAM_MODE" : "SANDBOX_OPPONENT_DUEL_MODE"
    });
  };
};

export const lockSandboxRng = (locked) => {
  return (dispatch) => {
    dispatch({
      type: locked ? "SANDBOX_RNG_LOCK" : "SANDBOX_RNG_UNLOCK"
    });
  };
};

export const renameAiScript = (newName, oldName) => {
  return (dispatch) => {
    dispatch({type: "AI_SCRIPT_RENAME_REQUEST"});

    let error = null;
    if(newName.length < 3) {
      error = `Wrong script name. Script name must be at least 3 characters long`;
    }
    if(newName.length >= 16) {
      error = `Wrong script name. Script name must be less than 16 characters long`;
    }
    if(aiRepository.existsScript(newName)) {
      error = `Wrong script name. Script '${newName}' already exists. The name must be unique`;
    }
    if(!((/^[A-Za-z0-9_-]+$/).test(newName))) {
      error = `Wrong script name. Allowed characters are A-Z, a-z, 0-9, _, -`;
    }
    if(error) {
      setTimeout(() => {
        console.warn(`Unable to rename to ${newName}: ${error}`);
        dispatch({
          type: "AI_SCRIPT_RENAME_FAILURE",
          payload: {
            message: error
          }
        });
      }, 100);
      return;
    }

    aiRepository.renameScript(newName, oldName);

    // need to be done async to reload code area with new value
    setTimeout(() => {
      dispatch({
        type: "AI_SCRIPT_RENAME_SUCCESS",
        payload: {
          newName,
          oldName
        }
      });
    }, 100);

  };
};
