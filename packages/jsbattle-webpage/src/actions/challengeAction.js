import challengeService from "../services/challengeService.js";
import {
  COMPLETE_CHALLENGE_SUCCESS
} from './actionTypes.js';
import {fetchFromApi} from '../lib/fetchFromApi.js';

export const unlockAllChallenges = (useRemoteService) => {
  return async (dispatch) => {
    if(useRemoteService) {
      throw new Error('not supported');
    }
    let challenges = await challengeService.getChallengeList();
    for(let challenge of challenges) {
      await challengeService.completeChallenge(challenge.id); // eslint-disable-line no-await-in-loop
    }
    let challengeList = await challengeService.getChallengeList(); // eslint-disable-line no-await-in-loop
    dispatch({
      type: COMPLETE_CHALLENGE_SUCCESS,
      payload: challengeList
    });
  };
};

export const getChallengeList = (useRemoteService) => {
  return fetchFromApi(
    "/api/user/challenges",
    "CHALLENGE_LIST",
    {},
    useRemoteService ? null : challengeService.getChallengeList.fetch
  );
};

export const completeChallenge = (challengeId, useRemoteService) => {
  return fetchFromApi(
    "/api/user/challenges/" + challengeId + "/completed",
    "COMPLETE_CHALLENGE",
    {
      method: 'POST',
      body: JSON.stringify({}),
      headers: {
        'Content-Type': 'application/json'
      },
    },
    useRemoteService ? null : challengeService.completeChallenge.fetch
  );
};

export const getChallenge = (challengeId, useRemoteService) => {
  return fetchFromApi(
    "/api/user/challenges/" + challengeId,
    "CHALLENGE",
    {},
    useRemoteService ? null : challengeService.getChallenge.fetch
  );
};

export const getChallengeCode = (challengeId, useRemoteService) => {
  return fetchFromApi(
    "/api/user/challenges/" + challengeId + "/code",
    "CHALLENGE_CODE",
    {},
    useRemoteService ? null : challengeService.getChallengeCode.fetch
  );
};

export const updateChallengeCode = (challengeId, code, useRemoteService) => {
  return fetchFromApi(
    "/api/user/challenges/" + challengeId + "/code",
    "CHALLENGE_CODE_CHANGED",
    {
      method: 'POST',
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
