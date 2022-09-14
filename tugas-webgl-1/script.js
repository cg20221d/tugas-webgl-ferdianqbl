const main = () => {
  const canvas = document.querySelector("#my-canvas");
  const gl = canvas.getContext("webgl");

  if (!gl) {
    console.log("WebGL not supported, falling back on experimental-webgl");
    gl = canvas.getContext("experimental-webgl");
  }

  if (!gl) {
    alert("Your browser does not support WebGL");
  }

  gl.clearColor(1.0, 0.65, 0.0, 1);

  gl.clear(gl.COLOR_BUFFER_BIT);
};
