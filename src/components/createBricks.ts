import {
  brickWidth,
  brickHeight,
  canvasWidth,
  canvasHeight,
  ballRadius
} from "./constants";
import { Brick } from "./types";

const hor_gap: number = ballRadius * 3; // ballRadius = 10
const ver_gap: number = ballRadius * 3; // ballRadius = 10

const wi = (n: number) => n * brickWidth + (n + 1) * hor_gap;
const hi = (n: number) => n * brickHeight + (n + 1) * ver_gap;

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
  return (n + 1) * ver_gap + n * brickHeight;
};

const getRowX = (n: number) => {
  return (n + 1) * hor_gap + n * brickWidth;
};

const makeBrick = (bx: number, by: number, hard: boolean) => {
  return <Brick>{ bx, by, hard };
};

const shouldBeHardBrick = (prob: number) => {
  return Math.random() > 1 - prob / 100;
};

export const makeBricks = (
  rowsToCreate: number,
  hardBricksProb: number = 0
) => {
  const bricks: Brick[] = [];
  const maxRows = getMaxRows();
  const maxBricksInRow = getMaxBricksInRow();
  const rowsGen = Math.min(rowsToCreate, maxRows);
  let bricksCreated = 2;
  let hardBricksCreated = 0;

  for (let i = 1; i < 2; i++) {
    for (let j = 6; j < 8; j++) {
      const hard =
        hardBricksProb === 0 ? false : shouldBeHardBrick(hardBricksProb);
      if (hard) hardBricksCreated++;
      const brick = makeBrick(getRowX(j), getRowY(i), hard);
      bricks.push(brick);
    }
  }

  return {
    bricks,
    totalBricks: bricksCreated,
    hardBricks: hardBricksCreated,
    softBricks: bricksCreated - hardBricksCreated
  };
};
