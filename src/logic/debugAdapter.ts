import { GameLogic } from "./GameLogic";
import { InputListener } from "./inputListener";

export function debugAdapter(logic: GameLogic, inputs: InputListener) {
  const cleanup = inputs.addListener((event) => {
    switch (event.code) {
      case "Escape": {
        const enabled = logic.getState().modes.debug;
        logic.setMode("debug", !enabled);
        break;
      }
    }
  });
  return () => cleanup();
}
