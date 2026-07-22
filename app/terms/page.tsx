import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service | Toeta",
  description: "Terms of Service for Toeta — free daily meal suggestion app at toeta.app.",
  alternates: { canonical: "https://toeta.app/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" updated="July 21, 2026">

      <section>
        <h2>Acceptance</h2>
        <p>
          By using Toeta at <a href="https://toeta.app">toeta.app</a> you agree
          to these terms. If you don&rsquo;t agree, please don&rsquo;t use the site.
        </p>
      </section>

      <section>
        <h2>What Toeta Is</h2>
        <p>
          Toeta is a free meal suggestion service. It picks a random dinner idea
          for you each day using data from TheMealDB. It is provided for personal,
          non-commercial use. It is not a nutritional service and is not a
          substitute for professional dietary advice.
        </p>
      </section>

      <section>
        <h2>Recipe Data</h2>
        <p>
          Recipe content is sourced from{" "}
          <a href="https://www.themealdb.com" target="_blank" rel="noopener noreferrer">
            TheMealDB
          </a>
          , a third-party database. Toeta does not author, curate, or verify
          individual recipes. We are not responsible for the accuracy,
          completeness, or safety of any recipe. Always use common sense when
          preparing food, especially for guests with allergies or dietary
          restrictions.
        </p>
      </section>

      <section>
        <h2>No Warranty</h2>
        <p>
          Toeta is provided &ldquo;as is&rdquo; without any warranty of any kind. We do
          not guarantee that the service will be uninterrupted, error-free, or
          that results will meet your expectations. You use Toeta at your own
          risk.
        </p>
      </section>

      <section>
        <h2>Acceptable Use</h2>
        <ul>
          <li>Do not scrape or automate requests to Toeta or TheMealDB.</li>
          <li>Do not attempt to reverse engineer, exploit, or overload the service.</li>
          <li>Do not use Toeta for any unlawful purpose.</li>
        </ul>
      </section>

      <section>
        <h2>Intellectual Property</h2>
        <p>
          The Toeta brand, design, and original code are owned by the creator.
          Recipe content belongs to TheMealDB and its respective contributors.
          You may not reproduce, redistribute, or commercially exploit Toeta&rsquo;s
          original content without permission.
        </p>
      </section>

      <section>
        <h2>Affiliate Links</h2>
        <p>
          Toeta may include affiliate links to grocery and meal kit services
          (e.g., Instacart, HelloFresh). These are labeled where required by law.
          We may earn a commission if you make a purchase through these links at
          no additional cost to you.
        </p>
      </section>

      <section>
        <h2>Changes to the Service</h2>
        <p>
          We may add, remove, or change features at any time without notice.
          Toeta&rsquo;s free tier is not guaranteed to remain free indefinitely, though
          we&rsquo;ll always try to keep a meaningful free option available.
        </p>
      </section>

      <section>
        <h2>Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by law, Toeta and its creator are not
          liable for any direct, indirect, incidental, or consequential damages
          arising from your use of the service.
        </p>
      </section>

      <section>
        <h2>Governing Law</h2>
        <p>
          These terms are governed by the laws of the United States. Any disputes
          shall be resolved in the jurisdiction where the creator is located.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          Questions about these terms?{" "}
          <a href="mailto:sean.a.protho1@gmail.com">sean.a.protho1@gmail.com</a>
        </p>
      </section>

    </LegalPage>
  );
}
