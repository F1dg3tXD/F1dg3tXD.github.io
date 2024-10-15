class Bar {
  int index;
  float height;
  color baseColor;
  float spacing;
  float barWidth;

  Bar(int idx, int numBars) {
    this.index = idx;
    this.height = 0;
    this.spacing = 500.0 / numBars;
    this.barWidth = this.spacing * 1;
    this.baseColor = lerpColor(#ff9a00, #00a2ff, map(index, 0, numBars, 0, 1));
  }

  void setHeight(float h) {
    this.height = h;
  }

  void display() {
    pushMatrix();
    translate((index - numBars / 2) * spacing, 0, 0);
    fill(baseColor);
    box(barWidth, height, barWidth);
    popMatrix();
  }
}
