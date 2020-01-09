import { ctx } from "./initSetup";
import { Position } from "./types";

import { Paddle } from "./paddle";
import { Ball } from "./ball";
import { Bricks } from "./bricks";
import { clear } from "./helpers";

// CTX Based Draw Functions
const clearCanvas = clear(ctx);
const { drawPaddle, movePaddle } = Paddle(ctx);
const handleBall = Ball(ctx);
const handleBricks = Bricks(ctx);

// 1
// clearCanvas();

// 2
let paddlePos = 15;
drawPaddle(paddlePos);
document.addEventListener("keydown", (event: KeyboardEvent) => {
  paddlePos = movePaddle(paddlePos, event.key);
});

// 3
let ballPos: Position = [paddlePos + 1, 29];
let ballDir: Position = [1, -1];

// 4
let bricks: Position[] = [
  [1, 2],
  [3, 2],
  [5, 2],
  [7, 2],
  [9, 2],
  [11, 2],
  [13, 2],
  [15, 2],
  [17, 2]
];

const runGame = (i?: number) => {
  clearCanvas();
  drawPaddle(paddlePos);
  let b = handleBall(ballPos, ballDir, paddlePos, bricks);
  if (b.isCrash) {
    console.log("Ball Crashed");
    clearInterval(i);
    return;
  }
  ballPos = b.newPos;
  ballDir = b.newDir;
};

const i = setInterval(() => runGame(i), 50);
