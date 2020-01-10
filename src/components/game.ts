import { Level } from "./level";
import {
  startBtn,
  setStartBtn,
  setPointsAndBricks,
  setLevel,
  setLives
} from "./initSetup";
import { makeBricks } from "./createBricks";

import { maxLives, maxLevels } from "./constants";

export class Game {
  level: number = 1;
  points: number = 0;
  livesLeft: number;
  maxLevel: number;

  constructor() {
    this.maxLevel = maxLevels;
    this.livesLeft = maxLives;
    this.initBtnCtrl();
  }

  initBtnCtrl() {
    startBtn.addEventListener("mousedown", _ => this.handleLevel(this.level));
  }

  reset = (i: number) => {
    this.level = 1;
    this.points = 0;
    this.livesLeft = maxLives;
    clearInterval(i);
  };

  btnCtrl = (i: number, gameStatus: any, softBricks: number) => {
    const { status, bricksLeft, lifes } = gameStatus;
    // Level is Running
    if (status) {
      setPointsAndBricks(this.points, bricksLeft, softBricks);
      setLives(lifes);
      return;
    }

    // Level Stopped
    if (bricksLeft !== 0) {
      // Level Lost
      setStartBtn("Lost - Restart", false);
      this.reset(i);
      return;
    }
    // Level Won but it was last Level
    if (this.level >= this.maxLevel) {
      setStartBtn("Game Won, Restart", false);
      this.reset(i);
      return;
    }
    // Level Won - Continue to next Level with button press
    setStartBtn("Start Next Level", false);
    setPointsAndBricks(this.points, bricksLeft, softBricks);
    setLives(lifes);
    this.level++;
  };

  handleLevel = (level: number) => {
    const k = makeBricks(50, level * 6);
    const currLevel = new Level(k, this.livesLeft);
    currLevel.start();

    setStartBtn("Running", true);
    setPointsAndBricks(this.points, k.softBricks, k.softBricks);
    setLevel(level);
    setLives(this.livesLeft);

    const i = setInterval(
      () => this.btnCtrl(i, currLevel.status(), k.softBricks),
      100
    );
  };
}
