// Fullscreen fragment shader: two-level domain-warped fbm taken through a
// steep smoothstep, plus a narrow eighth-power specular band and a cubed dark
// term. Pure greyscale — ground #0F0F0F, accents #F5F5F5 / #0A0A0A.
export const liquidMetalFragmentShader = /* glsl */ `
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_intensity; // smoothed pointer intensity, 0..1

varying vec2 v_uv;

// ---- hashed value noise ----
float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

// ---- six-octave fbm ----
float fbm(vec2 p) {
  float sum = 0.0;
  float amp = 0.5;
  mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 6; i++) {
    sum += amp * noise(p);
    p = rot * p * 2.02;
    amp *= 0.5;
  }
  return sum;
}

// ---- two-level domain warp ----
float domainWarp(vec2 p, float t) {
  vec2 q = vec2(
    fbm(p + vec2(0.0, 0.0) + t * 0.05),
    fbm(p + vec2(5.2, 1.3) - t * 0.04)
  );

  vec2 r = vec2(
    fbm(p + 4.0 * q + vec2(1.7, 9.2) + t * 0.08),
    fbm(p + 4.0 * q + vec2(8.3, 2.8) - t * 0.06)
  );

  return fbm(p + 4.0 * r);
}

void main() {
  vec2 uv = v_uv;
  vec2 p = uv * 3.0;
  p.x *= u_resolution.x / u_resolution.y;

  float t = u_time * 0.15;

  float field = domainWarp(p, t);

  // steep value ramp: pushes the warped field toward hard black/white regions
  float ramp = smoothstep(0.42 - u_intensity * 0.04, 0.58 + u_intensity * 0.04, field);

  // narrow specular: eighth power isolates only the brightest crest of the field
  float specular = pow(clamp(field, 0.0, 1.0), 8.0);
  specular *= (0.8 + u_intensity * 0.6);

  // dark term: cubed inverse field deepens the low end into true black
  float dark = pow(1.0 - clamp(field, 0.0, 1.0), 3.0);

  vec3 ground = vec3(0.0588); // #0F0F0F
  vec3 bright = vec3(0.9608); // #F5F5F5
  vec3 deepDark = vec3(0.0392); // #0A0A0A

  vec3 color = mix(deepDark, bright, ramp);
  color = mix(color, deepDark, dark * 0.6);
  color = mix(color, bright, specular);

  // subtle vignette to keep edges grounded
  float vig = smoothstep(1.1, 0.2, length(uv - 0.5));
  color = mix(ground, color, vig);

  gl_FragColor = vec4(color, 1.0);
}
`;

export const liquidMetalVertexShader = /* glsl */ `
attribute vec2 a_position;
varying vec2 v_uv;

void main() {
  v_uv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;
