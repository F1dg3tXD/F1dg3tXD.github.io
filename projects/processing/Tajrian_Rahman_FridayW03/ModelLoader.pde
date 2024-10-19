class ModelLoader {
  PShape obj;
  color materialColor;
  ColorUtils colorUtils;
  float thickness = 1;  // Use a smaller thickness to avoid excessive overlap
  
  ModelLoader(String filePath, ColorUtils colorUtils) {
    this.colorUtils = colorUtils;
    loadModel(filePath);
    materialColor = colorUtils.randomColor();
  }

  void loadModel(String filePath) {
    obj = loadShape(filePath);
    if (obj == null) {
      println("Failed to load model.");
    }
  }

  void display() {
    if (obj != null) {
      pushMatrix();
      createThickenedMaze();  // Apply thickness by creating cubes
      popMatrix();
    }
  }

  void createThickenedMaze() {
    pushStyle();
    fill(materialColor);
    
    // Loop through all children (faces) of the model
    for (int i = 0; i < obj.getChildCount(); i++) {
      PShape child = obj.getChild(i);
      int numVertices = child.getVertexCount();
      
      if (child.getKind() == TRIANGLES) {
        // Process triangles (3 vertices per face)
        for (int j = 0; j < numVertices; j += 3) {
          PVector v1 = child.getVertex(j);
          PVector v2 = child.getVertex(j + 1);
          PVector v3 = child.getVertex(j + 2);
          
          // Draw a cuboid (box) around each face to simulate thickness
          createFaceCube(v1, v2, v3);
        }
      } else if (child.getKind() == QUADS) {
        // Process quads (4 vertices per face)
        for (int j = 0; j < numVertices; j += 4) {
          PVector v1 = child.getVertex(j);
          PVector v2 = child.getVertex(j + 1);
          PVector v3 = child.getVertex(j + 2);
          PVector v4 = child.getVertex(j + 3);
          
          // Draw two triangles for the quad
          createFaceCube(v1, v2, v3);
          createFaceCube(v1, v3, v4);
        }
      }
    }
    
    popStyle();
  }

  void createFaceCube(PVector v1, PVector v2, PVector v3) {
    // Calculate the normal vector for the face
    PVector normal = calculateNormal(v1, v2, v3); 
    PVector offset = PVector.mult(normal, thickness / 2);  // Extrude symmetrically

    // Vertices of the "back" face, extruded by thickness / 2
    PVector v1b = PVector.add(v1, offset);
    PVector v2b = PVector.add(v2, offset);
    PVector v3b = PVector.add(v3, offset);
    
    // Vertices of the "front" face, extruded by thickness / 2 in the opposite direction
    PVector v1f = PVector.sub(v1, offset);
    PVector v2f = PVector.sub(v2, offset);
    PVector v3f = PVector.sub(v3, offset);
    
    // Draw front face (extruded forward)
    beginShape();
    vertex(v1f.x, v1f.y, v1f.z);
    vertex(v2f.x, v2f.y, v2f.z);
    vertex(v3f.x, v3f.y, v3f.z);
    endShape(CLOSE);

    // Draw back face (extruded backward)
    beginShape();
    vertex(v1b.x, v1b.y, v1b.z);
    vertex(v2b.x, v2b.y, v2b.z);
    vertex(v3b.x, v3b.y, v3b.z);
    endShape(CLOSE);
    
    // Draw connecting sides between front and back faces
    beginShape(QUADS);
    
    // Connect vertices v1-v1b, v2-v2b, v3-v3b to form sides
    vertex(v1f.x, v1f.y, v1f.z);
    vertex(v1b.x, v1b.y, v1b.z);
    vertex(v2b.x, v2b.y, v2b.z);
    vertex(v2f.x, v2f.y, v2f.z);
    
    vertex(v2f.x, v2f.y, v2f.z);
    vertex(v2b.x, v2b.y, v2b.z);
    vertex(v3b.x, v3b.y, v3b.z);
    vertex(v3f.x, v3f.y, v3f.z);
    
    vertex(v3f.x, v3f.y, v3f.z);
    vertex(v3b.x, v3b.y, v3b.z);
    vertex(v1b.x, v1b.y, v1b.z);
    vertex(v1f.x, v1f.y, v1f.z);
    
    endShape(CLOSE);
  }

  // Utility function to calculate the normal vector of a face
  PVector calculateNormal(PVector v1, PVector v2, PVector v3) {
    PVector edge1 = PVector.sub(v2, v1);
    PVector edge2 = PVector.sub(v3, v1);
    PVector normal = edge1.cross(edge2);
    normal.normalize();
    return normal;
  }
}
