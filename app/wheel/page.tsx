"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import styles from "./wheel.module.scss";

const CATEGORIES = [
  "Leftovers",
  "Balkan",
  "Turkish",
  "Mexican",
  "Roadkill/Survival",
  "Colombian",
  "Spanish",
  "Japanese",
  "Cajun",
  "Caribbean",
  "Chinese",
  "Italian",
  "BBQ",
  "New York/Chicago",
  "Californian",
  "African",
  "Vietnamese/Thai",
  "Southern/Soul",
  "Indian",
  "Korean",
  "European",
  "Mediterranean",
  "Ethiopian",
  "French",
  "Mix It Up",
];

const COLORS = [
  "#FF6B35", "#FF8C42", "#FFA500", "#FFD166", "#C9E265",
  "#70C1B3", "#50B2C0", "#247BA0", "#4361EE", "#7B2D8B",
  "#E040FB", "#F06292", "#EF5350", "#FF7043", "#FFA726",
  "#FFCA28", "#9CCC65", "#26A69A", "#42A5F5", "#5C6BC0",
  "#AB47BC", "#EC407A", "#26C6DA", "#66BB6A", "#A2D9FF",
];

const SLICE = (2 * Math.PI) / CATEGORIES.length;
const TWO_PI = 2 * Math.PI;
const SIZE = 500;
const MIX_INDEX = CATEGORIES.indexOf("Mix It Up");

// ── Audio ────────────────────────────────────────────────────────────────────

function getAudioCtx(ref: React.MutableRefObject<AudioContext | null>): AudioContext {
  if (!ref.current) ref.current = new AudioContext();
  return ref.current;
}

function playTick(audioCtx: AudioContext) {
  const now = audioCtx.currentTime;
  const bufSize = Math.floor(audioCtx.sampleRate * 0.022);
  const buf = audioCtx.createBuffer(1, bufSize, audioCtx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < bufSize; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / bufSize);
  const src = audioCtx.createBufferSource();
  src.buffer = buf;
  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(0.25, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.022);
  src.connect(gain);
  gain.connect(audioCtx.destination);
  src.start(now);
}

function playWinner(audioCtx: AudioContext) {
  const now = audioCtx.currentTime;
  [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.value = freq;
    const t = now + i * 0.13;
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.28, t + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(t);
    osc.stop(t + 0.5);
  });
}

// ── Wheel helpers ─────────────────────────────────────────────────────────────

function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 4);
}

// Pick a random category index that is not "Mix It Up" and not `exclude`
function randomNonMix(exclude = -1): number {
  let idx: number;
  do { idx = Math.floor(Math.random() * CATEGORIES.length); }
  while (idx === MIX_INDEX || idx === exclude);
  return idx;
}

// Compute a final angle that lands the pointer on the middle of `targetIdx`,
// guaranteeing at least `minRotations` full turns past `fromAngle`.
function angleForIndex(targetIdx: number, fromAngle: number, minRotations: number): number {
  const targetNorm = targetIdx * SLICE + SLICE / 2;
  const minFinal = fromAngle + minRotations * TWO_PI;
  const base = -targetNorm;
  const k = Math.ceil((minFinal - base) / TWO_PI);
  return base + k * TWO_PI;
}

// ─────────────────────────────────────────────────────────────────────────────

