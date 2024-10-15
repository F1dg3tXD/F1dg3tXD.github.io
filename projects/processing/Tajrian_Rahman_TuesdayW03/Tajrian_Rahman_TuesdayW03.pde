import peasy.*;
import processing.sound.*;
import javax.swing.JFileChooser;

// Tajrian Rahman

PeasyCam cam;
SoundFile audioFile;
FFT fft;
Visualizer visualizer;
boolean isPlaying = false;
int numBars = 64;

void setup() {
  size(1280, 720, P3D);
  cam = new PeasyCam(this, 500);
  selectMP3();
}

void draw() {
  background(#3d3d3d);
  lights();
  
  if (fft != null) {
    fft.analyze();
    visualizer.update(fft);
  }

  if (visualizer != null) {
    visualizer.display();
  }
}

void keyPressed() {
  if (key == ' ') {
    if (isPlaying) {
      audioFile.stop();
      isPlaying = false;
    } else {
      audioFile.play();
      isPlaying = true;
    }
  }
  
  if (key == '=' || key == '+') {
    numBars++;
    visualizer.setNumBars(numBars);
  }
  
  if (key == '-') {
    if (numBars > 1) {
      numBars--;
      visualizer.setNumBars(numBars);
    }
  }

  if (key == 's') {
    recSave("Tajrian_Rahman_Tuesdayw03", ".jpg");
  }
}

void selectMP3() {
  selectInput("Select an MP3 file:", "fileSelected");
}

void fileSelected(File selection) {
  if (selection == null) {
    println("No file was selected.");
    exit();
  } else {
    String filePath = selection.getAbsolutePath();
    audioFile = new SoundFile(this, filePath);

    fft = new FFT(this, 512);
    fft.input(audioFile);
    
    visualizer = new Visualizer(numBars);
    println("File selected: " + filePath);
  }
}