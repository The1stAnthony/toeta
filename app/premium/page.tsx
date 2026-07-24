import type { Metadata } from "next";
import { Suspense } from "react";
import { getUserAndProfile } from "@/lib/supabase/user";
import PremiumClient from "./PremiumClient";

export const metadata: Metadata = {
  title: "Premium — Personalized Meal Suggestions",
  description:
    "Unlock personalised diet profiles, allergen filters, and budget-friendly meal suggestions with Toeta Premium. $2/month or $20/year.",
  alternates: { canonical: "https://toeta.app/premium" },
};

export default async function PremiumPage() {
  const { user, isPremium } = await getUserAndProfile();
  return (
    <Suspense>
      <PremiumClient user={user} isPremium={isPremium} />
    </Suspense>
  );
}
