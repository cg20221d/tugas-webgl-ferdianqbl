const canvas = document.querySelector("#my-canvas");
const gl = canvas.getContext("webgl");

if (!gl) {
  console.log("WebGL not supported, falling back on experimental-webgl");
  gl = canvas.getContext("experimental-webgl");
}

if (!gl) {
  alert("Your browser does not support WebGL");
}

// Clear the canvas
gl.clearColor(225.0, 225.0, 225.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

// create buffer function
const createBuffer = (gl, data) => {
  let buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);

  return buffer;
};

// create vertex shader and fragment shader function
const createShader = (gl, typeShader, sourceShader) => {
  let shader = gl.createShader(typeShader);
  gl.shaderSource(shader, sourceShader);
  gl.compileShader(shader);

  let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

  if (success) return shader;

  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
};

// create program function
const createProgram = (gl, vertexShader, fragmentShader) => {
  let program = gl.createProgram();

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  let success = gl.getProgramParameter(program, gl.LINK_STATUS);

  if (success) return program;

  console.log(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
};

// create buffer
createBuffer(gl, [
  0.0, 0.0,
  0.0, 0.5,
  0.7, 0.0,
  0.7, 0.5,
  0.7, 0.0,
  0.0, 0.5,

]);

// create vertex shader source
const vertexShaderSource = `
  attribute vec2 aPosition;
  void main() 
  {
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`;

// create fragment shader source
const fragmentShaderSource = `
  precision mediump float;
  void main()
  {
    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
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

// get attribute location
const aPosition = gl.getAttribLocation(program, "aPosition");

// enable attribute
gl.enableVertexAttribArray(aPosition);

// pointer attribute
gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

// draw
gl.drawArrays(gl.TRIANGLES, 0, 6);