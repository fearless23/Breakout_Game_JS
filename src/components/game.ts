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

export class Game {
  reqId: number;
  game = false;
  paddleX = initPaddleX;
  ballPos: Position = initBallPos;
  ballDir: Position = initBallDir;
  bricks: Brick[];
  constructor(bricks: Brick[]) {
    this.bricks = bricks;
    this.paddle();
    this.reqId = -1;
  }

  paddle = () => {
    document.addEventListener("keydown", (event: KeyboardEvent) => {
      if (this.game) this.paddleX = movePaddle(this.paddleX, event.key);
    });
  };
  runGame = () => {
    clearCanvas();
    drawPaddle(this.paddleX);
    handleBricks(this.bricks);
    let b = handleBall(this.ballPos, this.ballDir, this.paddleX, this.bricks);
    if (b.isCrash) {
      this.stopGame("Crash");
      return;
    }
    this.ballPos = b.newPos;
    this.ballDir = b.newDir;
    if (b.idx) this.bricks.splice(b.idx, 1);

    if (this.bricks.length === 0) {
      this.stopGame("Won");
      return;
    }
    window.requestAnimationFrame(this.runGame);
  };

  start = () => {
    console.log("START")
    this.game = true;
    this.reqId = window.requestAnimationFrame(this.runGame);
  };

  stopGame = (type: string) => {
    this.game = false;
    window.cancelAnimationFrame(this.reqId);
    clearCanvas();
    showGameOverText(type);
  };

  status = () => {
    return {
      status: this.game,
      bricksLeft: this.bricks.length
    };
  };
}
