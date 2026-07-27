"use client";

import { useEffect, useState } from "react";
import type { Meal } from "@/types/meal";
import MealCard from "@/components/MealCard/MealCard";
import DiceLoader from "@/components/DiceLoader/DiceLoader";
import { playMealReady } from "@/lib/audio";
import styles from "./DessertRoll.module.scss";

function dessertCacheKey() {
  return `toeta-meal-dessert-${new Date().toISOString().slice(0, 10)}`;
}

function dessertRerollKey() {
  return `toeta-rerolled-dessert-${new Date().toISOString().slice(0, 10)}`;
}

interface Props {
  diet?: string;
  allergens?: string;
  isPremium?: boolean;
}

export default function DessertRoll({ diet, allergens, isPremium }: Props = {}) {
  const [dessert, setDessert] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(false);
  const [rolled, setRolled] = useState(false);
  const [rerolled, setRerolled] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cached = localStorage.getItem(dessertCacheKey());
    if (cached) {
      try {
        setDessert(JSON.parse(cached) as Meal);
        setRolled(true);
      } catch {}
    }
    if (localStorage.getItem(dessertRerollKey())) setRerolled(true);
  }, []);

  async function roll(): Promise<boolean> {
    setLoading(true);
    setError(null);

    try {
      let url: string;
      if (diet || allergens) {
        const params = new URLSearchParams({ type: "dessert" });
        if (diet) params.set("diet", diet);
        if (allergens) params.set("intolerances", allergens);
        url = `/api/meal?${params}`;
      } else {
        url = "/api/meal?dessert=true";
      }

      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to roll dessert");
      const data = await res.json() as { meal?: Meal; dessert?: Meal };
      const result = data.dessert ?? data.meal ?? null;
      if (!result) throw new Error("No dessert returned");
      localStorage.setItem(dessertCacheKey(), JSON.stringify(result));
      setDessert(result);
      setRolled(true);
      playMealReady();
      return true;
    } catch {
      setError("Something went wrong. Try again!");
      return false;
    } finally {
      setLoading(false);
    }
  }

  async function handleReroll() {
    localStorage.removeItem(dessertCacheKey());
    const success = await roll();
    if (success) {
      localStorage.setItem(dessertRerollKey(), "1");
      setRerolled(true);
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
        <MealCard
          meal={dessert}
          label="Tonight's Dessert"
          onReroll={isPremium ? handleReroll : undefined}
          rerolled={isPremium ? rerolled : undefined}
        />
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.prompt}>
        <p>Feeling something sweet tonight?</p>
        <button className={styles.rollBtn} onClick={() => roll()}>
          Roll for Dessert <span aria-hidden="true">🎲</span>
        </button>
        {error && <p className={styles.error} role="alert">{error}</p>}
      </div>
    </div>
  );
}
