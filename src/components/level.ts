import { Position, Brick } from "./types";
import {
  initPaddleX,
  initBallDir,
  initBallPos,
  ballSpeed,
  paddleWidth,
  canvasWidth
} from "./constants";
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
    clearCanvas();
    this.bricks = k.bricks;
    this.totalBricks = k.totalBricks;
    this.hardBricks = k.hardBricks;
    this.softBricks = k.softBricks;
    this.lives = lives;
    this.currLevel = currLevel;
    this.init();
  }

  init = () => {
    const offSet = (window.innerWidth - canvasWidth) / 2;
    document.addEventListener("keydown", (event: KeyboardEvent) => {
      if (this.levelStatus) this.paddleX = movePaddle(this.paddleX, event.key);
    });
    document.addEventListener(
      "mousemove",
      (e: MouseEvent) => {
        const relativeX = e.clientX - offSet;
        if (relativeX > 0 && relativeX < canvasWidth && this.levelStatus) {
          this.paddleX = relativeX - paddleWidth / 2;
          drawPaddle(this.paddleX);
        }
      },
      false
    );
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
      this.ballDir = this.increaseSpeed();
    }
    if (b.idx !== null) this.bricks.splice(b.idx, 1);

    if (this.bricks.length === this.hardBricks) {
      this.stopLevel();
    }
    this.reqId = window.requestAnimationFrame(this.runLevel);
  };

  start = () => {
    this.levelStatus = true;
    this.runLevel();
    // this.reqId = window.requestAnimationFrame(this.runLevel);
  };

  increaseSpeed = () => {
    const shouldIncrSpeed =
      (this.bricks.length - this.hardBricks) / this.softBricks <= 0.2;
    if (!shouldIncrSpeed) return this.ballDir;
    else {
      this.speedIncreased = true;
      // console.log("SPEED INCREASED")
      return <Position>this.ballDir.map(d => d * 1.25);
    }
  };

  crashed = () => {
    if (this.lives > 0) {
      window.cancelAnimationFrame(this.reqId);
      clearCanvas();
      showGameOverText(`Crashed ${this.lives} lives left`);
      this.paddleX = initPaddleX;
      this.ballPos = initBallPos;
      this.ballDir = initBallDir;
      setTimeout(() => {
        this.runLevel();
      }, 700);
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
