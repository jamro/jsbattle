'use strict';

var SAT = require('SAT');

module.exports = class CollisionResolver {

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
    var wall;
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
    var tankShape =  this._getTankShape(tank);
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
    var bulletShape =  this._getBulletShape(bullet);
    var tankShape =  bullet.owner.energy ? this._getTankShape(bullet.owner) : null;

    bulletShape.pos.x = bullet.x;
    bulletShape.pos.y = bullet.y;

    var i;
    var hitTest;
    var wall;
    for(i in this._wallList ) {
      wall = this._wallList[i];
      hitTest = SAT.testCirclePolygon(bulletShape, wall);
      if(hitTest) {
        bullet.onWallHit();
        return true;
      }
    }
    var enemyShape;
    for(i in this._tankMap ) {
      enemyShape = this._tankMap[i];
      if(!enemyShape) continue;
      if(enemyShape == tankShape) {
        continue;
      }
      hitTest = SAT.testCircleCircle(bulletShape, enemyShape);
      if(hitTest) {
        var energyBefore = enemyShape.tank.energy;
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
    var tankShape =  this._getTankShape(tank);

    tankShape.pos.x = tank.x;
    tankShape.pos.y = tank.y;

    var i;
    var hitTest;
    var wall;
    for(i in this._wallList ) {
      wall = this._wallList[i];
      hitTest = SAT.testCirclePolygon(tankShape, wall);
      if(hitTest) {
        tank.onWallHit();
        return false;
      }
    }
    var enemyShape;
    for(i in this._tankMap ) {
      enemyShape = this._tankMap[i];
      if(!enemyShape) continue;
      if(enemyShape == tankShape) {
        continue;
      }
      hitTest = SAT.testCircleCircle(tankShape, enemyShape);
      if(hitTest) {
        var energyBefore = enemyShape.tank.energy;
        tank.onEnemyHit();
        enemyShape.tank.onBeingRam(tank.speed);
        tank.onEnemyHitScore(energyBefore - enemyShape.tank.energy);
        return false;
      }
    }
    return true;
  }

  scanTanks(tank) {
    var radarBeamShape =  this._getRadarBeamShape(tank);
    var tankShape =  this._getTankShape(tank);
    radarBeamShape.setAngle((tank.angle + tank.radarAngle)*Math.PI/180);
    radarBeamShape.pos.x = tank.x;
    radarBeamShape.pos.y = tank.y;

    var i;
    var enemyShape;
    var hitTest;
    var enemies = [];

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
    var closestEnemy = null;
    var closestDistance = tank.radarRange;
    var d, dx, dy;
    for(i in enemies ) {
      dx = enemies[i].x - tank.x;
      dy = enemies[i].y - tank.y;
      d = Math.sqrt(dx*dx + dy*dy);
      if(!closestEnemy || d < closestDistance) {
        closestEnemy = enemies[i];
        closestDistance = d;
      }
    }
    tank.onEnemySpot(closestEnemy);
    closestEnemy.onTargetingAlarm();

    return true;
  }

  scanBullets(tank) {
    var radarBeamShape =  this._getRadarBeamShape(tank);
    var tankShape =  this._getTankShape(tank);
    radarBeamShape.setAngle((tank.angle + tank.radarAngle)*Math.PI/180);
    radarBeamShape.pos.x = tank.x;
    radarBeamShape.pos.y = tank.y;

    var i;
    var hitTest;
    var bulletShape;
    var spottedBullets = false;

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
    var distance = this._getWallDistance(tank);
    if(distance < tank.radarRange) {
      tank.onWallSpot(distance);
      return true;
    }
    return false;
  }

  _getWallDistance(tank) {
    var angle = tank.angle + tank.radarAngle;
    while(angle > 180) angle -= 360;
    while(angle < -180) angle += 360;

    var distanceNorth = tank.y - this._battlefield.minY;
    var distanceSouth = this._battlefield.maxY - tank.y;
    var distanceWest = tank.x - this._battlefield.minX;
    var distanceEast = this._battlefield.maxX - tank.x;

    if(angle == -180 || angle == 180) { // W
      return distanceWest;
    } else if(angle == -0 || angle == 180) { // E
      return distanceEast;
    } else if(angle == -90) { // N
      return distanceNorth;
    } else if(angle == 90) { // S
      return  distanceSouth;
    }

    var d1, d2;

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
      var shape = new SAT.Circle(new SAT.Vector(tank.x,tank.y), 18);
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
      var shape = new SAT.Circle(new SAT.Vector(bullet.x,bullet.y), 3);
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
      var width = tank.radarRange * Math.tan(tank.radarFocal*(Math.PI/180))/2;
      var shape = new SAT.Polygon(new SAT.Vector(tank.x, tank.y), [
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

};
