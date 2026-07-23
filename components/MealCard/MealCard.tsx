"use client";

import Image from "next/image";
import type { Meal } from "@/types/meal";
import styles from "./MealCard.module.scss";

// Replace with your Instacart affiliate tag from impact.com once approved
const INSTACART_AFFILIATE_TAG = "YOUR_TAG_HERE";
const hasAffiliateTag = INSTACART_AFFILIATE_TAG !== "YOUR_TAG_HERE";

interface MealCardProps {
  meal: Meal;
  label?: string;
  onReroll?: () => void;
  rerolled?: boolean;
}

function instacartUrl(mealName: string) {
  const query = encodeURIComponent(mealName);
  const base = `https://www.instacart.com/store/s?k=${query}`;
  return hasAffiliateTag ? `${base}&affiliate=${INSTACART_AFFILIATE_TAG}` : base;
}

export default function MealCard({ meal, label = "Today's Meal", onReroll, rerolled }: MealCardProps) {
  return (
    <article className={styles.card} aria-labelledby={`meal-name-${meal.id}`}>
      <p className={styles.label}>{label}</p>

      <div className={styles.imageWrapper}>
        <Image
          src={meal.imageUrl}
          alt={meal.name}
          fill
          sizes="(max-width: 600px) 100vw, 540px"
          className={styles.image}
        />
      </div>

      <div className={styles.body}>
        <h2 className={styles.name} id={`meal-name-${meal.id}`}>{meal.name}</h2>

        <div className={styles.meta}>
          <span className={styles.tag}>{meal.category}</span>
          {meal.area && <span className={styles.tag}>{meal.area}</span>}
        </div>

        <details className={styles.ingredients}>
          <summary>Ingredients</summary>
          <ul>
            {meal.ingredients.map((ing) => (
              <li key={ing.name}>
                <span className={styles.measure}>{ing.measure}</span> {ing.name}
              </li>
            ))}
          </ul>
        </details>

        <div className={styles.actions}>
          {meal.sourceUrl && (
            <a
              href={meal.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnPrimary}
            >
              Start Cookin&apos;
            </a>
          )}
          {meal.youtubeUrl && (
            <a
              href={meal.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnSecondary}
            >
              Watch on YouTube
            </a>
          )}

          {/* Affiliate link — earns a commission when users shop ingredients */}
          <a
            href={instacartUrl(meal.name)}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnAffiliate}
          >
            🛒 Shop Ingredients
          </a>
        </div>

        {onReroll !== undefined && (
          <div className={styles.rerollArea}>
            <span className={styles.rerollHint}>
              {rerolled ? "Re-rolled today" : "1 re-roll available"}
            </span>
            <button
              className={`${styles.rerollBtn} ${rerolled ? styles.rerollBtnUsed : ""}`}
              onClick={rerolled ? undefined : onReroll}
              disabled={rerolled}
            >
              {rerolled ? "✓ Re-rolled" : "↺ Re-roll"}
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
