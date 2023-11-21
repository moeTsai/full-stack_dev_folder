const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const unit = 20;
const row = canvas.height / unit;
const column = canvas.width / unit;

let snake = [];
let fruit = null;
let score = 0;
let highestScore;
loadHighestScore();
document.getElementById("current-score").innerHTML = "Current Score: " + score;

snake[0] = {
  x: 3,
  y: 2,
};

snake[1] = {
  x: 2,
  y: 2,
};

window.addEventListener("keydown", (e) => {
  if (e.key == "ArrowRight" && dir != "left") dir = "right";
  else if (e.key == "ArrowLeft" && dir != "right") dir = "left";
  else if (e.key == "ArrowUp" && dir != "down") dir = "up";
  else if (e.key == "ArrowDown" && dir != "up") dir = "down";

  removeEventListener("keydown", e);
});
let dir = "right";
let tail = null;

function checkCollision(head, snake) {
  for (let i = 1; i < snake.length; i++) {
    if (head.x == snake[i].x && head.y == snake[i].y) return true;
  }
  return false;
}

class Fruit {
  constructor() {
    this.row = Math.floor(Math.random() * row);
    this.column = Math.floor(Math.random() * column);
  }

  draw() {
    ctx.fillStyle = "red";
    ctx.strokeStyle = "darkred";
    ctx.fillRect(this.column * unit, this.row * unit, unit, unit);
    ctx.strokeRect(this.column * unit, this.row * unit, unit, unit);
  }
}

function eatFruit(head, fruit) {
  if (head.x == fruit.column && head.y == fruit.row) {
    return true;
  }
  return false;
}

function draw() {
  if (
    snake[0].x >= column ||
    snake[0].y >= row ||
    snake[0].x < 0 ||
    snake[0].y < 0 ||
    checkCollision(snake[0], snake)
  ) {
    clearInterval(myGame);
    alert("Game Over");
    return;
  }

  console.log(fruit);
  if (!fruit) {
    fruit = new Fruit();
    fruit.draw();
  }

  //   // draw fruit
  //   ctx.fillStyle = "red";
  //   ctx.strokeStyle = "darkred";
  //   ctx.fillRect(fruit.column * unit, fruit.row * unit, unit, unit);
  //   ctx.strokeRect(fruit.column * unit, fruit.row * unit, unit, unit);

  if (tail) {
    ctx.fillStyle = "black";
    ctx.strokeStyle = "black";
    ctx.fillRect(tail.x * unit - 5, tail.y * unit - 5, unit + 10, unit + 10);
    ctx.strokeRect(tail.x * unit, tail.y * unit, unit, unit);
  }
  for (let i in snake) {
    // console.log(i, snake[i]);
    ctx.fillStyle = "lightgreen";
    if (i == 0) ctx.fillStyle = "pink";

    ctx.strokeStyle = "white";

    ctx.fillRect(snake[i].x * unit, snake[i].y * unit, unit, unit);
    ctx.strokeRect(snake[i].x * unit, snake[i].y * unit, unit, unit);
  }

  let nextx = snake[0].x;
  let nexty = snake[0].y;

  if (dir == "right") nextx = snake[0].x + 1;
  else if (dir == "left") nextx = snake[0].x - 1;
  else if (dir == "up") nexty = snake[0].y - 1;
  else if (dir == "down") nexty = snake[0].y + 1;

  let newHead = {
    x: nextx,
    y: nexty,
  };

  if (!eatFruit(newHead, fruit)) tail = snake.pop();
  else {
    fruit = null;

    score++;
    highestScore = localStorage.getItem("highestScore");
    if (score > highestScore) {
      localStorage.setItem("highestScore", score);
      document.getElementById("highest-score").innerHTML =
        "Highest Score: " + score;
    }
    document.getElementById("current-score").innerHTML =
      "Current Score: " + score;
  }
  snake.unshift(newHead);
}

let myGame = setInterval(draw, 100);

function loadHighestScore() {
  let highestScore = localStorage.getItem("highestScore");
  if (highestScore) {
    document.getElementById("highest-score").innerHTML =
      "Highest Score: " + highestScore;
  } else {
    document.getElementById("highest-score").innerHTML = "Highest Score: 0";
  }
}
