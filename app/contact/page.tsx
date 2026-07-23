import type { Metadata } from "next";
import styles from "./contact.module.scss";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact | Toeta",
  description: "Get in touch with the Toeta team — questions, feedback, or anything else.",
  alternates: { canonical: "https://toeta.app/contact" },
};

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Get in touch</h1>
      <p className={styles.sub}>
        Questions, feedback, or just want to say hi? Send a message and I&rsquo;ll get back to you.
      </p>
      <ContactForm />
    </div>
  );
}
