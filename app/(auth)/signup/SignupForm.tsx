"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import styles from "./signup.module.scss";

type Mode = "signin" | "signup";

export default function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawNext = searchParams.get("next") ?? "";
  const next = rawNext.startsWith("/") && !rawNext.startsWith("//") && !rawNext.includes("@") && !rawNext.includes(":")
    ? rawNext
    : "/dashboard";
  const authError = searchParams.get("error");

  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function switchMode(m: Mode) {
    setMode(m);
    setError(null);
    setPassword("");
    setConfirmPassword("");
    setShowPassword(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (mode === "signup" && password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    setLoading(true);
    const supabase = createClient();

    if (mode === "signin") {
      const { error: sbError } = await supabase.auth.signInWithPassword({ email, password });

      if (sbError) {
        setError(sbError.message);
        setLoading(false);
        return;
      }

      router.push(next);
      router.refresh();
    } else {
      // Server-side signup — creates user as already confirmed, inserts profile row
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = (await res.json()) as { success?: boolean; error?: string };

      if (!res.ok || !result.success) {
        setError(result.error ?? "Could not create account. Please try again.");
        setLoading(false);
        return;
      }

      // Account created — sign in immediately
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

      if (signInError) {
        setError(signInError.message);
        setLoading(false);
        return;
      }

      router.push(next);
      router.refresh();
    }
  }

  const inputType = showPassword ? "text" : "password";

  return (
    <div className={styles.card}>
      <span className={styles.icon}>✨</span>
      <h1 className={styles.heading}>
        {mode === "signin" ? "Sign in to Toeta" : "Create your account"}
      </h1>

      {(error || authError) && (
        <p className={styles.error} role="alert">
          {error ?? "Authentication failed. Please try again."}
        </p>
      )}

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
        <div className={styles.passwordWrapper}>
          <input
            id="password"
            className={styles.input}
            type={inputType}
            placeholder={mode === "signup" ? "Create a password (8+ chars)" : "Password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete={mode === "signin" ? "current-password" : "new-password"}
            minLength={mode === "signup" ? 8 : undefined}
            disabled={loading}
          />
          <button
            type="button"
            className={styles.showBtn}
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {mode === "signup" && (
          <>
            <label className={styles.srOnly} htmlFor="confirmPassword">Confirm password</label>
            <div className={styles.passwordWrapper}>
              <input
                id="confirmPassword"
                className={styles.input}
                type={inputType}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                autoComplete="new-password"
                minLength={8}
                disabled={loading}
              />
            </div>
          </>
        )}

        <button
          type="submit"
          className={styles.cta}
          disabled={loading || !email || !password || (mode === "signup" && !confirmPassword)}
        >
          {loading
            ? mode === "signin" ? "Signing in…" : "Creating account…"
            : mode === "signin" ? "Sign in" : "Create account"}
        </button>
      </form>

      <button
        className={styles.textBtn}
        onClick={() => switchMode(mode === "signin" ? "signup" : "signin")}
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
