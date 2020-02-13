export function getChallengeList() {
  return require('./challenges.json');
}

export function getChallengeModifier(id) {
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
  if(modifier[id]) {
    return modifier[id];
  }
  return (() => {});
}
