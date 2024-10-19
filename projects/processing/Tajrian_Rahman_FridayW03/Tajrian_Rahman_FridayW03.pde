import peasy.*;
ModelLoader modelLoader;
PeasyCam cam;
color bgColor;
ColorUtils colorUtils;

void setup() {
  size(800, 800, P3D);
  bgColor = color(#3d3d3d);
  cam = new PeasyCam(this, 500);
  colorUtils = new ColorUtils();
  modelLoader = new ModelLoader("your_model.obj", colorUtils);
  ambientLight(60, 60, 60);
}

void draw() {
  background(bgColor);
  ambientLight(120, 120, 120);
  directionalLight(255, 0, 0, -1, 0, 0);
  directionalLight(0, 0, 255, 1, 0, 0);
  directionalLight(0, 255, 0, 0, 0, -1);
  directionalLight(255, 255, 0, 0, 0, 1);
  modelLoader.display();
}

void keyPressed() {
  if (key == 'l' || key == 'L') {
    selectInput("Select an OBJ file to load:", "fileSelected");
  }
  if (key == 's' || key == 'S') {
    recSave("Tajrian_Rahman_FridayW03", ".jpg");
  }
}

void fileSelected(File selection) {
  if (selection != null) {
    modelLoader = new ModelLoader(selection.getAbsolutePath(), colorUtils);
  }
}
