export type Cell = "room" | "wall";

export class Grid {
  readonly width: number;
  readonly height: number;
  private _cells: Cell[];
  get cells(): ReadonlyArray<Cell> {
    return this._cells;
  }

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this._cells = Array.from({ length: width * height }, (_, i) => "room");
  }

  getNeighbors(row: number, col: number) {
    const up = this.coordsToIndex(row - 1, col);
    const down = this.coordsToIndex(row + 1, col);
    const left = this.coordsToIndex(row, col - 1);
    const right = this.coordsToIndex(row, col + 1);

    return {
      up: up ? this.cells[up] : null,
      down: down ? this.cells[down] : null,
      left: left ? this.cells[left] : null,
      right: right ? this.cells[right] : null,
    };
  }

  private coordsToIndex(row: number, col: number) {
    if (row < 0 || row >= this.height || col < 0 || col > this.width) {
      return null;
    }
    return row * this.width + col;
  }

  setCell(row: number, col: number, cell: Cell) {
    const i = this.coordsToIndex(row, col);
    if (i !== null) {
      this._cells[i] = cell;
    } else {
      throw Error(
        `There's no cell at the following coordinates: row ${row}, col ${col}`
      );
    }
  }
}
