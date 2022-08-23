import { createAction, createReducer } from "@reduxjs/toolkit";
import { inputDown, inputLeft, inputRight, inputUp } from "./Input";

export const setExploreActive = createAction<boolean>("explore/active");

const initialState = {
  isActive: false,
  player: {
    row: 0,
    col: 0,
    angle: 0,
  },
};

const enum Orientation {
  Up = 0,
  Right = 90,
  Down = 180,
  Left = 270,
}

function getOrientation(angle: number): Orientation {
  const rawAngle = angle % 360;
  const orientation = rawAngle < 0 ? rawAngle + 360 : rawAngle;
  return orientation as Orientation;
}

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setExploreActive, (state, action) => {
      state.isActive = action.payload;
    })
    .addCase(inputUp, (state) => {
      const orientation = getOrientation(state.player.angle);
      let newRow = state.player.row;
      let newCol = state.player.col;
      switch (orientation) {
        case Orientation.Up: {
          newRow -= 1;
          break;
        }
        case Orientation.Down: {
          newRow += 1;
          break;
        }
        case Orientation.Left: {
          newCol -= 1;
          break;
        }
        case Orientation.Right: {
          newCol += 1;
          break;
        }
      }
      state.player.row = newRow;
      state.player.col = newCol;
    })
    .addCase(inputDown, (state) => {
      const orientation = getOrientation(state.player.angle);
      let newRow = state.player.row;
      let newCol = state.player.col;
      switch (orientation) {
        case Orientation.Up: {
          newRow += 1;
          break;
        }
        case Orientation.Down: {
          newRow -= 1;
          break;
        }
        case Orientation.Left: {
          newCol += 1;
          break;
        }
        case Orientation.Right: {
          newCol -= 1;
          break;
        }
      }
      state.player.row = newRow;
      state.player.col = newCol;
    })
    .addCase(inputLeft, (state) => {
      state.player.angle -= 90;
    })
    .addCase(inputRight, (state) => {
      state.player.angle += 90;
    });
});
