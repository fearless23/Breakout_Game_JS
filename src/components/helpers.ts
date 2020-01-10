import { Position, Brick } from "./types";
import {
  canvasWidth,
  canvasHeight,
  ballRadius,
  brickHeight,
  brickWidth
} from "./constants";

export const randInt = function(min: number, max: number): number {
  return Math.floor(Math.random() * max + min);
};

export const itemIdxInArray = function(
  arr: Brick[],
  [x, y]: Position
): number | null {
  let i = 0;
  let found = false;
  while (i < arr.length) {
    const { bx, by } = arr[i];

    const bl = bx - 2 * ballRadius;
    const br = bx + brickWidth;
    const bt = by - 2 * ballRadius;
    const bb = by + brickHeight;

    if (x >= bl && x <= br && y >= bt && y <= bb) {
      found = true;
      break;
    }
    i++;
  }
  return found ? i : null;
};

export const clear = (ctx: CanvasRenderingContext2D) => () => {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
};

export const gameOverText = (ctx: CanvasRenderingContext2D) => (
  txt: string
) => {
  const size = 30;
  ctx.font = size + "px Fira Code";
  const txtSize = size * txt.length;
  ctx.fillText(txt, canvasWidth / 2 - txtSize / 2, canvasHeight / 2 - size / 2);
};
