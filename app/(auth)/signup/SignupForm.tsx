"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import styles from "./signup.module.scss";

export default function SignupForm() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/dashboard";
  const hasError = searchParams.get("error") === "auth";

  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(hasError ? "Sign-in link expired. Please try again." : null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const redirectTo = `${window.location.origin}/api/auth/callback?next=${encodeURIComponent(next)}`;

    const { error: sbError } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: redirectTo },
    });

    if (sbError) {
      setError(sbError.message);
      setLoading(false);
    } else {
      setSent(true);
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className={styles.card}>
        <span className={styles.icon}>📬</span>
        <h1 className={styles.heading}>Check your email</h1>
        <p className={styles.sub}>
          We sent a magic link to <strong>{email}</strong>. Click it to sign in — no password needed.
        </p>
        <button
          className={styles.textBtn}
          onClick={() => setSent(false)}
        >
          Use a different email
        </button>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <span className={styles.icon}>✨</span>
      <h1 className={styles.heading}>Sign in to Toeta</h1>
      <p className={styles.sub}>
        Enter your email and we&apos;ll send you a magic link — no password required.
      </p>

      {error && <p className={styles.error} role="alert">{error}</p>}

      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.srOnly} htmlFor="email">Email address</label>
        <input
          id="email"
          className={styles.input}
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          disabled={loading}
        />
        <button
          type="submit"
          className={styles.cta}
          disabled={loading || !email}
        >
          {loading ? "Sending…" : "Send magic link"}
        </button>
      </form>

      <p className={styles.legalNote}>
        By signing in, you agree to our{" "}
        <a href="/terms" className={styles.textLink}>Terms</a> and{" "}
        <a href="/privacy" className={styles.textLink}>Privacy Policy</a>.
      </p>
    </div>
  );
}
