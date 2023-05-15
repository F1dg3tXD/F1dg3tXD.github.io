let angleX = 0;
let angleY = 0;
let rotateXFlag = false;
let rotateYFlag = false;
let rotateAltXFlag =false;
let rotateAltYFlag =false;
let showWire = true;

function setup() {
    canvas = createCanvas(windowWidth/1.5, windowHeight/1.4, WEBGL);
    setAttributes('antialias', true);
    canvas.parent('webgl')

    //file Menu
    // file = createSelect();
    // file.position(200, 40);
    // file.option('Save Image');
    // file.option('Export OBJ');
    // file.disable('Export OBJ');

    //save Image
    saveImage = createButton('Save');
    saveImage.mousePressed(saveImage.mousePressed(saveCanvas(canvas, 'primative', 'png');
    saveImage.position(100, 40);

    // Create control pannel components
    // cubeColor = getElementById('#cubeColor').color('#f00000');
    bgPicker = createColorPicker('#3f3f3f');
    bgPicker.color();

    //Define colors
    boxPicker = createColorPicker('#f00000');
    boxPicker.color();
    spherePicker = createColorPicker('#00FF00');
    spherePicker.color();
    cyPicker = createColorPicker('#0000FF');
    cyPicker.color();
    coPicker = createColorPicker('#FF00FF');
    coPicker.color();
    wireColor = '#FFA500'

    //Define box shape controls
    boxWidth = createInput('1');
    boxHeight = createInput('1');
    boxDepth = createInput('1');
    boxLocX = createInput('0');
    boxLocY = createInput('0');
    boxLocZ = createInput('0');
    boxRotX = createInput('0');
    boxRotY = createInput('0');
    boxRotZ = createInput('0');

    //Define sphere shape controls
    sphereRadiusX = createInput('1');
    sphereRadiusY = createInput('1');
    sphereHeight = createInput('1');
    sphereLocX = createInput('-100');
    sphereLocY = createInput('0');
    sphereLocZ = createInput('0');
    //define cylinder controls

    cylinderRadiusX = createInput('1');
    cylinderRadiusY = createInput('1');
    cylinderHeight = createInput('1')
    cylinderLocX = createInput('100');
    cylinderLocY = createInput('0');
    cylinderLocZ = createInput('0');
    cylinderRotX = createInput('0');
    cylinderRotY = createInput('0');
    cylinderRotZ = createInput('0');

    //define cone controls
    coneRadiusX = createInput('1');
    coneRadiusY = createInput('1');
    coneHeight = createInput('1');
    coneLocX = createInput('200');
    coneLocY = createInput('0');
    coneLocZ = createInput('0');
    coneRotX = createInput('0');
    coneRotY = createInput('0');
    coneRotZ = createInput('0');
}

function draw() {
    let bg = bgPicker.color();
    background(bg);

    // Set up camera and rotation
    if (rotateXFlag) {
      angleX += 0.05;
    }
    if (rotateYFlag) {
      angleY += 0.05;
    }
    if (rotateAltYFlag) {
      angleY -= 0.05;
    }
    if (rotateAltXFlag) {
      angleX -= 0.05;
    }
    rotateX(angleX);
    rotateY(angleY);

    // Get color values inputs
    let boxColor = boxPicker.color();
    let sphereColor = spherePicker.color();
    let cylinderColor = cyPicker.color();
    let coneColor = coPicker.color();

    //Get shape control for Box
    let boxScaleX = boxWidth.value();
    let boxScaleZ = boxHeight.value();
    let boxScaleY = boxDepth.value();
    let bLocX = boxLocX.value();
    let bLocY = boxLocY.value();
    let bLocZ = boxLocZ.value();
    let boxRotationX = boxRotX.value();
    let boxRotationY = boxRotY.value();
    let boxRotationZ = boxRotZ.value();

    //Get shape control for Sphere
    let sRX = sphereRadiusX.value();
    let sRY = sphereRadiusY.value();
    let sH = sphereHeight.value();
    let sLocX = sphereLocX.value();
    let sLocY = sphereLocY.value();
    let sLocZ = sphereLocZ.value();

    //Get shape control for Cylinder
    let cyRX = cylinderRadiusX.value();
    let cyRY = cylinderRadiusY.value();
    let cyH = cylinderHeight.value();
    let cyLocX = cylinderLocX.value();
    let cyLocY = cylinderLocY.value();
    let cyLocZ = cylinderLocZ.value();
    let cylinderRotationX = cylinderRotX.value();
    let cylinderRotationY = cylinderRotY.value();
    let cylinderRotationZ = cylinderRotZ.value();

    //Get shape control for Cone
    let coneRX = coneRadiusX.value();
    let coneRY = coneRadiusY.value();
    let coneH = coneHeight.value();
    let coLocX = coneLocX.value();
    let coLocY = coneLocY.value();
    let coLocZ = coneLocZ.value();
    let coRotationX = coneRotX.value();
    let coRotationY = coneRotY.value();
    let coRotationZ = coneRotZ.value();

    // Draw box
    push();
    stroke(wireColor);
    fill(boxColor);
    translate(bLocX, bLocY, bLocZ);
    rotateX(boxRotationX);
    rotateY(boxRotationY);
    rotateZ(boxRotationZ);
    scale(boxScaleX, boxScaleZ, boxScaleY);
    box(100, 100, 100);
    pop();

    //Draw sphere
    push();
    stroke(wireColor);
    fill(sphereColor);
    translate(sLocX, sLocY, sLocZ);
    scale(sRX, sH, sRY);
    sphere(50, 8, 8);
    pop();

    //Draw cylinder
    push();
    stroke(wireColor)
    fill(cylinderColor);
    translate(cyLocX, cyLocY, cyLocZ);
    rotateX(cylinderRotationX);
    rotateY(cylinderRotationY);
    rotateZ(cylinderRotationZ);
    scale(cyRX, cyH, cyRY);
    cylinder(50, 100);
    pop();

    //Draw cone
    push();
    stroke(wireColor);
    fill(coneColor);
    translate(coLocX, coLocY, coLocZ);
    rotateX(coRotationX);
    rotateY(coRotationY);
    rotateZ(coRotationZ);
    scale(coneRX, coneH, coneRY);
    cone(50, 100, 16, 0);
    pop();

    //Draw plane
}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
      rotateAltYFlag = true;
    } else if (keyCode === RIGHT_ARROW) {
      rotateYFlag = true;
    } else if (keyCode === UP_ARROW) {
      rotateXFlag = true;
    } else if (keyCode === DOWN_ARROW) {
      rotateAltXFlag = true;
    }
  }
  
  function keyReleased() {
    if (keyCode === LEFT_ARROW) {
      rotateAltYFlag = false;
    } else if (keyCode === RIGHT_ARROW) {
      rotateYFlag = false;
    } else if (keyCode === UP_ARROW) {
      rotateXFlag = false;
    } else if (keyCode === DOWN_ARROW) {
      rotateAltXFlag = false;
    }
  }
