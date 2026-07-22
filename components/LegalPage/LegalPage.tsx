import styles from "./LegalPage.module.scss";

interface Props {
  title: string;
  updated: string;
  children: React.ReactNode;
}

export default function LegalPage({ title, updated, children }: Props) {
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.updated}>Last updated: {updated}</p>
      <div className={styles.body}>{children}</div>
    </main>
  );
}
