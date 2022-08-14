import { Grid } from "./grid";

export class GridTraversalManager {
  readonly grid: Grid;
  readonly row: number;
  readonly col: number;
  readonly orientation: "up" | "down" | "left" | "right" = "up";

  constructor(grid: Grid, startingRow: number, startingCol: number) {
    this.grid = grid;
    this.row = startingRow;
    this.col = startingCol;
  }
}
