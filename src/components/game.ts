import { Level } from "./level";
import {
  startBtn,
  setStartBtn,
  setPointsAndBricks,
  setLevel,
  setLives,
  removeOverlay,
  showOverLay
} from "./initSetup";
import { makeBricks } from "./createBricks";

import { maxLives, maxLevels } from "./constants";

export class Game {
  level: number = 1;
  points: number = 0;
  livesLeft: number;
  maxLevel: number;
  intervalId: number;
  constructor() {
    this.maxLevel = maxLevels;
    this.livesLeft = maxLives;
    this.intervalId = -1;
    this.initBtnCtrl();
  }

  initBtnCtrl() {
    startBtn.addEventListener("mousedown", _ => this.handleLevel(this.level));
  }

  reset = () => {
    this.level = 1;
    this.points = 0;
    this.livesLeft = maxLives;
    clearInterval(this.intervalId);
    console.log("CLEAR", this.intervalId);
  };

  btnCtrl = (levelStatus: any, softBricks: number) => {
    const { status, bricksLeft, lives } = levelStatus;
    // Level is Running
    if (status) {
      setPointsAndBricks(this.points, bricksLeft, softBricks);
      setLives(lives);
      return;
    }

    // 1. Level Lost
    if (bricksLeft !== 0) {
      setStartBtn("Lost - Restart", false);
      setPointsAndBricks(this.points, bricksLeft, softBricks);
      showOverLay(this.level, false, this.level === this.maxLevel);
      this.reset();
      return;
    }
    // 2. Level Won but it was last Level
    if (this.level >= this.maxLevel) {
      setStartBtn("Game Won, Restart", false);
      setPointsAndBricks(this.points, bricksLeft, softBricks);
      showOverLay(this.level, true, true);
      this.reset();
      return;
    }
    // status = false, bricksLeft===0, level < maxLevel
    // 3. Level Won - Continue to next Level with button press
    setStartBtn("Start Next Level", false);
    setPointsAndBricks(this.points, bricksLeft, softBricks);
    showOverLay(this.level, true, false);
    setLives(lives);
    this.points += softBricks * 10;
    this.level++;
    clearInterval(this.intervalId);
    console.log("CLEAR", this.intervalId);
  };

  handleLevel = (level: number) => {
    const k = makeBricks(level, level * 6);
    // Remove overlay...
    removeOverlay();
    const currLevel = new Level(k, this.livesLeft, level);
    currLevel.start();

    setStartBtn("Running", true);
    setPointsAndBricks(this.points, k.softBricks, k.softBricks);
    setLevel(level);
    setLives(this.livesLeft);

    this.intervalId = setInterval(
      () => this.btnCtrl(currLevel.status(), k.softBricks),
      500
    );
  };
}
