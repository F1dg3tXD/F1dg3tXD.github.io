import processing.data.JSONObject;
import processing.data.JSONArray;
import peasy.*;
import java.io.*;

JSONArray grid;
float cellSize = 50;
PeasyCam cam;
PShape mazeShape;
boolean mazeLoaded = false;

void setup() {
  size(800, 800, P3D);
  cam = new PeasyCam(this, 300);
}

void draw() {
  background(200);
  lights();
  
  if (mazeLoaded) {
    shape(mazeShape);
  } else {
    fill(0);
    textAlign(CENTER, CENTER);
    text("Press 'O' to open a maze JSON file", width / 2, height / 2);
  }
}

void loadMaze(String filePath) {
  JSONObject json = loadJSONObject(filePath);
  grid = json.getJSONArray("grid");
  createMazeShape();
}

void createMazeShape() {
  mazeShape = createShape();
  mazeShape.beginShape();
  mazeShape.noFill();
  mazeShape.stroke(0);

  for (int i = 0; i < grid.size(); i++) {
    JSONObject cell = grid.getJSONObject(i);
    int x = cell.getInt("x");
    int y = cell.getInt("y");
    
    float xPos = x * cellSize;
    float yPos = y * cellSize;
    float zPos = 0;
    
    if (cell.getBoolean("topWall")) {
      createWall(xPos, yPos, xPos + cellSize, yPos, zPos);
    }
    if (cell.getBoolean("bottomWall")) {
      createWall(xPos, yPos + cellSize, xPos + cellSize, yPos + cellSize, zPos);
    }
    if (cell.getBoolean("leftWall")) {
      createWall(xPos, yPos, xPos, yPos + cellSize, zPos);
    }
    if (cell.getBoolean("rightWall")) {
      createWall(xPos + cellSize, yPos, xPos + cellSize, yPos + cellSize, zPos);
    }
  }

  mazeShape.endShape();
  mazeLoaded = true;
}

void createWall(float x1, float y1, float x2, float y2, float z) {
  mazeShape.beginShape(LINES);
  mazeShape.vertex(x1, y1, z);
  mazeShape.vertex(x2, y2, z);
  mazeShape.endShape();
}

void keyPressed() {
  if (key == 'o' || key == 'O') {
    selectInput("Select a maze JSON file:", "fileSelected");
  }
  if (mazeLoaded && (key == 's' || key == 'S')) {
    saveMazeAsOBJ("maze.obj");
  }
  if (key == 'g') {
    recSave("Tajrian_Rahman_ThursdayW03", ".jpg");
  }
}

void fileSelected(File selection) {
  if (selection != null) {
    String filePath = selection.getAbsolutePath();
    loadMaze(filePath);
    println("File selected: " + filePath);
  } else {
    println("No file selected.");
  }
}

void saveMazeAsOBJ(String fileName) {
  float scaleFactor = 0.1; // Scale down because it is way too big in Blender.
  
  try {
    PrintWriter output = createWriter(fileName);
    
    output.println("# OBJ file exported from Processing");
    
    int vertexIndex = 1;
    for (int i = 0; i < grid.size(); i++) {
      JSONObject cell = grid.getJSONObject(i);
      int x = cell.getInt("x");
      int y = cell.getInt("y");
    
      float xPos = x * cellSize * scaleFactor;
      float yPos = y * cellSize * scaleFactor;
      float zPos = 0 * scaleFactor;
      
      // Top wall vertices
      if (cell.getBoolean("topWall")) {
        output.println("v " + xPos + " " + zPos + " " + yPos);
        output.println("v " + (xPos + cellSize * scaleFactor) + " " + zPos + " " + yPos);
        output.println("v " + xPos + " " + (zPos + cellSize * scaleFactor) + " " + yPos);
        output.println("v " + (xPos + cellSize * scaleFactor) + " " + (zPos + cellSize * scaleFactor) + " " + yPos);
      }
      
      // Bottom wall vertices
      if (cell.getBoolean("bottomWall")) {
        output.println("v " + xPos + " " + zPos + " " + (yPos + cellSize * scaleFactor));
        output.println("v " + (xPos + cellSize * scaleFactor) + " " + zPos + " " + (yPos + cellSize * scaleFactor));
        output.println("v " + xPos + " " + (zPos + cellSize * scaleFactor) + " " + (yPos + cellSize * scaleFactor));
        output.println("v " + (xPos + cellSize * scaleFactor) + " " + (zPos + cellSize * scaleFactor) + " " + (yPos + cellSize * scaleFactor));
      }
      
      // Left wall vertices
      if (cell.getBoolean("leftWall")) {
        output.println("v " + xPos + " " + zPos + " " + yPos);
        output.println("v " + xPos + " " + zPos + " " + (yPos + cellSize * scaleFactor));
        output.println("v " + xPos + " " + (zPos + cellSize * scaleFactor) + " " + yPos);
        output.println("v " + xPos + " " + (zPos + cellSize * scaleFactor) + " " + (yPos + cellSize * scaleFactor));
      }
      
      // Right wall vertices
      if (cell.getBoolean("rightWall")) {
        output.println("v " + (xPos + cellSize * scaleFactor) + " " + zPos + " " + yPos);
        output.println("v " + (xPos + cellSize * scaleFactor) + " " + zPos + " " + (yPos + cellSize * scaleFactor));
        output.println("v " + (xPos + cellSize * scaleFactor) + " " + (zPos + cellSize * scaleFactor) + " " + yPos);
        output.println("v " + (xPos + cellSize * scaleFactor) + " " + (zPos + cellSize * scaleFactor) + " " + (yPos + cellSize * scaleFactor));
      }
    }
    
    vertexIndex = 1;
    for (int i = 0; i < grid.size(); i++) {
      JSONObject cell = grid.getJSONObject(i);
      
      // Top wall face
      if (cell.getBoolean("topWall")) {
        output.println("f " + vertexIndex + " " + (vertexIndex + 1) + " " + (vertexIndex + 3) + " " + (vertexIndex + 2));
        vertexIndex += 4;
      }
      
      // Bottom wall face
      if (cell.getBoolean("bottomWall")) {
        output.println("f " + vertexIndex + " " + (vertexIndex + 1) + " " + (vertexIndex + 3) + " " + (vertexIndex + 2));
        vertexIndex += 4;
      }
      
      // Left wall face
      if (cell.getBoolean("leftWall")) {
        output.println("f " + vertexIndex + " " + (vertexIndex + 1) + " " + (vertexIndex + 3) + " " + (vertexIndex + 2));
        vertexIndex += 4;
      }
      
      // Right wall face
      if (cell.getBoolean("rightWall")) {
        output.println("f " + vertexIndex + " " + (vertexIndex + 1) + " " + (vertexIndex + 3) + " " + (vertexIndex + 2));
        vertexIndex += 4;
      }
    }
    
    output.flush();
    output.close();
    
    println("OBJ file saved: " + fileName);
  } catch (Exception e) {
    println("Error saving OBJ file: " + e.getMessage());
  }
}
