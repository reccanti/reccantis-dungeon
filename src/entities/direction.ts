export const enum Direction {
  Up = 0,
  Down = 180,
  Left = 270,
  Right = 90,
}

export function getDirection(angle: number): Direction {
  const baseAngle = angle % 360;
  const absoluteAngle = baseAngle < 0 ? baseAngle + 360 : baseAngle;
  switch (absoluteAngle as Direction) {
    case Direction.Up:
    case Direction.Down:
    case Direction.Left:
    case Direction.Right: {
      return absoluteAngle;
    }
    default: {
      throw Error(`${angle}: is not a valid direction`);
    }
  }
}
