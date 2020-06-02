import aiRepoService from "../services/aiRepoService.js";
import statsService from '../services/statsService.js';
import {
  SANDBOX_OPPONENT_CHANGE,
  SANDBOX_OPPONENT_LIST,
  SANDBOX_OPPONENT_LIST_FAILURE,
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

export const getSandboxOpponentList = (useRemoteService) => {
  return async (dispatch) => {
    let result;
    let userTankList = [];
    if(useRemoteService) {
      try {
        result = await fetch("/api/user/scripts", {});
        if(!result.ok) {
          throw new Error(`Error ${result.status}: ${result.statusText} (url: ${result.url})`);
        }
        userTankList = await result.json();
        userTankList = userTankList.map((script) => ({
          id: script.id,
          label: "sandbox/" + script.scriptName,
          source: 'remote_user'
        }));
      } catch(err) {
        console.log(err);
        return dispatch({
          type: SANDBOX_OPPONENT_LIST_FAILURE,
          payload: err
        });
      }
    } else {
      userTankList = await aiRepoService.getScriptNameList();
      userTankList = userTankList.map((script) => ({
        id: script.id,
        label: 'sandbox/' + script.scriptName,
        source: 'local_user'
      }));
    }

    result = await fetch("tanks/index.json");
    let bundledTanks = await result.json();

    bundledTanks = bundledTanks.map((name) => ({
      id: name,
      label: "jsbattle/" + name,
      source: "bundled"
    }));

    dispatch({
      type: SANDBOX_OPPONENT_LIST,
      payload: Array.concat(bundledTanks, userTankList)
    });
  };
};

export const setSandboxOpponent = (source, id) => {
  return async (dispatch) => {
    let scriptName;
    let scriptCode;
    let script;
    switch(source) {
      case 'local_user':
        script = await aiRepoService.getScript(id, 'scriptMap');
        scriptName = script.scriptName;
        scriptCode = script.code;
        break;
      case 'bundled':
        scriptName = id;
        scriptCode = '';
        break;
      case 'remote_user':
        try {
          script = await fetch("/api/user/scripts/" + id);
          if(!script.ok) {
            throw new Error(`Error ${script.status}: ${script.statusText} (url: ${script.url})`);
          }
          script = await script.json();
          scriptName = script.scriptName;
          scriptCode = script.code;
        } catch(err) {
          console.log(err);
          return dispatch({
            type: SANDBOX_OPPONENT_LIST_FAILURE,
            payload: err
          });
        }
        break;
      default:
        throw new Error(`Not supported source ${source}`);
    }
    dispatch({
      type: SANDBOX_OPPONENT_CHANGE,
      payload: {
        id,
        source,
        name: scriptName,
        code: scriptCode
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
