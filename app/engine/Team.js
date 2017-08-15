'use strict';

class Team {
  constructor(name) {
    this._name = name;
    this._members = [];
    this._inboxMap = [];
    this._outboxMap = [];
  }

  addTank(tank) {
    if(tank.team) throw "Tank " + tank.fullName + " is already assigned to team " + tank.team.name;
    for(var i in this._members) {
      if(this._members[i].id == tank.id) return;
    }
    this._members.push(tank);
    tank._team = this;
    this._inboxMap[tank.id] = [];
    this._outboxMap[tank.id] = [];
  }

  get size() {
    return this._members.length;
  }

  get name() {
    return this._name;
  }

  get aliveCount() {
    var count = 0;
    for(var i=0; i < this._members.length; i++ ) {
      if(this._members[i].energy > 0) {
        count++;
      }
    }
    return count;
  }

  get score() {
    var sum = 0;
    for(var i=0; i < this._members.length; i++ ) {
      sum += this._members[i].score;
    }
    return sum;
  }

  get energy() {
    var sum = 0;
    for(var i=0; i < this._members.length; i++ ) {
      sum += this._members[i].energy;
    }
    return sum;
  }
  
  get maxEnergy() {
    var sum = 0;
    for(var i=0; i < this._members.length; i++ ) {
      sum += this._members[i].maxEnergy;
    }
    return sum;
  }

  get isAlive() {
    return this.aliveCount > 0;
  }

  get members() {
    return this._members;
  }

  getMessages(receiverId) {
    return this._outboxMap[receiverId];
  }

  sendMessages(senderId, messages) {
    for(var i in this._inboxMap) {
      if(i == senderId) continue;
      this._inboxMap[i] = this._inboxMap[i].concat(messages);
    }
  }

  processMessages() {
    var i;
    for(i in this._inboxMap) {
      this._outboxMap[i] = this._inboxMap[i];
      this._inboxMap[i] = [];
    }
  }

}

module.exports = Team;
