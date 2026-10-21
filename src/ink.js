// InkField — a small procedural ink cloud for the craft chapter.
// Warm soot, cool mist, and a slow, breathing turbulence.

const VERT = `
attribute vec2 a_pos;
varying vec2 vUv;
void main() {
  vUv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;
varying vec2 vUv;

uniform vec2  uRes;
uniform float uTime;
uniform float uStep;
uniform vec2  uMouse;
uniform float uProgress;
uniform float uPulse;
uniform vec2  uPulsePos;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = rot * p * 2.02 + 17.3;
    a *= 0.5;
  }
  return v;
}

void main() {
  float aspect = uRes.x / max(uRes.y, 1.0);
  vec2 p = vUv - 0.5;
  p.x *= aspect;

  float t = uTime * 0.017;

  // a soft disturbance around the cursor
  vec2 mp = uMouse - 0.5;
  mp.x *= aspect;
  vec2 away = p - mp;
  float md = length(away);
  p += normalize(away + vec2(0.0001)) * 0.032 * exp(-md * 3.0);

  // domain-warped ink
  vec2 q = vec2(
    fbm(p * 1.85 + vec2(t * 1.25, -t * 0.62) + vec2(0.0, uStep * 0.085)),
    fbm(p * 1.85 + vec2(4.6 - t * 0.48, 2.1 + t * 0.8))
  );
  vec2 r = vec2(
    fbm(p * 2.15 + 2.2 * q + vec2(1.7, 9.2) + t * 0.38),
    fbm(p * 2.15 + 2.2 * q + vec2(8.3, 2.8) - t * 0.33)
  );
  float f = fbm(p * 2.0 + r * 2.25 + uStep * 0.12);
  float veins = fbm(p * 4.2 + r * 1.35 - t * 0.2);

  vec3 deep  = vec3(0.062, 0.043, 0.033);
  vec3 umber = vec3(0.190, 0.113, 0.073);
  vec3 clay  = vec3(0.445, 0.263, 0.160);
  vec3 pale  = vec3(0.760, 0.660, 0.515);
  vec3 cool  = vec3(0.275, 0.345, 0.310);

  vec3 col = mix(deep, umber, smoothstep(0.06, 0.62, f));
  col = mix(col, clay, smoothstep(0.48, 0.86, f) * 0.78);
  col = mix(col, pale, smoothstep(0.77, 0.98, f) * 0.38);
  col = mix(col, cool, smoothstep(0.42, 0.9, veins) * 0.22);

  // warmth carried up from the lower left
  float breath = exp(-length(p - vec2(-0.7, 0.45)) * 1.35);
  col += vec3(0.14, 0.072, 0.042) * breath * 0.28;

  // cursor halo
  col += pale * exp(-md * 4.2) * 0.05;

  // a little warmth shifts with each movement
  float warmth = 0.5 + 0.5 * sin(uStep * 0.9);
  col += vec3(0.045, 0.025, 0.014) * warmth * (0.5 - f);

  // a mark left by a touch
  vec2 pp = uPulsePos - 0.5;
  pp.x *= aspect;
  float pd = length(p - pp);
  float bloom = exp(-pd * pd * 22.0) * uPulse * 0.52;
  float ring = (1.0 - smoothstep(0.0, 0.03, abs(pd - (1.0 - uPulse) * 0.44))) * uPulse * 0.16;
  col += vec3(0.74, 0.53, 0.33) * bloom + vec3(0.84, 0.75, 0.61) * ring;

  // film grain
  float g = hash(vUv * uRes + floor(uTime * 15.0));
  col += (g - 0.5) * 0.032;

  // gentle vignette
  float vig = 1.0 - smoothstep(0.28, 1.25, length(p) * 1.1);
  col *= mix(0.62, 1.0, vig);
  col *= mix(0.92, 1.04, uProgress * 0.25);

  gl_FragColor = vec4(col, 1.0);
}
`;

export class InkField {
  constructor(canvas) {
    this.canvas = canvas;
    this.reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.gl = null;
    this.running = false;
    this.visible = false;
    this.time = 2.5;
    this.last = performance.now();
    this.step = 0;
    this.targetStep = 0;
    this.progress = 0;
    this.targetProgress = 0;
    this.mouse = { x: 0.5, y: 0.5 };
    this.targetMouse = { x: 0.5, y: 0.5 };
    this.pulse = 0;
    this.pulsePos = { x: 0.5, y: 0.5 };
    this.dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    try {
      this.gl = canvas.getContext('webgl', {
        alpha: false,
        antialias: false,
        depth: false,
        stencil: false,
        powerPreference: 'high-performance'
      });
    } catch (error) {
      this.gl = null;
    }

    if (!this.gl) {
      canvas.closest('.ink-circle')?.classList.add('is-fallback');
      return;
    }

    this._compile();
    if (!this.program) {
      canvas.closest('.ink-circle')?.classList.add('is-fallback');
      return;
    }

    this._setup();
    this.resize();

    this._onMove = (event) => {
      const rect = this.canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      this.targetMouse.x = (event.clientX - rect.left) / rect.width;
      this.targetMouse.y = 1.0 - (event.clientY - rect.top) / rect.height;
    };
    this._onDown = (event) => {
      const rect = this.canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      this.pulseAt(
        (event.clientX - rect.left) / rect.width,
        1.0 - (event.clientY - rect.top) / rect.height,
        0.95
      );
    };
    this._onLeave = () => {
      this.targetMouse.x = 0.5;
      this.targetMouse.y = 0.5;
    };

    this.canvas.addEventListener('pointermove', this._onMove, { passive: true });
    this.canvas.addEventListener('pointerdown', this._onDown, { passive: true });
    this.canvas.addEventListener('pointerleave', this._onLeave, { passive: true });

    this._resizeObserver = new ResizeObserver(() => this.resize());
    this._resizeObserver.observe(this.canvas);
    if (this.reduced) this.renderOnce();
  }

