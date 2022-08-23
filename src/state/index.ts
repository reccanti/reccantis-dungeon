import { configureStore } from "@reduxjs/toolkit";

import { logAction, reducer as actions } from "./Actions";
import { reducer as modes } from "./Modes";
import { reducer as explore } from "./Explore";

export const store = configureStore({
  reducer: {
    actions,
    modes,
    explore,
  },
  middleware: (getDefaultMiddeware) => {
    return getDefaultMiddeware().concat(() => (next) => (action) => {
      next(logAction(action));
      return next(action);
    });
  },
});

export type Store = typeof store;
export type State = ReturnType<typeof store["getState"]>;

// console.log(store.getState());
