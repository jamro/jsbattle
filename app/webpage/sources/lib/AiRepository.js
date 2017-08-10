var generateName = require('sillyname');

module.exports = class AiRepository {

  constructor() {
    var storedScripts = localStorage.getItem('aiRepository.scriptMap');
    this._scriptMap = storedScripts ? JSON.parse(storedScripts) : {};
    this._reservedNames = [];
  }

  isNameAllowed(name) {
    if(name.length < 3) return false;
    return !this._scriptMap[name] && this._reservedNames.indexOf(name) == -1;
  }

  getRandomScriptName(simple) {
    if(simple) {
      return generateName.randomNoun().toLowerCase();
    } else {
      return generateName.randomAdjective().toLowerCase() + generateName.randomNoun();
    }
  }

  getScript(name) {
    if(!this._scriptMap[name]) {
      throw "Script " + name + " does not exists";
    }
    return JSON.parse(JSON.stringify(this._scriptMap[name]));
  }

  createScript(name) {
    if(!this.isNameAllowed(name)) {
      throw "Name " + name + " is not allowed for AI script";
    }
    this._scriptMap[name] = {
      name: name,
      code: "importScripts(\'lib\/tank.js\');\r\n\r\n\/\/ Don\'t know where to start?\r\n\/\/ Read Getting Started in \"Docs\" section \r\n\r\ntank.init(function(settings) {\r\n\t\/\/ initialize tank here\r\n  \r\n})\r\n\r\ntank.loop(function(state, control) {\r\n\t\/\/ write your tank logic here\r\n  \r\n});"
    };
    localStorage.setItem('aiRepository.scriptMap', JSON.stringify(this._scriptMap));
  }

  renameScript(newValue, oldValue) {
    if(!this._scriptMap[oldValue]) {
      throw "Script " + oldValue + " does not exists";
    }
    this._scriptMap[newValue] = this._scriptMap[oldValue];
    this._scriptMap[newValue].name = newValue;
    this.deleteScript(oldValue);
    localStorage.setItem('aiRepository.scriptMap', JSON.stringify(this._scriptMap));
  }

  getCompiledScript(name) {
    return this.getScript(name).code;
  }

  getScriptNameList() {
    var result = [];
    for(var i in this._scriptMap) {
      result.push(i);
    }
    return result;
  }

  updateScript(name, code) {
    if(!this._scriptMap[name]) {
      throw "Script " + name + " does not exists";
    }
    this._scriptMap[name].code = code;
    localStorage.setItem('aiRepository.scriptMap', JSON.stringify(this._scriptMap));
  }

  deleteScript(name) {
    var newMap = {};
    for(var i in this._scriptMap) {
      if(i == name) continue;
      newMap[i] = this._scriptMap[i];
    }
    this._scriptMap = newMap;
    localStorage.setItem('aiRepository.scriptMap', JSON.stringify(this._scriptMap));
  }

  reserveName(names) {
    this._reservedNames = this._reservedNames.concat(names);
  }
};
