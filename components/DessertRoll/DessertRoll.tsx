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

interface Props {
  diet?: string;
  allergens?: string;
}

export default function DessertRoll({ diet, allergens }: Props = {}) {
  const [dessert, setDessert] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(false);
  const [rolled, setRolled] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Restore today's dessert from cache on mount
  useEffect(() => {
    const cached = localStorage.getItem(dessertCacheKey());
    if (cached) {
      try {
        setDessert(JSON.parse(cached) as Meal);
        setRolled(true);
      } catch {}
    }
  }, []);

  async function roll() {
    setLoading(true);
    setError(null);

    try {
      let url: string;
      if (diet || allergens) {
        // Premium: use Spoonacular with user filters
        const params = new URLSearchParams({ type: "dessert" });
        if (diet) params.set("diet", diet);
        if (allergens) params.set("intolerances", allergens);
        url = `/api/meal?${params}`;
      } else {
        // Free: use TheMealDB
        url = "/api/meal?dessert=true";
      }

      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to roll dessert");
      const data = await res.json() as { meal?: Meal; dessert?: Meal };
      // TheMealDB returns { meal, dessert } — prefer dessert. Spoonacular returns { meal } only.
      const result = data.dessert ?? data.meal ?? null;
      if (!result) throw new Error("No dessert returned");
      localStorage.setItem(dessertCacheKey(), JSON.stringify(result));
      setDessert(result);
      setRolled(true);
      playMealReady();
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
