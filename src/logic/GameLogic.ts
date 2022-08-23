import { Direction, getDirection } from "../entities/direction";
import { Cell, Grid } from "../entities/grid";

type Mode = "explore" | "battle" | "debug";

export interface State {
  modes: {
    [key in Mode]: boolean;
  };
  player: {
    row: number;
    col: number;
    orientation: number;
  };
  dungeon: {
    curFloor: number;
    floors: Grid[];
  };
}

export class GameLogic {
  private listeners = new Set<(state: Readonly<State>) => void>();

  private state: State = {
    modes: {
      explore: false,
      battle: false,
      debug: false,
    },
    player: {
      row: 0,
      col: 0,
      orientation: 0,
    },
    dungeon: {
      curFloor: 0,
      floors: [],
    },
  };

  // Modes

  setMode(mode: Mode, value: boolean) {
    this.state.modes[mode] = value;
    this.update();
  }

  // Exploration Functions

  private getCellOnCurrentFloor(row: number, col: number) {
    const floor = this.state.dungeon.curFloor;
    const grid = this.state.dungeon.floors[floor] as Grid;
    if (!grid) {
      throw Error(`floor ${floor} not found`);
    }
    return grid.getCell(row, col);
  }

  private canMove(cell: Cell) {
    return !cell.hasPropertyOfType("wall");
  }

  setPosition(row: number, col: number) {
    // remove the player from the old position
    const { row: curRow, col: curCol, orientation } = this.state.player;
    const curCell = this.getCellOnCurrentFloor(curRow, curCol);
    curCell.removePropertiesOfType("player");

    // add the player to the new position
    const moveCell = this.getCellOnCurrentFloor(row, col);
    moveCell.addProperty({
      type: "player",
      direction: getDirection(orientation),
    });
  }

  moveForward() {
    const { row, col } = this.state.player;

    let newRow = row;
    let newCol = col;

    const direction = getDirection(this.state.player.orientation);

    switch (direction) {
      case Direction.Up: {
        newRow -= 1;
        break;
      }
      case Direction.Down: {
        newRow += 1;
        break;
      }
      case Direction.Left: {
        newCol -= 1;
        break;
      }
      case Direction.Right: {
        newCol += 1;
        break;
      }
    }

    const moveToCell = this.getCellOnCurrentFloor(newRow, newCol);

    if (this.canMove(moveToCell)) {
      this.setPosition(newRow, newCol);
      this.update();
    }
  }

  moveBackward() {
    const { row, col } = this.state.player;

    let newRow = row;
    let newCol = col;

    const direction = getDirection(this.state.player.orientation);

    switch (direction) {
      case Direction.Up: {
        newRow += 1;
        break;
      }
      case Direction.Down: {
        newRow -= 1;
        break;
      }
      case Direction.Left: {
        newCol += 1;
        break;
      }
      case Direction.Right: {
        newCol -= 1;
        break;
      }
    }

    const moveToCell = this.getCellOnCurrentFloor(newRow, newCol);

    if (this.canMove(moveToCell)) {
      this.setPosition(newRow, newCol);
      this.update();
    }
  }

  rotateClockwise() {
    this.state.player.orientation += 90;
    this.update();
  }

  rotateCounterClockwise() {
    this.state.player.orientation -= 90;
    this.update();
  }

  // Battle Functions

  // Listen for updates

  update() {
    this.listeners.forEach((cb) => {
      cb(this.state);
    });
  }

  addListener(cb: (state: Readonly<State>) => void) {
    this.listeners.add(cb);
    return () => this.listeners.delete(cb);
  }

  getState(): Readonly<State> {
    return this.state;
  }
}
