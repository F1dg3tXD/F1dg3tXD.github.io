a = (x, y, d = mag(
  k = 9 * cos(x / 8),
  e = y / 8 - 12.5
)**2 / 99 + sin(t) / 6 + 0.5) => {
  let q = 99 - e * sin(atan2(k, e) * 7) / d + k * (3 + cos(d * d - t) * 2);
  let c = d / 2 + e / 69 - t / 16;

  // Add dynamic color
  let hue = (x + y + t * 10) % 360;
  stroke(hue, 255, 255, 180);  // Hue, Saturation, Brightness, Alpha

  point(
    q * sin(c) + 200,
    (q + 19 * d) * cos(c) + 200
  );
}

t = 0;

draw = () => {
  if (!t) {
    createCanvas(w = 400, w);
    colorMode(HSB, 360, 255, 255, 255);  // Enable HSB color mode
    background(0);
    strokeWeight(1);
    noFill();
  }

  background(0, 0, 0, 20);  // Slight transparency for trailing effect
  t += PI / 45;

  for (let i = 1e4; i--;) {
    a(i % 200, i / 55);
  }
};