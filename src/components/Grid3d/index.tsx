import { useMemo } from "react";

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
} from "./Grid3d.css";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { Orientation } from "../../gridTraversalManager";

// Tile

interface TileProps {
  row: number;
  col: number;
}

function Tile({ row, col }: TileProps) {
  const style = assignInlineVars({
    [tileRow]: row.toString(),
    [tileCol]: col.toString(),
  });
  return <div className={tile} style={style}></div>;
}

// Grid

interface GridProps {
  width?: number;
  height?: number;
  orientation: number;
}

export function Grid3d({ width = 500, height = 500, orientation }: GridProps) {
  const style = assignInlineVars({
    [viewportHeight]: `${height}px`,
    [viewportWidth]: `${width}px`,
    [rotation]: `${orientation}deg`,
    [gridRows]: `${3}`,
    [gridCols]: `${3}`,
  });

  const tiles = useMemo(
    () => (
      <>
        <Tile row={0} col={0} />
        <Tile row={0} col={1} />
        <Tile row={0} col={2} />
        <Tile row={1} col={0} />
        <Tile row={1} col={1} />
        <Tile row={1} col={2} />
        <Tile row={2} col={0} />
        <Tile row={2} col={1} />
        <Tile row={2} col={2} />
      </>
    ),
    []
  );

  return (
    <div className={viewport} style={style}>
      <div className={rotate}>
        <div className={tileWrapper}>{tiles}</div>
      </div>
    </div>
  );
}
