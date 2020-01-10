import { Brick } from "./types";
import { brickWidth, brickHeight } from "./constants";

export const Bricks = (ctx: CanvasRenderingContext2D) => (bricks: Brick[]) => {
  bricks.forEach(({ bx, by, hard }) => {
    ctx.fillStyle = hard ? "#D0D0D0" : "#2A98EF";
    ctx.fillRect(bx, by, brickWidth, brickHeight);
  });
};
