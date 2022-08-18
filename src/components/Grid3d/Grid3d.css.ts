import { createVar, style, keyframes } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

// constants

const TILE_SIZE = "50px";
export const ANIMATION_DURATION = 300;

// viewport layer - the frame that "displays" the 3D grid

export const viewportWidth = createVar();
export const viewportHeight = createVar();

export const viewport = style({
  width: viewportWidth,
  height: viewportHeight,
  overflow: "hidden",
  position: "relative",
});

// tiles!

export const gridRows = createVar();
export const gridCols = createVar();

export const tileWrapper = style({
  position: "relative",
  width: `calc(${gridCols} * ${TILE_SIZE})`,
  height: `calc(${gridRows} * ${TILE_SIZE})`,
});

export const tileRow = createVar();
export const tileCol = createVar();

export const tile = recipe({
  base: {
    width: TILE_SIZE,
    height: TILE_SIZE,
    border: "1px solid white",
    position: "absolute",
    top: `calc(${TILE_SIZE} * ${tileRow})`,
    left: `calc(${TILE_SIZE} * ${tileCol})`,
  },
  variants: {
    type: {
      wall: {
        backgroundColor: "white",
      },
      room: {
        backgroundColor: "transparent",
      },
    },
  },
});

// rotation layer - rotates the grid based on the orientation

export const rotation = createVar();
export const rotate = style({
  transition: `transform ${ANIMATION_DURATION / 1000}s linear`,
  width: "100%",
  height: "100%",
  transform: `rotate(${rotation})`,
});
export const rotateOffset = style({
  width: `calc(${gridCols} * ${TILE_SIZE} + ${TILE_SIZE})`,
  height: `calc(${gridRows} * ${TILE_SIZE} + ${TILE_SIZE})`,
  top: "50%",
  left: "50%",
  transform: `translate(-50%, calc(-50% - ${TILE_SIZE} / 2))`,
  position: "absolute",
});

// translation layer - tranlates the grid based on position

export const curRow = createVar();
export const curCol = createVar();
export const translate = style({
  transition: `transform ${ANIMATION_DURATION / 1000}s linear`,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: `translate(
    calc(-1 * ${curCol} * ${TILE_SIZE} - ${TILE_SIZE} / 2),
    calc(-1 * ${curRow} * ${TILE_SIZE} - ${TILE_SIZE} / 2)
  )`,
});

// center layer - helper to determine where the center of the grid is

export const centerIndicator = style({
  width: "0.5rem",
  height: "0.5rem",
  borderRadius: "50%",
  backgroundColor: "red",
  position: "absolute",
  left: `calc(${viewportWidth} / 2)`,
  top: `calc(${viewportHeight} / 2)`,
  transform: "translate(-50%, -50%)",
  zIndex: 1000,
});
