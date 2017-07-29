var assert = require('assert');
var sinon = require('sinon');
var Battlefield = require('../app/scripts/Battlefield.js');

describe('Battlefield', function() {
  describe('setSize', function() {

    it('should set size of the field', function() {
      var battlefield = new Battlefield();
      battlefield.setSize(234, 567);
      assert.equal(234-battlefield.margin*2, battlefield.width);
      assert.equal(567-battlefield.margin*2, battlefield.height);

      assert.equal(battlefield.offsetX + battlefield.margin, battlefield.minX);
      assert.equal(battlefield.offsetY + battlefield.margin, battlefield.minY);
      assert.equal(battlefield.offsetX + 234 - battlefield.margin, battlefield.maxX);
      assert.equal(battlefield.offsetY + 567 - battlefield.margin, battlefield.maxY);
    });

    it('should offet coordinates randomly', function() {
      var battlefield1 = new Battlefield();
      var battlefield2 = new Battlefield();

      var offset1 = battlefield1.offsetX + ":" + battlefield1.offsetY;
      var offset2 = battlefield2.offsetX + ":" + battlefield2.offsetY;
      assert.notEqual(offset1, offset2);
    });

    it('should prepare starting slots', function() {
      var battlefield = new Battlefield();
      battlefield.setSize(500, 500);

      var slot = battlefield.getStartSlot();

      assert(slot);
      assert(slot.x < battlefield.maxX);
      assert(slot.y < battlefield.maxY);
      assert(slot.x > battlefield.minX);
      assert(slot.y > battlefield.minY);
    });

    it('should prepare enough starting slots', function() {
      var battlefield = new Battlefield();
      battlefield.setSize(1000, 1000);

      var slotCount = 0;
      while(battlefield.getStartSlot()) slotCount++;

      assert(slotCount > 80);
      assert(slotCount < 200);
    });

  });

  describe('getStartSlot', function() {

    it('should return random starting slot', function() {
      var battlefield = new Battlefield();
      battlefield.setSize(500, 500);

      var slot1 = battlefield.getStartSlot();
      var slot2 = battlefield.getStartSlot();

      assert.notEqual(slot1.x + ":" + slot1.y, slot2.x + ":" + slot2.y);
    });

  });
});
