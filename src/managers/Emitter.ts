import { Events } from "./Events";

type EventCallback = (e: Events) => void;

export class Emitter {
  callbacks = new Set<EventCallback>();

  emit(e: Events) {
    this.callbacks.forEach((cb) => {
      cb(e);
    });
  }

  addListener(cb: EventCallback) {
    this.callbacks.add(cb);
  }
  removeListener(cb: EventCallback) {
    this.callbacks.delete(cb);
  }
}
