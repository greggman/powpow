function drawShip(ctx, x, y, direction, color) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(direction);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(0, 15);
  ctx.lineTo(15, -15);
  ctx.lineTo(0, -10);
  ctx.lineTo(-15, -15);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawOutlineShip(ctx, x, y, direction, color) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(direction);
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, 15);
  ctx.lineTo(15, -15);
  ctx.lineTo(0, -10);
  ctx.lineTo(-15, -15);
  ctx.closePath();
  ctx.stroke();
  ctx.restore();
};

function drawTwoToneShip(ctx, x, y, direction, color, darkColor) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(direction);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(0, 15);
  ctx.lineTo(15, -15);
  ctx.lineTo(0, -10);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = darkColor;
  ctx.beginPath();
  ctx.moveTo(0, 15);
  ctx.lineTo(0, -10);
  ctx.lineTo(-15, -15);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}


