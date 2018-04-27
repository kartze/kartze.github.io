let numCars = 10;
let minSpeed = 1;

let xPos1 = [];
let yPos1 = [];
let xSpeed1 = [];
let maxSpeed1 = 3;
let cars1 = [];

let xPos2 = [];
let yPos2 = [];
let xSpeed2 = [];
let maxSpeed2 = 3;
let cars2 = [];

let levelSpeedIncrease = 2; // how much speed increases each level

let player1;
let startXPos1;
let startYPos1;
let level1;

let player2;
let startXPos2;
let startYPos2;
let level2;

let carWidth = 50;
let playerWidth = 50;
let gamePieceHeight = 50; // same height for player and car gamepieces to maintain horizontal lines

let gameState = 0;
let time;

var pg1;

function setup() {
  var canvas = createCanvas(1100, 600);
  canvas.parent('sketch-box');
  pg1 = createGraphics(1100, 1200);

  startXPos1 = width / 4;
  startYPos1 = height - gamePieceHeight / 2;

  startXPos2 = 3 * width / 4;
  startYPos2 = height - gamePieceHeight / 2;
}

function draw() {
  if (gameState == 0) {
    startScreen();
  } else if (gameState == 1) {
    update();
  } else if (gameState == 2) { // when time is up
    gameOver();
  }
}

function mouseClicked() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) { // if player clicks inside game canvas
    // add listener to disable scroll
    window.addEventListener('scroll', noscroll);

    if (gameState == 0) {
      gameState = 1; // start to game
    } else if (gameState == 2) {
      maxSpeed1 = 3; // reset speed
      maxSpeed2 = 3; // reset speed
      gameState = 0; // game over to restart
    }
  } else {
    // Remove listener to disable scroll
    window.removeEventListener('scroll', noscroll);
  }
}

function noscroll() {
  canvas.scrollIntoView();
}

function startScreen() {
  background(255);
  line(0, 0, width, 0);
  line(0, 0, 0, height);
  line(width - 1, height, width - 1, 0);
  line(width, height - 1, 0, height - 1);
  textSize(30);
  textAlign(CENTER);
  text("CROSS THE ROAD", width / 2, 225);
  textSize(25);
  text("click to begin", width / 2, 275);

  player1 = new Player1(startXPos1, startYPos1);
  createCars1();

  player2 = new Player2(startXPos2, startYPos2);
  createCars2();

  time = 1000; // initializes countdown
  level1 = 1;
  level2 = 1;
}

function createCars1() {
  for (let i = 0; i < numCars; i++) {
    // initializes properties of each car
    xPos1[i] = random(0, width / 2);
    yPos1[i] = gamePieceHeight * (1.5 + i);
    if (i % 2 == 0) { // alternates car direction
      xSpeed1[i] = random(minSpeed, maxSpeed1);
    } else {
      xSpeed1[i] = random(-maxSpeed1, -minSpeed);
    }
    // creates each car
    cars1[i] = new Car1(xPos1[i], yPos1[i], xSpeed1[i]);
  }
}

function createCars2() {
  for (let i = 0; i < numCars; i++) {
    // initializes properties of each car
    xPos2[i] = random(width / 2, width);
    yPos2[i] = gamePieceHeight * (1.5 + i);
    if (i % 2 == 0) { // alternates car direction
      xSpeed2[i] = random(minSpeed, maxSpeed2);
    } else {
      xSpeed2[i] = random(-maxSpeed2, -minSpeed);
    }
    // creates each car
    cars2[i] = new Car2(xPos2[i], yPos2[i], xSpeed2[i]);
  }
}

