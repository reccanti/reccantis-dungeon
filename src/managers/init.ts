import { Emitter } from "./Emitter";
import { Manager } from "./MangerInterface";
import { InputManager } from "./InputManager";
import { TestManager } from "./TestManager";

export function init() {
  const emitter = new Emitter();

  const managers: Manager[] = [];
  managers.push(new InputManager(emitter));
  managers.push(new TestManager(emitter));

  return () => {
    managers.forEach((manager) => {
      manager.cleanup();
    });
  };
}
