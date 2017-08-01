'use strict';

var Simulation = require("./Simulation.js");
var Renderer = require("./renderers/Renderer.js");
var DebugRenderer = require("./renderers/debug/DebugRenderer.js");
var BWRenderer = require("./renderers/bw/BWRenderer.js");


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
