"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import Link from "next/link";
import styles from "./CookieConsent.module.scss";

export const CONSENT_KEY = "toeta-cookie-consent";
const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";
const ADSENSE_ID = "ca-pub-5976607298154940";

type Consent = "accepted" | "declined" | null;

interface Props {
  isPremium: boolean;
}

export default function CookieConsent({ isPremium }: Props) {
  const [consent, setConsent] = useState<Consent>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(CONSENT_KEY) as Consent;
    if (stored === "accepted" || stored === "declined") setConsent(stored);
  }, []);

  function accept() {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setConsent("accepted");
  }

  function decline() {
    localStorage.setItem(CONSENT_KEY, "declined");
    setConsent("declined");
  }

  const hasConsent = consent === "accepted";
  const showBanner = mounted && consent === null;

  return (
    <>
      {/* Analytics — only after consent */}
      {hasConsent && GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}</Script>
        </>
      )}

      {/* AdSense — only after consent, only for free users */}
      {hasConsent && !isPremium && (
        <Script
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
      )}

      {showBanner && (
        <div
          className={styles.banner}
          role="dialog"
          aria-label="Cookie preferences"
          aria-modal="false"
        >
          <div className={styles.inner}>
            <p className={styles.text}>
              We use cookies for <strong>analytics</strong> (to understand how Toeta is used)
              and <strong>advertising</strong> (Google AdSense, free tier only). Premium
              members are never shown ads and those cookies are never loaded for them.{" "}
              <Link href="/privacy">Privacy policy</Link>
            </p>
            <div className={styles.actions}>
              <button className={styles.decline} onClick={decline}>
                Decline
              </button>
              <button className={styles.accept} onClick={accept}>
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
