import { store } from "./state";
import * as updaterModule from "./state/updaters";
import { Updater } from "./state/updaters/UpdaterInterface";

export function init(storeInstance: typeof store) {
  const updaters = Object.values(updaterModule) as Updater[];
  const cleanups = updaters.map((updater) => updater(storeInstance));

  return () => {
    cleanups.forEach((cleanup) => {
      cleanup();
    });
  };
}
