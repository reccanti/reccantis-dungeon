// Cell Properties

interface CellProperty {
  type: string;
}
interface Wall extends CellProperty {
  type: "wall";
}
interface Player extends CellProperty {
  type: "player";
  orientation: "up" | "down" | "left" | "right";
}
export type Property = Wall | Player;

// Cell

export class Cell {
  private callbacks = new Set<Function>();
  private properties: Set<Property> = new Set();

  // reference-type property functions. Useful for working with specific
  // properties

  private _addProperty(property: Property) {
    this.properties.add(property);
  }

  addProperty(property: Property) {
    this._addProperty(property);
    this.update();
  }

  private _removeProperty(property: Property) {
    this.properties.delete(property);
  }

  removeProperty(property: Property) {
    this._removeProperty(property);
    this.update();
  }

  hasProperty(property: Property) {
    return this.properties.has(property);
  }

  getProperties() {
    return Array.from(this.properties);
  }

  // type-specific property functions. Technically we can do everything with the
  // reference-type ones, but it's a little inconvenient

  hasPropertyOfType(type: Property["type"]) {
    return this.getProperties().reduce((has, prop) => {
      if (prop.type === type) {
        has = true;
      }
      return has;
    }, false);
  }

  getPropertiesOfType(type: Property["type"]) {
    return this.getProperties().filter((prop) => prop.type === type);
  }

  removePropertiesOfType(type: Property["type"]) {
    this.getProperties().forEach((prop) => {
      if (prop.type === type) {
        this._removeProperty(prop);
      }
    });
    this.update();
  }

  // listeners so we know when something changed

  addListener(callback: Parameters<typeof this.callbacks.add>[0]) {
    this.callbacks.add(callback);
  }

  removeListener(callback: Parameters<typeof this.callbacks.add>[0]) {
    this.callbacks.delete(callback);
  }

  private update() {
    this.callbacks.forEach((cb) => {
      cb();
    });
  }
}

// Grid

export class Grid {
  readonly width: number;
  readonly height: number;
  private _cells: Cell[];
  get cells(): ReadonlyArray<Cell> {
    return this._cells;
  }

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this._cells = Array.from({ length: width * height }, () => new Cell());
  }

  getNeighbors(row: number, col: number) {
    const up = this.coordsToIndex(row - 1, col);
    const down = this.coordsToIndex(row + 1, col);
    const left = this.coordsToIndex(row, col - 1);
    const right = this.coordsToIndex(row, col + 1);
    return {
      up: up ? this.cells[up] : null,
      down: down ? this.cells[down] : null,
      left: left ? this.cells[left] : null,
      right: right ? this.cells[right] : null,
    };
  }

  private coordsToIndex(row: number, col: number) {
    if (row < 0 || row >= this.height || col < 0 || col > this.width) {
      return null;
    }
    return row * this.width + col;
  }

  getCell(row: number, col: number) {
    const i = this.coordsToIndex(row, col);
    if (i !== null) {
      return this._cells[i];
    } else {
      throw Error(
        `There's no cell at the following coordinates: row ${row}, col ${col}`
      );
    }
  }

  setCell(row: number, col: number, cell: Cell) {
    const i = this.coordsToIndex(row, col);
    if (i !== null) {
      this._cells = [
        ...this._cells.slice(0, i),
        cell,
        ...this._cells.slice(i + 1),
      ];
    } else {
      throw Error(
        `There's no cell at the following coordinates: row ${row}, col ${col}`
      );
    }
  }
}
