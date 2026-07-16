import Link from "next/link";
import styles from "./signup.module.scss";

export const metadata = { title: "Coming Soon — Toeta" };

export default function SignupPage() {
  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <span className={styles.icon}>🔒</span>
        <h1 className={styles.heading}>Premium Features Coming Soon.</h1>
        <p className={styles.sub}>
          Personalised diet profiles, allergen filters, and unlimited rolls are on the way.
        </p>
        <Link href="/dashboard" className={styles.cta}>
          Try it free!
        </Link>
      </div>
    </main>
  );
}
