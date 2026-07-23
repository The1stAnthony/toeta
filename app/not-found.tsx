import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found | Toeta",
};

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <span style={{ fontSize: "4rem" }}>🍽️</span>
      <h1 style={{ fontSize: "clamp(1.6rem, 5vw, 2.5rem)", fontWeight: 800 }}>
        Page not found
      </h1>
      <p style={{ color: "var(--color-text-muted)", maxWidth: "380px", lineHeight: 1.7 }}>
        Looks like this page got eaten. Head back and we&apos;ll find you something better.
      </p>
      <Link
        href="/"
        style={{
          background: "var(--color-primary)",
          color: "#fff",
          borderRadius: "var(--radius-sm)",
          padding: "0.75rem 2rem",
          fontWeight: 700,
          marginTop: "0.5rem",
        }}
      >
        Back to Toeta
      </Link>
    </main>
  );
}
