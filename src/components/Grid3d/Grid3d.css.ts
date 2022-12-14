import { createVar, style, keyframes } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

// constants

const TILE_SIZE = "50px";
const VIEWPORT_BASE_SIZE = "500px";
export const ANIMATION_DURATION = 400;

// viewport layer - the frame that "displays" the 3D grid

export const viewportWidth = createVar();
export const viewportHeight = createVar();

export const baseWidth = createVar();
export const baseHeight = createVar();

export const viewport = style({
  width: viewportWidth,
  height: viewportHeight,
  overflow: "hidden",
  position: "relative",
});

// scale layer

export const scaleFactorX = createVar();
export const scaleFactorY = createVar();

export const scale = style({
  width: `${baseWidth}`,
  height: `${baseHeight}`,
  position: "absolute",
  top: "50%",
  left: "50%",
  transformStyle: "preserve-3d",
  transform: `
    translate(-50%, -50%)
    scale(
       ${scaleFactorX},
       ${scaleFactorY}
    )
  `,
  // transform: `
  //   scale(
  //     calc(${viewportWidth} / ${VIEWPORT_BASE_SIZE}),
  //     calc(${viewportWidth} / ${VIEWPORT_BASE_SIZE})
  //   )
  // `,
  overflow: "hidden",
});

// tiles!

export const gridRows = createVar();
export const gridCols = createVar();

export const tileWrapper = style({
  position: "relative",
  width: `calc(${gridCols} * ${TILE_SIZE})`,
  height: `calc(${gridRows} * ${TILE_SIZE})`,
  transformStyle: "preserve-3d",
  // transform: `translateZ(calc(${TILE_SIZE} / 2))`,
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

export const tile3d = style({
  position: "absolute",
  top: `calc(${TILE_SIZE} * ${tileRow})`,
  left: `calc(${TILE_SIZE} * ${tileCol})`,
  transformStyle: "preserve-3d",
});

export const tileFace = recipe({
  base: {
    width: TILE_SIZE,
    height: TILE_SIZE,
    position: "absolute",
    backfaceVisibility: "hidden",
    imageRendering: "pixelated",
    // border: "1px solid white",
  },
  variants: {
    opacity: {
      transparent: {
        display: "none",
      },
      opaque: {
        // backgroundColor: "gray",
      },
    },
    direction: {
      front: {
        backgroundImage: `url(/sprites.png)`,
        backgroundSize: `
          calc(${128 / 16} * ${TILE_SIZE})
          calc(${128 / 16} * ${TILE_SIZE})
        `,
        backgroundPosition: `0 0`,
        transform: `
          rotateY(-180deg)
          rotateX(90deg)
          translateZ(calc(${TILE_SIZE} / 2))
        `,
      },
      back: {
        backgroundImage: `url(/sprites.png)`,
        backgroundSize: `
          calc(${128 / 16} * ${TILE_SIZE})
          calc(${128 / 16} * ${TILE_SIZE})
        `,
        backgroundPosition: `0 0`,
        transform: `
          rotateY(0deg)
          rotateX(-90deg)
          translateZ(calc(${TILE_SIZE} / 2))
        `,
      },
      left: {
        backgroundImage: `url(/sprites.png)`,
        backgroundSize: `
          calc(${128 / 16} * ${TILE_SIZE})
          calc(${128 / 16} * ${TILE_SIZE})
        `,
        backgroundPosition: `0 0`,
        transform: `
          rotateX(-90deg)
          rotateY(90deg)
          translateZ(calc(${TILE_SIZE} / 2))
        `,
      },
      right: {
        backgroundImage: `url(/sprites.png)`,
        backgroundSize: `
          calc(${128 / 16} * ${TILE_SIZE})
          calc(${128 / 16} * ${TILE_SIZE})
        `,
        backgroundPosition: `0 0`,
        transform: `
          rotateX(-90deg)
          rotateY(270deg)
          translateZ(calc(${TILE_SIZE} / 2))
        `,
      },
      top: {
        backgroundColor: "black",
        transform: `
          rotateX(180deg)
          translateZ(calc(-${TILE_SIZE} / 2))
        `,
      },
      bottom: {
        backgroundColor: "black",
        transform: `
          rotateX(0deg)
          translateZ(calc(-${TILE_SIZE} / 2))
        `,
      },
    },
  },
  defaultVariants: {
    opacity: "opaque",
  },
});

// rotation layer - rotates the grid based on the orientation

export const rotation = createVar();
export const rotate = style({
  transition: `transform ${ANIMATION_DURATION / 1000}s linear`,
  width: "100%",
  height: "100%",
  transform: `rotate(${rotation})`,
  transformStyle: "preserve-3d",
});
export const rotateOffset = style({
  width: `calc(${gridCols} * ${TILE_SIZE} + ${TILE_SIZE})`,
  height: `calc(${gridRows} * ${TILE_SIZE} + ${TILE_SIZE})`,
  top: "50%",
  left: "50%",
  transform: `translate(-50%, -50%)`,
  position: "absolute",
  transformStyle: "preserve-3d",
});

// translation layer - tranlates the grid based on position

export const curRow = createVar();
export const curCol = createVar();
export const translate = style({
  transition: `transform ${ANIMATION_DURATION / 1000}s linear`,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: `
    translateX(calc(-1 * ${curCol} * ${TILE_SIZE} - ${TILE_SIZE} / 2))
    translateY(calc(-1 * ${curRow} * ${TILE_SIZE} - ${TILE_SIZE} / 2))
    translateZ(calc(${TILE_SIZE} / 2))
  `,
  transformStyle: "preserve-3d",
});

// perspective layer - makes it all 3D and junk

export const perspectiveWrapper = style({
  imageRendering: "crisp-edges",
  position: "absolute",
  perspective: "585px",
  top: "50%",
  left: "50%",
  transformStyle: "preserve-3d",
});

export const perspective = style({
  transform: `
    translateY(calc(${TILE_SIZE} / 2))
    rotateX(90deg)
    translateY(550px)
  `,
  transformStyle: "preserve-3d",
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

// Fog of War - make things dimmer

export const fowStart = createVar();
export const fowDistance = createVar();
export const fowDensity = createVar();

export const fogOfWarContainer = style({
  display: "inline-block",
  position: "absolute",
  top: "50%",
  left: "50%",
  transformStyle: "preserve-3d",
  transform: `
    rotate(180deg)
    translate3d(
      calc(50%), 
      calc(${fowStart} * ${TILE_SIZE} + 50% + ${TILE_SIZE} + (${fowDistance} - 1) * ${TILE_SIZE} / 2), 
      calc(${TILE_SIZE} / 2)
    )
  `,
});

export const fogOfWarWrapper = style({
  height: `calc(${TILE_SIZE} / ${fowDensity})`,
  transformStyle: "preserve-3d",
});

export const fogOfWar = style({
  width: `calc(${TILE_SIZE} * 4)`,
  height: TILE_SIZE,
  // borderBottom: "2px solid red",

  backgroundColor: "black",
  opacity: "15%",
  transform: "rotateX(-90deg)",
});
