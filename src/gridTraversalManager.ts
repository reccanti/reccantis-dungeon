import { Grid, Cell } from "./grid";

export type Orientation = "up" | "down" | "left" | "right";

export class GridTraversalManager {
  readonly grid: Grid;
  readonly row: number;
  readonly col: number;
  readonly orientation: Orientation = "up";

  private callbacks = new Set<Function>();

  constructor(grid: Grid, startingRow: number, startingCol: number) {
    this.grid = grid;
    this.row = startingRow;
    this.col = startingCol;
    this.updateGrid();
  }

  private setOrientation(orientation: Orientation) {
    // @ts-ignore
    this.orientation = orientation;
  }

  private setRow(row: number) {
    // @ts-ignore
    this.row = row;
  }

  private setCol(col: number) {
    // @ts-ignore
    this.col = col;
  }

  canMove(cell: Cell) {
    return cell !== "wall";
  }

  moveForward() {
    let newRow = this.row;
    let newCol = this.col;

    switch (this.orientation) {
      case "up": {
        newRow = this.row + 1;
        break;
      }
      case "down": {
        newRow = this.row - 1;
        break;
      }
      case "left": {
        newCol = this.col + 1;
        break;
      }
      case "right": {
        newCol = this.col - 1;
        break;
      }
    }
    const cell = this.grid.getCell(newRow, newCol);
    if (this.canMove(cell)) {
      this.grid.setCell(this.row, this.col, "room");
      this.setRow(newRow);
      this.setCol(newCol);
      this.updateGrid();
    }
  }

  moveBackward() {
    let newRow = this.row;
    let newCol = this.col;

    switch (this.orientation) {
      case "up": {
        newRow = this.row - 1;
        break;
      }
      case "down": {
        newRow = this.row + 1;
        break;
      }
      case "left": {
        newCol = this.col - 1;
        break;
      }
      case "right": {
        newCol = this.col + 1;
        break;
      }
    }
    const cell = this.grid.getCell(newRow, newCol);
    if (this.canMove(cell)) {
      this.grid.setCell(this.row, this.col, "room");
      this.setRow(newRow);
      this.setCol(newCol);
      this.updateGrid();
    }
  }

  rotateCounterClockwise() {
    switch (this.orientation) {
      case "up": {
        this.setOrientation("left");
        break;
      }
      case "down": {
        this.setOrientation("right");
        break;
      }
      case "left": {
        this.setOrientation("down");
        break;
      }
      case "right": {
        this.setOrientation("up");
        break;
      }
    }
    this.updateGrid();
  }

  rotateClockwise() {
    switch (this.orientation) {
      case "up": {
        this.setOrientation("right");
        break;
      }
      case "down": {
        this.setOrientation("left");
        break;
      }
      case "left": {
        this.setOrientation("up");
        break;
      }
      case "right": {
        this.setOrientation("down");
        break;
      }
    }
    this.updateGrid();
  }

  updateGrid() {
    this.grid.setCell(this.row, this.col, "player");
    this.callbacks.forEach((cb) => {
      cb();
    });
  }

  addUpdateListener(callback: Function) {
    this.callbacks.add(callback);
  }
  removeUpdateListener(callback: Function) {
    this.callbacks.delete(callback);
  }

  listen = (e: KeyboardEvent) => {
    switch (e.code) {
      case "KeyA":
      case "ArrowLeft": {
        this.rotateCounterClockwise();
        break;
      }
      case "KeyD":
      case "ArrowRight": {
        this.rotateClockwise();
        break;
      }
      case "KeyW":
      case "ArrowUp": {
        this.moveForward();
        break;
      }
      case "KeyS":
      case "ArrowDown": {
        this.moveBackward();
        break;
      }
    }
  };
}
