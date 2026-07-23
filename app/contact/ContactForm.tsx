"use client";

import { useState } from "react";
import styles from "./contact.module.scss";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus]   = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (res.ok) {
        setStatus("sent");
        setName(""); setEmail(""); setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className={styles.successBox}>
        <span className={styles.successIcon}>✓</span>
        <p>Message sent! I&rsquo;ll get back to you soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>
      <div className={styles.field}>
        <label htmlFor="contact-name" className={styles.label}>Name</label>
        <input
          id="contact-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
          placeholder="Your name"
          required
          disabled={status === "sending"}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="contact-email" className={styles.label}>Email</label>
        <input
          id="contact-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          placeholder="you@example.com"
          required
          disabled={status === "sending"}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="contact-message" className={styles.label}>Message</label>
        <textarea
          id="contact-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={styles.textarea}
          placeholder="What's on your mind?"
          rows={5}
          required
          disabled={status === "sending"}
        />
      </div>

      {status === "error" && (
        <p className={styles.errorMsg}>Something went wrong — please try again.</p>
      )}

      <button
        type="submit"
        className={styles.submitBtn}
        disabled={status === "sending" || !name.trim() || !email.trim() || !message.trim()}
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
