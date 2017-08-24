'use strict';

import Simulation from "./Simulation.js";
import Renderer from "./renderers/Renderer.js";
import DebugRenderer from "./renderers/debug/DebugRenderer.js";
import BWRenderer from "./renderers/bw/BWRenderer.js";
import BrodyRenderer from "./renderers/brody/BrodyRenderer.js";
import AiDefinition from "./AiDefinition.js";

module.exports  = {

  createSimulation: (renderer) => {
    renderer = renderer ? renderer : new Renderer();
    let sim = new Simulation(renderer);
    return sim;
  },

  createAiDefinition: () => {
    return new AiDefinition();
  },

  createRenderer: (name) => {
    switch(name) {
      case 'debug':   return new DebugRenderer();
      case 'bw':      return new BWRenderer();
      case 'brody':      return new BrodyRenderer();
      default:        throw "Unknown rederer " + name;
    }
  }
};
