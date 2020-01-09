import { Position } from "./types";
import { canvasSize } from "./constants";

export const randInt = function(min: number, max: number): number {
  return Math.floor(Math.random() * max + min);
};

export const itemIdxInArray = function(
  arr: Position[],
  item: Position
): number | undefined {
  //ts ignore
  return arr.indexOf(item);
};

export const clear = (ctx: CanvasRenderingContext2D) => () => {
  ctx.clearRect(0, 0, canvasSize, canvasSize);
};
