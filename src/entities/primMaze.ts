import { cell } from "../components/Grid/Grid.css";
import { Cell, Grid } from "./grid";
import { shuffle } from "../util/shuffle";
/**
 * The maze generator!
 */

type Wall = `${number},${number}`;

export class PrimMaze {
  width: number;
  height: number;
  walls: Set<Wall>;

  /**
   * Generate a maze using Prim's algorithm:
   *
   * https://en.wikipedia.org/wiki/Maze_generation_algorithm#Randomized_Prim's_algorithm
   */
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;

    const numRooms = width * height;
    const rooms = Array.from({ length: numRooms }, (_, i) => i);
    this.walls = new Set(rooms.flatMap((room) => this._getWalls(room)));

    const start = shuffle(rooms)[0] as number;
    let wallsToVisit = this._getWalls(start).filter((wall) =>
      this.walls.has(wall)
    );
    const visited = new Set([start]);

    while (wallsToVisit.length) {
      const wall = shuffle(wallsToVisit).pop() as Wall;

      const [room1, room2] = this._getCells(wall);
      if (!visited.has(room1) || !visited.has(room2)) {
        this.walls.delete(wall);
        visited.add(room1);
        visited.add(room2);
        wallsToVisit = Array.from(
          new Set(
            [
              ...wallsToVisit,
              ...this._getWalls(room1),
              ...this._getWalls(room2),
            ].filter((wall) => this.walls.has(wall))
          )
        );
      }
    }
  }

  _getNeighbors(cell: number) {
    const neighbors = [];

    const { row, col } = this.getCoordinates(cell);
    if (col + 1 < this.width) {
      neighbors.push(this.getCell(row, col + 1));
    }
    if (col - 1 >= 0) {
      neighbors.push(this.getCell(row, col - 1));
    }
    if (row + 1 < this.height) {
      neighbors.push(this.getCell(row + 1, col));
    }
    if (row - 1 >= 0) {
      neighbors.push(this.getCell(row - 1, col));
    }

    return neighbors;
  }

  _getWalls(cell: number) {
    const neighbors = this._getNeighbors(cell);
    return neighbors.map((neighbor) => this._formatWall(cell, neighbor));
  }

  _getCells(wall: Wall) {
    return wall.split(",").map((room) => parseInt(room));
  }

  _formatWall(cell1: number, cell2: number): Wall {
    const least = Math.min(cell1, cell2);
    const greatest = Math.max(cell1, cell2);
    return `${least},${greatest}`;
  }

  _getAdjacentCell(cell: number, wall: Wall) {
    const [cell1, cell2] = wall.split(",").map((num) => parseInt(num));
    return cell === cell1 ? cell2 : cell1;
  }

  hasWall(cell1: number, cell2: number) {
    const wall = this._formatWall(cell1, cell2);
    return this.walls.has(wall);
  }

  getCoordinates(cell: number) {
    const row = Math.floor(cell / this.width);
    const col = cell % this.width;
    return { row, col };
  }

  getCell(row: number, col: number) {
    return row * this.width + col;
  }
}

export function primMazeToGrid(maze: PrimMaze) {
  // utility functions for converting things in this function
  const getNextInRow = (cell: number) => {
    const hasNext = (cell + 1) % maze.width > 0;
    return hasNext ? cell + 1 : null;
  };
  const getCellAbove = (cell: number) => {
    const hasAbove = cell - maze.width >= 0;
    return hasAbove ? cell - maze.width : null;
  };

  const generateGrid = () => {
    const grid = new Grid(2 * maze.width + 1, 2 * maze.height + 1);
    // for (let i = 0; i < grid.width; i++) {
    //   grid.setCell(0, i, "wall");
    //   grid.setCell(grid.height - 1, i, "wall");
    // }

    // for (let j = 0; j < grid.height; j++) {
    //   grid.setCell(j, 0, "wall");
    //   grid.setCell(j, grid.width - 1, "wall");
    // }

    for (let i = 0; i < grid.width; i++) {
      for (let j = 0; j < grid.height; j++) {
        const cell = grid.getCell(i, j);
        cell.addProperty({ type: "wall" });
        // grid.setCell(i, j, new Cell("wall"));
      }
    }

    return grid;
  };

  const cellToIndex = (cell: number) => {
    const row = Math.floor(cell / maze.width);
    const col = cell % maze.width;
    return (
      col * 2 + (maze.width * 2 + 3) * (row + 1) + (maze.width * 2 + 1) * row
    );
  };

  const cellToCoords = (cell: number) => {
    // first, convert to a row and column in the maze coordinate system
    const mazeRow = Math.floor(cell / maze.width);
    const mazeCol = cell % maze.width;

    // next, convert those into a row and column in the grid's
    const row = 2 * mazeRow + 1;
    const col = 2 * mazeCol + 1;

    return { row, col };
  };

  const wallAboveIndex = (cell: number) => {
    const i = cellToIndex(cell);
    return i - maze.width * 2 - 2;
  };

  const wallNextIndex = (cell: number) => {
    const i = cellToIndex(cell);
    return i + 1;
  };

  // get the rooms we'll need to search through
  const numRooms = maze.width * maze.height;
  const cells = Array.from({ length: numRooms }, (_, i) => i);

  // generate a grid that's empty except for some bounding walls
  const grid = generateGrid();

  // iterate through each room and determine whether to add a wall or not
  cells.forEach((cellIndex) => {
    // first, mark the current cell as a room
    const { row, col } = cellToCoords(cellIndex);
    const cell = grid.getCell(row, col);
    cell.removePropertiesOfType("wall");

    const next = getNextInRow(cellIndex);
    const above = getCellAbove(cellIndex);

    if (next !== null && !maze.hasWall(cellIndex, next)) {
      const cell = grid.getCell(row, col + 1);
      cell.removePropertiesOfType("wall");
    }

    if (above !== null && !maze.hasWall(cellIndex, above)) {
      const cell = grid.getCell(row - 1, col);
      cell.removePropertiesOfType("wall");
    }
  });

  return grid;
}