  _compileShader(type, source) {
    const shader = this.gl.createShader(type);
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);
    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      console.warn('Ink shader error:', this.gl.getShaderInfoLog(shader));
      this.gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  _compile() {
    const gl = this.gl;
    const vert = this._compileShader(gl.VERTEX_SHADER, VERT);
    const frag = this._compileShader(gl.FRAGMENT_SHADER, FRAG);
    if (!vert || !frag) return;

    const program = gl.createProgram();
    gl.attachShader(program, vert);
    gl.attachShader(program, frag);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn('Ink program error:', gl.getProgramInfoLog(program));
      return;
    }
    this.program = program;
  }

  _setup() {
    const gl = this.gl;
    gl.useProgram(this.program);

    this.buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );
    const position = gl.getAttribLocation(this.program, 'a_pos');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    this.u = {
      res: gl.getUniformLocation(this.program, 'uRes'),
      time: gl.getUniformLocation(this.program, 'uTime'),
      step: gl.getUniformLocation(this.program, 'uStep'),
      mouse: gl.getUniformLocation(this.program, 'uMouse'),
      progress: gl.getUniformLocation(this.program, 'uProgress'),
      pulse: gl.getUniformLocation(this.program, 'uPulse'),
      pulsePos: gl.getUniformLocation(this.program, 'uPulsePos')
    };

    gl.clearColor(0.05, 0.033, 0.025, 1);
    gl.disable(gl.DEPTH_TEST);
  }

  resize() {
    if (!this.gl || !this.program) return;
    const rect = this.canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    this.dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const width = Math.round(rect.width * this.dpr);
    const height = Math.round(rect.height * this.dpr);
    if (this.canvas.width === width && this.canvas.height === height) return;
    this.canvas.width = width;
    this.canvas.height = height;
    this.gl.viewport(0, 0, width, height);
    if (this.reduced && !this.running) this.renderOnce();
  }

  pulseAt(x, y, strength = 0.9) {
    this.pulsePos.x = x;
    this.pulsePos.y = y;
    this.pulse = Math.min(1.25, Math.max(this.pulse, strength));
    if (this.reduced) this.renderOnce();
  }

  setStep(value) {
    this.targetStep = Math.max(0, Math.min(4, value));
  }

  setProgress(value) {
    this.targetProgress = Math.max(0, Math.min(1, value));
  }

  start() {
    if (!this.gl || !this.program) return;
    this.visible = true;
    if (this.reduced) {
      this.renderOnce();
      return;
    }
    if (this.running) return;
    this.running = true;
    this.last = performance.now();
    this._loop = (now) => {
      if (!this.running) return;
      this._render(now);
      this._raf = requestAnimationFrame(this._loop);
    };
    this._raf = requestAnimationFrame(this._loop);
  }

  stop() {
    this.visible = false;
    this.running = false;
    if (this._raf) cancelAnimationFrame(this._raf);
    this._raf = null;
  }

  renderOnce() {
    if (!this.gl || !this.program) return;
    this.resize();
    if (!this.canvas.width || !this.canvas.height) return;
    this._render(performance.now(), true);
  }

  _render(now, once = false) {
    if (!this.gl || !this.program) return;
    if (!this.canvas.width || !this.canvas.height) return;
    const gl = this.gl;
    const dt = once ? 0.016 : Math.min(0.05, (now - this.last) / 1000);
    this.last = now;
    if (!once && !this.reduced) this.time += dt;

    const ease = 1 - Math.pow(0.001, dt);
    this.step += (this.targetStep - this.step) * ease;
    this.progress += (this.targetProgress - this.progress) * ease;
    this.mouse.x += (this.targetMouse.x - this.mouse.x) * Math.min(1, dt * 4.5);
    this.mouse.y += (this.targetMouse.y - this.mouse.y) * Math.min(1, dt * 4.5);
    if (!once) this.pulse *= Math.pow(0.88, dt * 60);
    if (this.pulse < 0.001) this.pulse = 0;

    gl.useProgram(this.program);
    gl.uniform2f(this.u.res, this.canvas.width, this.canvas.height);
    gl.uniform1f(this.u.time, this.time);
    gl.uniform1f(this.u.step, this.step);
    gl.uniform2f(this.u.mouse, this.mouse.x, this.mouse.y);
    gl.uniform1f(this.u.progress, this.progress);
    gl.uniform1f(this.u.pulse, this.pulse);
    gl.uniform2f(this.u.pulsePos, this.pulsePos.x, this.pulsePos.y);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  destroy() {
    this.stop();
    this._resizeObserver?.disconnect();
    this.canvas.removeEventListener('pointermove', this._onMove);
    this.canvas.removeEventListener('pointerdown', this._onDown);
    this.canvas.removeEventListener('pointerleave', this._onLeave);
    this.gl = null;
  }
}
