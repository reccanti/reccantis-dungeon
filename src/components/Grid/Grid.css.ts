import { style, createVar, fallbackVar, keyframes } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const row = style({
  display: "flex",
  fontFamily: "monospace",
});

// CELLS

const rotate = keyframes({
  "0%": { transform: "rotateY(0deg)" },
  "100%": { transform: "rotateY(360deg)" },
});

export const cellSize = createVar();

export const cellContainer = style({
  transformStyle: "preserve-3d",
  // animationName: rotate,
  // animationDuration: "5s",
  // animationTimingFunction: "linear",
  // animationIterationCount: "infinite",
  // transformOrigin: "50px 50px",
  // position: "relative",
});

const transformCell = ({
  x = 0,
  y = 0,
  z = 0,
}: {
  x?: number;
  y?: number;
  z?: number;
}) => {
  const size = fallbackVar(cellSize, "100px");

  const rotation = `rotateX(${x}deg) rotateY(${y}deg) rotateZ(${z}deg)`;
  const translation = `translateZ(calc(${size} / 2))`;

  return `${rotation} ${translation}`;
};

export const cell = recipe({
  base: {
    width: fallbackVar(cellSize, "100px"),
    height: fallbackVar(cellSize, "100px"),
    position: "absolute",
  },
  variants: {
    opacity: {
      transparent: {
        backgroundColor: "transparent",
      },
      opaque: {
        backgroundColor: "black",
      },
    },
    direction: {
      front: {
        transform: transformCell({ y: 0 }),
      },
      back: {
        backgroundColor: "grey",
        transform: transformCell({ y: 180 }),
      },
      left: {
        transform: transformCell({ y: 90 }),
      },
      right: {
        transform: transformCell({ y: 270 }),
      },
      top: {
        transform: transformCell({ x: 90 }),
        border: "1px solid white",
      },
      bottom: {
        transform: transformCell({ x: 270 }),
        border: "1px solid white",
      },
    },
  },
  defaultVariants: {
    opacity: "opaque",
  },
});

// const baseCell = style({});

// const cellPanel = styleVariants({
//   transparent: [baseCell],
//   opaque: [baseCell],
// });

// export const cell = styleVariants({
//   front: [cellPanel],
//   back: [cellPanel],
//   left: [cellPanel],
//   right: [cellPanel],
//   top: [cellPanel],
//   bottom: [cellPanel],
// });
