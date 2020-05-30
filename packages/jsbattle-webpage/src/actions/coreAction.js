import profileService from '../services/profileService.js';
import challengeService from "../services/challengeService.js";
import aiRepoService from "../services/aiRepoService.js";

import {
  SET_SIM_QUALITY_REQUEST,
  SET_SIM_QUALITY_SUCCESS,
  SET_SIM_SPEED_REQUEST,
  SET_SIM_SPEED_SUCCESS,
  SETTINGS_REQUEST,
  SETTINGS_SUCCESS,
} from './actionTypes.js';
import {fetchFromApi} from '../lib/fetchFromApi.js';

export const clearError = (type) => ({
  type: type + "_CLEAR_ERROR"
});

export const showError = (message) => ({
  type: "INTERNAL_FAILURE",
  payload: {message}
});

export const setSimQuality = (quality) => {
  return async (dispatch) => {
    dispatch({
      type: SET_SIM_QUALITY_REQUEST,
      payload: quality
    });
    await profileService.setSimQuality(quality);
    console.log("Quality changed to " + quality);
    dispatch({
      type: SET_SIM_QUALITY_SUCCESS,
      payload: quality
    });
  };
};

export const setSimSpeed = (speed) => {
  return async (dispatch) => {
    dispatch({
      type: SET_SIM_SPEED_REQUEST,
      payload: speed
    });
    await profileService.setSimSpeed(speed);
    console.log("Speed changed to " + speed);
    dispatch({
      type: SET_SIM_SPEED_SUCCESS,
      payload: speed
    });
  };
};

export const getSettings = () => {
  return async (dispatch) => {
    dispatch({type: SETTINGS_REQUEST});

    let settings = await profileService.getSettings();

    let result = await fetch("tanks/index.json");
    let bundledTanks = await result.json();
    settings.bundledTanks = bundledTanks;

    dispatch({type: SETTINGS_SUCCESS, payload: settings});
  };
};

export const getAuthMethods = () => {
  return fetchFromApi("/api/authMethods", "AUTH_METHODS");
};

export const getUserProfile = () => {
  return fetchFromApi("/api/profile", "USER_PROFILE");
};

export const registerProfile = (username, displayName) => {
  return fetchFromApi("/api/user/initData", "PROFILE_REGISTER", async () => {

    let challenges = await challengeService.getChallengeList(challengeService.getCompletedChallenges());
    let scripts = await aiRepoService.getScriptNameList();

    let i;
    for(i=0; i < challenges.length; i++) {
      let challengeDef = await challengeService.getChallengeDefinition(challenges[i].id);
      challenges[i] = {
        challengeId: challenges[i].id,
        completed: challenges[i].completed,
        code: challengeDef.code
      };
    }

    for(i=0; i < scripts.length; i++) {
      let scriptData = await aiRepoService.getScript(scripts[i].id);
      scripts[i] = {
        scriptName: scripts[i].scriptName,
        code: scriptData.code
      };
    }


    return {
      method: 'PATCH',
      body: JSON.stringify({
        username,
        displayName,
        challenges,
        scripts
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    };
  });

};
