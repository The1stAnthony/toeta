"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Meal } from "@/types/meal";
import MealCard from "@/components/MealCard/MealCard";
import DessertRoll from "@/components/DessertRoll/DessertRoll";
import AdSlot from "@/components/AdSlot/AdSlot";
import DiceLoader from "@/components/DiceLoader/DiceLoader";
import PremiumDashboard from "./PremiumDashboard";
import { playMealReady } from "@/lib/audio";
import styles from "./dashboard.module.scss";

const STORAGE_KEY_MEAL = "toeta-meal";
const STORAGE_KEY_DATE = "toeta-meal-date";

function todayString() {
  return new Date().toISOString().slice(0, 10);
}

interface Props {
  isPremium: boolean;
  premiumSuccess?: boolean;
  diet?: string;
  allergens?: string;
}

export default function DashboardClient({ isPremium, premiumSuccess, diet, allergens }: Props) {
  // Premium users get the full 3-card layout
  if (isPremium) {
    return (
      <PremiumDashboard
        diet={diet}
        allergens={allergens}
        premiumSuccess={premiumSuccess}
      />
    );
  }

  return <FreeDashboard premiumSuccess={premiumSuccess} />;
}

// ── Free tier dashboard ───────────────────────────────────────────────────────

function FreeDashboard({ premiumSuccess }: { premiumSuccess?: boolean }) {
  const [meal, setMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const fetched = useRef(false);

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;

    const today = todayString();
    const cachedDate = localStorage.getItem(STORAGE_KEY_DATE);
    const cachedMeal = localStorage.getItem(STORAGE_KEY_MEAL);

    if (cachedDate === today && cachedMeal) {
      try {
        const parsed = JSON.parse(cachedMeal);
        if (parsed) {
          setMeal(parsed);
          setLoading(false);
          return;
        }
      } catch {
        // corrupted cache — fall through to fetch
      }
    }

    fetch("/api/meal")
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        if (!data.meal) throw new Error("No meal returned");
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
      {premiumSuccess && (
        <div className={styles.premiumBanner} role="status">
          ⭐ Welcome to Toeta Premium! Your account has been upgraded.
        </div>
      )}

      <section className={styles.hero}>
        <h1 className={styles.heading}>What&apos;s for dinner?</h1>
        <p className={styles.sub}>One great meal, every day. No decision fatigue.</p>
      </section>

      <AdSlot id="ad-top" size="banner" slotId="3990401804" />

      <section className={styles.cards}>
        {loading && <DiceLoader />}
        {error && <p className={styles.errorMsg} role="alert">Something went wrong. Try refreshing.</p>}
        {meal && <MealCard meal={meal} label="Today's Meal" />}

        {meal && (
          <div className={styles.sideColumn}>
            <AdSlot id="ad-side" size="rectangle" slotId="5303483471" />
            <DessertRoll />
          </div>
        )}
      </section>

      {meal && (
        <div className={styles.rerollNudge}>
          <Link href="/premium" className={styles.rerollNudgeLink}>
            ↺ Want to re-roll? Go Premium
          </Link>
        </div>
      )}

      <div className={styles.adBottom}>
        <AdSlot id="ad-bottom" size="rectangle" slotId="4295960467" />
      </div>

      <div className={styles.wave}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
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

      <Link href="/wheel" className={styles.wheelBtn}>
        <span aria-hidden="true">🎡</span>{" "}Not feeling it?
      </Link>
    </main>
  );
}
