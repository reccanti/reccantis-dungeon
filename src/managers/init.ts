import { Emitter } from "./Emitter";
import { InputManager } from "./InputManager";
import { TestManager } from "./TestManager";

export function init() {
  const emitter = new Emitter();
  const inputManager = new InputManager(emitter);
  const testManager = new TestManager(emitter);

  return () => {
    inputManager.cleanup();
    testManager.cleanup();
  };
}
