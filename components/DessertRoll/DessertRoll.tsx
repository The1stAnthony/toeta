"use client";

import { useState } from "react";
import type { Meal } from "@/types/meal";
import MealCard from "@/components/MealCard/MealCard";
import styles from "./DessertRoll.module.scss";

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
    } catch {
      setError("Something went wrong. Try again!");
    } finally {
      setLoading(false);
    }
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
        <button
          className={styles.rollBtn}
          onClick={roll}
          disabled={loading}
        >
          {loading ? "Rolling..." : "Roll for Dessert 🎲"}
        </button>
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>
  );
}
