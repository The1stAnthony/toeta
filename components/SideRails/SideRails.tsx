"use client";

import AdSlot from "@/components/AdSlot/AdSlot";
import styles from "./SideRails.module.scss";

interface Props {
  leftSlotId?: string;
  rightSlotId?: string;
}

export default function SideRails({ leftSlotId, rightSlotId }: Props) {
  return (
    <>
      <div className={styles.leftRail}>
        <AdSlot id="ad-rail-left" size="skyscraper" slotId={leftSlotId} />
      </div>
      <div className={styles.rightRail}>
        <AdSlot id="ad-rail-right" size="skyscraper" slotId={rightSlotId} />
      </div>
    </>
  );
}
