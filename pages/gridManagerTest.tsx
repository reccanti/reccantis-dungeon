import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Grid2d } from "../src/components/Grid2d";
import { PrimMaze, primMazeToGrid } from "../src/primMaze";
import { useEffect, useMemo, useState } from "react";
import { GridTraversalManager, Orientation } from "../src/gridTraversalManager";
import { Grid } from "../src/grid";
import { randomInRange } from "../src/util/randomInRange";

const GRID_SIZE = 15;

function findEmptyRoom(grid: Grid) {
  while (true) {
    const row = randomInRange(0, grid.height - 1);
    const col = randomInRange(0, grid.width - 1);
    const cell = grid.getCell(row, col);
    if (!cell.hasPropertyOfType("wall")) {
      return { row, col };
    }
  }
}

const GridTest: NextPage = () => {
  const [maze, setMaze] = useState<PrimMaze | null>(null);
  const [gridManager, setGridManager] = useState<GridTraversalManager | null>(
    null
  );

  useEffect(() => {
    setMaze(new PrimMaze(GRID_SIZE, GRID_SIZE));
  }, []);

  const grid = useMemo(() => {
    if (maze) {
      return primMazeToGrid(maze);
    }
    return null;
  }, [maze]);

  useEffect(() => {
    if (grid) {
      const { row, col } = findEmptyRoom(grid);
      const manager = new GridTraversalManager(grid, row, col);

      window.addEventListener("keyup", manager.listen);
      setGridManager(manager);

      return () => {
        window.removeEventListener("keyup", manager.listen);
      };
    }
  }, [grid]);

  const handleClick = () => {
    setMaze(new PrimMaze(GRID_SIZE, GRID_SIZE));
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {grid && gridManager && <Grid2d grid={grid} />}
        <button onClick={handleClick}>generate new maze</button>
      </main>
    </div>
  );
};

export default GridTest;