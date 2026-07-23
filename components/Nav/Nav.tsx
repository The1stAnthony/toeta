import Link from "next/link";
import Image from "next/image";
import { getUserAndProfile } from "@/lib/supabase/user";
import styles from "./Nav.module.scss";

export default async function Nav() {
  const { user, isPremium } = await getUserAndProfile();

  return (
    <nav className={styles.nav} aria-label="Main navigation">
      <Link href="/" className={styles.logo}>
        <Image src="/icon.png" alt="Toeta" width={36} height={36} />
        <span>Toeta</span>
        <span className={styles.beta}>Beta</span>
      </Link>

      <div className={styles.links}>
        <Link href="/dashboard" className={styles.link}>Today&apos;s Meals</Link>
        <Link href="/wheel" className={styles.link}>Spin the Wheel</Link>
        {user ? (
          <>
            {!isPremium && (
              <Link href="/premium" className={styles.cta}>Go Premium</Link>
            )}
            <Link href="/account" className={styles.link}>
              {isPremium ? "⭐ Account" : "Account"}
            </Link>
          </>
        ) : (
          <Link href="/signup" className={styles.cta}>Go Premium</Link>
        )}
      </div>
    </nav>
  );
}
