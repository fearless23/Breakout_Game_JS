// Bricks
// Items present in array of arrays.
export type Brick = {
  bx: number;
  by: number;
  hard: boolean;
};
export type Position = [number, number];
export const sampleBrick: Brick = { bx: 4, by: 4, hard: false };
