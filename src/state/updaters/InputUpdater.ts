import { Updater } from "./UpdaterInterface";
import { throttle } from "throttle-typescript";
import { ANIMATION_DURATION } from "../../components/Grid3d/Grid3d.css";
import {
  inputUp,
  inputDown,
  inputLeft,
  inputRight,
  inputDebug,
} from "../Input";
import { setDebugMode } from "../Modes";

export const InputUpdater: Updater = (store) => {
  const listen = (event: KeyboardEvent) => {
    switch (event.code) {
      case "KeyA":
      case "ArrowLeft": {
        store.dispatch(inputLeft());
        break;
      }
      case "KeyD":
      case "ArrowRight": {
        store.dispatch(inputRight());
        break;
      }
      case "KeyW":
      case "ArrowUp": {
        store.dispatch(inputUp());
        break;
      }
      case "KeyS":
      case "ArrowDown": {
        store.dispatch(inputDown());
        break;
      }
      case "Escape": {
        const {
          modes: { debug },
        } = store.getState();
        store.dispatch(setDebugMode(!debug));
      }
    }
  };

  const throttledListen = throttle(listen, ANIMATION_DURATION);

  window.addEventListener("keydown", throttledListen);

  return () => {
    window.removeEventListener("keydown", throttledListen);
  };
};
