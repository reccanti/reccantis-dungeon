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
}
