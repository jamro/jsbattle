import assert from "assert";
import sinon from "sinon";
import TankMock from "./mock/TankMock.js";
import Team from "../../src/engine/Team.js"

describe('Team', function() {
  describe('constructor', function() {

    it('should create empty team', function () {
      let team = new Team('alpha');
      assert.equal(0, team.size);
      assert.equal(0, team.members.length);
    });

    it('should set name of the team', function () {
      let team = new Team('alpha');
      assert.equal('alpha', team.name);
    });

  });

  describe('add', function() {

    it('should add tank to the team', function () {
      let team = new Team('beta');
      let tank1 = new TankMock();
      let tank2 = new TankMock();

      assert.equal(0, team.size);
      team.addTank(tank1);
      assert.equal(1, team.size);
      team.addTank(tank2);
      assert.equal(2, team.size);
    });

    it('should not add the same tank twice', function () {
      let team = new Team('gamma');
      let tank1 = new TankMock();

      assert.equal(0, team.size);
      team.addTank(tank1);
      assert.equal(1, team.size);
      team.addTank(tank1);
      assert.equal(1, team.size);
    });

  });

  describe('members', function() {

    it('should return list of all team members', function () {
      let team = new Team('zetta');
      let tank1 = new TankMock();
      let tank2 = new TankMock();

      team.addTank(tank1);
      team.addTank(tank2);
      let tanks = team.members;

      assert.equal(2, tanks.length);
      assert.equal(tank1, tanks[0]);
      assert.equal(tank2, tanks[1]);
    });

  });
});
