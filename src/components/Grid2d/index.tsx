import { assignInlineVars } from "@vanilla-extract/dynamic";

import { partition } from "../../util/partition";
import { Grid } from "../../grid";
import { row as rowStyle, cell as cellStyle, cellSize } from "./Grid2d.css";

interface Props {
  grid: Grid;
  orientation: "up" | "down" | "left" | "right";
}

export function Grid2d({ grid, orientation }: Props) {
  return (
    <div>
      {partition(grid.cells, grid.width).map((row, i) => (
        <div className={rowStyle} key={i}>
          {row.map((cell, j) => (
            <div
              className={cellStyle({
                type: cell,
                orientation,
              })}
              style={assignInlineVars({ [cellSize]: "25px" })}
              key={j}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
}
