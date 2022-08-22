import { createAction, createReducer } from "@reduxjs/toolkit";
import { inputDebug } from "./Input";

export const setDebugMode = createAction<boolean>("mode/debug");

const initialState = {
  debug: false,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setDebugMode, (state, action) => {
      state.debug = action.payload;
    })
    .addCase(inputDebug, (state) => {
      state.debug = !state.debug;
    });
});
