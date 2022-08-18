import { style, createVar } from "@vanilla-extract/css";

export const columns = createVar();
export const span = createVar();

export const layout = style({
  display: "grid",
  gridTemplateColumns: columns,
  gap: "1rem",
});

export const column = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});
