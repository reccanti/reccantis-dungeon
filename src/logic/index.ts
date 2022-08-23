import { GameLogic } from "./GameLogic";
import { InputListener } from "./inputListener";

import { debugAdapter } from "./debugAdapter";
import { exploreAdapter } from "./ExploreAdapter";

export function init() {
  const logic = new GameLogic();
  const inputs = new InputListener();
  const cleanupFuncs = [debugAdapter, exploreAdapter].map((cb) => {
    return cb(logic, inputs);
  });

  const cleanup = () => {
    cleanupFuncs.forEach((cb) => {
      cb();
    });
    inputs.cleanup();
  };

  return {
    logic,
    cleanup,
  };
}
