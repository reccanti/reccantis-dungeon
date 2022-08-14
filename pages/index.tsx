import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";

/**
 * Utlities
 */

// https://stackoverflow.com/a/12646864
function shuffle<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

type Wall = `${number},${number}`;

/**
 * The maze generator!
 */

class Maze {
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

    let i = 0;
    console.log("========== STARTING ==========");
    while (wallsToVisit.length) {
      i++;
      console.log(wallsToVisit);
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
      console.log(wallsToVisit);
    }
    console.log(this);
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

/**
 * Print the maze
 */
function printMaze(maze: Maze): string {
  const getNextInRow = (cell: number) => {
    const hasNext = (cell + 1) % maze.width > 0;
    return hasNext ? cell + 1 : null;
  };
  const getCellAbove = (cell: number) => {
    const hasAbove = cell - maze.width >= 0;
    return hasAbove ? cell - maze.width : null;
  };

  const generateGrid = () => {
    const solidRow = "#".repeat(maze.width * 2 + 1);
    const innerGrid = "#" + " #".repeat(maze.width);
    return solidRow + ("\n" + innerGrid + "\n" + solidRow).repeat(maze.height);
  };

  const cellToIndex = (cell: number) => {
    const row = Math.floor(cell / maze.width);
    const col = cell % maze.width;
    return (
      col * 2 + (maze.width * 2 + 3) * (row + 1) + (maze.width * 2 + 1) * row
    );
  };

  const wallAboveIndex = (cell: number) => {
    const i = cellToIndex(cell);
    return i - maze.width * 2 - 2;
  };

  const wallNextIndex = (cell: number) => {
    const i = cellToIndex(cell);
    return i + 1;
  };

  const numRooms = maze.width * maze.height;
  const cells = Array.from({ length: numRooms }, (_, i) => i);

  let grid = generateGrid();
  cells.forEach((cell) => {
    const next = getNextInRow(cell);
    const above = getCellAbove(cell);

    if (next !== null && !maze.hasWall(cell, next)) {
      const i = wallNextIndex(cell);
      grid = grid.substring(0, i) + " " + grid.substring(i + 1);
    }

    if (above !== null && !maze.hasWall(cell, above)) {
      const i = wallAboveIndex(cell);
      grid = grid.substring(0, i) + " " + grid.substring(i + 1);
    }
  });

  return grid;
}

/**
 * The Page
 */

const Home: NextPage = () => {
  const [maze, setMaze] = useState<Maze | null>(null);

  useEffect(() => {
    setMaze(new Maze(25, 25));
  }, []);

  const handleClick = () => {
    setMaze(new Maze(25, 25));
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {maze && (
          <pre>
            {printMaze(maze)
              .split("\n")
              .map((row, i) => (
                <div key={i}>
                  {row.split("").map((char, i) => (
                    <span
                      key={i}
                      style={{
                        height: "0.75rem",
                        width: "0.75rem",
                        display: "inline-block",
                      }}
                    >
                      {char}
                    </span>
                  ))}
                </div>
              ))}
          </pre>
        )}
        <button onClick={handleClick}>Regenerate</button>
      </main>
    </div>
  );
};

export default Home;
