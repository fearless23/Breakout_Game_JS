import {
  paddleWidth,
  boardSize,
  paddleSpeed,
  paddleYPos,
  paddleHeight
} from "./constants";

// Draw Helper
const drawPaddle = (ctx: CanvasRenderingContext2D) => (paddleXPos: number) => {
  ctx.fillStyle = "#2a98ef";
  ctx.fillRect(paddleXPos, paddleYPos, paddleWidth, paddleHeight);
};

const isValidPaddleMove = (move: string) => {
  if (move === "ArrowRight") return true;
  if (move === "ArrowLeft") return true;
  return false;
};

const getPaddleXPos = function(currXPos: number, move: string): number {
  if (!isValidPaddleMove(move)) return currXPos;
  let newPaddleXPos = currXPos;
  if (move === "ArrowLeft") newPaddleXPos -= paddleSpeed;
  if (move === "ArrowRight") newPaddleXPos += paddleSpeed;
  if (newPaddleXPos + paddleWidth > boardSize) {
    newPaddleXPos = boardSize - paddleWidth;
  }
  if (newPaddleXPos < 0) newPaddleXPos = 0;
  return newPaddleXPos;
};

const movePaddle = (ctx: CanvasRenderingContext2D) => (
  paddleXPos: number,
  move: string
) => {
  if (!move) {
    drawPaddle(ctx)(paddleXPos);
    return paddleXPos;
  }
  const newPos = getPaddleXPos(paddleXPos, move);
  drawPaddle(ctx)(newPos);
  return newPos;
};

export const Paddle = (ctx: CanvasRenderingContext2D) => {
  return {
    drawPaddle: drawPaddle(ctx),
    movePaddle: movePaddle(ctx)
  };
};

/*
// Other Stuff
export const getPaddleXPosWithMouse = function(currMouseX: number) {
  let x = currMouseX / boardSize;
  if (x + paddleWidth > boardSize) {
    x = (boardSize - paddleWidth) * boardSize;
  }
  if (x < 0) x = 0;
  return x;
};
*/
