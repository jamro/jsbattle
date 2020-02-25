import {attachFetch} from '../lib/fetchFromApi.js';

const serviceDelay = 10;

let modifier = {};
modifier['challenge-8UCUaNvC'] = (simulation) => {
  simulation.tankList.forEach((tank) => {
    let x, y;
    switch(tank.name.toLowerCase()) {
      case "player":
        x = (simulation.battlefield.minX + simulation.battlefield.maxX)/2-150;
        y = (simulation.battlefield.minY + simulation.battlefield.maxY)/2;
        tank.moveTo(x, y, 0);
        break;
      case "dummy":
        x = (simulation.battlefield.minX + simulation.battlefield.maxX)/2+150;
        y = (simulation.battlefield.minY + simulation.battlefield.maxY)/2;
        tank.moveTo(x, y, 180);
        break;
      default:
        console.log(tank.name);
    }
  });
};
modifier['challenge-Du7tyrCB'] = (simulation) => {
  simulation.tankList.forEach((tank) => {
    let x, y;
    switch(tank.name.toLowerCase()) {
      case "player":
        x = (simulation.battlefield.minX + simulation.battlefield.maxX)/2-100;
        y = (simulation.battlefield.minY + simulation.battlefield.maxY)/2-100;
        tank.moveTo(x, y, 180 + 180*Math.random());
        break;
      case "dummy":
        x = (simulation.battlefield.minX + simulation.battlefield.maxX)/2+100;
        y = (simulation.battlefield.minY + simulation.battlefield.maxY)/2+100;
        tank.moveTo(x, y, 45);
        break;
      default:
        console.log(tank.name);
    }
  });
};
modifier['challenge-4syTf6ph'] = (simulation) => {
  simulation.tankList.forEach((tank) => {
    let x, y, a;
    switch(tank.name.toLowerCase()) {
      case "player":
        x = (simulation.battlefield.minX + simulation.battlefield.maxX)/2;
        y = (simulation.battlefield.minY + simulation.battlefield.maxY)/2;
        tank.moveTo(x, y, 180 + 180*Math.random());
        break;
      case "dummy":
        a = Math.random()*2*Math.PI;
        x = (simulation.battlefield.minX + simulation.battlefield.maxX)/2+200*Math.cos(a);
        y = (simulation.battlefield.minY + simulation.battlefield.maxY)/2+200*Math.sin(a);
        tank.moveTo(x, y, a*180/Math.PI+180);
        break;
      default:
        console.log(tank.name);
    }
  });
};
modifier['challenge-hXMwLdZw'] = (simulation) => {
  simulation.tankList.forEach((tank) => {
    let x, y, a;
    switch(tank.name.toLowerCase()) {
      case "player":
        x = (simulation.battlefield.minX + simulation.battlefield.maxX)/2;
        y = (simulation.battlefield.minY + simulation.battlefield.maxY)/2;
        tank.moveTo(x, y, 180 + 180*Math.random());
        break;
      case "mover":
        a = -115;
        x = (simulation.battlefield.minX + simulation.battlefield.maxX)/2 + 140;
        y = (simulation.battlefield.minY + simulation.battlefield.maxY)/2;
        tank.moveTo(x, y, a);
        break;
      default:
        console.log(tank.name);
    }
  });
};
modifier['challenge-tV3fKHBw'] = (simulation) => {
  simulation.tankList.forEach((tank) => {
    let x, y;
    switch(tank.name.toLowerCase()) {
      case "player":
        x = (simulation.battlefield.minX + simulation.battlefield.maxX)/2 - 350;
        y = (simulation.battlefield.minY + simulation.battlefield.maxY)/2;
        tank.moveTo(x, y, 0);
        break;
      case "crawler":
        x = (simulation.battlefield.minX + simulation.battlefield.maxX)/2 - 100;
        y = (simulation.battlefield.minY + simulation.battlefield.maxY)/2;
        tank.moveTo(x, y, 0);
        break;
      default:
        console.log(tank.name);
    }
  });
};
modifier['challenge-6iZxC1FP'] = (simulation) => {
  simulation.tankList.forEach((tank) => {
    let x, y, dx;
    switch(tank.name.toLowerCase()) {
      case "player":
        x = (simulation.battlefield.minX + simulation.battlefield.maxX)/2 - 350;
        y = (simulation.battlefield.minY + simulation.battlefield.maxY)/2 - 200;
        tank.moveTo(x, y, 0);
        break;
      case "snake":
        dx = 350 - Math.random()*700;
        x = (simulation.battlefield.minX + simulation.battlefield.maxX)/2 + dx;
        y = (simulation.battlefield.minY + simulation.battlefield.maxY)/2 + 200;
        tank.moveTo(x, y, dx > 0 ? 180 : 0);
        break;
      default:
        console.log(tank.name);
    }
  });
};

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

export function getChallengeModifier(id) {
  if(modifier[id]) {
    return modifier[id];
  }
  return (() => {});
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
  }),
  getChallengeModifier,
};
