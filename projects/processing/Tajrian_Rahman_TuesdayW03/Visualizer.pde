class Visualizer {
  ArrayList<Bar> bars = new ArrayList<Bar>();
  int numBars;

  Visualizer(int numBars) {
    this.numBars = numBars;
    createBars();
  }

  void createBars() {
    bars.clear();
    for (int i = 0; i < numBars; i++) {
      bars.add(new Bar(i, numBars));
    }
  }

  void update(FFT fft) {
    for (int i = 0; i < bars.size(); i++) {
      bars.get(i).setHeight(fft.spectrum[i] * 500);
    }
  }

  void display() {
    for (Bar bar : bars) {
      bar.display();
    }
  }

  void setNumBars(int numBars) {
    this.numBars = numBars;
    createBars();
  }
}
