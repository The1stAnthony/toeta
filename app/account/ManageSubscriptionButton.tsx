"use client";

import { useState } from "react";
import styles from "./account.module.scss";

export default function ManageSubscriptionButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleManage() {
    setLoading(true);
    setError(null);

    const res = await fetch("/api/stripe/portal", { method: "POST" });
    const data = (await res.json()) as { url?: string; error?: string };

    if (!res.ok || !data.url) {
      setError(data.error ?? "Something went wrong.");
      setLoading(false);
      return;
    }

    window.location.href = data.url;
  }

  return (
    <div>
      <button
        className={styles.manageBtn}
        onClick={handleManage}
        disabled={loading}
      >
        {loading ? "Opening portal…" : "Manage subscription →"}
      </button>
      {error && <p className={styles.portalError}>{error}</p>}
    </div>
  );
}
