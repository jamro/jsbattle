import generateName from "sillyname";

export default class AiRepository {

  constructor(stateless, storageName) {
    this.storageName = storageName;
    let storedScripts;
    if(!stateless) {
      storedScripts = localStorage.getItem(this.storageName);
    }
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
      code: "importScripts(\'lib\/tank.js\');\n\n\/\/ Don\'t know where to start?\n\/\/ Read Getting Started in \"Docs\" section \n\ntank.init(function(settings, info) {\n\t\/\/ initialize tank here\n  \n});\n\ntank.loop(function(state, control) {\n\t\/\/ write your tank logic here\n  \n});\n\n\n"
    };
    localStorage.setItem(this.storageName, JSON.stringify(this._scriptMap));
  }

  renameScript(newValue, oldValue) {
    if(!this._scriptMap[oldValue]) {
      throw "Script " + oldValue + " does not exists";
    }
    this._scriptMap[newValue] = this._scriptMap[oldValue];
    this._scriptMap[newValue].name = newValue;
    this.deleteScript(oldValue);
    localStorage.setItem(this.storageName, JSON.stringify(this._scriptMap));
  }

  getCompiledScript(name) {
    return this.getScript(name).code;
  }

  existsScript(name) {
    return this._scriptMap[name] != undefined;
  }

  getScriptNameList() {
    let result = [];
    for(let i in this._scriptMap) {
      result.push(i);
    }
    return result;
  }

  updateScript(name, code) {
    if(!this._scriptMap[name]) {
      throw "Script " + name + " does not exists";
    }
    this._scriptMap[name].code = code;
    localStorage.setItem(this.storageName, JSON.stringify(this._scriptMap));
  }

  deleteScript(name) {
    let newMap = {};
    for(let i in this._scriptMap) {
      if(i == name) continue;
      newMap[i] = this._scriptMap[i];
    }
    this._scriptMap = newMap;
    localStorage.setItem(this.storageName, JSON.stringify(this._scriptMap));
  }

  reserveName(names) {
    this._reservedNames = this._reservedNames.concat(names);
  }
}
