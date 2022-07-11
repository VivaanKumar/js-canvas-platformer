class Player {
  constructor(x, y, width, height, maxSpeed) {
    this.x = x;
    this.y = y;
    this.xspeed = 0;
    this.yspeed = 0;
    this.friction = 0.6;
    this.maxSpeed = maxSpeed;
    this.width = width;
    this.height = height;
    this.active = true;
    this.color = "green";
  }

  step() {
    if (!GAME_OVER) {
      if (this.active) {
        if(this.y > 600) {
          death();
        }
        if ((!leftKey && !rightKey) || (leftKey && rightKey)) {
          this.xspeed *= this.friction;
        } else if (rightKey) {
          // const distanceFromOrigin = this.x;
          borders.forEach((border) => {
            border.x -= this.xspeed / moveCameraDivide;
          });
          this.xspeed += 1.5;
        } else if (leftKey) {
          // const distanceFromOrigin = this.x;
          borders.forEach((border) => {
            border.x -= this.xspeed / moveCameraDivide;
          });
          this.xspeed -= 1.5;
        }

        //   if (upKey) {
        //     this.yspeed -= 15;
        //   }
        // put again if want ironman

        this.yspeed += 1;

        if (this.xspeed > this.maxSpeed) {
          this.xspeed = this.maxSpeed;
        } else if (this.xspeed < -this.maxSpeed) {
          this.xspeed = -this.maxSpeed;
        }

        //   if (this.yspeed > this.maxSpeed) {
        //     this.yspeed = this.maxSpeed;
        //   } else if (this.yspeed < -this.maxSpeed) {
        //     this.yspeed = -this.maxSpeed;
        //   }

        if (this.xspeed > 0) {
          this.xspeed = Math.floor(this.xspeed);
        } else {
          this.xspeed = Math.ceil(this.xspeed);
        }

        if (this.yspeed > 0) {
          this.yspeed = Math.floor(this.yspeed);
        } else {
          this.yspeed = Math.ceil(this.yspeed);
        }

        let horizontalRect = {
          x: this.x + this.xspeed,
          y: this.y,
          width: this.width,
          height: this.height,
        };

        let verticalRect = {
          x: this.x,
          y: this.y + this.yspeed,
          width: this.width,
          height: this.height,
        };

        for (let i = 0; i < borders.length; i++) {
          let borderRect = {
            x: borders[i].x,
            y: borders[i].y,
            width: borders[i].width,
            height: borders[i].height,
            func: borders[i].func,
          };

          if (checkIntersection(horizontalRect, borderRect)) {
            if (horizontalRect.x > borderRect.x) {
              this.x = borderRect.x + borderRect.width;
            } else {
              this.x = borderRect.x - horizontalRect.width;
            }
            this.xspeed = 0;

            if (borderRect.func == "spike") {
              death();
            }
          }
          if (checkIntersection(verticalRect, borderRect)) {
            if (borderRect.func == "win") {
              GAME_OVER = true;
              document.getElementById("modal").style.display = "grid";
            } else if (borderRect.func == "spike") {
              death();
            }

            this.yspeed = 0;
            airBourne = false;
          }
        }

        this.x += this.xspeed;
        this.y += this.yspeed;
      }
    }
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

function death() {
  player.color = "red";
  GAME_OVER = true;

  let wait = setInterval(() => {
    resetAll();
    clearInterval(wait);
  }, 2000)
}