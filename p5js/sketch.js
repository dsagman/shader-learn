function setup() {
    createCanvas(500, 500);
    clearScreen();
  }

function draw() {
    clearScreen();
    let vertices = [ [0, 0, 0], [0, 100, 0], [100, 100, 0], [100, 0, 0], [0, 0, 100], [0, 100, 100], [100, 100, 100], [100, 0, 100] ];
    let edges = [ [0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7] ];
    let thetas = [frameCount * 0.01, frameCount * 0.01, frameCount * 0.01];
    drawEdges(vertices, edges, thetas, 500);
    drawSphere(10, 10, 0.5, 100, thetas, 500);
    drawLine(0, 0, 100, 100, color= [255, 0, 0]);
    drawCircle(0, 0, 1);
    }
    
  function clearScreen() {
    background(200);
  }
  
  function translateAxis(x, y, center = 250) {
    return [center + x, center - y];
  }
  
  function drawCircle(x0, y0, r, col = [255, 255, 255]) {
    let [cx, cy] = translateAxis(x0, y0);
    stroke(col);
    noFill();
    ellipse(cx, cy, r * 2);
  }
  
  function drawLine(x0, y0, x1, y1, col = [255, 255, 255]) {
    let [x0t, y0t] = translateAxis(x0, y0);
    let [x1t, y1t] = translateAxis(x1, y1);
    stroke(col);
    line(x0t, y0t, x1t, y1t);
  }
  
  function rotateLine(x0, y0, x1, y1, theta = 0, col = [255, 255, 255]) {
    let [x0t, y0t] = translateAxis(x0, y0);
    let [x1t, y1t] = translateAxis(x1, y1);
    let R = [
      [cos(theta), -sin(theta)],
      [sin(theta), cos(theta)]
    ];
    stroke(col);
    for (let t = 0; t <= 1; t += 0.001) {
      let x = x0t + (x1t - x0t) * t;
      let y = y0t + (y1t - y0t) * t;
      let x_rot = R[0][0] * (x - x0t) + R[0][1] * (y - y0t) + x0t;
      let y_rot = R[1][0] * (x - x0t) + R[1][1] * (y - y0t) + y0t;
      point(x_rot, y_rot);
    }
  }
  
  function drawRectangle(x0, y0, x1, y1, col = [255, 255, 255]) {
    drawLine(x0, y0, x1, y0, col);
    drawLine(x1, y0, x1, y1, col);
    drawLine(x1, y1, x0, y1, col);
    drawLine(x0, y1, x0, y0, col);
  }
  
  function projectRotate(x, y, z, thetas = [0, 0, 0], f = 1.5) {
    let [theta_x, theta_y, theta_z] = thetas;
    let R_x = [
      [1, 0, 0],
      [0, cos(theta_x), -sin(theta_x)],
      [0, sin(theta_x), cos(theta_x)]
    ];
    let R_y = [
      [cos(theta_y), 0, sin(theta_y)],
      [0, 1, 0],
      [-sin(theta_y), 0, cos(theta_y)]
    ];
    let R_z = [
      [cos(theta_z), -sin(theta_z), 0],
      [sin(theta_z), cos(theta_z), 0],
      [0, 0, 1]
    ];
    let R = matMult(R_z, matMult(R_y, R_x));
    [x, y, z] = matMult(R, [x, y, z]);
    let P = [
      [f, 0, 0],
      [0, f, 0],
      [0, 0, 1]
    ];
    [x, y, z] = matMult(P, [x, y, z]);
    return [x, y];
  }
  
  function drawSphere(x0, y0, z0, r, thetas = [0, 0, 0], f = 1.5, col = [255, 255, 255]) {
    stroke(col);
    noFill();
    for (let i = 0; i < TWO_PI; i += 0.1) {
      for (let j = 0; j < PI; j += 0.1) {
        let x = cos(i) * sin(j) * r + x0;
        let y = sin(i) * sin(j) * r + y0;
        let z = cos(j) * r + z0;
        [x, y] = projectRotate(x, y, z, thetas, f);
        let [cx, cy] = translateAxis(x, y);
        point(cx, cy);
      }
    }
  }
  
  function drawEdges(vertices, edges, thetas = [0, 0, 0], f = 1.5, col = [255, 255, 255]) {
    for (let edge of edges) {
      let [x0, y0, z0] = vertices[edge[0]];
      let [x1, y1, z1] = vertices[edge[1]];
      [x0, y0] = projectRotate(x0, y0, z0, thetas, f);
      [x1, y1] = projectRotate(x1, y1, z1, thetas, f);
      drawLine(x0, y0, x1, y1, col);
    }
  }
  
  function matMult(a, b) {
    let result = [];
    for (let i = 0; i < a.length; i++) {
      result[i] = 0;
      for (let j = 0; j < b.length; j++) {
        result[i] += a[i][j] * b[j];
      }
    }
    return result;
  }
  