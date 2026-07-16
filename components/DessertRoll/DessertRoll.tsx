"use client";

import { useState } from "react";
import type { Meal } from "@/types/meal";
import MealCard from "@/components/MealCard/MealCard";
import DiceLoader from "@/components/DiceLoader/DiceLoader";
import styles from "./DessertRoll.module.scss";

function playDessertReady() {
  try {
    const ctx = new AudioContext();
    const now = ctx.currentTime;
    for (let i = 0; i < 3; i++) {
      const t = now + i * 0.07;
      const bufSize = Math.floor(ctx.sampleRate * 0.018);
      const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let j = 0; j < bufSize; j++) data[j] = (Math.random() * 2 - 1) * (1 - j / bufSize);
      const src = ctx.createBufferSource();
      src.buffer = buf;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.2, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.018);
      src.connect(g);
      g.connect(ctx.destination);
      src.start(t);
    }
    [[880, 0.22], [1318.5, 0.37]].forEach(([freq, delay]) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      const t = now + delay;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.25, t + 0.01);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
      osc.connect(g);
      g.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.45);
    });
  } catch {
    // silently ignore if AudioContext is blocked
  }
}

export default function DessertRoll() {
  const [dessert, setDessert] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(false);
  const [rolled, setRolled] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function roll() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/meal?dessert=true");
      if (!res.ok) throw new Error("Failed to roll dessert");
      const data = await res.json();
      setDessert(data.dessert);
      setRolled(true);
      playDessertReady();
    } catch {
      setError("Something went wrong. Try again!");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className={styles.wrapper}>
        <DiceLoader />
      </div>
    );
  }

  if (rolled && dessert) {
    return (
      <div className={styles.wrapper}>
        <MealCard meal={dessert} label="Tonight's Dessert" />
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.prompt}>
        <p>Feeling something sweet tonight?</p>
        <button className={styles.rollBtn} onClick={roll}>
          Roll for Dessert 🎲
        </button>
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>
  );
}
