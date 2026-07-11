import type { Meal } from "@/types/meal";
import styles from "./MealCard.module.scss";

// TODO: replace with your Instacart affiliate tag once approved at instacart.com/affiliates
const INSTACART_AFFILIATE_TAG = "YOUR_TAG_HERE";

interface MealCardProps {
  meal: Meal;
  label?: string; // e.g. "Today's Meal" or "Dessert"
}

function instacartUrl(mealName: string) {
  const query = encodeURIComponent(mealName);
  return `https://www.instacart.com/store/s?k=${query}&affiliate=${INSTACART_AFFILIATE_TAG}`;
}

export default function MealCard({ meal, label = "Today's Meal" }: MealCardProps) {
  return (
    <article className={styles.card}>
      <p className={styles.label}>{label}</p>

      <div className={styles.imageWrapper}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={meal.imageUrl} alt={meal.name} className={styles.image} />
      </div>

      <div className={styles.body}>
        <h2 className={styles.name}>{meal.name}</h2>

        <div className={styles.meta}>
          <span className={styles.tag}>{meal.category}</span>
          <span className={styles.tag}>{meal.area}</span>
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
      </div>
    </article>
  );
}
