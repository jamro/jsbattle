'use strict';

var SUSSPEND_AI_SANDBOX_WARNING = false;

/**
 * Describes AI algorithm of the tank. There could be two sources of AI scripts:
 * files or string variable. Depending on source of scripts `fromFile()` or `fromCode()`
 * methods should be used to initialize the object
 */
class AiDefinition {

  /**
   * Creates AiDefinition. Constructor is not available outside of
   * `JsBattle.min.js` library. To create AiDefinition object use
   * `JsBattle.createAiDefinition()` instead
   */
  constructor() {
    let uid = (new Date()).getTime().toString();
    uid = uid.substr(uid.length-6, 6) + "" + Math.round(10000000*Math.random());
    uid = Number(uid);
    uid = uid.toString(35);
    this._name = "";
    this._team = uid;
    this._code = null;
    this._initData = null;
    this._useSandbox = true;
    this._executionLimit = 100;
  }

  /**
   * @return JSON representation of AiDefiniton
   */
  toJSON() {
    return {
      name: this._name,
      team: this._team,
      code: this._code,
      initData: this._initData,
      useSandbox: this._useSandbox,
      executionLimit: this.executionLimit
    };
  }

  /**
   * @param {object} data - JSON data to be parsed
   */
  fromJSON(data) {
    this._name = data.name;
    this._team = data.team;
    this._code = data.code;
    this._initData = data.initData;
    this._useSandbox = data.useSandbox;
    this._executionLimit = data.executionLimit;
  }

  /**
   * @return copy of the object
   */
  clone() {
    let result = new AiDefinition();
    result.fromJSON(this.toJSON());
    return result;
  }

  /**
   * @return name of the AI. The same name will be assigned to the tank
   */
  get name() {
    return this._name;
  }

  /**
   * @return name of the team
   */
  get teamName() {
    return this._team;
  }

  /**
   * @return Maximum time for execution of AI script (in milliseconds)
   */
  get executionLimit() {
    return this._executionLimit;
  }

  /**
   * @param {Number} limit -  Maximum time for execution of AI script (in milliseconds)
   */
  set executionLimit(v) {
    this._executionLimit = v;
  }

  /**
   * @return path to file with code of Web Worker where the AI will be ran.
   */
  get filePath() {
    if(!this._useSandbox) return null;
    if(this._code) {
      return "tanks/lib/codeWorker.js";
    } else {
      return `tanks/${this._name}.tank.js`;
    }
  }

  /**
   * @return source code of AI algorithm as a string. This property is not empty only for AIs created by `fromCode()` call
   * @see AiDefinition.fromCode()
   */
  get code() {
    return this._code;
  }

  /**
   * @return optional initial data that is passed to the AI and can be accessed from tank info object (`info.initData`)
   */
  get initData() {
    return this._initData;
  }

  /**
   * @return true if AI should be sandboxed. Otherwise false. By default, all AIs are sandboxed.
   */
  get useSandbox() {
    return this._useSandbox;
  }

  /**
   * Creates AI definition that has source codes in a file. All AI scripts
   * are kept in `/tanks/[tankName].tank.js` files
   * @param {String} tankName - name of the tank. Its source code is kept in `/tanks/[tankName].tank.js`
   * @param {object} initData - optional initial data that is passed to the AI and can be accessed from tank info object (`info.initData`)
   */
  fromFile(tankName, initData) {
    if(!tankName) throw "tankName is required";
    this._name = tankName;
    this._code = null;
    this._initData = initData !== undefined ? initData : null;
  }

  /**
   * Creates AI definition that has the algorithm codded in provided in string parameter.
   * @param {String} tankName - name of the tank.
   * @param {String} code - JavaScript code of AI script.
   * @param {object} initData - optional initial data that is passed to the AI and can be accessed from tank info object (`info.initData`)
   */
  fromCode(tankName, code, initData) {
    if(!tankName) throw "tankName is required";
    if(code === undefined) throw "Code is required";
    code = code.replace(/importScripts\w*\([^\)]*\)/g, '');
    this._name = tankName;
    this._code = code;
    this._initData = initData !== undefined ? initData : null;
  }

  /**
   * Set name of the team. Tanks from the same team can coomunicate with eachother and cooperate
   * @param {string} name - unique name of the team
   */
  assignToTeam(teamName) {
    this._team = teamName;
  }

  /**
   * Allows to running code of AI in the same sandbox as the core of JsBattle game. It is
   * potentially dangerous since code of AI Script can access code of JS Battle and
   * influence it. However disabling sandbox can significantly increase performance
   * (especially if you run several simulations in concurrent). Use this approach
   * only for trusted AI code.
   */
  disableSandbox() {
    if(!this._code) {
      throw "Sandbox can be disabled for AI created from code only.";
    }
    if(!SUSSPEND_AI_SANDBOX_WARNING) {
      console.warn("Disabling sandbox for AI! It could be dangerous.");
      SUSSPEND_AI_SANDBOX_WARNING = true;
    }
    this._useSandbox = false;
  }

}

export default AiDefinition;
