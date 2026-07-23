"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import styles from "./signup.module.scss";

type Mode = "signin" | "signup";

export default function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/dashboard";

  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();

    if (mode === "signin") {
      const { error: sbError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (sbError) {
        setError(sbError.message);
        setLoading(false);
        return;
      }

      router.push(next);
      router.refresh();
    } else {
      const { error: sbError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/api/auth/callback?next=${encodeURIComponent(next)}`,
        },
      });

      if (sbError) {
        setError(sbError.message);
        setLoading(false);
        return;
      }

      setConfirmed(true);
      setLoading(false);
    }
  }

  if (confirmed) {
    return (
      <div className={styles.card}>
        <span className={styles.icon}>📬</span>
        <h1 className={styles.heading}>Check your email</h1>
        <p className={styles.sub}>
          We sent a confirmation link to <strong>{email}</strong>. Click it to activate your account.
        </p>
        <button className={styles.textBtn} onClick={() => setConfirmed(false)}>
          Use a different email
        </button>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <span className={styles.icon}>✨</span>
      <h1 className={styles.heading}>
        {mode === "signin" ? "Sign in to Toeta" : "Create your account"}
      </h1>

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

        <label className={styles.srOnly} htmlFor="password">Password</label>
        <input
          id="password"
          className={styles.input}
          type="password"
          placeholder={mode === "signup" ? "Create a password" : "Password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete={mode === "signin" ? "current-password" : "new-password"}
          minLength={mode === "signup" ? 8 : undefined}
          disabled={loading}
        />

        <button
          type="submit"
          className={styles.cta}
          disabled={loading || !email || !password}
        >
          {loading
            ? mode === "signin" ? "Signing in…" : "Creating account…"
            : mode === "signin" ? "Sign in" : "Create account"}
        </button>
      </form>

      <button
        className={styles.textBtn}
        onClick={() => { setMode(mode === "signin" ? "signup" : "signin"); setError(null); }}
      >
        {mode === "signin" ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
      </button>

      <p className={styles.legalNote}>
        By continuing, you agree to our{" "}
        <a href="/terms" className={styles.textLink}>Terms</a> and{" "}
        <a href="/privacy" className={styles.textLink}>Privacy Policy</a>.
      </p>
    </div>
  );
}
