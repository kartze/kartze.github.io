function setup() {
  var canvas = createCanvas(400, 400);
  canvas.parent('sketch-box');
}

function draw() {
  background(220);
  fill(255);
  // head
  ellipse(150, 250, 80, 80);
  // body
  triangle(190, 260, 200, 140, 240, 160);
  // leftside hand
  ellipse(126, 323, 10, 10);
  // rightside hand
  ellipse(196, 344, 10, 10);
  // leftside foot
  ellipse(190, 70, 20, 10);
  // rightside foot
  ellipse(250, 90, 20, 10);
  // rightside eye
  ellipse(145, 240, 2, 2);
  // leftside eye
  ellipse(125, 265, 2, 2);
  // mouth
  ellipse(160, 265, 30, 30);

  noFill();
  // leftside arm
  curve(110, 100, 190, 260, 130, 320, 10, 400);
  // rightside arm
  curve(110, 200, 190, 260, 200, 340, 10, 400);
  // leftside leg
  curve(110, 100, 180, 70, 200, 140, 180, 100);
  // rightside leg
  curve(200, 150, 240, 90, 240, 160, 180, 100);

  fill(0);
  textSize(12);
  textFont('Helvetica');
  text('This is Nicholas.', 50, 150);
}