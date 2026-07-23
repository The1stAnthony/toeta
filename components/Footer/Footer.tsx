import Link from "next/link";
import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <p className={styles.copyright}>
            ©{new Date().getFullYear()} Toeta — Built by{" "}
            <a
              href="https://github.com/The1stAnthony"
              target="_blank"
              rel="noopener noreferrer"
            >
              @The1stAnthony
            </a>
          </p>
          <nav className={styles.links} aria-label="Footer navigation">
            <Link href="/about">About</Link>
            <Link href="/premium">Premium</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </nav>
        </div>

        <a
          href="https://buymeacoffee.com/seanaprothu"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.bmc}
        >
          ☕ Buy me a coffee
        </a>
      </div>
    </footer>
  );
}
