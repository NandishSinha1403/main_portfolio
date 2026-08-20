import { useEffect, useRef, useState } from "react";
import {
  liquidMetalFragmentShader,
  liquidMetalVertexShader,
} from "../shaders/liquidMetal.frag";
import { createFullscreenQuad, createGLContext, createProgram } from "../lib/webgl";

const MAX_DPR = 2;

// Scoped to the opening section only — absolute within its (relative)
// parent, not fixed to the viewport. Runs at full strength: no blur, no
// scrim. See DESIGN.md "Background: Liquid Metal (opening section only)".
export default function LiquidMetalBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [webglFailed, setWebglFailed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = createGLContext(canvas);
    if (!gl) {
      setWebglFailed(true);
      return;
    }

    let program: WebGLProgram;
    try {
      program = createProgram(gl, liquidMetalVertexShader, liquidMetalFragmentShader);
    } catch (err) {
      console.error("Liquid Metal shader compile/link failed:", err);
      setWebglFailed(true);
      return;
    }

    gl.useProgram(program);
    createFullscreenQuad(gl, program);

    const resolutionLoc = gl.getUniformLocation(program, "u_resolution");
    const timeLoc = gl.getUniformLocation(program, "u_time");
    const intensityLoc = gl.getUniformLocation(program, "u_intensity");

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let rafId = 0;
    let destroyed = false;
    const startTime = performance.now();

    // pointer intensity: rises on movement, eases back down when idle/away
    let targetIntensity = 0;
    let currentIntensity = 0;
    let idleTimer: ReturnType<typeof setTimeout> | null = null;

    function resize() {
      if (!canvas || !gl) return;
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      const rect = canvas.getBoundingClientRect();
      const width = Math.floor(rect.width * dpr);
      const height = Math.floor(rect.height * dpr);
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        gl.viewport(0, 0, width, height);
      }
    }

    function onPointerMove() {
      targetIntensity = 1;
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        targetIntensity = 0;
      }, 150);
    }

    function onPointerLeave() {
      targetIntensity = 0;
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave, { passive: true });
    window.addEventListener("blur", onPointerLeave);

    function renderFrame(nowMs: number) {
      if (!gl) return;
      const elapsed = (nowMs - startTime) / 1000;
      currentIntensity += (targetIntensity - currentIntensity) * 0.06;

      gl.uniform2f(resolutionLoc, canvas!.width, canvas!.height);
      gl.uniform1f(timeLoc, elapsed);
      gl.uniform1f(intensityLoc, currentIntensity);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    }

    function loop(nowMs: number) {
      if (destroyed) return;
      renderFrame(nowMs);
      rafId = requestAnimationFrame(loop);
    }

    if (prefersReducedMotion) {
      // Render a single static frame, no animation loop.
      renderFrame(performance.now());
    } else {
      rafId = requestAnimationFrame(loop);
    }

    return () => {
      destroyed = true;
      if (rafId) cancelAnimationFrame(rafId);
      if (idleTimer) clearTimeout(idleTimer);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("blur", onPointerLeave);
      // NOTE: deliberately not calling WEBGL_lose_context here. getContext()
      // hands back the same context object for a given canvas, so losing it in
      // cleanup leaves StrictMode's second mount with a permanently dead
      // context and nothing ever renders. The context is reclaimed on its own
      // once the canvas is detached.
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0">
      {webglFailed && (
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "var(--color-metal)" }}
          aria-hidden="true"
        />
      )}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
      />
    </div>
  );
}
