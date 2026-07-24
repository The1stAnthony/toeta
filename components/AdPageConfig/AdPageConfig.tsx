"use client";

import { useEffect } from "react";

const ADSENSE_ID = "ca-pub-5976607298154940";

declare global {
  interface Window { adsbygoogle: unknown[]; }
}

interface Props {
  /** Restrict Auto ads to anchor/overlay only — suppresses in-page/in-article ads */
  anchorOnly?: boolean;
}

export default function AdPageConfig({ anchorOnly }: Props) {
  useEffect(() => {
    if (!anchorOnly) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({
        google_ad_client: ADSENSE_ID,
        enable_page_level_ads: true,
        overlays: { bottom: true },
      });
    } catch {
      // adsbygoogle not yet loaded — safe to ignore
    }
  }, []);

  return null;
}
