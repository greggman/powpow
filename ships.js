var ships = (function(){

  var g_colors = [
    [1.0, 0.0, 0.0],
    [1.0, 1.0, 0.0],
    [0.0, 1.0, 0.0],
    [0.0, 1.0, 1.0],
    [0.0, 0.0, 1.0],
    [1.0, 0.0, 1.0],
    [1.0, 0.5, 0.5],
    [1.0, 1.0, 0.5],
    [0.5, 1.0, 0.5],
    [0.5, 1.0, 1.0],
    [0.5, 0.5, 1.0],
    [1.0, 0.5, 1.0]
  ];
  var g_styles = [
    "drawShip",
    "drawOutlineShip",
    "drawTwoToneShip"
  ];

  return {
    styles: g_styles,

    // TODO(gman): if we are going to limit the number
    // of colors and styles then we need to keep track
    // of which ones are used so if a player stops
    // playing his color is free to be used by new
    // players.
    makeColor: function(count) {
      var numStyles = g_styles.length;
      var numColors = g_colors.length;
      var style = count % numStyles;
      var colorNdx = count % numColors;

      //var color = [
      //  (count * 0.31) % 1,
      //  (count * 5.73) % 1,
      //  (count * 7.89) % 1,
      //  1,
      //];
      //var canvasColor = [];
      //var ci = count % 3;
      //for (var ii = 0; ii < 3; ++ii) {
      //  var ndx = (ii + ci) % 3;
      //  var mix = (ii == 0) ? 0.2 : 0.6;
      //  var max = (ii == 0) ? 1 : 0.6;
      //  color[ndx] = color[ndx] * mix + (1 - mix) * max;
      //  canvasColor[ndx] = Math.floor(color[ndx] * 255);
      //}

      var c = g_colors[colorNdx];
      var color = new Float32Array([0,0,0,1]);
      var canvasColor = [];
      for (var ii = 0; ii < 3; ++ii) {
        color[ii] = c[ii];
        canvasColor[ii] = Math.floor(c[ii] * 255);
      }

      return {
          style: style,
          glColor: color,
          canvasColor: "rgb(" + canvasColor.join(",") + ")"
      };
    },

    drawShip: function(ctx, x, y, direction, color) {
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
    },

    drawOutlineShip: function(ctx, x, y, direction, color) {
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
    },

    drawTwoToneShip: function(ctx, x, y, direction, color, darkColor) {
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
  };

}());


