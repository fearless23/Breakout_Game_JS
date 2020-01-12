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

const isHard = (prob: number) => {
  return Math.random() > Math.max(0.2, 1 - prob / 100);
};

export const makeBricks = (
  rowsToCreate: number,
  hardBricksProb: number = 0
) => {
  const bricksData: Brick[] = [];
  const maxRows = getMaxRows();
  const maxBricksInRow = getMaxBricksInRow();
  const rowsGen = Math.min(rowsToCreate, maxRows);
  let totalBricks = rowsGen * maxBricksInRow;
  let hardBricks = 0;

  for (let i = 0; i < rowsGen; i++) {
    for (let j = 0; j < maxBricksInRow; j++) {
      const hard = hardBricksProb === 0 ? false : isHard(hardBricksProb);
      if (hard) hardBricks++;
      const brick = makeBrick(getRowX(j), getRowY(i), hard);
      bricksData.push(brick);
    }
  }

  return {
    bricksData,
    totalBricks,
    hardBricks,
    softBricks: totalBricks - hardBricks
  };
};
