import { Position } from "./types";

export const canvasWidth = 600;
export const canvasHeight = 300;

// Paddle Features
export const paddleWidth = canvasWidth / 1;
export const paddleHeight = 15;
export const paddleY = canvasHeight - paddleHeight; // Calculated but constant
export const paddleSpeed = 100;

// Ball Features
export const ballRadius = 10;
export const ballBottom = canvasHeight - 2 * ballRadius - paddleHeight; //calc
export const ballSpeed = 0.25;

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
  ballRadius * ballSpeed,
  -ballRadius * ballSpeed
]; // to right-top
