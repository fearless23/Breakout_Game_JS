import { Position } from "./types";
import { boardSize, paddleWidth } from "./constants";
import { itemIdxInArray } from "./helpers";

const willHitPaddle = (nx: number, paddleXPos: number) => {
  const diff = nx - paddleXPos;
  if (diff < 0 || diff > paddleWidth) return false;
  return true;
};

const getPosition = (
  [cx, cy]: Position,
  [dx, dy]: Position,
  paddleXPos: number
) => {
  let isCrash = false;
  let nx = cx,
    ny = cy,
    ndx = dx,
    ndy = dy;
  if (cy + dy >= boardSize - 1 && !willHitPaddle(cx + dx, paddleXPos)) {
    return { isCrash: true };
  }

  if (
    cx + dx < 0 ||
    cx + dx >= boardSize ||
    cy + dy < 0 ||
    cy + dy >= boardSize - 1
  ) {
    ndx = dy;
    ndy = -dx;
    nx = cx + ndx;
    ny = cy + ndy;
  }
  // if (cx + dx >= boardSize) {
  //   ndx = dy;
  //   ndy = -dx;
  //   nx = cx + ndx;
  //   ny = cy + ndy;
  // }
  // if (cy + dy < 0) {
  //   ndx = dy;
  //   ndy = -dx;
  //   nx = cx + ndx;
  //   ny = cy + ndy;
  // }
  // if (cy + dy >= boardSize - 1) {
  //   if (willHitPaddle(cx + dx, paddleXPos)) {
  //     ndx = dy;
  //     ndy = -dx;
  //     nx = cx + ndx;
  //     ny = cy + ndy;
  //   } else {
  //     isCrash = true;
  //   }
  // }

  ndx = dy;
  ndy = -dx;

  nx = cx + ndx;
  ny = cy + ndy;

  return {
    newPos: <Position>[nx, ny],
    newDir: <Position>[ndx, ndy],
    isCrash
  };
};

const getBallPos = function(
  [x, y]: Position,
  dir: Position,
  paddleXPos: number,
  bricks: Position[]
) {
  let a = getPosition([x, y], dir, paddleXPos);
  const idx = itemIdxInArray(bricks, a.newPos);
  if (!!idx) {
    // Hit a Brick...
    const brick = bricks[idx];
  }

  return a;
};

const fillBall = (ctx: CanvasRenderingContext2D, [x, y]: Position) => {
  ctx.beginPath();
  ctx.fillStyle = "#2a98ef";
  ctx.arc(x + 0.5, y + 0.5, 0.5, 0, 2 * Math.PI);
  ctx.fill();
};

export const Ball = (ctx: CanvasRenderingContext2D) => (
  ballPos: Position,
  ballDir: Position,
  paddleXPos: number,
  bricks: Position[]
) => {
  const r = getBallPos(ballPos, ballDir, paddleXPos, bricks);
  if (r.isCrash) return r;
  fillBall(ctx, r.newPos);
  return r;
};
