'use strict';

import SAT from 'SAT';

export default class CollisionResolver {

  constructor() {
    this._wallList = [];
    this._tankMap = [];
    this._bulletMap = [];
    this._radarBeamMap = [];
    this._battlefield = null;
  }

  updateBattlefield(battlefield) {
    this._battlefield = {
      minX: battlefield.minX,
      minY: battlefield.minY,
      maxX: battlefield.maxX,
      maxY: battlefield.maxY
    };
    let wall;
    wall = (new SAT.Box(new SAT.Vector(battlefield.minX-10, battlefield.minY), 10, battlefield.height)).toPolygon();
    this._wallList.push(wall);
    wall = (new SAT.Box(new SAT.Vector(battlefield.minX, battlefield.minY-10), battlefield.width, 10)).toPolygon();
    this._wallList.push(wall);
    wall = (new SAT.Box(new SAT.Vector(battlefield.maxX, battlefield.minY), 10, battlefield.height)).toPolygon();
    this._wallList.push(wall);
    wall = (new SAT.Box(new SAT.Vector(battlefield.minX, battlefield.maxY), battlefield.width, 10)).toPolygon();
    this._wallList.push(wall);
  }

  updateTank(tank) {
    let tankShape =  this._getTankShape(tank);
    tankShape.pos.x = tank.x;
    tankShape.pos.y = tank.y;
  }

  removeBullet(bullet) {
    this._bulletMap[bullet.id] = null;
  }


  removeTank(tank) {
    this._tankMap[tank.id] = null;
    this._radarBeamMap[tank.id] = null;
  }

  hitTestBullet(bullet) {
    let bulletShape =  this._getBulletShape(bullet);
    let tankShape =  bullet.owner.energy ? this._getTankShape(bullet.owner) : null;

    bulletShape.pos.x = bullet.x;
    bulletShape.pos.y = bullet.y;

    let i;
    let hitTest;
    let wall;
    for(i in this._wallList ) {
      wall = this._wallList[i];
      hitTest = SAT.testCirclePolygon(bulletShape, wall);
      if(hitTest) {
        bullet.onWallHit();
        return true;
      }
    }
    let enemyShape;
    for(i in this._tankMap ) {
      enemyShape = this._tankMap[i];
      if(!enemyShape) continue;
      if(enemyShape == tankShape) {
        continue;
      }
      hitTest = SAT.testCircleCircle(bulletShape, enemyShape);
      if(hitTest) {
        let energyBefore = enemyShape.tank.energy;
        bullet.onEnemyHit(enemyShape.tank);
        bullet.owner.onEnemyHitScore(energyBefore - enemyShape.tank.energy);
        if(enemyShape.tank.energy == 0) {
          bullet.owner.onEnemyKillScore();
        }
        return true;
      }
    }
    return false;
  }

  checkTank(tank) {
    let tankShape =  this._getTankShape(tank);

    tankShape.pos.x = tank.x;
    tankShape.pos.y = tank.y;

    let i;
    let hitTest;
    let wall;
    for(i in this._wallList ) {
      wall = this._wallList[i];
      hitTest = SAT.testCirclePolygon(tankShape, wall);
      if(hitTest) {
        tank.onWallHit();
        return false;
      }
    }
    let enemyShape;
    for(i in this._tankMap ) {
      enemyShape = this._tankMap[i];
      if(!enemyShape) continue;
      if(enemyShape == tankShape) {
        continue;
      }
      hitTest = SAT.testCircleCircle(tankShape, enemyShape);
      let areAllies = tank.isAlly(enemyShape.tank);
      if(hitTest) {
        if(!areAllies) {
          let energyBefore = enemyShape.tank.energy;
          tank.onEnemyHit();
          enemyShape.tank.onBeingRam(tank.speed);
          tank.onEnemyHitScore(energyBefore - enemyShape.tank.energy);
          return false;
        } else {
          tank.onAllyHit();
          return false;
        }
      }
    }
    return true;
  }

  scanTanks(tank) {
    let radarBeamShape =  this._getRadarBeamShape(tank);
    let tankShape =  this._getTankShape(tank);
    radarBeamShape.setAngle((tank.angle + tank.radarAngle)*Math.PI/180);
    radarBeamShape.pos.x = tank.x;
    radarBeamShape.pos.y = tank.y;

    let i;
    let enemyShape;
    let hitTest;
    let enemies = [];

    for(i in this._tankMap ) {
      enemyShape = this._tankMap[i];
      if(!enemyShape) continue;
      if(enemyShape == tankShape) {
        continue;
      }
      hitTest = SAT.testPolygonCircle(radarBeamShape, enemyShape);
      if(hitTest) {
        enemies.push(enemyShape.tank);
      }
    }
    if(enemies.length == 0) {
      return false;
    }
    let closestEnemy = null;
    let closestEnemyDistance = tank.radarRange;
    let closestAlly = null;
    let closestAllyDistance = tank.radarRange;
    let d, dx, dy, ally;
    for(i in enemies ) {
      dx = enemies[i].x - tank.x;
      dy = enemies[i].y - tank.y;
      d = Math.sqrt(dx*dx + dy*dy);
      ally = enemies[i].isAlly(tank);
      if(!ally && (!closestEnemy || d < closestEnemyDistance)) {
        closestEnemy = enemies[i];
        closestEnemyDistance = d;
      } else if(ally && (!closestAlly || d < closestAllyDistance)) {
        closestAlly = enemies[i];
        closestAllyDistance = d;
      }
    }
    if(closestAlly) {
      tank.onAllySpot(closestAlly);
    }
    if(closestEnemy) {
      tank.onEnemySpot(closestEnemy);
      closestEnemy.onTargetingAlarm();
    }


    return true;
  }

