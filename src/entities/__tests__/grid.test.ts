import { Direction } from "../direction";
import { Cell } from "../grid";

describe("Cell", () => {
  it("calls 'update' when a cell property is added", () => {
    const cb = jest.fn();

    const cell = new Cell();
    cell.addListener(cb);
    cell.addProperty({ type: "wall" });

    expect(cb).toHaveBeenCalledTimes(1);
  });

  it("calls 'update' when a cell property is deleted", () => {
    const cb = jest.fn();
    const property = { type: "wall" } as const;

    const cell = new Cell();
    cell.addProperty(property);

    cell.addListener(cb);
    cell.removeProperty(property);

    expect(cb).toHaveBeenCalledTimes(1);
  });

  it("lets you get the properties of a cell", () => {
    const wall1 = { type: "wall" } as const;
    const wall2 = { type: "wall" } as const;
    const player = { type: "player", direction: Direction.Up } as const;

    const cell = new Cell();
    cell.addProperty(wall1);
    cell.addProperty(wall2);
    cell.addProperty(player);

    expect(cell.getProperties()).toEqual([wall1, wall2, player]);
  });
});

describe("Grid", () => {});
