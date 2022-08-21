// import {Events} from './Events'
import { Emitter } from "./Emitter";

export class TestManager {
  listen: Parameters<Emitter["addListener"]>[0];
  emitter: Emitter;

  constructor(emitter: Emitter) {
    this.emitter = emitter;

    this.listen = (event) => {
      switch (event.type) {
        case "InputDown": {
          console.log("Down");
          break;
        }
        case "InputUp": {
          console.log("Up");
          break;
        }
        case "InputLeft": {
          console.log("Left");
          break;
        }
        case "InputRight": {
          console.log("Right");
          break;
        }
      }
    };

    this.emitter.addListener(this.listen);
  }

  cleanup() {
    this.emitter.removeListner(this.listen);
  }
}