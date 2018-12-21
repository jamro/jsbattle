import assert from "assert";
import sinon from "sinon";
import Battlefield from "../../app/engine/Battlefield.js"

describe('Battlefield', function() {
  describe('setSize', function() {

    it('should set size of the field', function() {
      let battlefield = new Battlefield();
      battlefield.setSize(234, 567);
      assert.equal(234-battlefield.margin*2, battlefield.width);
      assert.equal(567-battlefield.margin*2, battlefield.height);

      assert.equal(battlefield.offsetX + battlefield.margin, battlefield.minX);
      assert.equal(battlefield.offsetY + battlefield.margin, battlefield.minY);
      assert.equal(battlefield.offsetX + 234 - battlefield.margin, battlefield.maxX);
      assert.equal(battlefield.offsetY + 567 - battlefield.margin, battlefield.maxY);
    });

  });

  describe('getStartSlot', function() {

    it('should return random starting slot', function() {
      let battlefield = new Battlefield();
      battlefield.setSize(500, 500);
      battlefield.randomize();

      let slot1 = battlefield.getStartSlot();
      let slot2 = battlefield.getStartSlot();

      assert.notEqual(slot1.x + ":" + slot1.y, slot2.x + ":" + slot2.y);
    });

  });

  describe('randomize', function() {

    it('should return the same order of slots when seeded', function() {
      let battlefield1 = new Battlefield();
      let battlefield2 = new Battlefield();
      battlefield1.setSize(500, 500);
      battlefield2.setSize(500, 500);
      battlefield1.randomize(1234);
      battlefield2.randomize(1234);

      let slotList1 = JSON.stringify([battlefield1.getStartSlot(), battlefield1.getStartSlot(), battlefield1.getStartSlot()]);
      let slotList2 = JSON.stringify([battlefield2.getStartSlot(), battlefield2.getStartSlot(), battlefield2.getStartSlot()]);

      assert.equal(slotList1, slotList2);
    });

    it('should return different order of slots when not seeded', function() {
      let battlefield1 = new Battlefield();
      let battlefield2 = new Battlefield();
      battlefield1.setSize(500, 500);
      battlefield2.setSize(500, 500);
      battlefield1.randomize();
      battlefield2.randomize();

      let slotList1 = JSON.stringify([battlefield1.getStartSlot(), battlefield1.getStartSlot(), battlefield1.getStartSlot()]);
      let slotList2 = JSON.stringify([battlefield2.getStartSlot(), battlefield2.getStartSlot(), battlefield2.getStartSlot()]);

      assert.notEqual(slotList1, slotList2);
    });


    it('should return the same order of slots when seeded differently', function() {
      let battlefield1 = new Battlefield();
      let battlefield2 = new Battlefield();
      battlefield1.setSize(500, 500);
      battlefield2.setSize(500, 500);
      battlefield1.randomize(4321);
      battlefield2.randomize(1234);

      let slotList1 = JSON.stringify([battlefield1.getStartSlot(), battlefield1.getStartSlot(), battlefield1.getStartSlot()]);
      let slotList2 = JSON.stringify([battlefield2.getStartSlot(), battlefield2.getStartSlot(), battlefield2.getStartSlot()]);

      assert.notEqual(slotList1, slotList2);
    });

    it('should not offset coordinates randomly', function() {
      let battlefield1 = new Battlefield();
      let battlefield2 = new Battlefield();

      let offset1 = battlefield1.offsetX + ":" + battlefield1.offsetY;
      let offset2 = battlefield2.offsetX + ":" + battlefield2.offsetY;
      assert.equal(offset1, offset2);
    });

    it('should prepare starting slots', function() {
      let battlefield = new Battlefield();
      battlefield.setSize(500, 500);
      battlefield.randomize();

      let slot = battlefield.getStartSlot();

      assert(slot);
      assert(slot.x < battlefield.maxX);
      assert(slot.y < battlefield.maxY);
      assert(slot.x > battlefield.minX);
      assert(slot.y > battlefield.minY);
    });

    it('should prepare enough starting slots', function() {
      let battlefield = new Battlefield();

      battlefield.setSize(1000, 1000);
      battlefield.randomize();
      
      let slotCount = 0;
      while(battlefield.getStartSlot()) slotCount++;

      assert(slotCount > 80);
      assert(slotCount < 200);
    });

  });
});
