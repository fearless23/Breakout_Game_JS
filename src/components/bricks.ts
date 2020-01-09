import { Position } from "./types";
import { canvasSize } from "./constants";

export const Bricks = (ctx: CanvasRenderingContext2D) => (
  bricks: Position[]
) => {
  bricks.forEach(([x, y]) => {
    ctx.fillStyle = "#D0D0D0";
    ctx.fillRect(x - 1, y - 1, 1, 1);
  });
};
