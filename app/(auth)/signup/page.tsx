import type { Metadata } from "next";
import { Suspense } from "react";
import SignupForm from "./SignupForm";
import styles from "./signup.module.scss";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to Toeta with a magic link — no password needed. Unlock premium features.",
};

export default function SignupPage() {
  return (
    <main className={styles.main}>
      <Suspense>
        <SignupForm />
      </Suspense>
    </main>
  );
}
