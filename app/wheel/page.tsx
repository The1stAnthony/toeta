import type { Metadata } from "next";
import WheelClient from "./WheelClient";

export const metadata: Metadata = {
  title: "Spin the Wheel",
  description: "Can't decide what to eat? Spin Toeta's cuisine wheel — 25 food cultures including Korean, Italian, Ethiopian, and more. Land on Mix It Up for a fusion result.",
  alternates: { canonical: "https://toeta.app/wheel" },
};

export default function WheelPage() {
  return <WheelClient />;
}
