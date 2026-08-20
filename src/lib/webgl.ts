// Minimal raw-WebGL helpers for a single fullscreen fragment shader.

export type GLContext = WebGL2RenderingContext | WebGLRenderingContext;

export function createGLContext(canvas: HTMLCanvasElement): GLContext | null {
  const opts: WebGLContextAttributes = {
    antialias: true,
    alpha: false,
    premultipliedAlpha: false,
    powerPreference: "low-power",
  };
  const gl2 = canvas.getContext("webgl2", opts) as WebGL2RenderingContext | null;
  if (gl2) return gl2;
  const gl1 =
    (canvas.getContext("webgl", opts) as WebGLRenderingContext | null) ||
    (canvas.getContext("experimental-webgl", opts) as WebGLRenderingContext | null);
  return gl1;
}

export function compileShader(gl: GLContext, type: number, source: string): WebGLShader {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("Failed to create shader");
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(`Shader compile error: ${info}`);
  }
  return shader;
}

export function createProgram(
  gl: GLContext,
  vertexSource: string,
  fragmentSource: string
): WebGLProgram {
  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexSource);
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
  const program = gl.createProgram();
  if (!program) throw new Error("Failed to create program");
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const info = gl.getProgramInfoLog(program);
    gl.deleteProgram(program);
    throw new Error(`Program link error: ${info}`);
  }
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);
  return program;
}

/** Sets up a fullscreen triangle-pair (two triangles covering clip space). */
export function createFullscreenQuad(gl: GLContext, program: WebGLProgram): void {
  const positionLocation = gl.getAttribLocation(program, "a_position");
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
}
