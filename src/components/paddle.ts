import {
  paddleWidth,
  paddleSpeed,
  paddleY,
  paddleHeight,
  canvasWidth
} from "./constants";

const getMoveNum = (move: string): 1 | -1 | 0 => {
  if (move === "ArrowRight") return 1;
  if (move === "ArrowLeft") return -1;
  return 0;
};

const getNextPos = function(paddleX: number, m: number): number {
  const newPaddleX = paddleX + m * paddleSpeed;
  if (newPaddleX + paddleWidth > canvasWidth) return canvasWidth - paddleWidth;
  else if (newPaddleX < 0) return 0;
  else return newPaddleX;
};

const drawPaddle = (ctx: CanvasRenderingContext2D) => (paddleX: number) => {
  ctx.fillStyle = "#2eb364";
  ctx.fillRect(paddleX, paddleY, paddleWidth, paddleHeight);
};

const movePaddle = (ctx: CanvasRenderingContext2D) => (
  paddleX: number,
  move: string
) => {
  const m = getMoveNum(move);
  if (m === 0) {
    drawPaddle(ctx)(paddleX);
    return paddleX;
  }
  const newPos = getNextPos(paddleX, m);
  drawPaddle(ctx)(newPos);
  return newPos;
};

export const Paddle = function(ctx: CanvasRenderingContext2D) {
  return {
    drawPaddle: drawPaddle(ctx),
    movePaddle: movePaddle(ctx)
  };
};