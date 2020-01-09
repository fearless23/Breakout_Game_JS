import { canvasSize, boardSize } from "./constants";
// Set Canvas Size
const canvas = <HTMLCanvasElement>document.getElementById("app");
canvas.width = canvasSize;
canvas.height = canvasSize;

// Set Scale
const ctx = <CanvasRenderingContext2D>canvas.getContext("2d");
const scale = canvasSize / boardSize;
ctx.scale(scale, scale);

export { ctx };
