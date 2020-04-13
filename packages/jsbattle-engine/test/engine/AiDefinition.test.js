import assert from "assert";
import sinon from "sinon";
import AiDefinition from "../../src/engine/AiDefinition.js"

describe('AiDefinition', function() {
  describe('constructor', function() {

    it('should always enable sandbox', () => {
      let ai = new AiDefinition();
      assert(ai.useSandbox);
    });

  });

  describe('filePath', function() {

    it('should be empty for not sandboxed AIs', () => {
      let logOrig = console.warn;
      console.warn = () => {};
      let ai = new AiDefinition();
      ai.fromCode("hacker", "code");
      ai.disableSandbox();
      assert(!ai.filePath);

      console.warn = logOrig;
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

  describe('to/fromJSON', function() {
    it('should serialize and deserialize the object', () => {
      let ai = new AiDefinition();
      let json1 = {
        name: "text_" + Math.round(Math.random()*1000000),
        team: "text_" + Math.round(Math.random()*1000000),
        code: "text_" + Math.round(Math.random()*1000000),
        initData: {data: "text_" + Math.round(Math.random()*1000000)},
        useSandbox: (Math.random() > 0.5),
        executionLimit: Math.round(Math.random()*1000000)
      };
      let jsonText1 = JSON.stringify(json1);
      ai.fromJSON(json1);
      let json2 = ai.toJSON();
      let jsonText2 = JSON.stringify(json2);

      assert.equal(jsonText1, jsonText2);
    });

  });

  describe('clone', function() {
    it('should duplicate the object', () => {
      let ai1 = new AiDefinition();
      let json1 = ai1.toJSON();
      let jsonText1 = JSON.stringify(json1);

      let ai2 = ai1.clone();
      let json2 = ai2.toJSON();
      let jsonText2 = JSON.stringify(json2);

      assert.equal(jsonText1, jsonText2);

    });
  });

});
