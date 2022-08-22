import { Updater } from "./UpdaterInterface";
import { setDebugMode } from "../Modes";

export const DebugUpdater: Updater = (store) => {
  let debugRef: boolean;

  const unsubscribe = store.subscribe(() => {
    const { modes } = store.getState();
    const { debug } = modes;
    if (debug !== debugRef) {
      debugRef = debug;
      switch (debug) {
        case true: {
          store.dispatch(setDebugMode(false));
          break;
        }
        default: {
          store.dispatch(setDebugMode(true));
        }
      }
    }
  });

  return () => {
    unsubscribe();
  };
};
