import {attachFetch} from '../lib/fetchFromApi.js';

const serviceDelay = 10;

export function getCompletedChallenges() {
  let completedChallenges = localStorage.getItem("challenges.completed");
  completedChallenges = completedChallenges ? JSON.parse(completedChallenges) : [];
  return completedChallenges;
}

async function getChallengeCode(id, info) {
  const infoComments = info || "\t// write your tank logic here\n";
  let namespace = 'challengeLibrary.scriptMap';

  let storedScripts = localStorage.getItem(namespace);
  let scriptMap = storedScripts ? JSON.parse(storedScripts) : {};

  let exists = (scriptMap[id] != undefined);
  if(!exists) {
    await new Promise((resolve) => setTimeout(resolve, serviceDelay));
    let code = "importScripts('lib/tank.js');\n\n// Don't know where to start?\n// Read Getting Started in \"Docs\" section \n\ntank.init(function(settings, info) {\n\t// initialize tank here\n  \n});\n\ntank.loop(function(state, control) {\n" + infoComments + "  \n});\n\n\n";
    scriptMap[id] = code;
    localStorage.setItem(namespace, JSON.stringify(scriptMap));
    return code;
  }
  await new Promise((resolve) => setTimeout(resolve, serviceDelay));
  // backward compability
  if(typeof scriptMap[id] == 'object' && scriptMap[id].code) {
    return scriptMap[id].code;
  }
  return scriptMap[id];
}

export async function getChallengeList(completeChallengeList) {
  await new Promise((resolve) => setTimeout(resolve, serviceDelay));
  if(!completeChallengeList) {
    throw new Error('completeChallengeList param is required!');
  }
  let completedChallenges = completeChallengeList || getCompletedChallenges();
  let challengeList = require('./challenges.json');
  challengeList = challengeList.map((challenge) => ({
    id: challenge.id,
    level: challenge.level,
    name: challenge.name,
    completed: (completedChallenges.indexOf(challenge.id) != -1)
  }));

  challengeList = challengeList.sort((a, b) => a.level - b.level);
  let completedThreshold = challengeList.length > 0 ? challengeList[0].level: 0;
  for(let i=0; i < challengeList.length; i++) {
    if(challengeList[i].completed) {
      completedThreshold = Math.max(completedThreshold, challengeList[i].level+1);
    }
  }
  challengeList = challengeList.map((challenge) => ({
    ...challenge,
    isUnlocked: (challenge.level <= completedThreshold)
  }));

  return challengeList;
}

export async function getChallengeDefinition(challengeId) {
  let challengeData = require('./challenges.json');
  let challenge;
  challenge = challengeData.find((c) => (
    c.id == challengeId
  ));
  if(!challenge) {
    throw new Error('Challenge not found');
  }

  challenge = challengeData.find((c) => (
    c.id == challengeId
  ));

  console.log(challenge);

  challenge.code = await getChallengeCode(challengeId, challenge.codeHint);
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
  return {
    id: challengeId,
    completed: true
  };
}

export async function updateChallengeCode(id, code) {
  let namespace = 'challengeLibrary.scriptMap';
  await new Promise((resolve) => setTimeout(resolve, serviceDelay));

  let storedScripts = localStorage.getItem(namespace);
  let scriptMap = storedScripts ? JSON.parse(storedScripts) : {};
  if(!scriptMap[id]) {
    throw new Error("Script '" + id + "' does not exists");
  }
  scriptMap[id] = code;
  localStorage.setItem(namespace, JSON.stringify(scriptMap));
  return {
    id,
    code
  };
}

export default {
  getChallengeList,
  getChallengeDefinition,
  getCompletedChallenges,
  completeChallenge: attachFetch(completeChallenge, (request) => {
    return [request.uriElements[request.uriElements.length-1]];
  }),
  updateChallengeCode: attachFetch(updateChallengeCode, (request) => {
    return [
        request.uriElements[request.uriElements.length-1],
        request.body.code
      ];
  })
};
