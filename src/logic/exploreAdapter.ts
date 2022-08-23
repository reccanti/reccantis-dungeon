import { GameLogic } from "./GameLogic";
import { InputListener } from "./InputListener";

export function exploreAdapter(logic: GameLogic, inputs: InputListener) {
  const cleanup = inputs.addListener((event) => {
    if (logic.getState().modes.explore)
      switch (event.code) {
        case "KeyA":
        case "ArrowLeft": {
          logic.rotateCounterClockwise();
          break;
        }
        case "KeyD":
        case "ArrowRight": {
          logic.rotateClockwise();
          break;
        }
        case "KeyW":
        case "ArrowUp": {
          logic.moveForward();
          break;
        }
        case "KeyS":
        case "ArrowDown": {
          logic.moveBackward();
          break;
        }
      }
  });
  return () => cleanup();
}
