import { Position, Brick } from "./types";
import {
  paddleWidth,
  ballRadius,
  ballBottom,
  canvasWidth,
  brickHeight,
  brickWidth
} from "./constants";
import { itemIdxInArray } from "./helpers";

const willHitPaddle = (nx: number, paddleX: number) => {
  return nx > paddleX - 2 * ballRadius && nx < paddleX + paddleWidth;
};

const getNextPosition = (
  [cx, cy]: Position, // current position
  [dx, dy]: Position, // current direction
  paddleX: number
) => {
  let isCrash = false;
  let nx = cx,
    ny = cy,
    ndx = dx,
    ndy = dy;

  if (cx + dx > canvasWidth - 2 * ballRadius) {
    nx = canvasWidth - 2 * ballRadius;
    const factor = (nx - cx) / dx;
    ny = cy + dy * factor;
    ndx = -dx;
  }
  if (cx + dx < 0) {
    nx = 0;
    const factor = (nx - cx) / dx;
    ny = cy + dy * factor;
    ndx = -dx;
  }
  if (cy + dy < 0) {
    ny = 0;
    const factor = (ny - cy) / dy;
    nx = cx + dx * factor;
    ndy = -dy;
  }

  if (cy + dy > ballBottom) {
    if (!willHitPaddle(cx + dx, paddleX)) {
      isCrash = true;
    } else {
      ny = ballBottom;
      const factor = (ny - cy) / dx;
      nx = cx + dx * factor;
      ndy = -dy;
    }
  } else {
    nx = cx + dx;
    ny = cy + dy;
  }

  return {
    newPos: <Position>[nx, ny],
    newDir: <Position>[ndx, ndy],
    isCrash
  };
};

const getBallPos = function(
  ballPos: Position,
  dir: Position,
  paddleX: number,
  bricks: Brick[]
) {
  const r = getNextPosition(ballPos, dir, paddleX);
  if (r.isCrash) return { ...r, idx: null };
  const idx = itemIdxInArray(bricks, r.newPos);
  if (idx === null) return { ...r, idx: null };
  // Find new Direction and newPos...
  console.log("IDX", idx);
  // const { bx, by, hard } = bricks[idx];
  // if (!hard) {
    return { ...r, idx };
  // }
  // Brick is hard, reverse direction...
  // const top = by - 2 * ballRadius > ballPos[1];
  // const bottom = ballPos[1] > by + brickHeight + ballRadius;
  // const middleY = !top && !bottom;

  // const left = bx - ballRadius - ballPos[0] > ballRadius;
  // const right = ballPos[0] > bx + brickWidth + ballRadius;
  // const middleX = !left && !right;

  // return { ...r, idx };
};

const fillBall = (ctx: CanvasRenderingContext2D, [x, y]: Position) => {
  ctx.beginPath();
  ctx.fillStyle = "red";
  ctx.arc(x + ballRadius, y + ballRadius, ballRadius, 0, 2 * Math.PI);
  ctx.fill();
};

export const Ball = (ctx: CanvasRenderingContext2D) => (
  ballPos: Position,
  ballDir: Position,
  paddleX: number,
  bricks: Brick[]
) => {
  const r = getBallPos(ballPos, ballDir, paddleX, bricks);
  if (r.isCrash) return r;
  fillBall(ctx, r.newPos);
  return r;
};
