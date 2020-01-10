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

const getCorners = ([cx, cy]: Position, k: any) => {
  const { bl, br, bt, bb } = k;
  let cornerY = 0;
  const top = bt > cy;
  const bottom = cy > bb;
  const middleY = !top && !bottom;
  if (top) cornerY = 1;
  if (middleY) cornerY = 2;
  if (bottom) cornerY = 3;

  let cornerX = 0;
  const left = bl > cx;
  const right = cy > br;
  const middleX = !left && !right;
  if (left) cornerX = 1;
  if (middleX) cornerX = 2;
  if (right) cornerX = 3;

  return (cornerY - 1) * 3 + cornerX;
};

const ifItemOneOf = (item: number, ...items: number[]) => {
  return items.some(i => i === item);
};

const getBallPos = function(
  [cx, cy]: Position,
  [dx, dy]: Position,
  paddleX: number,
  bricks: Brick[]
) {
  const r = getNextPosition([cx, cy], [dx, dy], paddleX);
  if (r.isCrash) return { ...r, idx: null };
  const { idx, hard, ...k } = itemIdxInArray(bricks, r.newPos);
  // No Brick touched
  if (idx === null) return { ...r, idx: null };
  // Brick is soft go through
  if (!hard) return { ...r, idx: idx };
  // Brick is hard, reverse direction..
  const payload = { isCrash: false, idx: null };
  const corner = getCorners([cx, cy], k);

  ifItemOneOf(corner, 1, 2, 3);
  if (ifItemOneOf(corner, 1, 2, 3))
    // Top of Brick
    return {
      ...payload,
      newDir: <Position>[dx, -dy],
      newPos: <Position>[cx, k.bt]
    };
  if (ifItemOneOf(corner, 7, 8, 9))
    // Bottom of Brick
    return {
      ...payload,
      newDir: <Position>[dx, -dy],
      newPos: <Position>[cx, k.bb]
    };
  if (ifItemOneOf(corner, 4))
    // Left of Brick
    return {
      ...payload,
      newDir: <Position>[-dx, dy],
      newPos: <Position>[k.bl, cy]
    };
  if (ifItemOneOf(corner, 5,6))
    // Right of Brick
    return {
      ...payload,
      newDir: <Position>[-dx, dy],
      newPos: <Position>[k.br, cy]
    };

  console.log("WHAT!!!!", corner);
  return { ...r, idx: null };
};

const fillBall = (ctx: CanvasRenderingContext2D, [x, y]: Position) => {
  ctx.beginPath();
  ctx.fillStyle = "purple";
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
