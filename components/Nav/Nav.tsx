import Link from "next/link";
import Image from "next/image";
import styles from "./Nav.module.scss";

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.logo}>
        <Image src="/icon.png" alt="Toeta" width={36} height={36} />
        <span>Toeta</span>
        <span className={styles.beta}>Beta</span>
      </Link>
    </nav>
  );
}
