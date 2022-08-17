// import { Grid as GridClass, CellType } from "../../grid";
// import { row as rowStyle, cell as cellStyle, cellContainer } from "./Grid.css";
// import { partition } from "../../util/partition";

// /**
//  * HTML bullshit for making a cell that will be CSS-rendered into a cube
//  */

// function Cell({ type }: { type: CellType }) {
//   return (
//     <div className={cellContainer}>
//       <div
//         className={cellStyle({
//           direction: "front",
//           opacity: type === "room" ? "transparent" : "opaque",
//         })}
//       ></div>
//       <div
//         className={cellStyle({
//           direction: "back",
//           opacity: type === "room" ? "transparent" : "opaque",
//         })}
//       ></div>
//       <div
//         className={cellStyle({
//           direction: "left",
//           opacity: type === "room" ? "transparent" : "opaque",
//         })}
//       ></div>
//       <div
//         className={cellStyle({
//           direction: "right",
//           opacity: type === "room" ? "transparent" : "opaque",
//         })}
//       ></div>
//       <div
//         className={cellStyle({
//           direction: "top",
//         })}
//       ></div>
//       <div
//         className={cellStyle({
//           direction: "bottom",
//         })}
//       ></div>
//     </div>
//   );
// }

// /**
//  * Okay, here's the actual component
//  */

// interface Props {
//   grid: GridClass;
// }

// export function Grid({ grid }: Props) {
//   return (
//     <div>
//       {partition(grid.cells, grid.width).map((row, i) => (
//         <div className={rowStyle} key={i}>
//           {row.map((cell, j) => (
//             <div key={j}>
//               <Cell type={cell.type} />
//             </div>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// }

export {};
