import { Position, Brick } from "./types";
import { initPaddleX, initBallDir, initBallPos } from "./constants";
import {
  clearCanvas,
  drawPaddle,
  handleBricks,
  handleBall,
  showGameOverText,
  movePaddle
} from "./initSetup";

export class Level {
  reqId: number;
  game = false;
  paddleX = initPaddleX;
  ballPos: Position = initBallPos;
  ballDir: Position = initBallDir;
  bricks: Brick[];
  totalBricks: number;
  hardBricks: number;
  softBricks: number;
  lives: number;
  constructor(
    k: {
      bricks: Brick[];
      totalBricks: number;
      softBricks: number;
      hardBricks: number;
    },
    lives: number
  ) {
    this.bricks = k.bricks;
    this.totalBricks = k.totalBricks;
    this.hardBricks = k.hardBricks;
    this.softBricks = k.softBricks;
    this.lives = lives;
    this.paddle();
    this.reqId = -1;
  }

  paddle = () => {
    document.addEventListener("keydown", (event: KeyboardEvent) => {
      if (this.game) this.paddleX = movePaddle(this.paddleX, event.key);
    });
    drawPaddle(this.paddleX);
    handleBricks(this.bricks);
    handleBall(this.ballPos, this.ballDir, this.paddleX, this.bricks);
  };
  runGame = () => {
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
    // Randomly increase speed...
    if (b.idx !== null) this.bricks.splice(b.idx, 1);

    if (this.bricks.length === this.hardBricks) {
      this.stopGame("Level Won");
    }
    window.requestAnimationFrame(this.runGame);
  };

  start = () => {
    this.game = true;
    this.reqId = window.requestAnimationFrame(this.runGame);
  };

  crashed = () => {
    if (this.lives > 0) {
      showGameOverText(`Crashed ${this.lives} lives left`);
      this.paddleX = initPaddleX;
      this.ballPos = initBallPos;
      this.ballDir = initBallDir;
      setTimeout(() => {
        this.runGame();
      }, 1000);
    } else {
      this.stopGame("Game Over");
    }
  };

  stopGame = (type: string) => {
    this.game = false;
    window.cancelAnimationFrame(this.reqId);
    clearCanvas();
    showGameOverText(type);
  };

  status = () => {
    return {
      lives: this.lives,
      status: this.game,
      bricksLeft: this.bricks.length - this.hardBricks
    };
  };
}
