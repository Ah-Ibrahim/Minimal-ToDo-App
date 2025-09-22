export type Color = `#${string}`;

export interface Position {
  x: number;
  y: number;
}

export interface Circle {
  width: number;
  color: Color;
  position: Position;
}
