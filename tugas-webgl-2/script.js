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
  attribute vec2 aPosition;
  attribute vec3 aColor;
  uniform mat4 uModel;
  varying vec3 vColor;
  void main() 
  {
    vColor = aColor;
    gl_PointSize = 5.0;
    gl_Position = uModel * vec4(aPosition, 0.0, 1.0);
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

let theta2 = 0.0;
let theta0 = 0.0;
let thetaA = 0.0;
let thetaL = 0.0;
let horizontalSpeed = 0.020;
let horizontalDelta = 0.0;
let scaleDelta = 0.0;
let scaleSpeed = 0.01;
let scaler = 1.05;

let uModel = gl.getUniformLocation(program, "uModel");

// ========= DRAW ========

let LVertices = [
  0.1, 0.0,
  0.15, 0.0,
  0.1, 0.5,
  0.1, 0.5,
  0.15, 0.5,
  0.15, 0.0,
  0.1, 0.0,
  0.1, 0.1,
  0.3, 0.0,
  0.1, 0.1,
  0.3, 0.0,
  0.3, 0.1,
];

let AVertices = [
  0.05, 0.0, // kanan
  -0.05, 0.25 + 0.15, // kanan
  -0.05, 0.35 + 0.15, // kanan
  -0.05, 0.35 + 0.15, // kanan
  0.1, 0.0, // kanan
  0.05, 0.0, // kanan
  -0.15, 0.0, // kiri
  -0.05, 0.35 + 0.15, // kiri
  -0.05, 0.25 + 0.15, // kiri
  -0.05, 0.35 + 0.15, // kiri
  -0.15, 0.0, // kiri
  -0.2, 0.0, // kiri
  -0.14, 0.1,
  -0.14, 0.14,
  0.04, 0.1,
  -0.14, 0.14,
  0.04, 0.14,
  0.04, 0.1,

]

let twoVertices = [
  -0.5, 0.5, -0.7, 0.5,
  -0.5, 0.3, -0.5, 0.5,
  -0.5, 0.3, -0.677, 0.3,
  -0.677, 0.06, -0.677, 0.3,
  -0.5, 0.06, -0.677, 0.06,
  // 2 kecil
  -0.53, 0.45, -0.7, 0.45,
  -0.53, 0.35, -0.53, 0.45,
  -0.53, 0.35, -0.7, 0.35,
  -0.7, 0.0, -0.7, 0.35,
  -0.5, 0.0, -0.7, 0.0,
  // penghubung
  -0.7, 0.45, -0.7, 0.5,
  -0.5, 0.0, -0.5, 0.06,
]

let nolVertices = [
  -0.25, 0.1, -0.25, 0.4,
  -0.25 + -0.15, 0.1, -0.25 + -0.15, 0.4,
  -0.25 + -0.15, 0.4, -0.325, 0.1 + 0.4, // tengah atas
  -0.25, 0.4, -0.325, 0.1 + 0.4, // tengah atas
  -0.25 + -0.15, 0.1, -0.325, 0.0, // tengah bawah
  -0.25, 0.1, -0.325, 0.0, // tengah bawah
  -0.29, 0.15, -0.29, 0.35,
  -0.29 + -0.07, 0.15, -0.29 + -0.07, 0.35,
  -0.29 + -0.07, 0.15, -0.29, 0.15,
  -0.29, 0.35, -0.29 + -0.07, 0.35
]


function onKeydown(event) {
  // Gerakan horizontal: a ke kiri, d ke kanan
  if (event.keyCode == 65) {  // a
    thetaA -= 0.1;
  }
  if (event.keyCode == 68) {   // d
    thetaA += 0.1;
  }
  // Gerakan vertikal: w ke atas, s ke bawah
  if (event.keyCode == 87) {  // w
    thetaL += 0.1;
  }
  if (event.keyCode == 83) {   // s
    thetaL -= 0.1;
  }
}

document.addEventListener("keydown", onKeydown);

function render2() {
  gl.enable(gl.DEPTH_TEST);
  gl.clearColor(1.0, 0.65, 0.0, 1.0);

  if (horizontalDelta >= (1.5) || horizontalDelta <= (-0.5)) {
    horizontalSpeed = horizontalSpeed * -1;
  }
  horizontalDelta += horizontalSpeed;
  var model = glMatrix.mat4.create(); // Membuat matriks identitas
  glMatrix.mat4.translate(model, model, [horizontalDelta, 0.0, 0.0]);


  gl.uniformMatrix4fv(uModel, false, model);

  drawShape(gl, gl.LINES, twoVertices);
  requestAnimationFrame(render2);
}
requestAnimationFrame(render2);

function render0() {
  gl.enable(gl.DEPTH_TEST);
  gl.clearColor(1.0, 0.65, 0.0, 1.0);

  var model = glMatrix.mat4.create(); // Membuat matriks identitas
  if (scaleDelta >= 1 || scaleDelta <= -0.5) {
    scaleSpeed = scaleSpeed * -1;
  }
  scaleDelta += scaleSpeed;
  // glMatrix.mat4.translate(model, model, [scaleDelta, scaleDelta, scaleDelta]);

  glMatrix.mat4.scale(model, model, [scaleDelta, scaleDelta, scaleDelta]);

  gl.uniformMatrix4fv(uModel, false, model);

  drawShape(gl, gl.LINES, nolVertices);
  requestAnimationFrame(render0);
}
requestAnimationFrame(render0);

function renderA() {
  gl.enable(gl.DEPTH_TEST);
  gl.clearColor(1.0, 0.65, 0.0, 1.0);

  var model = glMatrix.mat4.create(); // Membuat matriks identitas

  glMatrix.mat4.rotateY(
    model, model, thetaA
  );

  gl.uniformMatrix4fv(uModel, false, model);

  drawShape(gl, gl.TRIANGLES, AVertices);
  requestAnimationFrame(renderA);
}
requestAnimationFrame(renderA);

function renderL() {
  gl.enable(gl.DEPTH_TEST);
  gl.clearColor(1.0, 0.65, 0.0, 1.0);

  var model = glMatrix.mat4.create(); // Membuat matriks identitas

  glMatrix.mat4.rotateX(
    model, model, thetaL
  );

  gl.uniformMatrix4fv(uModel, false, model);

  drawShape(gl, gl.TRIANGLES, LVertices);
  requestAnimationFrame(renderL);
}
requestAnimationFrame(renderL);