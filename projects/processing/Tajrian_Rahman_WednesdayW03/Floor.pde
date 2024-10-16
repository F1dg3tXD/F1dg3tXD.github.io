class MazeFloor {
  color floorColor;

  MazeFloor(String hexColor) {
    this.floorColor = unhex(hexColor.substring(1)); // Remove "#" and convert to color
  }

  void renderFloor(int sizeX, int sizeY) {
    fill(floorColor);
    noStroke();
    beginShape();
    vertex(0, 0, 0);
    vertex(sizeX, 0, 0);
    vertex(sizeX, sizeY, 0);
    vertex(0, sizeY, 0);
    endShape(CLOSE);
  }
}