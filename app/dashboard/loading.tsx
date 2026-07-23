import styles from "./dashboard.module.scss";

export default function DashboardLoading() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <h1 className={styles.heading}>What&apos;s for dinner?</h1>
        <p className={styles.sub}>One great meal, every day. No decision fatigue.</p>
      </section>
    </main>
  );
}
