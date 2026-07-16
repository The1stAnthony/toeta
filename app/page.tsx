// Landing page — shown to logged-out visitors.
// Once auth is in, signed-in users will be redirected to /dashboard.

import Link from "next/link";
import styles from "./page.module.scss";

export default function HomePage() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <h1 className={styles.heading}>
          Stop staring at the fridge.
        </h1>
        <p className={styles.sub}>
          Toeta gives you one great meal idea every day — based on what you can
          eat and what you actually like.
        </p>
        <div className={styles.ctas}>
          <Link href="/signup" className={styles.btnPrimary}>
            Get Started — It&apos;s Free
          </Link>
          <Link href="/dashboard" className={styles.btnSecondary}>
            Try it first
          </Link>
        </div>
      </section>

      <section className={styles.features}>
        <div className={styles.feature}>
          <span className={styles.icon}>🍽️</span>
          <h2>One meal, every day</h2>
          <p>No infinite scroll. No decision fatigue. Just what&apos;s for dinner.</p>
        </div>
        <div className={styles.feature}>
          <span className={styles.icon}>🎲</span>
          <h2>Roll for dessert</h2>
          <p>Feeling something sweet? Take a chance and see what the night brings.</p>
        </div>
        <Link href="/wheel" className={styles.featureLink}>
          <div className={styles.feature}>
            <span className={styles.icon}>🎡</span>
            <h2>Spin the wheel</h2>
            <p>Can&apos;t decide what cuisine to try? Spin for a random food culture.</p>
          </div>
        </Link>
        <div className={styles.feature}>
          <span className={styles.icon}>🥗</span>
          <h2>Built around you</h2>
          <p>Set your diet and allergies once. Never see a recipe you can&apos;t eat.</p>
        </div>
      </section>
    </main>
  );
}