function update() {
  background(255, 280 - level2 * 25, 280 - level2 * 25);
  pg1.background(255, 280 - level1 * 25, 280 - level1 * 25);

  player1.display();
  player1.checkWin();

  player2.display();
  player2.checkWin();

  for (let i = 0; i < numCars; i++) {
    cars1[i].move();
    cars1[i].display();
    cars1[i].checkHit();
    cars2[i].move();
    cars2[i].display();
    cars2[i].checkHit();
  }

  checkTime();
  time--;

  scale(0.5, 0.5);
  image(pg1, 0, 0);

  scale(2, 2);
  fill(0);
  line(0, 0, width, 0);
  line(0, 0, 0, height);
  line(width / 2, 0, width / 2, height);
  line(width - 1, height, width - 1, 0);
  line(width, height - 1, 0, height - 1);
  textSize(12);
  textAlign(LEFT);
  fill(0, 0, 0);
  text("Level: " + level1, 35, 575);
  text("Level: " + level2, 35 + width / 2, 575);
  textSize(200);
  textAlign(CENTER);
  fill(0, 0, 0, 51);
  text(time, width / 2, height / 2);
}

class Player1 {
  constructor(_x, _y) {
    this.x = _x;
    this.y = _y;
    this.width = playerWidth;
    this.height = gamePieceHeight;
  }

  display() {
    pg1.fill(0);
    pg1.ellipse(this.x, this.y, this.width, this.height);
  }

  move(direction) {
    if (direction == 1 && this.x < (width / 2 - this.width / 2)) { // move right but if you're not already at the right wall
      this.x += this.width;
    } else if (direction == 2 && this.x > this.width / 2) { // move left but if you're not already at the left wall
      this.x -= this.width;
    } else if (direction == 3 && this.y > this.height / 2) { // move up but if you're not already at the top wall
      this.y -= this.height;
    } else if (direction == 4 && this.y < (height - this.height / 2)) { // move down but if you're not already at the bottom wall
      this.y += this.height;
    }
  }

  reset() {
    this.x = startXPos1;
    this.y = startYPos1;
  }

  checkWin() {
    if (this.y == gamePieceHeight / 2) levelUp1(); // player reaches top wall so next level
  }
}

class Player2 {
  constructor(_x, _y) {
    this.x = _x;
    this.y = _y;
    this.width = playerWidth;
    this.height = gamePieceHeight;
  }

  display() {
    fill(0);
    ellipse(this.x, this.y, this.width, this.height);
  }

  move(direction) {
    if (direction == 1 && this.x < (width - this.width / 2)) { // move right but if you're not already at the right wall
      this.x += this.width;
    } else if (direction == 2 && this.x > (width / 2 + this.width / 2)) { // move left but if you're not already at the left wall
      this.x -= this.width;
    } else if (direction == 3 && this.y > this.height / 2) { // move up but if you're not already at the top wall
      this.y -= this.height;
    } else if (direction == 4 && this.y < (height - this.height / 2)) { // move down but if you're not already at the bottom wall
      this.y += this.height;
    }
  }

  reset() {
    this.x = startXPos2;
    this.y = startYPos2;
  }

  checkWin() {
    if (this.y == gamePieceHeight / 2) levelUp2(); // player reaches top wall so next level
  }
}

function levelUp1() {
  level1++;
  player1.reset();
  maxSpeed1 += levelSpeedIncrease; // increase speed next level
  createCars1();
  gameState = 1;
}

function levelUp2() {
  level2++;
  player2.reset();
  maxSpeed2 += levelSpeedIncrease; // increase speed next level
  createCars2();
  gameState = 1;
}

function keyPressed() {
  if (key == "d" || key == "D") {
    player1.move(1);
  } else if (key == "a" || key == "A") {
    player1.move(2);
  } else if (key == "w" || key == "W") {
    player1.move(3);
  } else if (key == "s" || key == "S") {
    player1.move(4);
  } else if (keyCode == RIGHT_ARROW) {
    player2.move(1);
  } else if (keyCode == LEFT_ARROW) {
    player2.move(2);
  } else if (keyCode == UP_ARROW) {
    player2.move(3);
  } else if (keyCode == DOWN_ARROW) {
    player2.move(4);
  }
}