export default function WheelPage() {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const spinRef     = useRef(0);
  const animRef     = useRef(0);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const lastSegRef  = useRef(-1);

  const [spinning, setSpinning] = useState(false);
  const [result,   setResult]   = useState<string | null>(null);

  const draw = useCallback((angle: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const cx = SIZE / 2, cy = SIZE / 2, r = cx - 12;
    ctx.clearRect(0, 0, SIZE, SIZE);

    ctx.save();
    ctx.shadowColor = "rgba(0,0,0,0.2)";
    ctx.shadowBlur = 16;
    ctx.beginPath();
    ctx.arc(cx, cy, r + 4, 0, TWO_PI);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.restore();

    for (let i = 0; i < CATEGORIES.length; i++) {
      const start = angle - Math.PI / 2 + i * SLICE;
      const end = start + SLICE;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, start, end);
      ctx.fillStyle = COLORS[i % COLORS.length];
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.6)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(start + SLICE / 2);
      ctx.textAlign = "right";
      ctx.fillStyle = "#fff";
      ctx.font = "bold 11px system-ui, sans-serif";
      ctx.shadowColor = "rgba(0,0,0,0.4)";
      ctx.shadowBlur = 3;
      ctx.fillText(CATEGORIES[i], r - 10, 4, r * 0.65);
      ctx.restore();
    }

    ctx.beginPath();
    ctx.arc(cx, cy, 18, 0, TWO_PI);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.strokeStyle = "#ddd";
    ctx.lineWidth = 2;
    ctx.stroke();
  }, []);

  useEffect(() => { draw(0); }, [draw]);

  // Animate from `from` to `to` over `duration` ms, ticking on segment crosses.
  // Calls onDone(finalAngle, winnerIndex) when complete.
  const runSpin = useCallback((
    from: number,
    to: number,
    duration: number,
    audioCtx: AudioContext,
    onDone: (finalAngle: number, winnerIdx: number) => void,
  ) => {
    let startTime: number | null = null;
    lastSegRef.current = -1;

    function step(ts: number) {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const current = from + (to - from) * easeOut(progress);
      spinRef.current = current;
      draw(current);

      const norm = ((-current) % TWO_PI + TWO_PI) % TWO_PI;
      const seg = Math.floor(norm / SLICE) % CATEGORIES.length;
      if (seg !== lastSegRef.current) {
        lastSegRef.current = seg;
        playTick(audioCtx);
      }

      if (progress < 1) {
        animRef.current = requestAnimationFrame(step);
      } else {
        const finalNorm = ((-to) % TWO_PI + TWO_PI) % TWO_PI;
        const winner = Math.floor(finalNorm / SLICE) % CATEGORIES.length;
        onDone(to, winner);
      }
    }

    animRef.current = requestAnimationFrame(step);
  }, [draw]);

  function spin() {
    if (spinning) return;
    setSpinning(true);
    setResult(null);

    const audioCtx = getAudioCtx(audioCtxRef);
    if (audioCtx.state === "suspended") audioCtx.resume();

    const from = spinRef.current;
    const to = from + (Math.floor(Math.random() * 5) + 6) * TWO_PI + Math.random() * TWO_PI;

    runSpin(from, to, 4500, audioCtx, (angle1, winner1) => {
      if (winner1 !== MIX_INDEX) {
        // Normal result
        setResult(CATEGORIES[winner1]);
        setSpinning(false);
        playWinner(audioCtx);
        return;
      }

      // "Mix It Up" — spin twice more to build a fusion result
      setResult("🎲 Mix It Up!");

      const idx1 = randomNonMix();
      const to2 = angleForIndex(idx1, angle1, 4);

      setTimeout(() => {
        setResult(null);
        runSpin(angle1, to2, 3200, audioCtx, (angle2) => {
          const idx2 = randomNonMix(idx1);
          const to3 = angleForIndex(idx2, angle2, 3);

          setTimeout(() => {
            runSpin(angle2, to3, 2500, audioCtx, () => {
              setResult(`${CATEGORIES[idx1]} & ${CATEGORIES[idx2]} Mix`);
              setSpinning(false);
              playWinner(audioCtx);
            });
          }, 400);
        });
      }, 900);
    });
  }

  return (
    <main className={styles.main}>
      <section className={styles.header}>
        <h1 className={styles.heading}>Spin the Wheel</h1>
        <p className={styles.sub}>Can&apos;t decide what to eat? Let fate handle it.</p>
      </section>

      <div className={styles.wheelWrapper}>
        <div className={styles.pointer} />
        <canvas
          ref={canvasRef}
          width={SIZE}
          height={SIZE}
          className={styles.canvas}
        />
      </div>

      {result && (
        <div className={styles.result}>
          {result === "🎲 Mix It Up!" ? (
            <span className={styles.resultCuisine}>{result}</span>
          ) : (
            <>
              <span className={styles.resultLabel}>Tonight you&apos;re having</span>
              <span className={styles.resultCuisine}>{result}</span>
            </>
          )}
        </div>
      )}

      <button className={styles.spinBtn} onClick={spin} disabled={spinning}>
        {spinning ? "Spinning..." : "🎡 Spin!"}
      </button>

      <div className={styles.backLinks}>
        <Link href="/dashboard" className={styles.backLink}>← Today&apos;s meal</Link>
        <Link href="/" className={styles.backLink}>← Home</Link>
      </div>
    </main>
  );
}
