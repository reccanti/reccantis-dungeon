import { throttle } from "throttle-typescript";
import { ANIMATION_DURATION } from "../components/Grid3d/Grid3d.css";

export class InputListener {
  private listeners = new Set<(event: KeyboardEvent) => void>();
  cleanup: () => void;

  constructor() {
    const listen = (event: KeyboardEvent) => {
      this.listeners.forEach((cb) => {
        cb(event);
      });
    };
    const throttledListen = throttle(listen, ANIMATION_DURATION);
    window.addEventListener("keydown", throttledListen);

    this.cleanup = () => {
      window.removeEventListener("keydown", throttledListen);
    };
  }

  addListener(cb: (event: KeyboardEvent) => void) {
    this.listeners.add(cb);
    return () => this.listeners.delete(cb);
  }
}
