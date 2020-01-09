import { Position } from "./types";
import { boardSize, paddleWidth } from "./constants";
import { itemIdxInArray } from "./helpers";

const willHitPaddle = (nx: number, paddleXPos: number) => {
  const diff = nx - paddleXPos;
  if (diff < 0) return false;
  if (diff > paddleWidth) return false;
  return true;
};

const checkBoundary = (
  [nx, ny]: Position,
  [dx, dy]: Position,
  paddleXPos: number
) => {
  let isCrash = false;
  if (nx >= boardSize) {
    nx = boardSize - 1;
    dx = -dx;
  }
  if (ny >= boardSize) {
    if (willHitPaddle(nx, paddleXPos)) {
      ny = boardSize - 2;
      nx = nx - 1;
      dy = -dy;
    } else {
      isCrash = true;
    }
  }
  if (nx < 0) {
    nx = 0;
    dx = -dx;
  }
  if (ny < 0) {
    ny = 0;
    dy = -dy;
  }
  return {
    newPos: <Position>[nx, ny],
    newDir: <Position>[dx, dy],
    isCrash
  };
};

const checkHitBrick = function(bricks: Position[], ballPos: Position) {
  const idx = itemIdxInArray(bricks, ballPos);
};

const getBallPos = function(
  [x, y]: Position,
  dir: Position,
  paddleXPos: number,
  bricks: Position[]
) {
  const newPos = <Position>[x + dir[0], y + dir[1]];
  let a = checkBoundary(newPos, dir, paddleXPos);
  // checkHitBrick(bricks, a.newPos);
  const idx = itemIdxInArray(bricks, a.newPos);
  if(!!idx){
    // Hit a Brick...
    
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
