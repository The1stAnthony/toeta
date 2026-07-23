"use client";

import { useState } from "react";
import styles from "./account.module.scss";

export default function ClearHistoryButton() {
  const [done, setDone] = useState(false);

  function clearHistory() {
    const today = new Date().toISOString().slice(0, 10);

    // Remove 30-day history
    localStorage.removeItem("toeta-meal-history");

    // Remove today's cached meals and re-roll flags
    for (const type of ["breakfast", "lunch", "dinner", "dessert"]) {
      localStorage.removeItem(`toeta-meal-${type}-${today}`);
      localStorage.removeItem(`toeta-rerolled-${type}-${today}`);
    }

    setDone(true);
    setTimeout(() => setDone(false), 3000);
  }

  return (
    <div className={styles.clearHistory}>
      <div className={styles.clearHistoryInfo}>
        <span className={styles.label}>Recommendation history</span>
        <span className={styles.clearHistoryNote}>
          Clears your 30-day recipe history and today&rsquo;s cached meals.
          Your next dashboard visit will fetch completely fresh suggestions.
        </span>
      </div>
      <button className={styles.clearHistoryBtn} onClick={clearHistory}>
        {done ? "✓ Cleared" : "Reset history"}
      </button>
    </div>
  );
}
