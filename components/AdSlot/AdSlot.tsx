"use client";

import { useEffect } from "react";

// To activate these ad slots:
// 1. Go to your AdSense dashboard → Ads → By ad unit → Create new ad unit
// 2. Create one "banner" unit and one "rectangle" unit
// 3. Copy each slot ID (the number in data-ad-slot) into the dashboard page:
//    <AdSlot id="ad-top" size="banner" slotId="YOUR_BANNER_SLOT_ID" />
//    <AdSlot id="ad-bottom" size="rectangle" slotId="YOUR_RECTANGLE_SLOT_ID" />

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

interface AdSlotProps {
  id: string;
  size?: "banner" | "rectangle";
  slotId?: string; // AdSense ad unit slot ID — get from AdSense dashboard
}

export default function AdSlot({ id, size = "banner", slotId }: AdSlotProps) {
  useEffect(() => {
    if (!slotId) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // AdSense script not loaded yet — safe to ignore
    }
  }, [slotId]);

  // Show a visible placeholder until a real slot ID is provided
  if (!slotId) {
    return (
      <div className={`ad-slot ad-slot--${size}`} id={id} aria-label="Advertisement">
        <div className="ad-placeholder">
          <span>Ad</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`ad-slot ad-slot--${size}`} id={id} aria-label="Advertisement">
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-5976607298154940"
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
