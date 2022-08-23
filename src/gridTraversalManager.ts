import { Grid, Cell } from "./entities/grid";

export type Orientation = "up" | "down" | "left" | "right";

interface BaseGridUpdate {
  type: string;
}

interface OrientationChange extends BaseGridUpdate {
  type: "OrientationChange";
  direction: "clockwise" | "counterclockwise";
}

interface PositionChange extends BaseGridUpdate {
  type: "PositionChange";
  row: number;
  col: number;
}

type GridUpdate = OrientationChange | PositionChange;

type GridUpdateCallback = (update: GridUpdate) => void;

export class GridTraversalManager {
  readonly grid: Grid;
  readonly row: number;
  readonly col: number;
  readonly orientation: Orientation = "up";

  private callbacks = new Set<GridUpdateCallback>();

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
    // return cell.type !== "wall";
    return !cell.hasPropertyOfType("wall");
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
      const curCell = this.grid.getCell(this.row, this.col);
      curCell.removePropertiesOfType("player");
      // console.log(cell);

      // const cell = this.grid.getCell(this.row, this.col);
      // cell.type === "room";
      // this.grid.setCell(this.row, this.col, new Cell("room"));
      this.setRow(newRow);
      this.setCol(newCol);
      this.updateGrid();
      this.callbacks.forEach((cb) => {
        cb({
          type: "PositionChange",
          row: newRow,
          col: newCol,
        });
      });
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
      // this.grid.setCell(this.row, this.col, new Cell("room"));
      const curCell = this.grid.getCell(this.row, this.col);
      curCell.removePropertiesOfType("player");
      this.setRow(newRow);
      this.setCol(newCol);
      this.updateGrid();
      this.callbacks.forEach((cb) => {
        cb({
          type: "PositionChange",
          row: newRow,
          col: newCol,
        });
      });
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
    this.callbacks.forEach((cb) => {
      cb({
        type: "OrientationChange",
        direction: "counterclockwise",
      });
    });
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
    this.callbacks.forEach((cb) => {
      cb({
        type: "OrientationChange",
        direction: "clockwise",
      });
    });
  }

  updateGrid() {
    // this.grid.setCell(this.row, this.col, new Cell("player"));
    const cell = this.grid.getCell(this.row, this.col);
    const curPlayerProps = cell.getPropertiesOfType("player");
    cell.addProperty({
      type: "player",
      orientation: this.orientation,
    });
    curPlayerProps.forEach((prop) => {
      cell.removeProperty(prop);
    });
  }

  addUpdateListener(callback: GridUpdateCallback) {
    this.callbacks.add(callback);
  }
  removeUpdateListener(callback: GridUpdateCallback) {
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
