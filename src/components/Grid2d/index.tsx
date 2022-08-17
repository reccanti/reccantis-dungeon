import { assignInlineVars } from "@vanilla-extract/dynamic";

import { partition } from "../../util/partition";
import { Grid, Cell, Property } from "../../grid";
import { row as rowStyle, cell as cellStyle, cellSize } from "./Grid2d.css";
import { useEffect, useMemo, useState } from "react";

interface Props {
  grid: Grid;
}

function WallTile() {
  return (
    <div
      className={cellStyle({
        type: "wall",
      })}
      style={assignInlineVars({ [cellSize]: "25px" })}
    ></div>
  );
}

function RoomTile() {
  return (
    <div
      className={cellStyle({
        type: "room",
      })}
      style={assignInlineVars({ [cellSize]: "25px" })}
    ></div>
  );
}

function PlayerTile({
  orientation,
}: {
  orientation: "up" | "down" | "left" | "right";
}) {
  return (
    <div
      className={cellStyle({
        type: "player",
        orientation,
      })}
      style={assignInlineVars({ [cellSize]: "25px" })}
    ></div>
  );
}

function Tile({ cell }: { cell: Cell }) {
  const [property, setProperty] = useState<Property | null>(null);

  useEffect(() => {
    const listen: Parameters<typeof cell.addListener>[0] = () => {
      const properties = cell.getProperties();

      // first, see if it's a player tile
      let property = properties.find((prop) => prop.type === "player");
      if (property) {
        console.log("update...");
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

  return useMemo(() => {
    if (!property) {
      return <RoomTile />;
    } else if (property.type === "player") {
      return <PlayerTile orientation={property.orientation} />;
    } else {
      return <WallTile />;
    }
  }, [property]);
}

export function Grid2d({ grid }: Props) {
  return (
    <div>
      {partition(grid.cells, grid.width).map((row, i) => (
        <div className={rowStyle} key={i}>
          {row.map((cell, j) => (
            <Tile cell={cell} key={`${i},${j}`} />
          ))}
        </div>
      ))}
    </div>
  );
}
