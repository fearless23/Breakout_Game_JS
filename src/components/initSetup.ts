import { canvasHeight, canvasWidth } from "./constants";

// Set HTML Game Section
const gameSection = <HTMLElement>document.getElementById("game");
gameSection.style.width = `${canvasWidth}px`;

// Set Canvas Size
const canvas = <HTMLCanvasElement>document.getElementById("app");
canvas.width = canvasWidth;
canvas.height = canvasHeight;
const ctx = <CanvasRenderingContext2D>canvas.getContext("2d");

import { Paddle } from "./paddle";
import { Ball } from "./ball";
import { Bricks } from "./bricks";
import { clear, gameOverText } from "./helpers";

// CTX Based Draw Functions
export const clearCanvas = clear(ctx);
export const showGameOverText = gameOverText(ctx);
export const { drawPaddle, movePaddle } = Paddle(ctx);
export const handleBall = Ball(ctx);
export const handleBricks = Bricks(ctx);

export const startBtn = <HTMLButtonElement>document.getElementById("startBtn");
const bricksSpan = <HTMLSpanElement>document.getElementById("bricks");
const pointsSpan = <HTMLSpanElement>document.getElementById("points");
const livesSpan = <HTMLSpanElement>document.getElementById("lifes");
const levelSpan = <HTMLSpanElement>document.getElementById("level");

export const setPointsAndBricks = (
  points: number,
  bricksLeft: number,
  totalBricks: number
) => {
  bricksSpan.innerText = String(bricksLeft) + " of " + String(totalBricks);
  pointsSpan.innerText = String(points + (totalBricks - bricksLeft) * 10);
};

export const setStartBtn = (txt: string, disabled: boolean) => {
  startBtn.innerText = txt;
  startBtn.disabled = disabled;
  if (disabled) {
    startBtn.classList.add("disabled");
  } else {
    startBtn.classList.remove("disabled");
  }
};

export const setLives = (lives: number) => {
  livesSpan.innerText = String(lives);
};
export const setLevel = (level: number) => {
  levelSpan.innerText = String(level);
};
