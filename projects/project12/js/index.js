// F1dg3t Cube Maker

let cSize = 50;
let saveButton, resetButton;

function setup() {
  let canvas = createCanvas(windowWidth/2, windowHeight/2);
  canvas.parent('threeDcanvas');
  // canvas.position(100, 130)
  background(150);

  saveButton = createButton("Download");
  saveButton.mousePressed(saveImage);
  saveButton.addClass("buttons");
  saveButton.parent('buttonsContainer');
  resetButton = createButton("Reset");
  resetButton.mousePressed(resetCanvas);
  resetButton.addClass("buttons");
  resetButton.parent('buttonsContainer');
}

function windowResized() {
  canvas.resizeCanvas(windowWidth/2, windowHeight/2);
  canvas.background(150);
}

function draw() {

}
function mouseDragged() {
  cSize += 3;
  if(cSize > 100) cSize = 0;
  circle(mouseX, mouseY, cSize);
}

function saveImage() {
  save("customF1dg3tCube.jpg");
}
function resetCanvas() {
  background(150);
}
