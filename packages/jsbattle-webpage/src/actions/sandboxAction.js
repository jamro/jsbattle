import aiRepoService from "../services/aiRepoService.js";
import statsService from '../services/statsService.js';
import {
  SANDBOX_AI_SCRIPT_LIST_REQUEST,
  SANDBOX_AI_SCRIPT_LIST_SUCCESS,
  CREATE_AI_SCRIPT_REQUEST,
  CREATE_AI_SCRIPT_SUCCESS,
  DELETE_AI_SCRIPT_REQUEST,
  DELETE_AI_SCRIPT_SUCCESS,
  AI_SCRIPT_REQUEST,
  AI_SCRIPT_FAILURE,
  AI_SCRIPT_SUCCESS,
  AI_SCRIPT_CHANGED_REQUEST,
  AI_SCRIPT_CHANGED_SUCCESS,
  SANDBOX_OPPONENT_CHANGE,
  SANDBOX_OPPONENT_TEAM_MODE,
  SANDBOX_OPPONENT_DUEL_MODE,
  SANDBOX_RNG_LOCK,
  SANDBOX_RNG_UNLOCK,
  AI_SCRIPT_RENAME_REQUEST,
  AI_SCRIPT_RENAME_SUCCESS,
  AI_SCRIPT_RENAME_FAILURE
} from './actionTypes.js';

export const getSandboxAiScriptList = () => {
  return async (dispatch) => {
    dispatch({type: SANDBOX_AI_SCRIPT_LIST_REQUEST});
    let aiRepo = await aiRepoService.getScriptNameList('scriptMap');
    dispatch({type: SANDBOX_AI_SCRIPT_LIST_SUCCESS, payload: aiRepo});
  };
};

export const createAiScript = (name) => {
  return async (dispatch) => {
    dispatch({
      type: CREATE_AI_SCRIPT_REQUEST
    });
    let script = await aiRepoService.createScript('scriptMap', name);
    statsService.onAiScriptCreate();

    console.log('Creating new tank: ' + name);
    dispatch({
      type: CREATE_AI_SCRIPT_SUCCESS,
      payload: {
        name: script.name
      }
    });
  };
};

export const deleteAiScript = (name) => {
  return async (dispatch) => {
    dispatch({
      type: DELETE_AI_SCRIPT_REQUEST,
      payload: {
        name
      }
    });
    console.log('Deleting tank: ' + name);
    statsService.onAiScriptRemove();
    await aiRepoService.deleteScript(name, 'scriptMap');

    dispatch({
      type: DELETE_AI_SCRIPT_SUCCESS,
      payload: {
        name
      }
    });
  };
};

export const getAiScript = (name) => {
  return async (dispatch) => {
    dispatch({type: AI_SCRIPT_REQUEST});

    let ai = await aiRepoService.getScript(name, 'scriptMap');
    if(!ai) {
      dispatch({type: AI_SCRIPT_FAILURE, payload: new Error(`AI Script '${name}' does not exist!`)});
    }
    dispatch({type: AI_SCRIPT_SUCCESS, payload: {name: ai.name, code: ai.code}});
  };
};


export const updateAiScript = (name, code) => {
  return async (dispatch) => {
    dispatch({
      type: AI_SCRIPT_CHANGED_REQUEST,
      payload: {
        name: name,
        code: code
      }
    });
    await aiRepoService.updateScript(name, code, 'scriptMap');
    dispatch({
      type: AI_SCRIPT_CHANGED_SUCCESS,
      payload: {
        name: name,
        code: code
      }
    });
  };
};

export const setSandboxOpponent = (type, name) => {
  return async (dispatch) => {
    let code = '';
    if(type == 'user') {
      code = await aiRepoService.getScript(name, 'scriptMap').code;
    }
    dispatch({
      type: SANDBOX_OPPONENT_CHANGE,
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
      type: teamMode ? SANDBOX_OPPONENT_TEAM_MODE : SANDBOX_OPPONENT_DUEL_MODE
    });
  };
};

export const lockSandboxRng = (locked) => {
  return (dispatch) => {
    dispatch({
      type: locked ? SANDBOX_RNG_LOCK : SANDBOX_RNG_UNLOCK
    });
  };
};

export const renameAiScript = (newName, oldName) => {
  return async (dispatch) => {
    dispatch({type: AI_SCRIPT_RENAME_REQUEST});

    try {
      await aiRepoService.renameScript(newName, oldName, 'scriptMap');
      dispatch({
        type: AI_SCRIPT_RENAME_SUCCESS,
        payload: {
          newName,
          oldName
        }
      });
    } catch (err) {
      console.warn(`Unable to rename to ${newName}: ${err.message}`);
      dispatch({
        type: AI_SCRIPT_RENAME_FAILURE,
        payload: err
      });
    }

  };
};
