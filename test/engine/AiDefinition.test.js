import assert from "assert";
import sinon from "sinon";
import AiDefinition from "../../app/engine/AiDefinition.js"

describe('AiDefinition', function() {
  describe('constructor', function() {

    it('should always enable sandbox', () => {
      let ai = new AiDefinition();
      assert(ai.useSandbox);
    });

  });

  describe('filePath', function() {

    it('should be empty for not sandboxed AIs', () => {
      let ai = new AiDefinition();
      ai.fromCode("hacker", "code");
      ai.disableSandbox();
      assert(!ai.filePath);
    });

    it('should lead to codeWorker.js for AIs from code', () => {
      let ai = new AiDefinition();
      ai.fromCode("hacker", "code");
      assert.equal('tanks/lib/codeWorker.js', ai.filePath);
    });

    it('should lead to /tanks/[tankName].tank.js for AIs from files', () => {
      let ai = new AiDefinition();
      ai.fromFile("roger");
      assert.equal('tanks/roger.tank.js', ai.filePath);
    });

  });

  describe('fromFile', function() {

    it('should have no code', () => {
      let ai = new AiDefinition();
      ai.fromFile("roger");
      assert(!ai.code);
    });

  });


  describe('fromCode', function() {

    it('should strip importScripts commands', () => {
      let ai = new AiDefinition();
      ai.fromCode("hacker", "importScripts('whatever')var code = 1;");
      assert.equal("var code = 1;", ai.code);
    });

  });

  describe('disableSandbox', function() {

    it('should thorw error if this is not fromCode AI', () => {
      assert.throws(() => {
        let ai = new AiDefinition();
        ai.fromFile("roger");
        ai.disableSandbox();
      })
    });

  });

});
