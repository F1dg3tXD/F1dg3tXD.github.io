let font;
let baseSize = 800; // Reference size to maintain aspect ratio

function preload() {
  font = loadFont('font/BROADW.TTF');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(font);
}

function draw() {
  background('#2d2d2d');
  
  let scaleFactor = min(windowWidth / baseSize, windowHeight / baseSize); // Maintain aspect ratio
  
  push();
  translate(windowWidth / 2, windowHeight / 2); // Center the content
  scale(scaleFactor); // Scale based on the window size while maintaining aspect ratio
  translate(-baseSize / 2, -baseSize / 2); // Move the origin to maintain centering
  
  rotatingSquare();  // Adjusted this to ensure proper centering
  testPattern();
  clockText12Hour();
  
  pop();
}

function testPattern() {
  noFill();
  stroke('#e09558');
  strokeWeight(2);
  
  line(0, 0, 400, 400);
  line(0, baseSize, baseSize, 0);
  line(400, 0, 400, 200);
  line(baseSize, baseSize, 594, 594);
  
  ellipseMode(CENTER);
  let cSize = map(second(), 0, 59, 0, 400);
  stroke('#0099ff');
  circle(baseSize / 2, baseSize / 2, cSize);
  rectMode(CENTER);
  rect(baseSize / 2, baseSize / 2, 400, 400, 25);
  
  // Seconds
  let secX = map(second(), 0, 60, 200, 600);
  textSize(25);
  textAlign(CENTER);
  fill('#0099ff');
  text(second(), secX, 650);
  
  // Minutes
  let minY = map(minute(), 0, 60, 600, 200);
  textSize(35);
  fill('#00ff00');
  text(minute(), 170, minY);
  
  let h = hour() % 12;
  h = (h === 0) ? 12 : h; // Adjust for 12 AM and 12 PM
  
  // Hours
  let hourY = map(hour(), 0, 12, 400, 200);
  textSize(60);
  fill('#ff0000');
  text(nf(h, 2), 650, hourY);
}

function clockText12Hour() {
  noFill();
  textSize(45);
  strokeWeight(10);
  textAlign(CENTER);
  rectMode(CENTER);
  stroke('#00ff00');
  let rSize = map(minute(), 0, 60, 4, 400);
  rect(baseSize / 2, baseSize / 2, rSize, rSize, 25);

  let h = hour() % 12;
  h = (h === 0) ? 12 : h; // Adjust for 12 AM and 12 PM
  let ampm = (hour() < 12) ? 'AM' : 'PM';

  fill(0, 180);
  stroke('#0099ff');
  strokeWeight(1);
  rectMode(CENTER);
  rect(baseSize / 2, 405, 250, 100, 25);
  
  fill('#ff0000');
  text(nf(h, 2) + ':', 325, 400);
  
  fill('#00ff00');
  text(nf(minute(), 2) + ':', 400, 400);
  
  fill('#0099ff');
  text(nf(second(), 2), 470, 400);
  
  fill('#ffffff');
  text(ampm, baseSize / 2, 450);
}

function rotatingSquare() {
  let h = hour() % 12;
  let m = minute();
  let s = second();

  let totalSecondsIn12Hours = 12 * 60 * 60;
  let currentSeconds = (h * 3600) + (m * 60) + s;

  let angle = map(currentSeconds, 0, totalSecondsIn12Hours, 0, TWO_PI);

  push();
  translate(baseSize / 2, baseSize / 2); // Correcting the center for the rotating square
  rotate(angle);
  fill('#ff0000');
  stroke('#ff0000');
  rectMode(CENTER); // Ensure the square is centered
  rect(0, 0, 200, 200, 25);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
