import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getUserAndProfile } from "@/lib/supabase/user";
import SignOutButton from "./SignOutButton";
import ManageSubscriptionButton from "./ManageSubscriptionButton";
import PreferencesForm from "./PreferencesForm";
import ClearHistoryButton from "./ClearHistoryButton";
import styles from "./account.module.scss";

export const metadata: Metadata = {
  title: "Account",
  description: "Manage your Toeta account and subscription.",
};

export default async function AccountPage() {
  const { user, profile, isPremium } = await getUserAndProfile();

  if (!user) redirect("/signup?next=/account");

  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <h1 className={styles.heading}>Your Account</h1>

        <div className={styles.field}>
          <span className={styles.label}>Email</span>
          <span className={styles.value}>{user.email}</span>
        </div>

        <div className={styles.field}>
          <span className={styles.label}>Plan</span>
          <span className={styles.value}>
            {isPremium ? (
              <span className={styles.premiumBadge}>⭐ Premium</span>
            ) : (
              "Free"
            )}
          </span>
        </div>

        {isPremium && profile?.subscribed_since && (
          <div className={styles.field}>
            <span className={styles.label}>Member since</span>
            <span className={styles.value}>
              {new Date(profile.subscribed_since).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        )}

        {isPremium ? (
          <ManageSubscriptionButton />
        ) : (
          <a href="/premium" className={styles.upgradeBtn}>
            Upgrade to Premium →
          </a>
        )}

        <hr className={styles.divider} />

        {isPremium && (
          <PreferencesForm
            userId={user.id}
            initialDiet={profile?.diet ?? ""}
            initialAllergens={profile?.allergens ?? ""}
          />
        )}

        <hr className={styles.divider} />
        <ClearHistoryButton />

        <hr className={styles.divider} />
        <SignOutButton />
      </div>
    </main>
  );
}
