import { Suspense } from "react";
import { getUserAndProfile } from "@/lib/supabase/user";
import DashboardClient from "./DashboardClient";
import DashboardLoading from "./loading";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Today's Meal",
  description: "Your free daily meal suggestion. One great dinner idea every day — no sign-up needed.",
  alternates: { canonical: "https://toeta.app/dashboard" },
};

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ premium?: string }>;
}) {
  const { isPremium, profile } = await getUserAndProfile();
  const params = await searchParams;
  const premiumSuccess = params.premium === "success";

  return (
    <Suspense fallback={<DashboardLoading />}>
      <DashboardClient
        isPremium={isPremium}
        premiumSuccess={premiumSuccess}
        diet={profile?.diet ?? undefined}
        allergens={profile?.allergens ?? undefined}
      />
    </Suspense>
  );
}
