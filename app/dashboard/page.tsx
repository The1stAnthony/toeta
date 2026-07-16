"use client";

// Dashboard — client component so we can check localStorage for today's cached meal.
// This keeps the "one meal per day" concept intact without hitting the API on every refresh.

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Meal } from "@/types/meal";
import MealCard from "@/components/MealCard/MealCard";
import DessertRoll from "@/components/DessertRoll/DessertRoll";
import AdSlot from "@/components/AdSlot/AdSlot";
import DiceLoader from "@/components/DiceLoader/DiceLoader";
import styles from "./dashboard.module.scss";

function playMealReady() {
  try {
    const ctx = new AudioContext();
    const now = ctx.currentTime;
    // Quick dice-clatter (3 noise ticks), then a bright ding
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
    // Ding: two ascending notes
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
    // AudioContext blocked by browser — silent fail is fine
  }
}

const STORAGE_KEY_MEAL = "toeta-meal";
const STORAGE_KEY_DATE = "toeta-meal-date";

function todayString() {
  return new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
}

export default function DashboardPage() {
  const [meal, setMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Prevents React Strict Mode's double-invoke in dev from firing two API calls
  const fetched = useRef(false);

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;

    const today = todayString();
    const cachedDate = localStorage.getItem(STORAGE_KEY_DATE);
    const cachedMeal = localStorage.getItem(STORAGE_KEY_MEAL);

    // If we already fetched a meal today, use it — no API call needed
    if (cachedDate === today && cachedMeal) {
      setMeal(JSON.parse(cachedMeal));
      setLoading(false);
      return;
    }

    // Otherwise fetch a fresh meal and cache it for the rest of the day
    fetch("/api/meal")
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        localStorage.setItem(STORAGE_KEY_DATE, today);
        localStorage.setItem(STORAGE_KEY_MEAL, JSON.stringify(data.meal));
        setMeal(data.meal);
        playMealReady();
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <h1 className={styles.heading}>What&apos;s for dinner?</h1>
        <p className={styles.sub}>One great meal, every day. No decision fatigue.</p>
      </section>

      {/* Horizontal ad — sits between hero and meal cards */}
      <AdSlot id="ad-top" size="banner" slotId="3990401804" />

      <section className={styles.cards}>
        {loading && <DiceLoader />}
        {error && <p className={styles.errorMsg}>Something went wrong. Try refreshing.</p>}
        {meal && <MealCard meal={meal} label="Today's Meal" />}

        {/* Vertical ad — sits alongside the dessert roll on wider screens */}
        {meal && (
          <div className={styles.sideColumn}>
            <AdSlot id="ad-side" size="rectangle" slotId="5303483471" />
            <DessertRoll />
          </div>
        )}
      </section>

      {/* Square ad — below the cards */}
      <div className={styles.adBottom}>
        <AdSlot id="ad-bottom" size="rectangle" slotId="4295960467" />
      </div>

      <div className={styles.wave}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path
            fill="var(--color-secondary)"
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,42.7C672,32,768,32,864,42.7C960,53,1056,75,1152,80C1248,85,1344,75,1392,69.3L1440,64L1440,120L0,120Z"
          />
        </svg>
      </div>

      <p className={styles.poweredBy}>
        Powered by{" "}
        <a href="https://www.themealdb.com" target="_blank" rel="noopener noreferrer">
          TheMealDB
        </a>
      </p>

      {/* Floating wheel button — bottom right */}
      <Link href="/wheel" className={styles.wheelBtn}>
        🎡 Not feeling it?
      </Link>
    </main>
  );
}
