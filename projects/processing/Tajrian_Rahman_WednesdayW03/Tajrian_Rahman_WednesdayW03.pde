import peasy.*;
import java.util.Stack;
import java.util.Random;
import processing.data.JSONObject;
import processing.data.JSONArray;

// Tajrian Rahman

int cols, rows;
int cellSize = 50;
Cell[][] grid;
PeasyCam cam;
Stack<Cell> stack = new Stack<Cell>();
Random rand = new Random();

MazeFloor floor;
MazeWall wall;
MazeCeiling ceiling;

PVector playerPosition;
float playerSpeed = 5;
float yaw = 0;

void setup() {
  size(1280, 720, P3D);
  setupMaze();
}

void setupMaze() {
  cols = floor(width / cellSize);
  rows = floor(height / cellSize);

  cam = new PeasyCam(this, 300);
  cam.setMinimumDistance(50);
  cam.setMaximumDistance(1000);
  playerPosition = new PVector(0, 0, 0);
  floor = new MazeFloor("#3d3d3d");
  wall = new MazeWall("#ff0000");
  ceiling = new MazeCeiling("#0000ff");
  grid = new Cell[cols][rows];
  for (int i = 0; i < cols; i++) {
    for (int j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i, j);
    }
  }
  stack.clear();
  Cell current = grid[0][0];
  stack.push(current);
}

void draw() {
  background(200);
  handleMovement();
  cam.lookAt(playerPosition.x, playerPosition.y, playerPosition.z, 0);
  translate(-width / 2, -height / 2, 0);
  if (!stack.isEmpty()) {
    Cell current = stack.peek();
    current.visited = true;
    Cell next = current.checkNeighbors();
    if (next != null) {
      next.visited = true;
      stack.push(next);
      removeWalls(current, next);
    } else {
      stack.pop();
    }
  }
  for (int i = 0; i < cols; i++) {
    for (int j = 0; j < rows; j++) {
      grid[i][j].show();
    }
  }
}

void handleMovement() {
  PVector direction = new PVector();
  if (keyPressed) {
    if (key == 'w' || key == 'W') {
      direction.add(PVector.fromAngle(radians(yaw)));
    }
    if (key == 's' || key == 'S') {
      direction.add(PVector.fromAngle(radians(yaw + 180)));
    }
    if (key == 'a' || key == 'A') {
      direction.add(PVector.fromAngle(radians(yaw - 90)));
    }
    if (key == 'd' || key == 'D') {
      direction.add(PVector.fromAngle(radians(yaw + 90)));
    }
  }
  playerPosition.add(direction.mult(playerSpeed));
}

void regenerateMaze() {
  cellSize = rand.nextInt(46) + 5;
  setupMaze();
}

void keyPressed() {
  if (key == 'r' || key == 'R') {
    regenerateMaze();
  }
  if (key == 's' || key == 'S') {
    saveMaze();
  }
  if (key == 'l' || key == 'L') {
    loadMaze();
  }
  if (key == 'g') {
    recSave("Tajrian_Rahman_WednesdayW03", ".jpg");
  }
}

void saveMaze() {
  JSONObject json = new JSONObject();
  JSONArray gridData = new JSONArray();

  for (int i = 0; i < cols; i++) {
    for (int j = 0; j < rows; j++) {
      JSONObject cellData = new JSONObject();
      cellData.setInt("x", i);
      cellData.setInt("y", j);
      cellData.setBoolean("topWall", grid[i][j].walls[0]);
      cellData.setBoolean("rightWall", grid[i][j].walls[1]);
      cellData.setBoolean("bottomWall", grid[i][j].walls[2]);
      cellData.setBoolean("leftWall", grid[i][j].walls[3]);
      gridData.append(cellData);
    }
  }

  json.setJSONArray("grid", gridData);
  json.setInt("cols", cols);
  json.setInt("rows", rows);
  json.setInt("cellSize", cellSize);

  saveJSONObject(json, "maze.json");
  println("Maze saved to maze.json");
}

void loadMaze() {
  JSONObject json = loadJSONObject("maze.json");
  if (json != null) {
    cols = json.getInt("cols");
    rows = json.getInt("rows");
    cellSize = json.getInt("cellSize");
    JSONArray gridData = json.getJSONArray("grid");

    grid = new Cell[cols][rows];

    for (int i = 0; i < gridData.size(); i++) {
      JSONObject cellData = gridData.getJSONObject(i);
      int x = cellData.getInt("x");
      int y = cellData.getInt("y");

      grid[x][y] = new Cell(x, y);
      grid[x][y].walls[0] = cellData.getBoolean("topWall");
      grid[x][y].walls[1] = cellData.getBoolean("rightWall");
      grid[x][y].walls[2] = cellData.getBoolean("bottomWall");
      grid[x][y].walls[3] = cellData.getBoolean("leftWall");
    }

    println("Maze loaded from maze.json");
  } else {
    println("Error loading maze.json");
  }
}
