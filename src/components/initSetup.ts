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
export const bricksSpan = <HTMLSpanElement>document.getElementById("bricks");
export const pointsSpan = <HTMLSpanElement>document.getElementById("points");
