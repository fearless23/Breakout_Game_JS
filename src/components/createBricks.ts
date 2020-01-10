import {
  brickWidth,
  brickHeight,
  canvasWidth,
  canvasHeight
} from "./constants";
import { Brick } from "./types";

const wgapRatio: number = 5;
const hgapRatio: number = 5;

const wi = (n: number) => n * brickWidth + ((n + 1) * brickWidth) / wgapRatio;
const hi = (n: number) => n * brickHeight + ((n + 1) * brickHeight) / hgapRatio;

const getMaxBricksInRow = () => {
  let i = 1;
  while (i) {
    const t = wi(i);
    if (t > canvasWidth) break;
    i++;
  }
  return i - 1;
};

const getMaxRows = () => {
  let i = 1;
  while (i) {
    const t = hi(i);
    if (t > canvasHeight / 2) break;
    i++;
  }
  return i - 1;
};

const getRowY = (n: number) => {
  return ((n + 1) * brickHeight) / hgapRatio + n * brickHeight;
};

const getRowX = (n: number) => {
  return ((n + 1) * brickWidth) / wgapRatio + n * brickWidth;
};

const makeBrick = (bx: number, by: number, hard: false) => {
  return <Brick>{ bx, by, hard };
};

export const makeBricks = (maxBricks: number) => {
  const bricks: Brick[] = [];
  const maxRows = getMaxRows();
  const maxBricksInRow = getMaxBricksInRow();
  let bricksCreated = 0;

  main: for (let i = 6; i < maxRows; i++) {
    for (let j = 0; j < maxBricksInRow; j++) {
      if (bricksCreated >= maxBricks) {
        break main;
      }
      bricksCreated++;
      const brick = makeBrick(getRowX(j), getRowY(i), false);
      bricks.push(brick);
    }
  }
  return bricks;
};
