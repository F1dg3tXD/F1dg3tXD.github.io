class MazeCeiling {
  color ceilingColor;

  MazeCeiling(String hexColor) {
    this.ceilingColor = unhex(hexColor.substring(1)); // Remove "#" and convert to color
  }

  void renderCeiling(int sizeX, int sizeY, int height) {
    fill(ceilingColor);
    noStroke();
    beginShape();
    vertex(0, 0, height);
    vertex(sizeX, 0, height);
    vertex(sizeX, sizeY, height);
    vertex(0, sizeY, height);
    endShape(CLOSE);
  }
}