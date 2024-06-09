const canvas = document.getElementById('canvas');
canvas.width = 1280;
canvas.height = 720;
const ctx = canvas.getContext('2d');
let backgroundX = 0; // initial x position of background image

function scrollBackground(e) {
  const mouseX = e.clientX; // get x position of mouse
  const canvasWidth = canvas.clientWidth; // get width of canvas

  if (mouseX <= 90) {
    backgroundX += 10; // move background image 10 pixels to the left
  } else if (mouseX >= canvasWidth - 90) {
    backgroundX -= 10; // move background image 10 pixels to the right
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
  ctx.drawImage(backgroundImage, backgroundX, 0, canvasWidth, canvas.height); // draw background image
  // draw game elements here
}

canvas.addEventListener('mousemove', scrollBackground);
