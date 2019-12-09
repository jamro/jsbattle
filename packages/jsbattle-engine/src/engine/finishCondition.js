'use strict';

function finishCondition(simulaiton) {
  let teamsLeft = 0;
  for(let i in simulaiton._teamMap) {
    if(!simulaiton._teamMap[i].isAlive) continue;
    teamsLeft++;
  }
  return (teamsLeft <= 1);
}

export default finishCondition;
