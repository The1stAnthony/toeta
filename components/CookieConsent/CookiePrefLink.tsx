"use client";

import { CONSENT_KEY } from "./CookieConsent";

export default function CookiePrefLink() {
  function openPrefs() {
    localStorage.removeItem(CONSENT_KEY);
    window.location.reload();
  }

  return (
    <button
      onClick={openPrefs}
      style={{
        background: "none",
        border: "none",
        padding: 0,
        cursor: "pointer",
        color: "var(--color-text-muted)",
        fontSize: "0.8rem",
        fontFamily: "inherit",
      }}
    >
      Cookie preferences
    </button>
  );
}
