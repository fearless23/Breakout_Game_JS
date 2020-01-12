import { Position, Brick, LevelInfo, PlayerInfo } from "./types";
import {
  initPaddleX,
  initBallDir,
  initBallPos,
  paddleWidth,
  canvasWidth
} from "./constants";
import {
  clearCanvas,
  drawPaddle,
  handleBricks,
  handleBall,
  removeEvent
} from "./initSetup";

import { paddleNextPos } from "./paddle";

export class Level {
  paddleX = initPaddleX;
  ballPos: Position = initBallPos;
  ballDir: Position = initBallDir;

  // Animation Frame ID
  reqId: number = -1;
  levelStatus = false;
  levelLost = false;
  speedIncreased = false;

  // Data From Game...
  k: LevelInfo;
  p: PlayerInfo;

  constructor(k: LevelInfo, p: PlayerInfo) {
    this.k = k;
    this.p = p;
    this.addPaddleControls();
  }

  // Add Event Listener for Keyboard and Mouse...
  addPaddleControls = () => {
    const offSet = (window.innerWidth - canvasWidth) / 2;
    document.addEventListener(
      "keydown",
      (evt: KeyboardEvent) => {
        if (this.levelStatus)
          this.paddleX = paddleNextPos(this.paddleX, evt.key);
      },
      false
    );
    document.addEventListener(
      "mousemove",
      (evt: MouseEvent) => {
        const relativeX = evt.clientX - offSet;
        const inCanvas = relativeX > 0 && relativeX < canvasWidth;
        if (inCanvas && this.levelStatus) {
          this.paddleX = relativeX - paddleWidth / 2;
        }
      },
      false
    );
  };

  reset = () => {
    this.paddleX = initPaddleX;
    this.ballPos = initBallPos;
    this.ballDir = initBallDir;
  };

  runLevel = () => {
    clearCanvas();
    drawPaddle(this.paddleX);
    handleBricks(this.k.bricksData);
    let { idx, newPos, newDir, isCrash } = handleBall(
      this.ballPos,
      this.ballDir,
      this.paddleX,
      this.k.bricksData
    );
    if (isCrash) {
      this.p.lives--;
      this.crashed();
      return;
    }
    this.ballPos = newPos;
    this.ballDir = newDir;
    // Increase speed when 20% left, once..
    if (!this.speedIncreased) this.ballDir = this.increaseSpeed();

    if (idx !== null) {
      this.k.bricksData.splice(idx, 1);
      this.p.levelPoints += 10;
      this.k.softBricks--;
      this.k.totalBricks--;
    }

    if (this.k.bricksData.length === this.k.hardBricks) {
      this.levelLost = false;
      this.stopLevel();
      return;
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
      (this.k.bricksData.length - this.k.hardBricks) / this.k.softBricks <= 0.2;
    if (!shouldIncrSpeed) return this.ballDir;
    else {
      this.speedIncreased = true;
      return <Position>this.ballDir.map(d => d * 1.25);
    }
  };

  crashed = () => {
    if (this.p.lives > 0) this.levelLost = false;
    else this.levelLost = true;
    this.stopLevel();
  };

  stopLevel = () => {
    this.levelStatus = false;
    clearCanvas();
    window.cancelAnimationFrame(this.reqId);
    removeEvent("mousemove");
    removeEvent("keydown");
  };

  status = () => {
    return {
      k: this.k,
      p: this.p,
      running: this.levelStatus,
      lost: this.levelLost
    };
  };
}
