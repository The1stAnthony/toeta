import type { Metadata } from "next";
import Script from "next/script";
import Nav from "@/components/Nav/Nav";
import Footer from "@/components/Footer/Footer";
import "@/styles/globals.scss";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

export const metadata: Metadata = {
  title: "Toeta — What's for dinner?",
  description: "One great meal suggestion every day. No decision fatigue.",
  metadataBase: new URL("https://toeta.app"),
  openGraph: {
    title: "Toeta — What's for dinner?",
    description: "One great meal suggestion every day. No decision fatigue.",
    url: "https://toeta.app",
    siteName: "Toeta",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Toeta — What's for dinner?",
    description: "One great meal suggestion every day. No decision fatigue.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
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

        {/* Google AdSense — enables both Auto Ads and manual ad units */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5976607298154940"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
