import type { Metadata } from "next";
import Link from "next/link";
import styles from "./about.module.scss";

export const metadata: Metadata = {
  title: "About Toeta | Anthony Sean Protho",
  description:
    "Toeta was built 5 years ago in college by Anthony Sean Protho to solve one simple problem: figuring out what to eat. Here's the story.",
  alternates: { canonical: "https://toeta.app/about" },
};

export default function AboutPage() {
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <h1 className={styles.name}>Anthony Sean Protho</h1>
        <p className={styles.role}>Independent Software Solutions Architect</p>
      </header>

      <div className={styles.body}>
        <section className={styles.section}>
          <p>
            For those of you who don&apos;t know me, I&apos;m Anthony — a solutions
            architect with a variety of talents and one core drive: creating
            solutions to real problems. I love to help people. I learn things the
            hard way so that you don&apos;t have to. I most often do this by
            automating, reducing friction, and creating tools or lessons so that
            people can navigate life easier than I have had to.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Why Toeta?</h2>
          <p>
            I created Toeta 5 years ago in college, when I was trying to figure
            out what to eat. Before generative AI. And even now with generative
            AI, the options tend to be the same six suggestions, with random
            ingredients like potatoes added to the shopping list. I wanted to
            ensure there was less mental friction to figuring out what to eat —
            especially for people as indecisive as me.
          </p>
          <p>
            Toeta helps you explore your tastebuds with cuisines from around the
            world, expanding your culinary skills with new and different recipes
            as opposed to making the same things every day, and answers the
            question of what you should eat this week.
          </p>
        </section>

        <section className={styles.section}>
          <h2>What&apos;s Coming</h2>
          <p>
            With premium features in the making, we are looking to create an
            application tied to your dietary requirements, allergen sensitive, and
            budget-friendly meals — while helping you use what&apos;s already in your
            cabinets to reduce food waste. We are blessed to have the ability to
            explore our food, so let&apos;s not waste it.
          </p>
        </section>

        <section className={styles.section}>
          <h2>The Bigger Picture</h2>
          <p>
            It is not only the Toeta dream to help you figure out what you want
            to eat every day, but to reduce food waste — and even support ending
            hunger at the source, by supporting foundations that solve the
            structural problems with food in regions, as opposed to ruining local
            ecosystems and economic systems by giving too much food that the
            region doesn&apos;t need, killing their farms.
          </p>
        </section>

        <section className={styles.cta}>
          <h2 className={styles.ctaHeading}>We need 100 members.</h2>
          <p className={styles.ctaSub}>
            This will show proof of concept for the website, and so long as we
            have this number, we can keep Toeta alive indefinitely. If this is a
            tool you love, please consider supporting it.
          </p>
          <div className={styles.pricing}>
            <div className={styles.priceCard}>
              <span className={styles.priceAmount}>$2</span>
              <span className={styles.pricePer}>/month</span>
            </div>
            <span className={styles.priceDivider}>or</span>
            <div className={styles.priceCard}>
              <span className={styles.priceAmount}>$20</span>
              <span className={styles.pricePer}>/year</span>
              <span className={styles.priceSavings}>2 months free</span>
            </div>
          </div>
          <Link href="/signup" className={styles.ctaBtn}>
            Join the founding 100
          </Link>
        </section>
      </div>
    </main>
  );
}
