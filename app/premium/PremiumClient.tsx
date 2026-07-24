"use client";

import { useState } from "react";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import styles from "./premium.module.scss";

const MONTHLY_PRICE_ID = process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY!;
const YEARLY_PRICE_ID = process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_YEARLY!;

interface Props {
  user: User | null;
  isPremium: boolean;
}

export default function PremiumClient({ user, isPremium }: Props) {
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (isPremium) {
    return (
      <main className={styles.main}>
        <div className={styles.card}>
          <span className={styles.icon}>⭐</span>
          <h1 className={styles.heading}>You&apos;re already Premium!</h1>
          <p className={styles.sub}>
            Enjoy ad-free meal suggestions, diet filters, and more.
          </p>
          <Link href="/dashboard" className={styles.cta}>
            Back to Dashboard
          </Link>
          <Link href="/account" className={styles.textBtn}>
            Manage subscription →
          </Link>
        </div>
      </main>
    );
  }

  async function handleCheckout(priceId: string) {
    if (!user) return;
    setLoading(priceId);
    setError(null);

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });

      const data = (await res.json()) as { url?: string; error?: string };

      if (!res.ok || !data.url) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setLoading(null);
        return;
      }

      window.location.href = data.url;
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(null);
    }
  }

  return (
    <main className={styles.main}>
      <header className={styles.hero}>
        <h1 className={styles.heroHeading}>Upgrade to Toeta Premium</h1>
        <p className={styles.heroSub}>
          Personalized meals, zero ads, and dietary filters — built around how you actually eat.
        </p>
      </header>

      <section className={styles.features}>
        <div className={styles.feature}>
          <span>🚫</span>
          <div>
            <strong>No ads</strong>
            <p>A clean, distraction-free experience.</p>
          </div>
        </div>
        <div className={styles.feature}>
          <span>🥗</span>
          <div>
            <strong>Diet profiles</strong>
            <p>Vegetarian, vegan, keto, paleo, pescetarian, whole30 — your meals, your rules.</p>
          </div>
        </div>
        <div className={styles.feature}>
          <span>⚠️</span>
          <div>
            <strong>Allergen filters</strong>
            <p>Set your allergens once. Never see a meal that conflicts with them again.</p>
          </div>
        </div>
        <div className={styles.feature}>
          <span>🥘</span>
          <div>
            <strong>Pantry mode</strong>
            <p>Cook from what you already have and reduce food waste — coming soon.</p>
          </div>
        </div>
      </section>

      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}

      <section className={styles.plans}>
        <div className={styles.planCard}>
          <div className={styles.planName}>Monthly</div>
          <div className={styles.planPrice}>
            <span className={styles.amount}>$2</span>
            <span className={styles.per}>/month</span>
          </div>
          {user ? (
            <button
              className={styles.planCta}
              onClick={() => handleCheckout(MONTHLY_PRICE_ID)}
              disabled={loading !== null}
            >
              {loading === MONTHLY_PRICE_ID ? "Loading…" : "Subscribe monthly"}
            </button>
          ) : (
            <Link
              href={`/signup?next=/premium`}
              className={styles.planCta}
            >
              Sign in to subscribe
            </Link>
          )}
        </div>

        <div className={`${styles.planCard} ${styles.planCardFeatured}`}>
          <div className={styles.planBadge}>Best value</div>
          <div className={styles.planName}>Yearly</div>
          <div className={styles.planPrice}>
            <span className={styles.amount}>$20</span>
            <span className={styles.per}>/year</span>
          </div>
          <p className={styles.planSavings}>2 months free</p>
          {user ? (
            <button
              className={styles.planCta}
              onClick={() => handleCheckout(YEARLY_PRICE_ID)}
              disabled={loading !== null}
            >
              {loading === YEARLY_PRICE_ID ? "Loading…" : "Subscribe yearly"}
            </button>
          ) : (
            <Link
              href={`/signup?next=/premium`}
              className={styles.planCta}
            >
              Sign in to subscribe
            </Link>
          )}
        </div>
      </section>

      <p className={styles.cancel}>Cancel anytime. No hidden fees.</p>

      <div className={styles.termsReminder}>
        <p>
          Before you subscribe — Remember to read our{" "}
          <Link href="/terms" className={styles.termsLink}>
            Terms of Service.
          </Link>
        </p>
      </div>
    </main>
  );
}
