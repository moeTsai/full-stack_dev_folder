const c = document.getElementById("myCanvas");

const canvasHeight = c.height;
const canvasWidth = c.width;
const ctx = c.getContext("2d");

let circleX = 100;
let circleY = 100;
let radius = 20;
let speedX = 5;
let speedY = 5;

let score = 0;

let groundX = 100;
let groundY = 500;
let groundH = 10;

c.addEventListener("mousemove", function (e) {
  groundX = e.clientX - 50;
});

class Brick {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  drawBrick() {
    ctx.fillStyle = "lightblue";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  touchingBall() {
    return (
      circleX + radius >= this.x &&
      circleX - radius <= this.x + this.width &&
      circleY + radius >= this.y &&
      circleY - radius <= this.y + this.height
    );
  }
}
let bricks = [];

for (let i = 0; i < 10; i++) {
  bricks.push(
    new Brick(
      Math.floor(Math.random() * canvasWidth) - 100,
      Math.floor(Math.random() * canvasHeight) - 50,
      100,
      50
    )
  );
}

function checkCollision() {
  if (circleX + radius >= canvasWidth || circleX - radius <= 0) {
    speedX = -speedX;
  }
  if (circleY + radius >= canvasHeight || circleY - radius <= 0) {
    speedY = -speedY;
  }
  circleX += speedX * 2;
  circleY += speedY * 2;

  bricks.forEach((brick) => {
    if (brick.touchingBall()) {
      score++;
      if (brick.x > circleX || brick.x + brick.width < circleX)
        speedX = -speedX;
      else if (brick.y > circleY || brick.y + brick.height < circleY)
        speedY = -speedY;
      circleX += speedX * 2;
      circleY += speedY * 2;
      // remove brick
      bricks = bricks.filter((b) => b != brick);

      console.log(bricks.length);
      if (bricks.length == 0) {
        alert("You won!");
        clearInterval(game);
      }
    }
  });

  if (
    circleX + radius >= groundX &&
    circleX - radius <= groundX + 100 &&
    circleY + radius >= groundY &&
    circleY - radius <= groundY + groundH
  ) {
    if (speedY > 0) circleX -= 10;
    else circleX += 10;
    speedY = -speedY;
  }
}

function drawCurcle() {
  checkCollision();
  circleX += speedX;
  circleY += speedY;

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  bricks.forEach((brick) => {
    brick.drawBrick();
  });

  //controllable ground
  ctx.fillStyle = "orange";
  ctx.fillRect(groundX, groundY, 100, groundH);

  ctx.beginPath();
  ctx.arc(circleX, circleY, radius, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fillStyle = "white";
  ctx.fill();
}

let game = setInterval(drawCurcle, 30);
