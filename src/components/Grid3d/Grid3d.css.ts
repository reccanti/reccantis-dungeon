import { createVar, style, keyframes } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const ANIMATION_DURATION = 300;

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
// const rotateAnim = keyframes({
//   from
// })

export const rotation = createVar();
export const rotate = style({
  transition: `transform ${ANIMATION_DURATION / 1000}s linear`,
  width: "100%",
  height: "100%",
  transform: `rotate(${rotation})`,
});
// export const rotate = recipe({
//   base: {
//     // transform: `rotate(${rotation})`,
//     transition: "transform 0.5s linear",
//     width: "100%",
//     height: "100%",
//   },
//   variants: {
//     direction: {
//       up: {
//         transform: `rotate(360deg)`,
//       },
//       down: {
//         transform: `rotate(180deg)`,
//       },
//       left: {
//         transform: `rotate(270deg)`,
//       },
//       right: {
//         transform: `rotate(90deg)`,
//       },
//     },
//   },
//   defaultVariants: {
//     direction: "up",
//   },
// });
