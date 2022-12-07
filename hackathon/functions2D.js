// create draw function
const drawShape2D = (gl, type, vertices) => {
  createBuffer2D(gl, vertices);
  gl.drawArrays(type, 0, vertices.length / 2);
}

// create buffer function
const createBuffer2D = (gl, data) => {
  let buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);

  // get attribute location
  const aPosition = gl.getAttribLocation(program2D, "aPosition");
  const aColor = gl.getAttribLocation(program2D, "aColor");

  // enable attribute
  gl.enableVertexAttribArray(aPosition);
  gl.enableVertexAttribArray(aColor);

  // pointer attribute
  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
  gl.vertexAttribPointer(aColor, 2, gl.FLOAT, false, 0, 0);
};

// create vertex shader and fragment shader function
const createShader2D = (gl, typeShader, sourceShader) => {
  let shader = gl.createShader(typeShader);
  gl.shaderSource(shader, sourceShader);
  gl.compileShader(shader);

  let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

  if (success) return shader;

  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
};

// create program function
const createProgram2D = (gl, vertexShader, fragmentShader) => {
  let program2D = gl.createProgram();

  gl.attachShader(program2D, vertexShader);
  gl.attachShader(program2D, fragmentShader);
  gl.linkProgram(program2D);

  let success = gl.getProgramParameter(program2D, gl.LINK_STATUS);

  if (success) return program2D;

  console.log(gl.getProgramInfoLog(program2D));
  gl.deleteProgram(program2D);
};