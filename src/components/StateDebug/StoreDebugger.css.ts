import { style } from "@vanilla-extract/css";

export const wrapper = style({
  backgroundColor: `rgba(0, 0, 0, 0.8)`,
  color: "white",
  width: `100vw`,
  height: `100vh`,
  // pointerEvents: `none`,
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: 1000000,
  padding: "2rem",
});

export const grid = style({
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "1rem",
  height: "100%",
  overflow: "auto",
});

export const stateCol = style({
  gridColumn: "span 3",
  border: "1px solid white",
  overflow: "auto",
  padding: "1rem",
});

export const actionCol = style({
  gridColumn: "span 1",
  border: "1px solid white",
  overflow: "auto",
  padding: "1rem",
});
