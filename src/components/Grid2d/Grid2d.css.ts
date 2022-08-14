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
    border: "1px solid white",
  },
  variants: {
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
    },
  },
});
