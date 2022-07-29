const drawBorder = (ctx: CanvasRenderingContext2D) => {
  ctx.beginPath();
  ctx.fillStyle = "FFFFFF";
  ctx.rect(160, 100, 320, 240);
  ctx.stroke();
};

export default drawBorder;
