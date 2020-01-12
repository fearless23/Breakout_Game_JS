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
import { LevelInfo, PlayerInfo } from "./types";

export class Game {
  gameOver = false;
  k: LevelInfo = {
    bricksData: [],
    totalBricks: 0,
    softBricks: 0,
    hardBricks: 0
  };
  totalPoints: number = 0;
  p: PlayerInfo = {
    currLevel: 1,
    levelPoints: 0,
    lives: maxLives
  };
  maxLevel: number = maxLevels;
  intervalId: number = -1;
  constructor() {
    this.initBtnCtrl();
    this.restart();
  }

  initBtnCtrl() {
    startBtn.addEventListener("mousedown", _ =>
      this.handleLevel(this.p.currLevel)
    );
  }

  restart = () => {
    // Case 1: level lost = lives completed
    // Case 2: game won
    this.gameOver = true;
    this.totalPoints = 0;
    this.k = {
      bricksData: [],
      totalBricks: 0,
      softBricks: 0,
      hardBricks: 0
    };
    this.p = {
      currLevel: 1,
      levelPoints: 0,
      lives: maxLives
    };

    startBtn.removeEventListener("mousedown", () => {});
  };

  crashReset = (k: LevelInfo, p: PlayerInfo) => {
    this.k = k;
    this.p = p;
  };

  nextLevelSet = (levelPoints: number) => {
    this.k = {
      bricksData: [],
      totalBricks: 0,
      softBricks: 0,
      hardBricks: 0
    };
    this.totalPoints += levelPoints;
    this.p.currLevel++;
    this.p.levelPoints = 0;
  };

  clear = () => {
    clearInterval(this.intervalId);
    return;
  };

  btnCtrl = (levelData: {
    k: LevelInfo;
    p: PlayerInfo;
    running: boolean;
    lost: boolean;
  }) => {
    const { k, p, running: levelStatus, lost: levelLost } = levelData;
    // Level is Running
    if (levelStatus) {
      setPointsAndBricks(p.levelPoints, this.totalPoints, k.softBricks);
      setLives(p.lives);
      return;
    }
    console.log(levelData);
    setPointsAndBricks(p.levelPoints, this.totalPoints, k.softBricks);
    setLives(p.lives);

    // Level Lost
    if (levelLost) {
      setStartBtn("Lost - Restart", false);
      showOverLay("Lost Level, Restart");
      this.restart();
      return this.clear();
    }

    // CRASHED
    if (k.softBricks !== 0) {
      setStartBtn("Crashed, Continue", false);
      showOverLay("Oops crashed");
      this.crashReset(k, p);
      return this.clear();
    }

    // LEVEL WON; CONTINUE TO NEXT LEVEL
    if (p.currLevel !== this.maxLevel) {
      setStartBtn("Next Level", false);
      showOverLay("Continue to next level");
      this.nextLevelSet(p.levelPoints);
      return this.clear();
    }

    // WON THE GAME
    if (p.currLevel === this.maxLevel) {
      setStartBtn("Game Won, Restart", false);
      showOverLay("Game Won, Restart");
      this.restart();
      return this.clear();
    }
  };

  handleLevel = (level: number) => {
    let k: LevelInfo = this.k;
    if (this.k.softBricks === 0) {
      k = makeBricks(level, level * 6);
    }
    removeOverlay();
    const currLevel = new Level(k, this.p);
    currLevel.start();

    setStartBtn(`Running Level ${level}`, true);
    setPointsAndBricks(this.p.levelPoints, this.totalPoints, k.softBricks);
    setLevel(level);
    setLives(this.p.lives);

    this.intervalId = setInterval(() => this.btnCtrl(currLevel.status()), 500);
  };
}
