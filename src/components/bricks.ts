import { Brick } from "./types";
import { brickWidth, brickHeight } from "./constants";

const softBrick = <HTMLImageElement>document.getElementById("soft");
const hardBrick = <HTMLImageElement>document.getElementById("hard");

export const Bricks = (ctx: CanvasRenderingContext2D) => (bricks: Brick[]) => {
  bricks.forEach(({ bx, by, hard }) => {
    // ctx.fillStyle = !hard ? "#D0D0D0" : "#2A98EF";
    // ctx.fillRect(bx, by, brickWidth, brickHeight);
    if (hard) {
      ctx.drawImage(hardBrick, bx, by, brickWidth, brickHeight);
    } else {
      ctx.drawImage(softBrick, bx, by, brickWidth, brickHeight);
    }
  });
};
