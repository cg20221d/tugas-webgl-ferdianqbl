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

  varying vec3 vColor;
  void main() 
  {
    vColor = aColor;
    gl_PointSize = 5.0;
    gl_Position = vec4(aPosition, 0.0, 1.0);
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

// draw
// 2

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
  -0.7, 0.0, -0.7, 0.35, -0.5, 0.0, -0.7, 0.0
]

let nolVertices = [
  -0.25, 0.1, -0.25, 0.4,
  -0.25 + -0.15, 0.1, -0.25 + -0.15, 0.4,
  -0.25 + -0.15, 0.4, -0.325, 0.1 + 0.4, // tengah atas
  -0.25, 0.4, -0.325, 0.1 + 0.4, // tengah atas
  -0.25 + -0.15, 0.1, -0.325, 0.0, // tengah bawah
  -0.25, 0.1, -0.325, 0.0, // tengah bawah
]

drawShape(gl, gl.LINES, nolVertices);

drawShape(gl, gl.LINES, twoVertices);
// A
drawShape(gl, gl.TRIANGLES, AVertices);
// L
drawShape(gl, gl.TRIANGLES, LVertices);