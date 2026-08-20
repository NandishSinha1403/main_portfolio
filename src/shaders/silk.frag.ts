// Fullscreen fragment shader: two-level domain-warped fbm, folded through sine
// into continuous ribbons. Palette: ground #0F0D2B, accents #9890FA / #EDECFF.
export const silkFragmentShader = /* glsl */ `
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

// ---- fbm ----
// Four octaves, not six: silk is a smooth material. Extra octaves only add
// high-frequency grit that survives the fold and reads as marble veining.
float fbm(vec2 p) {
  float sum = 0.0;
  float amp = 0.5;
  mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 4; i++) {
    sum += amp * noise(p);
    p = rot * p * 2.02;
    amp *= 0.5;
  }
  return sum;
}

// ---- two-level domain warp ----
// Warp amounts stay gentle (1.6 / 1.2). Large amounts fold the field back over
// itself repeatedly, which is what produces turbulent marbling.
float domainWarp(vec2 p, float t) {
  vec2 q = vec2(
    fbm(p + vec2(0.0, 0.0) + t * 0.06),
    fbm(p + vec2(5.2, 1.3) - t * 0.05)
  );

  vec2 r = vec2(
    fbm(p + 1.6 * q + vec2(1.7, 9.2) + t * 0.07),
    fbm(p + 1.6 * q + vec2(8.3, 2.8) - t * 0.05)
  );

  return fbm(p + 1.2 * r);
}

void main() {
  vec2 uv = v_uv;
  vec2 p = uv * 2.1;
  p.x *= u_resolution.x / u_resolution.y;

  float t = u_time * 0.15;

  float field = domainWarp(p, t);

  // The ribbon fold. A dominant directional gradient is what makes these read
  // as ribbons rather than clouds: bands run along a fixed axis, and the warped
  // field only displaces them sideways. Without this term the sine folds a
  // radially-symmetric field and you get marbling.
  float axis = dot(p, normalize(vec2(1.0, 0.45))) * 7.0;
  // A strong warp contribution is what keeps the bands from reading as regular
  // stripes — it varies their width and waviness across the surface.
  float phase = axis + field * 4.6 + t * 0.9;

  float ribbons = 0.5 + 0.5 * sin(phase);
  // Asymmetric falloff: narrower lit bands over a broader dark ground, rather
  // than a 50/50 duty cycle, which is what made it look like zebra striping.
  ribbons = smoothstep(0.18, 0.98, ribbons);

  // Low-frequency amplitude modulation so some ribbons fall away into the
  // ground instead of every band being equally bright.
  float fade = 0.45 + 0.55 * fbm(p * 0.6 + t * 0.05);
  ribbons *= fade;

  // Sheen: a narrow secondary highlight riding the same phase, offset a quarter
  // turn so it sits on the shoulder of each ribbon rather than its centre.
  float sheen = 0.5 + 0.5 * sin(phase + 1.5707);
  sheen = pow(sheen, 7.0 - u_intensity * 2.0) * fade;

  vec3 ground = vec3(0.0588, 0.0510, 0.1686); // #0F0D2B
  vec3 accentA = vec3(0.5961, 0.5647, 0.9804); // #9890FA
  vec3 accentB = vec3(0.9294, 0.9255, 1.0000); // #EDECFF

  vec3 color = ground;
  color = mix(color, accentA, ribbons * (0.34 + u_intensity * 0.26));
  color = mix(color, accentB, sheen * (0.22 + u_intensity * 0.26));

  // subtle vignette to keep edges grounded
  float vig = smoothstep(1.3, 0.25, length(uv - 0.5));
  color = mix(ground, color, vig);

  gl_FragColor = vec4(color, 1.0);
}
`;

export const silkVertexShader = /* glsl */ `
attribute vec2 a_position;
varying vec2 v_uv;

void main() {
  v_uv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;
