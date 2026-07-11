"use client";

// Placeholder ad slot — swap the inner div for your Google AdSense <ins> tag
// once your site is approved. Keep the .adSlot wrapper so layout doesn't shift.
//
// AdSense approval: https://www.google.com/adsense/start/
// Once approved, replace the placeholder div with:
//   <ins class="adsbygoogle" data-ad-client="ca-pub-XXXXXXXX" data-ad-slot="XXXXXXXX" ... />

interface AdSlotProps {
  id: string;         // unique id per slot on the page
  size?: "banner" | "rectangle";
}

export default function AdSlot({ id, size = "banner" }: AdSlotProps) {
  return (
    <div className={`ad-slot ad-slot--${size}`} id={id} aria-label="Advertisement">
      {/* TODO: replace this div with your AdSense <ins> tag */}
      <div className="ad-placeholder">
        <span>Ad</span>
      </div>
    </div>
  );
}
