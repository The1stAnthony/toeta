import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
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
