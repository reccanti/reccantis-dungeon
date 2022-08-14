import { Grid as GridClass, Cell as CellType } from "../../grid";
import { row as rowStyle, cell as cellStyle, cellContainer } from "./Grid.css";

/**
 * Utility function for breaking up an array into separate chunks that are each
 * "partionSized"
 */
function partition<T>(
  array: readonly T[],
  partitionSize: number
): readonly T[][] {
  const partitions: T[][] = [];
  let curPartition: T[] = [];
  array.forEach((item) => {
    curPartition.push(item);
    if (curPartition.length >= partitionSize) {
      partitions.push(curPartition);
      curPartition = [];
    }
  });
  if (curPartition.length > 0) {
    partitions.push(curPartition);
  }
  return partitions;
}

/**
 * HTML bullshit for making a cell that will be CSS-rendered into a cube
 */

function Cell({ type }: { type: CellType }) {
  return (
    <div className={cellContainer}>
      <div
        className={cellStyle({
          direction: "front",
          opacity: type === "room" ? "transparent" : "opaque",
        })}
      ></div>
      <div
        className={cellStyle({
          direction: "back",
          opacity: type === "room" ? "transparent" : "opaque",
        })}
      ></div>
      <div
        className={cellStyle({
          direction: "left",
          opacity: type === "room" ? "transparent" : "opaque",
        })}
      ></div>
      <div
        className={cellStyle({
          direction: "right",
          opacity: type === "room" ? "transparent" : "opaque",
        })}
      ></div>
      <div
        className={cellStyle({
          direction: "top",
        })}
      ></div>
      <div
        className={cellStyle({
          direction: "bottom",
        })}
      ></div>
    </div>
  );
}

/**
 * Okay, here's the actual component
 */

interface Props {
  grid: GridClass;
}

export function Grid({ grid }: Props) {
  return (
    <div>
      {partition(grid.cells, grid.width).map((row, i) => (
        <div className={rowStyle} key={i}>
          {row.map((cell, j) => (
            <div key={j}>
              <Cell type={cell} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
