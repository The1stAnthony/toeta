"use client";

import styles from "./DiceLoader.module.scss";

// Pip positions as [left%, top%] for each die face
const FACES: Record<string, [number, number][]> = {
  one:   [[50, 50]],
  two:   [[72, 28], [28, 72]],
  three: [[72, 28], [50, 50], [28, 72]],
  four:  [[28, 28], [72, 28], [28, 72], [72, 72]],
  five:  [[28, 28], [72, 28], [50, 50], [28, 72], [72, 72]],
  six:   [[28, 28], [28, 50], [28, 72], [72, 28], [72, 50], [72, 72]],
};

function Face({ pips, cls }: { pips: [number, number][]; cls: string }) {
  return (
    <div className={`${styles.face} ${cls}`}>
      {pips.map(([l, t], i) => (
        <span key={i} className={styles.pip} style={{ left: `${l}%`, top: `${t}%` }} />
      ))}
    </div>
  );
}

function Die({ animClass }: { animClass: string }) {
  return (
    <div className={styles.scene}>
      <div className={`${styles.cube} ${animClass}`}>
        <Face pips={FACES.one}   cls={styles.front}  />
        <Face pips={FACES.six}   cls={styles.back}   />
        <Face pips={FACES.three} cls={styles.right}  />
        <Face pips={FACES.four}  cls={styles.left}   />
        <Face pips={FACES.two}   cls={styles.top}    />
        <Face pips={FACES.five}  cls={styles.bottom} />
      </div>
    </div>
  );
}

export default function DiceLoader() {
  return (
    <div className={styles.wrapper} role="status" aria-label="Loading your meal">
      <div className={styles.dice}>
        <Die animClass={styles.cubeA} />
        <Die animClass={styles.cubeB} />
      </div>
      <p className={styles.label}>Rolling your meal...</p>
    </div>
  );
}
