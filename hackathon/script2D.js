let canvas2D = document.querySelector("#canvas-2d");
let gl2D = canvas2D.getContext("webgl");

if (!gl) {
  console.log("WebGL not supported, falling back on experimental-webgl");
  gl2D = canvas2D.getContext("experimental-webgl");
}

if (!gl2D) {
  alert("Your browser does not support WebGL");
}

// resize canvas
canvas2D.width = window.innerWidth;
canvas2D.height = window.innerHeight;
gl2D.viewport(0, 0, gl.canvas.width, gl.canvas.height);

// Clear the canvas
gl2D.clearColor(225.0, 225.0, 225.0, 1.0);
gl2D.clear(gl.COLOR_BUFFER_BIT);

// create vertex shader source
const vertexShaderSource2D = `
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
const fragmentShaderSource2D = `
  precision mediump float;

  varying vec3 vColor;
  void main()
  {
    gl_FragColor = vec4(vColor, 1.0);
  }
`;

// create vertex shader and fragment shader
const vertexShader2D = createShader2D(gl2D, gl2D.VERTEX_SHADER, vertexShaderSource2D);
const fragmentShader2D = createShader2D(
  gl2D,
  gl2D.FRAGMENT_SHADER,
  fragmentShaderSource2D
);

// create program
const program2D = createProgram2D(gl2D, vertexShader2D, fragmentShader2D);

gl2D.useProgram(program2D);

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

drawShape2D(gl2D, gl2D.TRIANGLES, LVertices);