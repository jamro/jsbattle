import challengeService from "../services/challengeService.js";
import aiRepoService from "../services/aiRepoService.js";
import statsService from '../services/statsService.js';
import {
  CHALLENGE_LIST_REQUEST,
  CHALLENGE_LIST_SUCCESS,
  COMPLETE_CHALLENGE_REQUEST,
  COMPLETE_CHALLENGE_SUCCESS,
  CHALLENGE_REQUEST,
  CHALLENGE_FAILURE,
  CHALLENGE_SUCCESS,
  CHALLENGE_CODE_REQUEST,
  CHALLENGE_CODE_SUCCESS,
  CHALLENGE_CODE_CHANGED_REQUEST,
  CHALLENGE_CODE_CHANGED_SUCCESS,
} from './actionTypes.js';

export const unlockAllChallenges = () => {
  return async (dispatch) => {
    let challenges = await challengeService.getChallengeList();
    for(let challenge of challenges) {
      await challengeService.completeChallenge(challenge.id); // eslint-disable-line no-await-in-loop
      let challengeList = await challengeService.getChallengeList(); // eslint-disable-line no-await-in-loop
      dispatch({
        type: COMPLETE_CHALLENGE_SUCCESS,
        payload: {
          challengeId: challenge.id,
          challengeList
        }
      });
    }
  };
};

export const getChallengeList = () => {
  return async (dispatch) => {
    dispatch({type: CHALLENGE_LIST_REQUEST});
    let challengeList = await challengeService.getChallengeList();
    dispatch({
      type: CHALLENGE_LIST_SUCCESS,
      payload: {
        challengeList
      }
    });
  };
};

export const completeChallenge = (challengeId) => {
  return async (dispatch) => {
    dispatch({
      type: COMPLETE_CHALLENGE_REQUEST,
      payload: {
        challengeId
      }
    });
    console.log(`Complete challenge (ID: ${challengeId})`);
    await challengeService.completeChallenge(challengeId);
    let challengeList = await challengeService.getChallengeList();
    dispatch({
      type: COMPLETE_CHALLENGE_SUCCESS,
      payload: {
        challengeId,
        challengeList
      }
    });
  };
};

export const getChallenge = (id) => {
  return async (dispatch) => {
    dispatch({
      type: CHALLENGE_REQUEST,
      payload: {
        challengeId: id
      }
    });
    let challenge = await challengeService.getChallenge(id);

    if(!challenge) {
      dispatch({
        type: CHALLENGE_FAILURE,
        payload: new Error(`Challenge unavailable`)
      });
      return;
    }

    statsService.onChallengeOpen(challenge.level);
    dispatch({
      type: CHALLENGE_SUCCESS,
      payload: challenge
    });
  };
};

export const getChallengeCode = (id) => {
  return async (dispatch) => {
    dispatch({type: CHALLENGE_CODE_REQUEST});
    let script = await aiRepoService.getOrCreateScript(id, 'challengeLibrary.scriptMap');

    dispatch({
      type: CHALLENGE_CODE_SUCCESS,
      payload: {
        code: script.code
      }
    });
  };
};

export const updateChallengeCode = (id, code) => {
  return async (dispatch) => {
    dispatch({
      type: CHALLENGE_CODE_CHANGED_REQUEST,
      payload: {
        id: id,
        code: code
      }
    });
    await aiRepoService.updateScript(id, code, 'challengeLibrary.scriptMap');
    dispatch({
      type: CHALLENGE_CODE_CHANGED_SUCCESS,
      payload: {
        id: id,
        code: code
      }
    });
  };
};
