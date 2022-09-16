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
  void main() 
  {
    gl_PointSize = 5.0;
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`;

// create fragment shader source
const fragmentShaderSource = `
  precision mediump float;
  void main()
  {
    gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
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
drawShape(gl, gl.TRIANGLES, LVertices);
drawShape(gl, gl.TRIANGLES, AVertices);