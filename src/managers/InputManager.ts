import { throttle } from "throttle-typescript";

import { Emitter } from "./Emitter";
import { Manager } from "./MangerInterface";

export class InputManager implements Manager {
  listen: (event: KeyboardEvent) => void;

  constructor(emitter: Emitter) {
    const listen: typeof this.listen = (event) => {
      switch (event.code) {
        case "KeyA":
        case "ArrowLeft": {
          emitter.emit({
            type: "InputLeft",
          });
          break;
        }
        case "KeyD":
        case "ArrowRight": {
          emitter.emit({
            type: "InputRight",
          });
          break;
        }
        case "KeyW":
        case "ArrowUp": {
          emitter.emit({
            type: "InputUp",
          });
          break;
        }
        case "KeyS":
        case "ArrowDown": {
          emitter.emit({
            type: "InputDown",
          });
          break;
        }
      }
    };

    this.listen = listen;

    window.addEventListener("keydown", this.listen);
  }

  cleanup() {
    window.removeEventListener("keydown", this.listen);
  }
}
