import { useMemo } from "react";
import { assignInlineVars } from "@vanilla-extract/dynamic";

import { partition } from "../../util/partition";
import { Grid, Cell, Property } from "../../grid";
import { row as rowStyle, cell as cellStyle, cellSize } from "./Grid2d.css";
import { useEffect, useState } from "react";

type StyleType = ReturnType<typeof assignInlineVars>;

function WallTile({ style }: { style: StyleType }) {
  return (
    <div
      className={cellStyle({
        type: "wall",
      })}
      style={style}
    ></div>
  );
}

function RoomTile({ style }: { style: StyleType }) {
  return (
    <div
      className={cellStyle({
        type: "room",
      })}
      style={style}
    ></div>
  );
}

function PlayerTile({
  orientation,
  style,
}: {
  orientation: "up" | "down" | "left" | "right";
  style: StyleType;
}) {
  return (
    <div
      className={cellStyle({
        type: "player",
        orientation,
      })}
      style={style}
    ></div>
  );
}

function Tile({ cell, size }: { cell: Cell; size: number }) {
  const [property, setProperty] = useState<Property | null>(null);

  useEffect(() => {
    const listen: Parameters<typeof cell.addListener>[0] = () => {
      const properties = cell.getProperties();

      // first, see if it's a player tile
      let property = properties.find((prop) => prop.type === "player");
      if (property) {
        setProperty({ ...property });
        return;
      }

      // next, see if it's a wall tile
      property = properties.find((prop) => prop.type === "wall");
      if (property) {
        setProperty({ ...property });
        return;
      }

      // otherwise, it's just a normal room
      setProperty(null);
    };

    // call the function first to get the initial cell state
    listen();

    // then add the listener
    cell.addListener(listen);
    return () => cell.removeListener(listen);
  }, [cell]);

  const style = assignInlineVars({ [cellSize]: `${size}px` });

  if (!property) {
    return <RoomTile style={style} />;
  } else if (property.type === "player") {
    return <PlayerTile style={style} orientation={property.orientation} />;
  } else {
    return <WallTile style={style} />;
  }
}

interface Props {
  grid: Grid;
  cellSize?: number;
}

export function Grid2d({ grid, cellSize = 50 }: Props) {
  const children = useMemo(
    () =>
      partition(grid.cells, grid.width).map((row, i) => (
        <div className={rowStyle} key={i}>
          {row.map((cell, j) => (
            <Tile cell={cell} size={cellSize} key={`${i},${j}`} />
          ))}
        </div>
      )),
    [grid]
  );
  return <div>{children}</div>;
}
