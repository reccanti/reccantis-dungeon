import { createAction, createReducer } from "@reduxjs/toolkit";

export const setDebugMode = createAction<boolean>("mode/debug");

const initialState = {
  debug: false,
};

export const reducer = createReducer(initialState, (builder) => {
  builder.addCase(setDebugMode, (state, action) => {
    state.debug = action.payload;
  });
});
