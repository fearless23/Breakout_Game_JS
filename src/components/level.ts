import { Position, Brick } from "./types";
import { initPaddleX, initBallDir, initBallPos, ballSpeed } from "./constants";
import {
  clearCanvas,
  drawPaddle,
  handleBricks,
  handleBall,
  showGameOverText,
  movePaddle
} from "./initSetup";

export class Level {
  reqId: number = -1;
  levelStatus = false;
  paddleX = initPaddleX;
  ballPos: Position = initBallPos;
  ballDir: Position = initBallDir;
  bricks: Brick[];
  totalBricks: number;
  hardBricks: number;
  softBricks: number;
  lives: number;
  speedIncreased = false;
  currLevel: number;
  constructor(
    k: {
      bricks: Brick[];
      totalBricks: number;
      softBricks: number;
      hardBricks: number;
    },
    lives: number,
    currLevel: number
  ) {
    this.bricks = k.bricks;
    this.totalBricks = k.totalBricks;
    this.hardBricks = k.hardBricks;
    this.softBricks = k.softBricks;
    this.lives = lives;
    this.currLevel = currLevel;
    this.paddle();
  }

  paddle = () => {
    document.addEventListener("keydown", (event: KeyboardEvent) => {
      if (this.levelStatus) this.paddleX = movePaddle(this.paddleX, event.key);
    });
    drawPaddle(this.paddleX);
    handleBricks(this.bricks);
    handleBall(this.ballPos, this.ballDir, this.paddleX, this.bricks);
  };
  runLevel = () => {
    clearCanvas();
    drawPaddle(this.paddleX);
    handleBricks(this.bricks);
    let b = handleBall(this.ballPos, this.ballDir, this.paddleX, this.bricks);
    if (b.isCrash) {
      this.lives--;
      this.crashed();
      return;
    }
    this.ballPos = b.newPos;
    this.ballDir = b.newDir;
    // Increase speed when 20% left, once..
    if (!this.speedIncreased) {
      this.speedIncreased = true;
      this.ballDir = this.increaseSpeed();
    }
    if (b.idx !== null) this.bricks.splice(b.idx, 1);

    if (this.bricks.length === this.hardBricks) {
      this.stopLevel();
    }
    window.requestAnimationFrame(this.runLevel);
  };

  start = () => {
    this.levelStatus = true;
    this.reqId = window.requestAnimationFrame(this.runLevel);
  };

  increaseSpeed = () => {
    const shouldIncrSpeed =
      (this.bricks.length - this.hardBricks) / this.softBricks <= 0.2;
    if (!shouldIncrSpeed) return this.ballDir;
    return <Position>this.ballDir.map(d => d * 1.1);
  };

  crashed = () => {
    if (this.lives > 0) {
      window.cancelAnimationFrame(this.reqId);
      clearCanvas();
      showGameOverText(`Crashed ${this.lives} lives left`);
      this.paddleX = initPaddleX;
      this.ballPos = initBallPos;
      this.ballDir = initBallDir;
      setTimeout(() => this.runLevel(), 700);
    } else {
      this.stopLevel();
    }
  };

  stopLevel = () => {
    this.levelStatus = false;
    window.cancelAnimationFrame(this.reqId);
    clearCanvas();
  };

  status = () => {
    return {
      lives: this.lives,
      status: this.levelStatus,
      bricksLeft: this.bricks.length - this.hardBricks
    };
  };
}