class Car1 {
  constructor(_x, _y, _speed) {
    this.x = _x;
    this.y = _y;
    this.speed = _speed;
    this.width = carWidth;
    this.height = gamePieceHeight;
  }

  display() {
    pg1.fill(255);
    pg1.ellipse(this.x, this.y, this.width, this.height);
  }

  move() {
    this.x += this.speed;
    if (this.x - this.width >= width / 2 || this.x + this.width <= 0) { // if car reaches wall
      if (this.speed > 0) { // right-direction car reaches right wall, restart at left wall
        this.x = 0;
      } else { // left-direction car reaches left wall, restart at right wall
        this.x = width / 2;
      }
    }
  }

  checkHit() {
    if (abs(player1.x - this.x) <= this.width / 2 + player1.width / 2 && this.y == player1.y) {
      player1.reset();
    }
  }
}

class Car2 {
  constructor(_x, _y, _speed) {
    this.x = _x;
    this.y = _y;
    this.speed = _speed;
    this.width = carWidth;
    this.height = gamePieceHeight;
  }

  display() {
    fill(255);
    ellipse(this.x, this.y, this.width, this.height);
  }

  move() {
    this.x += this.speed;
    if (this.x - this.width >= width || this.x + this.width <= width / 2) { // if car reaches wall
      if (this.speed > 0) { // right-direction car reaches right wall, restart at left wall
        this.x = width / 2;
      } else { // left-direction car reaches left wall, restart at right wall
        this.x = width;
      }
    }
  }

  checkHit() {
    if (abs(player2.x - this.x) <= this.width / 2 + player2.width / 2 && this.y == player2.y) {
      player2.reset();
    }
  }
}

function checkTime() {
  if (time <= 0) gameState = 2; // time is up so game over
}

function gameOver() {
  if (level1 > level2) {
    fill(255, 280 - level1 * 25, 280 - level1 * 25);
    rect(0, 0, width / 2, height);
    fill(255, 280 - level2 * 25, 280 - level2 * 25);
    rect(width / 2, 0, width / 2, height);
    fill(0);
    line(0, 0, width, 0);
    line(0, 0, 0, height);
    line(width - 1, height, width - 1, 0);
    line(width, height - 1, 0, height - 1);

    fill(0);
    textAlign(CENTER);
    textSize(30);
    text("You Won!", width / 4, 225);
    text("You Lose", 3 * width / 4, 225);
    textSize(25);
    text("Level: " + level1, width / 4, 275);
    text("Level: " + level2, 3 * width / 4, 275);
  } else if (level1 < level2) {
    fill(255, 280 - level1 * 25, 280 - level1 * 25);
    rect(0, 0, width / 2, height);
    fill(255, 280 - level2 * 25, 280 - level2 * 25);
    rect(width / 2, 0, width / 2, height);
    fill(0);
    line(0, 0, width, 0);
    line(0, 0, 0, height);
    line(width - 1, height, width - 1, 0);
    line(width, height - 1, 0, height - 1);

    fill(0);
    textAlign(CENTER);
    textSize(30);
    text("You Lose", width / 4, 225);
    text("You Won!", 3 * width / 4, 225);
    textSize(25);
    text("Level: " + level1, width / 4, 275);
    text("Level: " + level2, 3 * width / 4, 275);
  } else if (level1 == level2) {
    fill(255, 280 - level1 * 25, 280 - level1 * 25);
    rect(0, 0, width, height);
    fill(0);
    line(0, 0, width, 0);
    line(0, 0, 0, height);
    line(width - 1, height, width - 1, 0);
    line(width, height - 1, 0, height - 1);

    fill(0);
    textAlign(CENTER);
    textSize(30);
    text("Tie!", width / 2, 225);
    textSize(25);
    text("Level: " + level1, width / 2, 275);
  }
}