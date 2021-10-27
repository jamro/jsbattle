import Simulation from "./Simulation.js";
import Renderer from "./renderers/Renderer.js";
import DebugRenderer from "./renderers/debug/DebugRenderer.js";
import BWRenderer from "./renderers/bw/BWRenderer.js";
import BrodyRenderer from "./renderers/brody/BrodyRenderer.js";
import VoidRenderer from "./renderers/void/VoidRenderer.js";
import AiDefinition from "./AiDefinition.js";
import UltimateBattleDescriptor from "./UltimateBattleDescriptor.js";

const JsBattleLib = {
  createSimulation: (renderer, debug) => {
    renderer = renderer ? renderer : new Renderer(debug);
    let sim = new Simulation(renderer, debug);
    return sim;
  },

  createAiDefinition: () => {
    return new AiDefinition();
  },

  createUBD: () => {
    return new UltimateBattleDescriptor();
  },

  createRenderer: (name, debug) => {
    switch(name) {
      case 'debug':   return new DebugRenderer(debug);
      case 'bw':      return new BWRenderer(debug);
      case 'brody':   return new BrodyRenderer(debug);
      case 'void':    return new VoidRenderer(debug);
      default:        throw "Unknown renderer " + name;
    }
  }
};

export default JsBattleLib;
