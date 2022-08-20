import { ReactNode, useEffect, useMemo, useReducer } from "react";

import {
  // viewport stuff
  viewportHeight,
  viewportWidth,
  viewport,

  // tile stuff
  tile,
  tileRow,
  tileCol,
  tileWrapper,
  tile3d,
  tileFace,

  // grid sizing stuff
  gridRows,
  gridCols,

  // translation stuff
  translate,
  curCol as curColVar,
  curRow as curRowVar,

  // rotation stuff
  rotation,
  rotate,
  rotateOffset,

  // perspective stuff
  perspective,
  perspectiveWrapper,

  // fog of war
  fowStart,
  fowDistance,
  fowDensity,
  fogOfWar,
  fogOfWarWrapper,
  fogOfWarContainer,

  // utils
  centerIndicator,
} from "./Grid3d.css";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { Grid } from "../../grid";

// Tile

interface TileProps {
  row: number;
  col: number;
  type: "room" | "wall";
}

function Tile({ row, col, type }: TileProps) {
  const style = assignInlineVars({
    [tileRow]: row.toString(),
    [tileCol]: col.toString(),
  });
  return (
    <div
      className={tile({
        type,
      })}
      style={style}
    ></div>
  );
}

export function Tile3d({ row, col, type }: TileProps) {
  const style = assignInlineVars({
    [tileRow]: row.toString(),
    [tileCol]: col.toString(),
  });
  return (
    <div className={tile3d} style={style}>
      <div
        className={tileFace({
          direction: "front",
          opacity: type === "wall" ? "opaque" : "transparent",
        })}
      ></div>
      <div
        className={tileFace({
          direction: "back",
          opacity: type === "wall" ? "opaque" : "transparent",
        })}
      ></div>
      <div
        className={tileFace({
          direction: "left",
          opacity: type === "wall" ? "opaque" : "transparent",
        })}
      ></div>
      <div
        className={tileFace({
          direction: "right",
          opacity: type === "wall" ? "opaque" : "transparent",
        })}
      ></div>
      <div
        className={tileFace({
          direction: "top",
        })}
      ></div>
      <div
        className={tileFace({
          direction: "bottom",
        })}
      ></div>
    </div>
  );
}

// VisibleGrid - only displays a portion of the grid so we aren't making a bajillion elements
type TileCache = Record<string, ReactNode>;
type TileReducerActions =
  | { type: "init" }
  | {
      type: "move";
      row: number;
      col: number;
      grid: Grid;
      drawDistance: number;
      cachedDistance: number;
    };

const initialState: TileCache = {};

function tileReducer(state: TileCache, action: TileReducerActions) {
  switch (action.type) {
    case "init": {
      return initialState;
    }
    case "move": {
      const newState: TileCache = {};
      const { row, col, drawDistance, cachedDistance, grid } = action;

      const minCol = col - drawDistance - cachedDistance;
      const maxCol = col + drawDistance + cachedDistance + 1;
      const minRow = row - drawDistance - cachedDistance;
      const maxRow = row + drawDistance + cachedDistance + 1;

      // let tiles: ReactNode[] = [];
      for (let i = minRow; i < maxRow; i++) {
        for (let j = minCol; j < maxCol; j++) {
          const key = `${i},${j}`;
          if (state[key]) {
            newState[key] = state[key];
          } else {
            if (i < 0 || i >= grid.height || j < 0 || j >= grid.width) {
              newState[key] = <Tile3d key={key} type="wall" row={i} col={j} />;
            } else {
              newState[key] = (
                <Tile3d
                  key={key}
                  type={
                    grid.getCell(i, j).hasPropertyOfType("wall")
                      ? "wall"
                      : "room"
                  }
                  row={i}
                  col={j}
                />
              );
            }
          }
        }
      }
      return newState;
    }
  }
  return state;
}

function getVisibleTilesFromCache(
  cache: TileCache,
  row: number,
  col: number,
  drawDistance: number
) {
  const minCol = col - drawDistance;
  const maxCol = col + drawDistance;
  const minRow = row - drawDistance;
  const maxRow = row + drawDistance;

  const tiles: ReactNode[] = [];
  for (let i = minRow; i <= maxRow; i++) {
    for (let j = minCol; j <= maxCol; j++) {
      const key = `${i},${j}`;
      const tile = cache[key] as ReactNode;
      tiles.push(tile);
    }
  }

  return tiles;
}

interface VisibleGridProps {
  curRow: number;
  curCol: number;
  grid: Grid;
  drawDistance: number;
  cachedDistance: number;
}

function VisibleGrid({
  curRow,
  curCol,
  grid,
  drawDistance,
  cachedDistance,
}: VisibleGridProps) {
  const [cache, dispatch] = useReducer(tileReducer, initialState);

  useEffect(() => {
    dispatch({ type: "init" });
  }, [grid]);

  useEffect(() => {
    dispatch({
      type: "move",
      row: curRow,
      col: curCol,
      grid,
      drawDistance,
      cachedDistance,
    });
  }, [grid, curRow, curCol]);

  const tiles = getVisibleTilesFromCache(cache, curRow, curCol, drawDistance);

  return <div className={translate}>{tiles}</div>;
}

// Fog of War

interface FogOfWarProps {
  offset: number;
  distance: number;
  density: number;
}

function FogOfWar({ offset, distance, density }: FogOfWarProps) {
  const style = assignInlineVars({
    [fowStart]: `${offset}`,
    [fowDistance]: `${distance}`,
    [fowDensity]: `${density}`,
  });

  return (
    <div className={fogOfWarContainer} style={style}>
      {Array.from({ length: density * distance }).map((_, i) => (
        <div key={i} className={fogOfWarWrapper}>
          <div className={fogOfWar} />
        </div>
      ))}
    </div>
  );
}

// Grid

interface GridProps {
  width?: number;
  height?: number;
  orientation: number;
  curRow: number;
  curCol: number;
  grid: Grid;
}

export function Grid3d({
  width = 500,
  height = 500,
  orientation,
  curRow,
  curCol,
  grid,
}: GridProps) {
  const style = assignInlineVars({
    [viewportHeight]: `${height}px`,
    [viewportWidth]: `${width}px`,
    [rotation]: `${orientation}deg`,
    [gridRows]: `${grid.height}`,
    [gridCols]: `${grid.width}`,
    [curRowVar]: `${curRow}`,
    [curColVar]: `${curCol}`,
  });

  const fow = useMemo(
    () => <FogOfWar density={8} distance={2} offset={0} />,
    []
  );

  return (
    <>
      <div className={viewport} style={style}>
        {/* <div className={centerIndicator}></div> */}
        <div className={perspectiveWrapper}>
          <div className={perspective}>
            {fow}
            <div className={rotateOffset}>
              <div className={rotate}>
                <VisibleGrid
                  curCol={curCol}
                  curRow={curRow}
                  grid={grid}
                  drawDistance={3}
                  cachedDistance={1}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
