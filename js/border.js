class Border {
  constructor(x, y, width, height, type, func) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.type = type;
    this.func = func ? func : "solid";
  }

  draw() {
    if (this.type === 1) {
      ctx.fillStyle = "blue";
    } else if (this.type === 2) {
      ctx.fillStyle = "red";
    } else if(this.type === 3)  {
      ctx.fillStyle = "orange";
    } else if(this.type === 4) {
      ctx.fillStyle = "black";
    }

    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

function checkIntersection(r1, r2) {
  if (r1.x >= r2.x + r2.width) {
    return false;
  } else if (r1.x + r1.width <= r2.x) {
    return false;
  } else if (r1.y >= r2.y + r2.height) {
    return false;
  } else if (r1.y + r1.height <= r2.y) {
    return false;
  } else {
    return true;
  }
}
