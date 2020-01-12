// Bricks
// Items present in array of arrays.
export type Brick = {
  bx: number;
  by: number;
  hard: boolean;
};
export type Position = [number, number];

export type LevelInfo = {
  bricksData: Brick[];
  totalBricks: number;
  softBricks: number;
  hardBricks: number;
};

export type PlayerInfo = {
  lives: number;
  currLevel: number;
  levelPoints: number;
};