  scanBullets(tank) {
    let radarBeamShape =  this._getRadarBeamShape(tank);
    radarBeamShape.setAngle((tank.angle + tank.radarAngle)*Math.PI/180);
    radarBeamShape.pos.x = tank.x;
    radarBeamShape.pos.y = tank.y;

    let i;
    let hitTest;
    let bulletShape;
    let spottedBullets = false;

    for(i in this._bulletMap) {
      bulletShape = this._bulletMap[i];
      if(!bulletShape) continue;
      if(bulletShape.bullet.owner == tank) continue;
      hitTest = SAT.testCirclePolygon(bulletShape, radarBeamShape);
      if(hitTest) {
        tank.onBulletSpot(bulletShape.bullet);
        spottedBullets = true;
      }
    }

    return spottedBullets;
  }


  scanWalls(tank) {
    let distance = this._getWallDistance(tank);
    if(distance < tank.radarRange) {
      tank.onWallSpot(distance);
      return true;
    }
    return false;
  }

  _getWallDistance(tank) {
    let angle = tank.angle + tank.radarAngle;
    while(angle > 180) angle -= 360;
    while(angle < -180) angle += 360;

    let distanceNorth = tank.y - this._battlefield.minY;
    let distanceSouth = this._battlefield.maxY - tank.y;
    let distanceWest = tank.x - this._battlefield.minX;
    let distanceEast = this._battlefield.maxX - tank.x;

    if(angle == -180 || angle == 180) { // W
      return distanceWest;
    } else if(angle == 0) { // E
      return distanceEast;
    } else if(angle == -90) { // N
      return distanceNorth;
    } else if(angle == 90) { // S
      return  distanceSouth;
    }

    let d1, d2;

    if(angle > -180 && angle < -90) { // NW
      d1 = distanceWest / Math.cos((angle+180)*(Math.PI/180));
      d2 = distanceNorth / Math.sin((angle+180)*(Math.PI/180));
    } else if(angle > -90 && angle < 0) { // NE
      d1 = distanceEast / Math.cos((-angle)*(Math.PI/180));
      d2 = distanceNorth / Math.sin((-angle)*(Math.PI/180));
    } else if(angle > 0 && angle < 90) { // SE
      d1 = distanceEast / Math.cos((angle)*(Math.PI/180));
      d2 = distanceSouth / Math.sin((angle)*(Math.PI/180));
    } else { // SW
      d1 = distanceWest / Math.cos((180-angle)*(Math.PI/180));
      d2 = distanceSouth / Math.sin((180-angle)*(Math.PI/180));
    }

    return Math.min(d1, d2);
  }

  _getTankShape(tank) {
    if(!this._tankMap[tank.id]) {
      if(tank.energy == 0) {
        throw "Cannot create shape for destroyed tank";
      }
      let shape = new SAT.Circle(new SAT.Vector(tank.x,tank.y), 18);
      this._tankMap[tank.id] = shape;
      shape.tank = tank;
    }
    return this._tankMap[tank.id];
  }

  _getBulletShape(bullet) {
    if(!this._bulletMap[bullet.id]) {
      if(bullet.exploded) {
        throw "Cannot create shape for exploded bullet";
      }
      let shape = new SAT.Circle(new SAT.Vector(bullet.x,bullet.y), 3);
      this._bulletMap[bullet.id] = shape;
      shape.bullet = bullet;
    }
    return this._bulletMap[bullet.id];
  }

  _getRadarBeamShape(tank) {
    if(!this._radarBeamMap[tank.id]) {
      if(tank.energy == 0) {
        throw "Cannot create radar beam shape for destroyed tank";
      }
      let width = tank.radarRange * Math.tan(tank.radarFocal*(Math.PI/180))/2;
      let shape = new SAT.Polygon(new SAT.Vector(tank.x, tank.y), [
        new SAT.Vector(0, 3),
        new SAT.Vector(0, -3),
        new SAT.Vector(tank.radarRange,-width),
        new SAT.Vector(tank.radarRange,width)
      ]);

      this._radarBeamMap[tank.id] = shape;
      shape.tank = tank;
    }
    return this._radarBeamMap[tank.id];
  }

}
