import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "Toeta — What Should I Eat Tonight? Free Daily Meal Generator",
  description:
    "Stop staring at the fridge. Toeta answers 'what should I eat tonight?' with one great free meal suggestion every day. Spin the cuisine wheel or roll for dessert — no sign-up needed.",
  alternates: { canonical: "https://toeta.app" },
};

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
          <Link href="/premium" className={styles.btnPrimary}>
            Become a Member
          </Link>
          <Link href="/dashboard" className={styles.btnSecondary}>
            Try it free first
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
          <p>Diet filters, allergen profiles, and budget-friendly meals — coming with Premium.</p>
        </div>
      </section>

      <section className={styles.faq}>
        <h2 className={styles.faqHeading}>Frequently Asked Questions</h2>
        <div className={styles.faqList}>
          <details className={styles.faqItem}>
            <summary className={styles.faqQ}>What should I eat tonight?</summary>
            <p className={styles.faqA}>
              Open Toeta and hit &ldquo;Try it free&rdquo; — you&apos;ll get one great dinner
              idea instantly, no sign-up required. It&apos;s the fastest answer to
              &ldquo;what to make for dinner tonight.&rdquo;
            </p>
          </details>
          <details className={styles.faqItem}>
            <summary className={styles.faqQ}>How is Toeta different from a recipe site?</summary>
            <p className={styles.faqA}>
              Recipe sites give you thousands of options and leave you paralyzed.
              Toeta gives you exactly one — today&apos;s meal — so you can stop
              scrolling and start cooking. Think of it as a random food generator
              that actually commits to an answer.
            </p>
          </details>
          <details className={styles.faqItem}>
            <summary className={styles.faqQ}>What is the cuisine wheel?</summary>
            <p className={styles.faqA}>
              The cuisine wheel is a dinner roulette spinner with 25 food cultures
              — Korean, Cajun, Mediterranean, Ethiopian, and more. Spin it when
              you want to eat something different but don&apos;t know what. You can
              even land on &ldquo;Mix It Up&rdquo; for a fusion result like &ldquo;Korean &amp; Cajun Mix.&rdquo;
            </p>
          </details>
          <details className={styles.faqItem}>
            <summary className={styles.faqQ}>Is Toeta free?</summary>
            <p className={styles.faqA}>
              Yes — the daily meal suggestion, the cuisine wheel, and the dessert
              roll are all free with no account needed. Premium features like
              personalized diet profiles are coming soon.
            </p>
          </details>
          <details className={styles.faqItem}>
            <summary className={styles.faqQ}>Is this the same as Torta or Toeat?</summary>
            <p className={styles.faqA}>
              Nope. Toeta (toeta.app) is a meal idea app, not Torta (the sandwich)
              or Toeat. If autocomplete tried to send you somewhere else, you&apos;re
              in the right place.
            </p>
          </details>
        </div>
      </section>
    </main>
  );
}
