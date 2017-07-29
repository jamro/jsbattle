'use strict';

var Simulation = require("./Simulation.js");
var Renderer = require("./Renderer.js");
var DebugRenderer = require("./DebugRenderer.js");
var BWRenderer = require("./BWRenderer.js");


module.exports  = {

  createSimulation: function(renderer) {
    renderer = renderer ? renderer : new Renderer();
    var sim = new Simulation(renderer);
    return sim;
  },

  createRenderer: function(name) {
    switch(name) {
      case 'debug':   return new DebugRenderer();
      case 'bw':      return new BWRenderer();
      default:        throw "Unknown rederer " + name;
    }
  }
};
