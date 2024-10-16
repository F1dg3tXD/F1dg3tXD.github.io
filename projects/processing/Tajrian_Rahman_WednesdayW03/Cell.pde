class Cell {
  int i, j;
  boolean[] walls = { true, true, true, true }; // Top, Right, Bottom, Left walls
  boolean visited = false;

  Cell(int i, int j) {
    this.i = i;
    this.j = j;
  }

  void show() {
    int x = i * cellSize;
    int y = j * cellSize;
    stroke(255);

    // Draw walls
    if (walls[0]) line(x, y, x + cellSize, y);        // Top
    if (walls[1]) line(x + cellSize, y, x + cellSize, y + cellSize); // Right
    if (walls[2]) line(x + cellSize, y + cellSize, x, y + cellSize); // Bottom
    if (walls[3]) line(x, y + cellSize, x, y);        // Left

    // Optionally draw the floor
    noStroke();
    fill(floor.floorColor);
    rect(x, y, cellSize, cellSize);
  }

  // Get random unvisited neighbor
  Cell checkNeighbors() {
    ArrayList<Cell> neighbors = new ArrayList<Cell>();

    Cell top = index(i, j - 1);
    Cell right = index(i + 1, j);
    Cell bottom = index(i, j + 1);
    Cell left = index(i - 1, j);

    if (top != null && !top.visited) neighbors.add(top);
    if (right != null && !right.visited) neighbors.add(right);
    if (bottom != null && !bottom.visited) neighbors.add(bottom);
    if (left != null && !left.visited) neighbors.add(left);

    if (neighbors.size() > 0) {
      int r = floor(random(0, neighbors.size()));
      return neighbors.get(r);
    } else {
      return null;
    }
  }

  Cell index(int i, int j) {
    if (i < 0 || j < 0 || i >= cols || j >= rows) {
      return null;
    }
    return grid[i][j];
  }
}

// Remove walls between two adjacent cells
void removeWalls(Cell a, Cell b) {
  int x = a.i - b.i;
  if (x == 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x == -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }

  int y = a.j - b.j;
  if (y == 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y == -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}