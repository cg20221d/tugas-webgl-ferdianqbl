const canvas = document.querySelector("#my-canvas");
const gl = canvas.getContext("webgl");

if (!gl) {
  console.log("WebGL not supported, falling back on experimental-webgl");
  gl = canvas.getContext("experimental-webgl");
}

if (!gl) {
  alert("Your browser does not support WebGL");
}

// resize canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

// Clear the canvas
gl.clearColor(225.0, 225.0, 225.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

// create vertex shader source
const vertexShaderSource = `
  attribute vec3 aPosition;   // Sebelumnya vec2, makanya tidak tergambar kubus :D
  attribute vec3 aColor;
  uniform mat4 uModel;
  uniform mat4 uView;
  uniform mat4 uProjection;
  varying vec3 vColor;
  void main() {
      gl_Position = uProjection * uView * uModel * vec4(aPosition, 1.0);
      vColor = aColor;
  }
`;

// create fragment shader source
const fragmentShaderSource = `
  precision mediump float;

  varying vec3 vColor;
  void main()
  {
    gl_FragColor = vec4(vColor, 1.0);
  }
`;

// create vertex shader and fragment shader
const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
const fragmentShader = createShader(
  gl,
  gl.FRAGMENT_SHADER,
  fragmentShaderSource
);

// create program
const program = createProgram(gl, vertexShader, fragmentShader);

gl.useProgram(program);

// ========= GET LOCATION ========
const uModel = gl.getUniformLocation(program, "uModel");
const uView = gl.getUniformLocation(program, "uView");
const uProjection = gl.getUniformLocation(program, "uProjection");

// ========= DRAW ========

let LVertices = [
  0.1, 0.0, 0.0,
  0.15, 0.0, 0.0,
  0.1, 0.5, 0.0,
  0.1, 0.5, 0.0,
  0.15, 0.5, 0.0,
  0.15, 0.0, 0.0,
  0.1, 0.0, 0.0,
  0.1, 0.1, 0.0,
  0.3, 0.0, 0.0,
  0.1, 0.1, 0.0,
  0.3, 0.0, 0.0,
  0.3, 0.1, 0.0,
];

// let AVertices = [
//   0.05, 0.0, // kanan
//   -0.05, 0.25 + 0.15, // kanan
//   -0.05, 0.35 + 0.15, // kanan
//   -0.05, 0.35 + 0.15, // kanan
//   0.1, 0.0, // kanan
//   0.05, 0.0, // kanan
//   -0.15, 0.0, // kiri
//   -0.05, 0.35 + 0.15, // kiri
//   -0.05, 0.25 + 0.15, // kiri
//   -0.05, 0.35 + 0.15, // kiri
//   -0.15, 0.0, // kiri
//   -0.2, 0.0, // kiri
//   -0.14, 0.1,
//   -0.14, 0.14,
//   0.04, 0.1,
//   -0.14, 0.14,
//   0.04, 0.14,
//   0.04, 0.1,

// ]

// // draw
// // 2

// let twoVertices = [
//   -0.5, 0.5, -0.7, 0.5,
//   -0.5, 0.3, -0.5, 0.5,
//   -0.5, 0.3, -0.677, 0.3,
//   -0.677, 0.06, -0.677, 0.3,
//   -0.5, 0.06, -0.677, 0.06,
//   // 2 kecil
//   -0.53, 0.45, -0.7, 0.45,
//   -0.53, 0.35, -0.53, 0.45,
//   -0.53, 0.35, -0.7, 0.35,
//   -0.7, 0.0, -0.7, 0.35,
//   -0.5, 0.0, -0.7, 0.0,
//   // penghubung
//   -0.7, 0.45, -0.7, 0.5,
//   -0.5, 0.0, -0.5, 0.06,
// ]

// let nolVertices = [
//   -0.25, 0.1, -0.25, 0.4,
//   -0.25 + -0.15, 0.1, -0.25 + -0.15, 0.4,
//   -0.25 + -0.15, 0.4, -0.325, 0.1 + 0.4, // tengah atas
//   -0.25, 0.4, -0.325, 0.1 + 0.4, // tengah atas
//   -0.25 + -0.15, 0.1, -0.325, 0.0, // tengah bawah
//   -0.25, 0.1, -0.325, 0.0, // tengah bawah
//   -0.29, 0.15, -0.29, 0.35,
//   -0.29 + -0.07, 0.15, -0.29 + -0.07, 0.35,
//   -0.29 + -0.07, 0.15, -0.29, 0.15,
//   -0.29, 0.35, -0.29 + -0.07, 0.35
// ]

// drawShape(gl, gl.LINES, nolVertices);

// drawShape(gl, gl.LINES, twoVertices);
// // A
// drawShape(gl, gl.TRIANGLES, AVertices);
// // L
// drawShape(gl, gl.TRIANGLES, LVertices);

var vertices = [
  // Face A       // Red
  -0.3, -0.3, -0.3, 1, 0, 0,    // Index:  0    
  0.3, -0.3, -0.3, 1, 0, 0,    // Index:  1
  0.3, 0.3, -0.3, 1, 0, 0,    // Index:  2
  -0.3, 0.3, -0.3, 1, 0, 0,    // Index:  3
  // Face B       // Yellow
  -0.3, -0.3, 0.3, 1, 1, 0,    // Index:  4
  0.3, -0.3, 0.3, 1, 1, 0,    // Index:  5
  0.3, 0.3, 0.3, 1, 1, 0,    // Index:  6
  -0.3, 0.3, 0.3, 1, 1, 0,    // Index:  7
  // Face C       // Green
  -0.3, -0.3, -0.3, 0, 1, 0,    // Index:  8
  -0.3, 0.3, -0.3, 0, 1, 0,    // Index:  9
  -0.3, 0.3, 0.3, 0, 1, 0,    // Index: 10
  -0.3, -0.3, 0.3, 0, 1, 0,    // Index: 11
  // Face D       // Blue
  0.3, -0.3, -0.3, 0, 0, 1,    // Index: 12
  0.3, 0.3, -0.3, 0, 0, 1,    // Index: 13
  0.3, 0.3, 0.3, 0, 0, 1,    // Index: 14
  0.3, -0.3, 0.3, 0, 0, 1,    // Index: 15
  // Face E       // Orange
  -0.3, -0.3, -0.3, 1, 0.5, 0,  // Index: 16
  -0.3, -0.3, 0.3, 1, 0.5, 0,  // Index: 17
  0.3, -0.3, 0.3, 1, 0.5, 0,  // Index: 18
  0.3, -0.3, -0.3, 1, 0.5, 0,  // Index: 19
  // Face F       // White
  -0.3, 0.3, -0.3, 1, 1, 1,    // Index: 20
  -0.3, 0.3, 0.3, 1, 1, 1,    // Index: 21
  0.3, 0.3, 0.3, 1, 1, 1,    // Index: 22
  0.3, 0.3, -0.3, 1, 1, 1     // Index: 23
];

var indices = [
  0, 1, 2, 0, 2, 3,     // Face A
  4, 5, 6, 4, 6, 7,     // Face B
  8, 9, 10, 8, 10, 11,   // Face C
  12, 13, 14, 12, 14, 15,  // Face D
  16, 17, 18, 16, 18, 19,  // Face E
  20, 21, 22, 20, 22, 23   // Face F     
];


drawShape(gl, gl.TRIANGLES, LVertices, 0); // Draw the cube
drawShape(gl, gl.TRIANGLES, vertices, indices); // Draw the cube

// Variabel lokal
var theta = 0.0;
var freeze = false;
var horizontalSpeed = 0.0;
var verticalSpeed = 0.0;
var horizontalDelta = 0.0;
var verticalDelta = 0.0;
var cameraX = 0.0;
var cameraZ = 5.0;
var view = glMatrix.mat4.create();
var perspective = glMatrix.mat4.create();

glMatrix.mat4.lookAt(
  view,
  [cameraX, 0.0, cameraZ],    // the location of the eye or the camera
  [cameraX, 0.0, -10],        // the point where the camera look at
  [0.0, 1.0, 0.0]
);

glMatrix.mat4.perspective(perspective, Math.PI / 3, 1.0, 0.5, 10.0);

// Event handler
function onMouseClick() {
  freeze = !freeze;
}
document.addEventListener("click", onMouseClick);
// Papan ketuk
function onKeydown(event) {
  if (event.keyCode == 32) freeze = !freeze;  // spasi
  // Gerakan horizontal: a ke kiri, d ke kanan
  if (event.keyCode == 65) {  // a
    horizontalSpeed = -0.01;
  } else if (event.keyCode == 68) {   // d
    horizontalSpeed = 0.01;
  }
  // Gerakan vertikal: w ke atas, s ke bawah
  if (event.keyCode == 87) {  // w
    verticalSpeed = -0.01;
  } else if (event.keyCode == 83) {   // s
    verticalSpeed = 0.01;
  }
}
function onKeyup(event) {
  if (event.keyCode == 32) freeze = !freeze;
  if (event.keyCode == 65 || event.keyCode == 68) horizontalSpeed = 0.0;
  if (event.keyCode == 87 || event.keyCode == 83) verticalSpeed = 0.0;
}
document.addEventListener("keydown", onKeydown);
document.addEventListener("keyup", onKeyup);

function render() {
  gl.enable(gl.DEPTH_TEST);
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  //            Merah Hijau Biru Transparansi
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  if (!freeze) {
    theta += 0.1;
  }
  horizontalDelta += horizontalSpeed;
  verticalDelta -= verticalSpeed;
  var model = glMatrix.mat4.create(); // Membuat matriks identitas
  glMatrix.mat4.translate(
    model, model, [horizontalDelta, verticalDelta, 0.0]
  );
  glMatrix.mat4.rotateX(
    model, model, theta
  );
  glMatrix.mat4.rotateY(
    model, model, theta
  );
  glMatrix.mat4.rotateZ(
    model, model, theta
  );
  gl.uniformMatrix4fv(uModel, false, model); // translate dan rotate
  gl.uniformMatrix4fv(uView, false, view);
  gl.uniformMatrix4fv(uProjection, false, perspective);
  gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
  requestAnimationFrame(render);
}
requestAnimationFrame(render);