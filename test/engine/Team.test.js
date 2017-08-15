var assert = require('assert');
var sinon = require('sinon');
var TankMock = require('./mock/TankMock.js');
var Team = require('../../app/engine/Team.js');

describe('Team', function() {
  describe('constructor', function() {

    it('should create empty team', function () {
      var team = new Team('alpha');
      assert.equal(0, team.size);
      assert.equal(0, team.members.length);
    });

    it('should set name of the team', function () {
      var team = new Team('alpha');
      assert.equal('alpha', team.name);
    });

  });

  describe('add', function() {

    it('should add tank to the team', function () {
      var team = new Team('beta');
      var tank1 = new TankMock();
      var tank2 = new TankMock();

      assert.equal(0, team.size);
      team.addTank(tank1);
      assert.equal(1, team.size);
      team.addTank(tank2);
      assert.equal(2, team.size);
    });

    it('should not add the same tank twice', function () {
      var team = new Team('gamma');
      var tank1 = new TankMock();

      assert.equal(0, team.size);
      team.addTank(tank1);
      assert.equal(1, team.size);
      team.addTank(tank1);
      assert.equal(1, team.size);
    });

  });

  describe('members', function() {

    it('should return list of all team members', function () {
      var team = new Team('zetta');
      var tank1 = new TankMock();
      var tank2 = new TankMock();

      team.addTank(tank1);
      team.addTank(tank2);
      var tanks = team.members;

      assert.equal(2, tanks.length);
      assert.equal(tank1, tanks[0]);
      assert.equal(tank2, tanks[1]);
    });

  });
});
