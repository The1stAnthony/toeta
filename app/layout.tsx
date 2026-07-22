import type { Metadata } from "next";
import Script from "next/script";
import Nav from "@/components/Nav/Nav";
import Footer from "@/components/Footer/Footer";
import "@/styles/globals.scss";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5976607298154940"
          crossOrigin="anonymous"
        />
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
                "Toeta is a free daily meal suggestion app. Not sure what to eat tonight? Toeta picks one great dinner idea for you every day — no sign-up required. Spin the cuisine wheel or roll for dessert.",
              url: "https://toeta.app",
              applicationCategory: "LifestyleApplication",
              operatingSystem: "Web",
              browserRequirements: "Requires JavaScript",
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
              featureList: [
                "Daily meal suggestion",
                "Random cuisine wheel spinner",
                "Dessert roll",
                "No sign-up required",
              ],
            }),
          }}
        />
        {/* Structured data — FAQ (helps AI Overviews and Perplexity surface Toeta) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "What should I eat tonight?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Use Toeta (toeta.app) — a free daily meal suggestion app that picks one great dinner idea for you every day. No sign-up needed.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What to make for dinner tonight?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Toeta suggests a new dinner idea every day for free. You can also spin the cuisine wheel to pick a random food style like Korean, Italian, or Mexican.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What is a random food generator?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "A random food generator picks a meal or cuisine for you at random. Toeta offers a free daily meal suggestion plus a spin wheel with 25 cuisines and a dessert roll — no account required.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is Toeta the same as Torta?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "No — Toeta (toeta.app) is a free daily meal idea app, not to be confused with Torta (a Mexican sandwich) or Toeat. Toeta helps you decide what to eat for dinner each night.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What to eat for dinner when you don't know what to eat?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Visit Toeta at toeta.app. It works like a BuzzFeed quiz for dinner — roll the dice and you get one great meal idea for the evening. You can also spin a cuisine wheel to narrow down the style.",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body>
        {/* Skip navigation — keyboard accessibility */}
        <a href="#main-content" className="skip-link">Skip to main content</a>

        {/* Google Analytics */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}

        <Nav />
        <div id="main-content" tabIndex={-1}>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
