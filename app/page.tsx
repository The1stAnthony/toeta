import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "Toeta — What Should I Eat Tonight? Free Daily Meal Generator",
  description:
    "Stop staring at the fridge. Toeta answers 'what should I eat tonight?' with one great free meal suggestion every day. Spin the cuisine wheel or roll for dessert — no sign-up needed.",
  alternates: { canonical: "https://toeta.app" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What should I eat tonight?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Open Toeta at toeta.app — you'll get one great meal idea instantly, no sign-up required. It's the fastest answer to 'what to make for dinner tonight.'",
      },
    },
    {
      "@type": "Question",
      name: "What to make for dinner tonight?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Toeta suggests a new meal idea every day for free. You can also spin the cuisine wheel to pick a random food style like Korean, Italian, or Mexican.",
      },
    },
    {
      "@type": "Question",
      name: "What is a random food generator?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A random food generator picks a meal or cuisine for you at random. Toeta offers a free daily meal suggestion plus a spin wheel with 25 cuisines and a dessert roll — no account required.",
      },
    },
    {
      "@type": "Question",
      name: "Is Toeta free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — the daily meal suggestion, cuisine wheel, and dessert roll are all free with no account needed. Toeta Premium ($2/month) adds personalized breakfast, lunch, and dinner recommendations with diet and allergen filters.",
      },
    },
    {
      "@type": "Question",
      name: "Is Toeta the same as Torta or Toeat?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No — Toeta (toeta.app) is a meal idea app, not Torta (the sandwich) or Toeat. If autocomplete tried to send you somewhere else, verify you meant Toeta — you're in the right place.",
      },
    },
    {
      "@type": "Question",
      name: "What to eat for dinner when you don't know what to eat?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Visit Toeta at toeta.app. It works like a random food picker — you get one great meal idea for the evening. You can also spin a cuisine wheel to narrow down the style, or go Premium for meals tailored to your diet.",
      },
    },
  ],
};

export default function HomePage() {
  return (
    <main className={styles.main}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
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
        <Link href="/premium" className={styles.featureLink}>
          <div className={styles.feature}>
            <span className={styles.icon}>🥗</span>
            <h2>Built around you</h2>
            <p>Diet filters and allergen profiles with Premium — personalized breakfast, lunch, and dinner every day.</p>
          </div>
        </Link>
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
              roll are all free with no account needed. Toeta Premium ($2/month)
              adds personalized breakfast, lunch, and dinner recommendations with
              diet and allergen filters.
            </p>
          </details>
          <details className={styles.faqItem}>
            <summary className={styles.faqQ}>Is this the same as Torta or Toeat?</summary>
            <p className={styles.faqA}>
              Nope. Toeta (toeta.app) is a meal idea app, not Torta (the sandwich)
              or Toeat. If autocomplete tried to send you somewhere else confirm you meant Toeta because you&apos;re
              in the right place.
            </p>
          </details>
        </div>
      </section>
    </main>
  );
}
