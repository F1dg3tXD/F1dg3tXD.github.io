class MazeWall {
  color wallColor;

  MazeWall(String hexColor) {
    this.wallColor = unhex(hexColor.substring(1)); // Remove "#" and convert to color
  }

  void renderWall(int sizeX, int height, PVector start, PVector end) {
    fill(wallColor);
    noStroke();
    beginShape();
    vertex(start.x, start.y, 0); // Bottom left
    vertex(end.x, end.y, 0);     // Bottom right
    vertex(end.x, end.y, height); // Top right
    vertex(start.x, start.y, height); // Top left
    endShape(CLOSE);
  }
}