import challengeService from "../services/challengeService.js";
import {
  CHALLENGE_LIST_REQUEST,
  CHALLENGE_LIST_SUCCESS,
  CHALLENGE_LIST_FAILURE,
  CHALLENGE_REQUEST,
  CHALLENGE_SUCCESS,
  CHALLENGE_FAILURE
} from './actionTypes.js';
import {fetchFromApi} from '../lib/fetchFromApi.js';
import statsService from '../services/statsService.js';

export const unlockAllChallenges = (useRemoteService) => {
  return async (dispatch) => {
    if(useRemoteService) {
      throw new Error('not supported');
    }
    let challenges = await challengeService.getChallengeList([]);
    for(let challenge of challenges) {
      await challengeService.completeChallenge(challenge.id); // eslint-disable-line no-await-in-loop
    }
    let challengeList = await challengeService.getChallengeList(challengeService.getCompletedChallenges()); // eslint-disable-line no-await-in-loop
    dispatch({
      type: CHALLENGE_LIST_SUCCESS,
      payload: challengeList
    });
  };
};

async function fetchChallengeList(useRemoteService) {
  let completeChallengeList;
  if(useRemoteService) {
    let remoteResponse = await fetch('/api/user/challenges');
    if (!remoteResponse.ok) {
      throw new new Error(`Error ${remoteResponse.status}: ${remoteResponse || remoteResponse.statusText}`)();
    }
    let json = await remoteResponse.json();
    completeChallengeList = json.rows
      .filter((row) => row.completed)
      .map((row) => row.challengeId);
  } else {
    completeChallengeList = challengeService.getCompletedChallenges();
  }
  let response = await challengeService.getChallengeList(completeChallengeList);

  return response;
}

export const getChallengeList = (useRemoteService) => {
  return async (dispatch) => {
    dispatch({type: CHALLENGE_LIST_REQUEST});
    try {
      let response = await fetchChallengeList(useRemoteService);
      dispatch({type: CHALLENGE_LIST_SUCCESS, payload: response});
    } catch (err) {
      dispatch({type: CHALLENGE_LIST_FAILURE, payload: err, error: true});
    }
  };
};

export const completeChallenge = (challengeId, useRemoteService) => {
  return fetchFromApi(
    "/api/user/challenges/" + challengeId,
    "COMPLETE_CHALLENGE",
    {
      method: 'PATCH',
      body: JSON.stringify({
        completed: true
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    },
    useRemoteService ? null : challengeService.completeChallenge.fetch
  );
};

export const getChallenge = (challengeId, useRemoteService) => {
  return async (dispatch) => {
    dispatch({type: CHALLENGE_REQUEST});
    try {
      let challengeList = await fetchChallengeList(useRemoteService);
      let challengeFromList = challengeList.find((challenge) => challenge.id == challengeId);
      if(!challengeFromList) {
        throw new Error('Challenge data mismatch');
      }
      let challenge = await challengeService.getChallengeDefinition(challengeId);
      let remoteChallange = {};
      if(useRemoteService) {
        let remoteResponse = await fetch('/api/user/challenges/' + challengeId);
        if (!remoteResponse.ok) {
          throw new new Error(`Error ${remoteResponse.status}: ${remoteResponse || remoteResponse.statusText}`)();
        }
        remoteChallange = await remoteResponse.json();
      }
      challenge = {
        ...challenge,
        ...challengeFromList,
        ...remoteChallange,
        id: challenge.id
      };

      if(!challenge.isUnlocked) {
        return dispatch({type: CHALLENGE_FAILURE, payload: new Error('Challenge locked'), error: true});
      }

      statsService.onChallengeOpen(challenge.level);

      dispatch({type: CHALLENGE_SUCCESS, payload: challenge});
    } catch (err) {
      dispatch({type: CHALLENGE_FAILURE, payload: err, error: true});
    }
  };
};

export const updateChallengeCode = (challengeId, code, useRemoteService) => {
  return fetchFromApi(
    "/api/user/challenges/" + challengeId,
    "CHALLENGE_CODE_CHANGED",
    {
      method: 'PATCH',
      body: JSON.stringify({
        code
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    },
    useRemoteService ? null : challengeService.updateChallengeCode.fetch
  );
};
