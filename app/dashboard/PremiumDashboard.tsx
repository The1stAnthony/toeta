"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Meal } from "@/types/meal";
import MealCard from "@/components/MealCard/MealCard";
import DessertRoll from "@/components/DessertRoll/DessertRoll";
import DiceLoader from "@/components/DiceLoader/DiceLoader";
import { playMealReady } from "@/lib/audio";
import styles from "./dashboard.module.scss";

type MealType = "breakfast" | "lunch" | "dinner";

const MEAL_LABELS: Record<MealType, string> = {
  breakfast: "Meal 1",
  lunch: "Meal 2",
  dinner: "Meal 3",
};

function todayKey(type: MealType) {
  return `toeta-meal-${type}-${new Date().toISOString().slice(0, 10)}`;
}

function rerollKey(type: MealType) {
  return `toeta-rerolled-${type}-${new Date().toISOString().slice(0, 10)}`;
}

// Shared history across all meal types — prevents the same recipe appearing on
// two different cards and avoids repeats for 30 days.
const HISTORY_KEY = "toeta-meal-history";
const HISTORY_TTL = 30 * 24 * 60 * 60 * 1000; // 30 days in ms

interface HistoryEntry { id: string; ts: number; }

function getSeenIds(): string[] {
  try {
    const raw = JSON.parse(localStorage.getItem(HISTORY_KEY) ?? "[]") as HistoryEntry[];
    const cutoff = Date.now() - HISTORY_TTL;
    return raw.filter((e) => e.ts > cutoff).map((e) => e.id);
  } catch { return []; }
}

function recordSeenId(id: string) {
  try {
    const raw = JSON.parse(localStorage.getItem(HISTORY_KEY) ?? "[]") as HistoryEntry[];
    const cutoff = Date.now() - HISTORY_TTL;
    const pruned = raw.filter((e) => e.ts > cutoff && e.id !== id);
    pruned.push({ id, ts: Date.now() });
    localStorage.setItem(HISTORY_KEY, JSON.stringify(pruned));
  } catch {}
}

// ── Per-card meal hook ────────────────────────────────────────────────────────

function usePremiumMeal(type: MealType, diet?: string, allergens?: string) {
  const [meal, setMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [rerolled, setRerolled] = useState(false);
  const initialized = useRef(false);

  async function fetchMeal(isReroll = false) {
    if (!isReroll) setLoading(true);
    setError(false);

    const params = new URLSearchParams({ type });
    if (diet) params.set("diet", diet);
    if (allergens) params.set("intolerances", allergens);
    const seenIds = getSeenIds();
    if (seenIds.length) params.set("exclude", seenIds.join(","));

    try {
      const res = await fetch(`/api/meal?${params}`);
      if (!res.ok) throw new Error();
      const data = (await res.json()) as { meal: Meal };
      localStorage.setItem(todayKey(type), JSON.stringify(data.meal));
      recordSeenId(data.meal.id);
      setMeal(data.meal);
      if (!isReroll) playMealReady();
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    if (localStorage.getItem(rerollKey(type))) setRerolled(true);

    const cached = localStorage.getItem(todayKey(type));
    if (cached) {
      try {
        const cachedMeal = JSON.parse(cached) as Meal;
        recordSeenId(cachedMeal.id); // ensure re-roll excludes today's cached meal
        setMeal(cachedMeal);
      } catch {
        // corrupted cache — refetch
      }
      setLoading(false);
      return;
    }

    fetchMeal();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function handleReroll() {
    localStorage.removeItem(todayKey(type));
    localStorage.setItem(rerollKey(type), "1");
    setRerolled(true);
    await fetchMeal(true);
  }

  return { meal, loading, error, rerolled, handleReroll };
}

// ── Meal slot ─────────────────────────────────────────────────────────────────

interface SlotState {
  meal: Meal | null;
  loading: boolean;
  error: boolean;
  rerolled: boolean;
  handleReroll: () => Promise<void>;
}

function MealSlot({ type, state }: { type: MealType; state: SlotState }) {
  const { meal, loading, error, rerolled, handleReroll } = state;

  return (
    <div className={`${styles.cardWrap} ${styles[`cardWrap_${type}`]}`}>
      {loading && (
        <div className={styles.cardLoading}>
          <DiceLoader />
        </div>
      )}
      {error && !loading && (
        <div className={styles.cardError}>
          <p>Couldn&apos;t load {type}.</p>
          <button onClick={() => handleReroll()} className={styles.retryBtn}>
            Retry
          </button>
        </div>
      )}
      {meal && !loading && (
        <MealCard
          meal={meal}
          label={MEAL_LABELS[type]}
          onReroll={handleReroll}
          rerolled={rerolled}
        />
      )}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

interface Props {
  diet?: string;
  allergens?: string;
  premiumSuccess?: boolean;
}

export default function PremiumDashboard({ diet, allergens, premiumSuccess }: Props) {
  const breakfast = usePremiumMeal("breakfast", diet || undefined, allergens || undefined);
  const lunch = usePremiumMeal("lunch", diet || undefined, allergens || undefined);
  const dinner = usePremiumMeal("dinner", diet || undefined, allergens || undefined);

  const [greeting, setGreeting] = useState("Good evening");
  useEffect(() => {
    const h = new Date().getHours();
    setGreeting(h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening");
  }, []);

  return (
    <main className={styles.main}>
      {premiumSuccess && (
        <div className={styles.premiumBanner} role="status">
          ⭐ Welcome to Toeta Premium! Your account has been upgraded.
        </div>
      )}

      <div className={styles.premiumGreeting}>
        <div>
          <h1 className={styles.heading}>{greeting}</h1>
          <p className={styles.sub}>Your personalized meals for today</p>
        </div>
        <span className={styles.premiumBadge}>⭐ Premium</span>
      </div>

      <section className={styles.fanGrid}>
        <MealSlot type="breakfast" state={breakfast} />
        <MealSlot type="lunch" state={lunch} />
        <MealSlot type="dinner" state={dinner} />
      </section>

      <div className={styles.dessertDivider}>
        <span>Optional</span>
      </div>

      <div className={styles.dessertSection}>
        <DessertRoll diet={diet || undefined} allergens={allergens || undefined} />
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
        <a href="https://spoonacular.com" target="_blank" rel="noopener noreferrer">
          Spoonacular
        </a>
      </p>

      <Link href="/wheel" className={styles.wheelBtn}>
        🎡 Not feeling it?
      </Link>
    </main>
  );
}
