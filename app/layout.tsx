import type { Metadata } from "next";
import Nav from "@/components/Nav/Nav";
import Footer from "@/components/Footer/Footer";
import CookieConsent from "@/components/CookieConsent/CookieConsent";
import { getUserAndProfile } from "@/lib/supabase/user";
import "@/styles/globals.scss";

export const metadata: Metadata = {
  title: {
    default: "Toeta — What Should I Eat Tonight? Free Daily Meal Generator",
    template: "%s | Toeta",
  },
  description:
    "Not sure what to make for dinner tonight? Toeta is a free daily meal idea generator — spin the cuisine wheel, roll for dessert, or let fate decide. One great meal suggestion every day, no sign-up needed.",
  keywords: [
    // Conversational / question queries
    "what should I eat tonight",
    "what to make for dinner tonight",
    "what to eat for dinner",
    "what should I eat",
    "what to eat today",
    "what to eat for breakfast",
    "what is good to eat",
    "what to eat healthy",
    "what's for dinner",
    "what to cook tonight",
    "dinner ideas tonight",
    "what should I make for dinner",
    // Tool / generator queries
    "random food generator",
    "random meal generator",
    "dinner idea generator",
    "meal idea generator",
    "random dinner idea",
    "dinner roulette",
    "cuisine wheel",
    "food wheel spinner",
    "daily meal suggestion",
    "free meal planner",
    // Brand / name disambiguation
    "toeta meaning",
    "toeta estonian",
    "what does toeta mean",
    // Brand / competitor adjacent
    "FoodsGPT",
    "BuzzFeed dinner quiz",
    "BuzzFeed what should I eat quiz",
    "Toeta",
    "Toeta app",
    "Toeat",
    "To Eat app",
  ],
  metadataBase: new URL("https://toeta.app"),
  alternates: { canonical: "https://toeta.app" },
  openGraph: {
    title: "Toeta — What Should I Eat Tonight?",
    description:
      "Stop staring at the fridge. Get one great meal idea every day, free. Spin the cuisine wheel or roll for dessert.",
    url: "https://toeta.app",
    siteName: "Toeta",
    type: "website",
    images: [
      {
        url: "/cover.png",
        width: 1200,
        height: 630,
        alt: "Toeta — Free Daily Meal Idea Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Toeta — What Should I Eat Tonight?",
    description:
      "Stop staring at the fridge. One great meal idea every day, free.",
    images: ["/cover.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1 },
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isPremium } = await getUserAndProfile();

  return (
    <html lang="en">
      <head>
        {/*
          👋 Hey, you found the source.

          Toeta (Estonian) — verb:
            "to support, to back, to endorse, to prop up."
          That's us. We're here to prop up your dinner decision.

          Also: not Torta (the Mexican sandwich — though honestly, excellent choice).
          Also also: not Tota (the TikTok thing — we're flattered by the confusion).

          If you're this curious about how we're built, reach out: toeta.app/contact
        */}
        {/* Structured data — WebApplication */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Toeta",
              alternateName: ["Toeta App", "Toeat", "To Eat App"],
              description:
                "Toeta is a free daily meal idea app. Not sure what to eat tonight? Get one great meal suggestion every day — no sign-up required. Spin the cuisine wheel, roll for dessert, or go Premium for personalized meals with diet and allergen filters.",
              url: "https://toeta.app",
              applicationCategory: "LifestyleApplication",
              operatingSystem: "Web",
              browserRequirements: "Requires JavaScript",
              offers: [
                { "@type": "Offer", price: "0", priceCurrency: "USD", name: "Free" },
                { "@type": "Offer", price: "2.00", priceCurrency: "USD", name: "Premium", billingDuration: "P1M" },
              ],
              featureList: [
                "Daily meal suggestion",
                "25-cuisine spin wheel",
                "Dessert roll",
                "Personalized breakfast, lunch, and dinner (Premium)",
                "Diet and allergen filters (Premium)",
                "No sign-up required for free tier",
              ],
            }),
          }}
        />
        {/* Structured data — Organization (sitewide brand signal) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Toeta",
              url: "https://toeta.app",
              logo: "https://toeta.app/icon.png",
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer support",
                url: "https://toeta.app/contact",
              },
            }),
          }}
        />
      </head>
      <body>
        {/* Skip navigation — keyboard accessibility */}
        <a href="#main-content" className="skip-link">Skip to main content</a>

        <CookieConsent isPremium={isPremium} />
        <Nav />
        <div id="main-content" tabIndex={-1}>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
