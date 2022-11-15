// create draw function
const drawShape = (gl, type, vertices) => {
  createBuffer(gl, vertices);
  gl.drawArrays(type, 0, vertices.length / 2);
}

// create buffer function
const createBuffer = (gl, data) => {
  let buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);

  // get attribute location
  const aPosition = gl.getAttribLocation(program, "aPosition");
  const aColor = gl.getAttribLocation(program, "aColor");

  // enable attribute
  gl.enableVertexAttribArray(aPosition);
  gl.enableVertexAttribArray(aColor);

  // pointer attribute
  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
  gl.vertexAttribPointer(aColor, 2, gl.FLOAT, false, 0, 0);
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