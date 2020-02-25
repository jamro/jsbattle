import {attachFetch} from '../lib/fetchFromApi.js';

const serviceDelay = 10;

function getCompletedChallenges() {
  let completedChallenges = localStorage.getItem("challenges.completed");
  completedChallenges = completedChallenges ? JSON.parse(completedChallenges) : [];
  return completedChallenges;
}

export async function getChallengeList() {
  await new Promise((resolve) => setTimeout(resolve, serviceDelay));
  let completedChallenges = getCompletedChallenges();
  let challengeList = require('./challenges.json');
  challengeList = challengeList.map((challenge) => ({
    id: challenge.id,
    level: challenge.level,
    name: challenge.name,
    isCompleted: (completedChallenges.indexOf(challenge.id) != -1)
  }));

  challengeList = challengeList.sort((a, b) => a.level - b.level);
  let completedThreshold = challengeList.length > 0 ? challengeList[0].level: 0;
  for(let i=0; i < challengeList.length; i++) {
    if(challengeList[i].isCompleted) {
      completedThreshold = Math.max(completedThreshold, challengeList[i].level+1);
    }
  }
  challengeList = challengeList.map((challenge) => ({
    ...challenge,
    isUnlocked: (challenge.level <= completedThreshold)
  }));

  return challengeList;
}

export async function getChallenge(challengeId) {
  let challengeList = await getChallengeList();
  let challenge;
  challenge = challengeList.find((c) => (
    c.id == challengeId && c.isUnlocked
  ));
  if(!challenge) {
    return null;
  }
  let challengeData = require('./challenges.json');

  challenge = challengeData.find((c) => (
    c.id == challengeId
  ));

  if(challenge) {
    return challenge;
  }
  return null;
}

export async function completeChallenge(challengeId) {
  await new Promise((resolve) => setTimeout(resolve, serviceDelay));
  let completedChallenges = getCompletedChallenges();
  completedChallenges.push(challengeId);
  localStorage.setItem("challenges.completed", JSON.stringify(completedChallenges));
  return getChallengeList();
}

export async function getChallengeCode(id) {
  let namespace = 'challengeLibrary.scriptMap';

  let storedScripts = localStorage.getItem(namespace);
  let scriptMap = storedScripts ? JSON.parse(storedScripts) : {};

  let exists = (scriptMap[id] != undefined);
  if(!exists) {
    await new Promise((resolve) => setTimeout(resolve, serviceDelay));
    let code = "importScripts('lib/tank.js');\n\n// Don't know where to start?\n// Read Getting Started in \"Docs\" section \n\ntank.init(function(settings, info) {\n\t// initialize tank here\n  \n});\n\ntank.loop(function(state, control) {\n\t// write your tank logic here\n  \n});\n\n\n";
    scriptMap[id] = code;
    localStorage.setItem(namespace, JSON.stringify(scriptMap));
    return code;
  }
  await new Promise((resolve) => setTimeout(resolve, serviceDelay));
  return scriptMap[id];
}

export async function updateChallengeCode(id, code) {
  console.log("A");
  let namespace = 'challengeLibrary.scriptMap';
  await new Promise((resolve) => setTimeout(resolve, serviceDelay));

  let storedScripts = localStorage.getItem(namespace);
  let scriptMap = storedScripts ? JSON.parse(storedScripts) : {};
  if(!scriptMap[id]) {
    throw "Script " + id + " does not exists";
  }
  scriptMap[id] = code;
  localStorage.setItem(namespace, JSON.stringify(scriptMap));
  return code;
}

export default {
  // REST   GET  /api/user/challenges
  getChallengeList: attachFetch(getChallengeList, () => {
    return [];
  }),
  // REST    GET  /api/user/challenges/:id
  getChallenge: attachFetch(getChallenge, (request) => {
    return [request.uriElements[request.uriElements.length-1]];
  }),
  // REST   POST /api/user/challenges/:id/completed
  completeChallenge: attachFetch(completeChallenge, (request) => {
    return [request.uriElements[request.uriElements.length-2]];
  }),
  // REST    GET  /api/user/challenges/:id/code
  getChallengeCode: attachFetch(getChallengeCode, (request) => {
    return [request.uriElements[request.uriElements.length-2]];
  }),
  // REST    POST  /api/user/challenges/:id/code
  updateChallengeCode: attachFetch(updateChallengeCode, (request) => {
    return [
        request.uriElements[request.uriElements.length-2],
        request.body.code
      ];
  })
};
