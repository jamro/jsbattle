'use strict';

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
    this._name = "";
    this._code = null;
    this._initData = null;
  }

  /**
   * @return name of the AI. The same name will be assigned to the tank
   */
  get name() {
    return this._name;
  }

  /**
   * @return source code of AI algorithm as a string. This property is not empty only for AIs created by `fromCode()` call
   * @see AiDefinition.fromCode()
   */
  get code() {
    return this._code;
  }

  /**
   * @return optional initial data that is passed to the AI and can be accessed from tank settings object (`settings.initData`)
   */
  get initData() {
    return this._initData;
  }

  /**
   * Creates AI definition that has source codes in a file. All AI scripts
   * are kept in `/tanks/[tankName].tank.js` files
   * @param {String} tankName - name of the tank. Its source code is kept in `/tanks/[tankName].tank.js`
   * @param {object} initData - optional initial data that is passed to the AI and can be accessed from tank settings object (`settings.initData`)
   */
  fromFile(tankName, initData) {
    this._name = tankName;
    this._initData = initData !== undefined ? initData : null;
  }

  /**
   * Creates AI definition that has the algorithm codded in provided in string parameter.
   * @param {String} tankName - name of the tank.
   * @param {String} code - JavaScript code of AI script.
   * @param {object} initData - optional initial data that is passed to the AI and can be accessed from tank settings object (`settings.initData`)
   */
  fromCode(tankName, code, initData) {
    this._name = tankName;
    this._code = code;
    this._initData = initData !== undefined ? initData : null;
  }


}

module.exports = AiDefinition;
