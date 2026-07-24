import type { Metadata } from "next";
import Link from "next/link";
import styles from "./about.module.scss";

export const metadata: Metadata = {
  title: "About — Anthony Sean Protho",
  description:
    "Toeta was built 5 years ago in college by Anthony Sean Protho to solve one simple problem: figuring out what to eat. Here's the story.",
  alternates: { canonical: "https://toeta.app/about" },
  openGraph: {
    title: "About Toeta — The Story Behind the App",
    description:
      "Anthony Sean Protho built Toeta in college when he couldn't decide what to eat. Here's why it exists and where it's going.",
    url: "https://toeta.app/about",
    siteName: "Toeta",
    type: "website",
    images: [{ url: "/cover.png", width: 1200, height: 630, alt: "Toeta — Free Daily Meal Idea Generator" }],
  },
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
            Hi Chefs! For those of you who don&apos;t know me, I&apos;m Anthony — a solutions
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
            I created Toeta almost 6 years ago in college, when I was trying to figure
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
          <p>
            The name isn&apos;t <i>that</i> random. Toeta is a combination of the words "To" and "Eat"! In Estonian, <em>toeta</em> is a verb that
            means &ldquo;to support, to back, or to prop up.&rdquo; And that&apos;s exactly what
            this app is here to do — we support you in making your next meal decision when your
            brain won&apos;t.
          </p>
        </section>

        <section className={styles.section}>
          <h2>What&apos;s Live</h2>
          <p>
            Premium members get multiple personalized meal suggestions every day
             — filtered to their diet and allergens, with a per-meal re-roll.
            The cuisine spin wheel and dessert roll are free for everyone, no account needed.
          </p>
          <p>
            On the horizon: calorie considerations, the ability to share your grandma's recipes, 
            and pantry mode, where Toeta helps you cook from what
            you already have — reducing food waste one cabinet at a time.
            We are blessed to have the ability to explore our food, so let&apos;s
            not waste it.
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
          <p>
            Join the Kitchen! Being classified as a Toeta founding member, you'll have 
            priority access to new features as we build them, and a direct line to shape where the app goes next. Want to support without subscribing? 
            Click the Buy me a coffee link in the footer! Or contact us on other ways to support.
          </p>
        </section>

        <section className={styles.cta}>
          <h2 className={styles.ctaHeading}>Become a Founding Member.</h2>
          <p className={styles.ctaSub}>
            Founding members keep Toeta independent and growing. For less than
            a coffee a month, you get a personalized meal experience — and an
            early spot in a community of people who eat curiously.
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
          <Link href="/premium" className={styles.ctaBtn}>
            Become a founding member
          </Link>
        </section>
      </div>
    </main>
  );
}
