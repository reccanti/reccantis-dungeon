import { style, createVar, fallbackVar, keyframes } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const row = style({
  display: "flex",
  fontFamily: "monospace",
});

export const cellSize = createVar();

export const cell = recipe({
  base: {
    width: fallbackVar(cellSize, "50px"),
    height: fallbackVar(cellSize, "50px"),
    display: "block",
    // border: "1px solid white",
  },
  variants: {
    orientation: {
      up: {},
      down: {},
      left: {},
      right: {},
    },
    type: {
      room: {
        backgroundColor: "transparent",
        selectors: {
          "&:not(:first-child)": {
            borderLeft: 0,
          },
          [`${row}:not(:first-child) > &`]: {
            borderTop: 0,
          },
        },
      },
      wall: {
        backgroundColor: "white",
      },
      player: {
        backgroundColor: "green",
        border: 0,
      },
    },
  },
  compoundVariants: [
    {
      variants: {
        type: "player",
        orientation: "up",
      },
      style: {
        boxShadow: "inset 0 -4px 0 0 red",
      },
    },
    {
      variants: {
        type: "player",
        orientation: "down",
      },
      style: {
        boxShadow: "inset 0 4px 0 0 red",
      },
    },
    {
      variants: {
        type: "player",
        orientation: "left",
      },
      style: {
        boxShadow: "inset -4px 0 0 0 red",
      },
    },
    {
      variants: {
        type: "player",
        orientation: "right",
      },
      style: {
        boxShadow: "inset 4px 0 0 0 red",
      },
    },
  ],
});
