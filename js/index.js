const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

let gameStarted = false;
let upKey;
let rightKey;
let downKey;
let leftKey;
let borders = [];
let airBourne = true;
let player;

let GAME_OVER = false;

player = new Player(playerX, playerY, width, height, maxSpeed);
console.log(playerX, playerY)

setBorders();

player.draw();
borders.forEach((border) => border.draw())

function setup() {
  setupInputs();
  gameLoop();
}

function gameLoop() {
  player.step();
  draw();
  //
  window.requestAnimationFrame(gameLoop);
}

function draw() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 900, 450);

  player.draw();

  for (let i = 0; i < borders.length; i++) {
    borders[i].draw();
  }
}

function setupInputs() {
  document.addEventListener("keydown", function (e) {
    if ((e.key === "w" || e.key === "ArrowUp" || e.key === " ") && !airBourne) {
      airBourne = true;
      player.yspeed = -jumpPower;
      upKey = true;
    } else if (e.key === "a" || e.key === "ArrowLeft") {
      leftKey = true;
    } else if (e.key === "s" || e.key === "ArrowDown") {
      downKey = true;
    } else if (e.key === "d" || e.key === "ArrowRight") {
      rightKey = true;
    }
  });

  document.addEventListener("keyup", function (e) {
    if (e.key === "a" || e.key === "ArrowLeft") {
      leftKey = false;
    } else if (e.key === "s" || e.key === "ArrowDown") {
      downKey = false;
    } else if (e.key === "d" || e.key === "ArrowRight") {
      rightKey = false;
    }
  });
}

//
//
//

function start() {
  document.getElementById("message").style.display = "none";
//   const audio = new Audio("../media/announcer1.mp4");
//   audio.play();

  setup();
}

function resetAll() {
  player = new Player(playerX, playerY, width, height, maxSpeed);
  borders = [];
  setBorders();
  GAME_OVER = false;
}

window.addEventListener("keydown", function (e) {
  if (e.key === "Enter" || e.key === " " && !gameStarted) {
    console.log("Start!");
    gameStarted = true;
    start();
  }
});

function nextLvl() {
  const nextLvlNumber = Number(window.location.pathname.split("/levels/")[1].split(".")[0]) + 1;
  window.location.pathname = `/levels/${nextLvlNumber}.html`
} 

function redoLvl() {
  window.location.reload(); 
  return false;
}
