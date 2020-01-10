import { Game } from "./components/game";
import { startBtn, bricksSpan, pointsSpan } from "./components/initSetup";
import { makeBricks } from "./components/createBricks";

const bricks = makeBricks(9);

const mix = (left: number, total: number) => {
  return {
    bricksLeftTxt: String(left) + " of " + String(total),
    pointsTxt: String((total - left) * 10)
  };
};

const setTxt = (bricksLeft: number, totalBricks: number) => {
  const { bricksLeftTxt, pointsTxt } = mix(bricksLeft, totalBricks);
  bricksSpan.innerText = bricksLeftTxt;
  pointsSpan.innerText = pointsTxt;
};

const setBtn = (txt: string, disabled: boolean) => {
  startBtn.innerText = txt;
  startBtn.disabled = disabled;
  if (disabled) {
    startBtn.classList.add("disabled");
  } else {
    startBtn.classList.remove("disabled");
  }
};

const btnCtrl = (
  i: number,
  gameStatus: { status: boolean; bricksLeft: number }
) => {
  const { status, bricksLeft } = gameStatus;
  if (!status) {
    setBtn("Restart", false);
    clearInterval(i);
    return;
  }
  setTxt(bricksLeft, bricks.length);
};

const handleGame = () => {
  const game = new Game([...bricks]);
  game.start();
  setBtn("Running", true);
  setTxt(bricks.length, bricks.length);
  const i = setInterval(() => btnCtrl(i, game.status()), 100);
};

startBtn.addEventListener("mousedown", _ => {
  handleGame();
});
