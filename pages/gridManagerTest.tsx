import type { NextPage } from "next";
import Head from "next/head";
import { throttle } from "throttle-typescript";
import { FpsView } from "react-fps";

import stylesCss from "../styles/Home.module.css";
import { Grid2d } from "../src/components/Grid2d";
import { Grid3d } from "../src/components/Grid3d";
import { PrimMaze, primMazeToGrid } from "../src/entities/primMaze";
import { useEffect, useMemo, useState } from "react";
import { GridTraversalManager, Orientation } from "../src/gridTraversalManager";
import { Grid } from "../src/entities/grid";
import { randomInRange } from "../src/util/randomInRange";
import { Box } from "../src/components/WeirdLayoutStuffIllProbablyDeleteLater/Box";
import {
  Layout,
  Column,
} from "../src/components/WeirdLayoutStuffIllProbablyDeleteLater/Layout";
import { ANIMATION_DURATION } from "../src/components/Grid3d/Grid3d.css";

const GRID_SIZE = 10;

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

// The actual page

const GridTest: NextPage = () => {
  const [maze, setMaze] = useState<PrimMaze | null>(null);
  const [gridManager, setGridManager] = useState<GridTraversalManager | null>(
    null
  );

  const [orientation, setOrientation] = useState<number>(180);
  const [row, setRow] = useState<number>(0);
  const [col, setCol] = useState<number>(0);

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

      const listen = throttle(manager.listen, ANIMATION_DURATION);

      window.addEventListener("keydown", listen);
      setGridManager(manager);
      setOrientation(180);
      setCol(manager.col);
      setRow(manager.row);

      return () => {
        window.removeEventListener("keydown", listen);
      };
    }
  }, [grid]);

  useEffect(() => {
    if (gridManager) {
      const listen: Parameters<typeof gridManager.addUpdateListener>[0] = (
        update
      ) => {
        if (update.type === "OrientationChange") {
          if (update.direction === "clockwise") {
            setOrientation((curOrientation) => curOrientation - 90);
          } else {
            setOrientation((curOrientation) => curOrientation + 90);
          }
        }
        if (update.type === "PositionChange") {
          setRow(update.row);
          setCol(update.col);
        }
      };

      gridManager.addUpdateListener(listen);
      return () => gridManager.removeUpdateListener(listen);
    }
  }, [gridManager]);

  const handleClick = () => {
    setMaze(new PrimMaze(GRID_SIZE, GRID_SIZE));
  };

  return (
    <div className={stylesCss.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={stylesCss.main}>
        <FpsView />
        {grid && gridManager && (
          <Layout columns={2}>
            <Column>
              <Box>
                <Grid3d
                  width={750}
                  height={750}
                  grid={grid}
                  curRow={row}
                  curCol={col}
                  orientation={orientation}
                />
              </Box>
            </Column>
            <Column>
              <Box>
                <Grid2d grid={grid} cellSize={15} />
              </Box>
            </Column>
          </Layout>
        )}
        <button onClick={handleClick}>generate new maze</button>
      </main>
    </div>
  );
};

export default GridTest;
