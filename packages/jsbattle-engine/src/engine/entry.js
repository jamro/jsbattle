'use strict';

import JsBattleLib from "./lib.js";

(function(self) {
  if(!self) {
    console.warn("self is not defined");
    return;
  }
  self.JsBattle = JsBattleLib;
})(window);
