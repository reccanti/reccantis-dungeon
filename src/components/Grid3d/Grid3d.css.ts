import { createVar, style } from "@vanilla-extract/css";

// viewport layer - the frame that "displays" the 3D grid

export const viewportWidth = createVar();
export const viewportHeight = createVar();

export const viewport = style({
  width: viewportWidth,
  height: viewportHeight,
  overflow: "hidden",
});

// tiles!

const TILE_SIZE = "50px";

export const gridRows = createVar();
export const gridCols = createVar();

export const tileWrapper = style({
  position: "relative",
  width: `calc(${gridCols} * ${TILE_SIZE})`,
  height: `calc(${gridRows} * ${TILE_SIZE})`,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
});

export const tileRow = createVar();
export const tileCol = createVar();

export const tile = style({
  width: TILE_SIZE,
  height: TILE_SIZE,
  border: "1px solid white",
  position: "absolute",
  top: `calc(${TILE_SIZE} * ${tileRow})`,
  left: `calc(${TILE_SIZE} * ${tileCol})`,
});

// rotation layer - rotates the grid based on the orientation

export const rotation = createVar();
export const rotate = style({
  transform: `rotate(${rotation})`,
  width: "100%",
  height: "100%",
});
