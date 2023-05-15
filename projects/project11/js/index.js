function setup() {
  createCanvas(500, 500);
  background(140);
}

function draw() {
  let R = random(256);
  let G = random(256);
  let B = random(256);
  //background(220);
  fill(255)
  rectMode(CENTER);
  rect(250, 250, 50, 50);
  //points
  stroke(R, G, B);
  point(random(500), random(500));
}

function mouseDragged(){
  let R = random(256);
  let G = random(256);
  let B = random(256);
  //bigDots
  fill(R, G, B, G);
  //stroke(255);
  noStroke();
  ellipse(mouseX, mouseY, 25, 25);
  //line
  stroke(R, B, G, G);
  line(250, 250, mouseX, mouseY);
}
