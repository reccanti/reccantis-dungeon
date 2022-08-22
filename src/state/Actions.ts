import { AnyAction, createAction, createReducer } from "@reduxjs/toolkit";

export const logAction = createAction<AnyAction>("action/log");

const initialState: AnyAction[] = [];

export const reducer = createReducer(initialState, (builder) => {
  builder.addCase(logAction, (state, action) => {
    state.unshift(action.payload);
  });
});
