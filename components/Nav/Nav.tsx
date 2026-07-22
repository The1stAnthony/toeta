import Link from "next/link";
import Image from "next/image";
import styles from "./Nav.module.scss";

export default function Nav() {
  return (
    <nav className={styles.nav} aria-label="Main navigation">
      <Link href="/" className={styles.logo}>
        <Image src="/icon.png" alt="Toeta" width={36} height={36} />
        <span>Toeta</span>
        <span className={styles.beta}>Beta</span>
      </Link>

      <div className={styles.links}>
        <Link href="/dashboard" className={styles.link}>Today&apos;s Meal</Link>
        <Link href="/wheel" className={styles.link}>Spin the Wheel</Link>
        <Link href="/about" className={styles.link}>About</Link>
        <Link href="/signup" className={styles.cta}>Go Premium</Link>
      </div>
    </nav>
  );
}
