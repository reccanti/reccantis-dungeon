import { ReactNode, useMemo } from "react";

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
  const minCol = curCol - drawDistance - cachedDistance;
  const maxCol = curCol + drawDistance + cachedDistance;
  const minRow = curRow - drawDistance - cachedDistance;
  const maxRow = curRow + drawDistance + cachedDistance;

  let tiles: ReactNode[] = [];
  for (let i = minRow; i < maxRow; i++) {
    for (let j = minCol; j < maxCol; j++) {
      if (i < 0 || i >= grid.height || j < 0 || j >= grid.width) {
        tiles.push(<Tile key={`${i},${j}`} type="wall" row={i} col={j} />);
      } else {
        tiles.push(
          <Tile3d
            key={`${i},${j}`}
            type={
              grid.getCell(i, j).hasPropertyOfType("wall") ? "wall" : "room"
            }
            row={i}
            col={j}
          />
        );
      }
    }
  }
  return <div className={translate}>{tiles}</div>;
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

  // const tiles = useMemo(() => {
  //   const tiles: ReactNode[] = [];
  //   for (let i = 0; i < grid.height; i++) {
  //     for (let j = 0; j < grid.width; j++) {
  //       tiles.push(
  //         <Tile
  //           key={`${i},${j}`}
  //           type={
  //             grid.getCell(i, j).hasPropertyOfType("wall") ? "wall" : "room"
  //           }
  //           row={i}
  //           col={j}
  //         />
  //       );
  //     }
  //   }
  //   return tiles;
  // }, [grid]);

  return (
    <>
      <div className={viewport} style={style}>
        <div className={centerIndicator}></div>
        <div className={perspectiveWrapper}>
          <div className={perspective}>
            <div className={rotateOffset}>
              <div className={rotate}>
                <VisibleGrid
                  curCol={curCol}
                  curRow={curRow}
                  grid={grid}
                  drawDistance={3}
                  cachedDistance={1}
                />
                {/* <div className={translate}> */}
                {/* <div className={tileWrapper}>{tiles}</div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
