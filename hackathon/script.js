let canvas = document.querySelector("#my-canvas");
let gl = canvas.getContext("webgl");

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
let vertexShaderSource = `
  attribute vec3 aPosition;
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
let fragmentShaderSource = `
  precision mediump float;
  varying vec3 vColor;
  uniform vec3 uAmbientConstant;      // merepresentasikan warna sumber cahaya
  uniform float uAmbientIntensity;    // merepresentasikan intensitas cahaya sekitar
  void main() {
      vec3 ambient = uAmbientConstant * uAmbientIntensity;
      vec3 phong = ambient;
      gl_FragColor = vec4(phong * vColor, 1.0);
    }
`;

// create vertex shader and fragment shader
let vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
let fragmentShader = createShader(
  gl,
  gl.FRAGMENT_SHADER,
  fragmentShaderSource
);

// create program
let program = createProgram(gl, vertexShader, fragmentShader);

gl.useProgram(program);

// ========= GET LOCATION ========
let uModel = gl.getUniformLocation(program, "uModel");
let uView = gl.getUniformLocation(program, "uView");
let uProjection = gl.getUniformLocation(program, "uProjection");
let uAmbientConstant = gl.getUniformLocation(program, "uAmbientConstant");
let uAmbientIntensity = gl.getUniformLocation(program, "uAmbientIntensity");

// Untuk pencahayaan dan pembayangan
gl.uniform3fv(uAmbientConstant, [1.0, 1.0, 1.0]);   // warna sumber cahaya: putih
gl.uniform1f(uAmbientIntensity, 0.320);

// ========= DRAW ========

var verticesKubus = [
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

var indicesKubus = [
  0, 1, 2, 0, 2, 3,     // Face A
  4, 5, 6, 4, 6, 7,     // Face B
  8, 9, 10, 8, 10, 11,   // Face C
  12, 13, 14, 12, 14, 15,  // Face D
  16, 17, 18, 16, 18, 19,  // Face E
  20, 21, 22, 20, 22, 23   // Face F     
];

drawShape(gl, gl.TRIANGLES, verticesKubus, indicesKubus); // Draw the cube

var theta = 0.0;
var freeze = false;
var horizontalSpeed = 0.0;
var verticalSpeed = 0.0;
var horizontalDelta = 0.0;
var verticalDelta = 0.0;
var zPos = 0.0;
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

function onKeydown(event) {
  if (event.keyCode == 32) freeze = !freeze;  // spasi
  // Gerakan horizontal: a ke kiri, d ke kanan
  if (event.keyCode == 74) {  // j
    horizontalSpeed = -0.01;
  } else if (event.keyCode == 76) {   // l
    horizontalSpeed = 0.01;
  }

  // Gerakan maju: i ke depan, k ke belakang
  if (event.keyCode == 73) {  // i
    zPos += 0.1;
  } else if (event.keyCode == 75) {   // k
    zPos -= 0.1;
  }

}
function onKeyup(event) {
  if (event.keyCode == 32) freeze = !freeze;
  if (event.keyCode == 74 || event.keyCode == 76) horizontalSpeed = 0.0;
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
    model, model, [horizontalDelta, verticalDelta, zPos]
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
  gl.drawElements(gl.TRIANGLES, indicesKubus.length, gl.UNSIGNED_SHORT, 0);
  requestAnimationFrame(render);
}
requestAnimationFrame(render);