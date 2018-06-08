import assert from "assert";
import sinon from "sinon";
import UltimateBattleDescriptor from "../../app/engine/UltimateBattleDescriptor.js"
import AiDefinitionMock from "./mock/AiDefinitionMock.js";

describe('UltimateBattleDescriptor', function() {
  describe('constructor', function() {

    it('should create empty descriptor with current version', function () {
      let desc = new UltimateBattleDescriptor();
      assert.equal(2, desc.getVersion());
      assert.equal(0, desc.getAiList().length);
    });
  });


  describe('setRngSeed', function() {
    it('should change RngSeed', function () {
      let desc = new UltimateBattleDescriptor();
      desc.setRngSeed(2);
      assert.equal(2, desc.getRngSeed());
      desc.setRngSeed(-2932);
      assert.equal(-2932, desc.getRngSeed());
      desc.setRngSeed(0.352);
      assert.equal(0.352, desc.getRngSeed());
    });
  });

  describe('addAiDefinition', function() {
    it('should add AI to the list', function () {
      let desc = new UltimateBattleDescriptor();
      desc.addAiDefinition(new AiDefinitionMock("tank1"));
      desc.addAiDefinition(new AiDefinitionMock("tank2"));
      desc.addAiDefinition(new AiDefinitionMock("tank3"));
      assert.equal(3, desc.getAiList().length);
      assert.equal("tank1", desc.getAiList()[0].name);
      assert.equal("tank2", desc.getAiList()[1].name);
      assert.equal("tank3", desc.getAiList()[2].name);
    });
  });


  describe('clone', function() {
    it('should copy the descriptor', function() {
      let desc = new UltimateBattleDescriptor();
      desc.setRngSeed(342);
      desc.setTeamMode(true);
      desc.addAiDefinition(new AiDefinitionMock("tank1"));
      desc.addAiDefinition(new AiDefinitionMock("tank2"));
      let clone = desc.clone();

      desc.addAiDefinition(new AiDefinitionMock("tank3"));
      desc.setRngSeed(111);

      assert.equal(342, clone.getRngSeed());
      assert.equal(2, clone.getAiList().length);
      assert.equal(desc.getVersion(), clone.getVersion());
      assert.equal(true, clone.getTeamMode());

    });

    it('should make deep copy of AiDefinitions', function() {
      let desc = new UltimateBattleDescriptor();
      let ai1 = new AiDefinitionMock("tank1");
      let ai2 = new AiDefinitionMock("tank2");
      desc.setRngSeed(342);
      desc.addAiDefinition(ai1);
      desc.addAiDefinition(ai2);
      desc.clone();

      assert.equal(true, ai1.clone.called);
      assert.equal(true, ai2.clone.called);
    });

  });

  describe('encode/decode', function() {
    it('should serialize the object', function() {
      let desc = new UltimateBattleDescriptor();

      desc.addAiDefinition(new AiDefinitionMock("tank1"));
      desc.addAiDefinition(new AiDefinitionMock("tank2"));
      desc.addAiDefinition(new AiDefinitionMock("tank3"));
      desc.setRngSeed(87);

      let raw = desc.encode();
      assert(raw.length >= 10, "serialized data is shorter than 10 characters");
    });

    it('should be reversable', function() {
      let desc = new UltimateBattleDescriptor();
      let ai1 = new AiDefinitionMock("tank1");
      let ai2 = new AiDefinitionMock("tank2");
      desc.addAiDefinition(ai1);
      desc.addAiDefinition(ai2);
      desc.setRngSeed(87);

      let raw = desc.encode();
      desc = new UltimateBattleDescriptor();
      desc.decode(raw);

      assert.equal(2, desc.getAiList().length);
      assert.equal(87, desc.getRngSeed());

      assert.equal(true, ai1.toJSON.called);
      assert.equal(true, ai2.toJSON.called);

    });

    it('should throw an error when version does not match', function() {
      let desc = new UltimateBattleDescriptor();
      desc._version = 1000000000;
      let raw = desc.encode();
      desc = new UltimateBattleDescriptor();
      assert.throws(function() {
        desc.decode(raw);
      })
    });

    it('should throw an error when serial data is corrupted', function() {
      let desc = new UltimateBattleDescriptor();
      assert.throws(function() {
        desc.decode("safdasdfs");
      })
    })
  });

  describe('setTeamMode', function() {
    it('should have team mode off by default', function() {
      let desc = new UltimateBattleDescriptor();

      assert.equal(false, desc.getTeamMode());
    });

    it('should set team mode on/off', function() {
      let desc = new UltimateBattleDescriptor();

      desc.setTeamMode(true);
      assert.equal(true, desc.getTeamMode());

      desc.setTeamMode(false);
      assert.equal(false, desc.getTeamMode());
    });
  });
});
