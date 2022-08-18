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

  // grid sizing stuff
  gridRows,
  gridCols,

  // rotation stuff
  rotation,
  rotate,
  rotateOffset,

  // utils
  centerIndicator,
  translate,
  curCol as curColVar,
  curRow as curRowVar,
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

  const tiles = useMemo(() => {
    const tiles: ReactNode[] = [];
    for (let i = 0; i < grid.height; i++) {
      for (let j = 0; j < grid.width; j++) {
        tiles.push(
          <Tile
            type={
              grid.getCell(i, j).hasPropertyOfType("wall") ? "wall" : "room"
            }
            row={i}
            col={j}
          />
        );
      }
    }
    return tiles;
  }, [grid]);

  return (
    <div className={viewport} style={style}>
      <div className={centerIndicator}></div>
      <div className={rotateOffset}>
        <div className={rotate}>
          <div className={translate}>
            <div className={tileWrapper}>{tiles}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
