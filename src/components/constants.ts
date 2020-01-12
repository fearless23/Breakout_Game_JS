import { Position } from "./types";

export const canvasWidth = Math.min(960, window.innerWidth - 30);
export const canvasHeight = (canvasWidth * 5) / 8;

// Paddle Features
export const paddleWidth = canvasWidth / 5;
export const paddleHeight = 15;
export const paddleY = canvasHeight - paddleHeight; // Calculated but constant
export const paddleSpeed = 100;

// Ball Features
export const ballRadius = 7;
export const ballBottom = canvasHeight - 2 * ballRadius - paddleHeight; //calc
export const ballSpeed = 0.45;

// Brick Features
export const brickWidth = 50;
export const brickHeight = 15;

// Other Features
export const initPaddleX = 0.5 * canvasWidth - 0.5 * paddleWidth; // at center
export const initBallPos = <Position>[
  initPaddleX + 0.5 * paddleWidth - ballRadius,
  paddleY - 2 * ballRadius
]; // on the paddle
export const initBallDir = <Position>[
  ballRadius * 1.5 * ballSpeed,
  -ballRadius * ballSpeed
]; // to right-top

// Game/Level Features
export const maxLevels = 3;
export const maxLives = 5;
