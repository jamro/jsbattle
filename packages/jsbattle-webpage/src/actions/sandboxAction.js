import aiRepoService from "../services/aiRepoService.js";
import statsService from '../services/statsService.js';
import {
  SANDBOX_OPPONENT_CHANGE,
  SANDBOX_OPPONENT_TEAM_MODE,
  SANDBOX_OPPONENT_DUEL_MODE,
  SANDBOX_RNG_LOCK,
  SANDBOX_RNG_UNLOCK,
} from './actionTypes.js';
import {sequenceFetch, fetchFromApi} from '../lib/fetchFromApi.js';

export const getSandboxAiScriptList = (useRemoteService) => {
  return fetchFromApi(
    "/api/user/scripts",
    "SANDBOX_AI_SCRIPT_LIST",
    {},
    useRemoteService ? null : aiRepoService.getScriptNameList.fetch
  );
};

export const createAiScript = (name, useRemoteService) => {
  let body = {};
  if(name) {
    body.scriptName = name;
  }
  return sequenceFetch([
    () => statsService.onAiScriptCreate(),
    fetchFromApi(
      "/api/user/scripts",
      "CREATE_AI_SCRIPT",
      {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        },
      },
      useRemoteService ? null : aiRepoService.createScript.fetch
    ),
    fetchFromApi(
      "/api/user/scripts",
      "SANDBOX_AI_SCRIPT_LIST",
      {},
      useRemoteService ? null : aiRepoService.getScriptNameList.fetch
    )
  ]);
};

export const deleteAiScript = (id, useRemoteService) => {
  return sequenceFetch([
    () => statsService.onAiScriptRemove(),
    fetchFromApi(
      "/api/user/scripts/" + id,
      "DELETE_AI_SCRIPT",
      {
        method: 'DELETE',
        body: JSON.stringify({}),
        headers: {
          'Content-Type': 'application/json'
        },
      },
      useRemoteService ? null : aiRepoService.deleteScript.fetch
    ),
    fetchFromApi(
      "/api/user/scripts",
      "SANDBOX_AI_SCRIPT_LIST",
      {},
      useRemoteService ? null : aiRepoService.getScriptNameList.fetch
    )
  ]);
};

export const getAiScript = (id, useRemoteService) => {
  return fetchFromApi(
    "/api/user/scripts/" + id,
    "AI_SCRIPT",
    {},
    useRemoteService ? null : aiRepoService.getScript.fetch
  );
};

export const updateAiScript = (id, code, useRemoteService) => {
  return fetchFromApi(
    "/api/user/scripts/" + id,
    "AI_SCRIPT_CHANGED",
    {
      method: 'PATCH',
      body: JSON.stringify({
        id,
        code
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    },
    useRemoteService ? null : aiRepoService.updateScript.fetch
  );
};

export const renameAiScript = (newName, id, useRemoteService) => {
  return fetchFromApi(
    "/api/user/scripts/" + id,
    "AI_SCRIPT_RENAME",
    {
      method: 'PATCH',
      body: JSON.stringify({
        id,
        scriptName: newName
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    },
    useRemoteService ? null : aiRepoService.renameScript.fetch
  );
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
