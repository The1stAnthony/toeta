import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy | Toeta",
  description: "How Toeta collects and uses data. We keep it minimal — no accounts, no selling your information.",
  alternates: { canonical: "https://toeta.app/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="July 21, 2026">

      <section>
        <h2>Overview</h2>
        <p>
          Toeta (&ldquo;we,&rdquo; &ldquo;our,&rdquo; &ldquo;us&rdquo;) is a free meal suggestion app at{" "}
          <a href="https://toeta.app">toeta.app</a>. We collect minimal data and
          never sell your personal information. This policy explains what we
          collect, why, and your rights.
        </p>
      </section>

      <section>
        <h2>What We Collect</h2>
        <ul>
          <li>
            <strong>Analytics data</strong> — We use Google Analytics (GA4) to
            understand how visitors use Toeta: pages visited, session length, and
            general device/browser type. IP addresses are anonymized. We do not
            track individuals across sites.
          </li>
          <li>
            <strong>Local meal cache</strong> — Today&rsquo;s meal suggestion is stored
            in your browser&rsquo;s <code>localStorage</code> so we don&rsquo;t re-fetch it
            on every page refresh. This data never leaves your device and we
            cannot access it.
          </li>
          <li>
            <strong>Advertising cookies</strong> — We use Google AdSense, which
            may set cookies for ad personalization. You can opt out via your
            browser settings or Google&rsquo;s Ad Settings.
          </li>
        </ul>
      </section>

      <section>
        <h2>What We Do NOT Collect</h2>
        <ul>
          <li>We have no account system — no name, email, or password is ever collected.</li>
          <li>We do not sell, share, or broker any user data to third parties.</li>
          <li>We do not track you across other websites.</li>
        </ul>
      </section>

      <section>
        <h2>Third-Party Services</h2>
        <ul>
          <li>
            <strong>TheMealDB</strong> — Recipe data is fetched from{" "}
            <a href="https://www.themealdb.com" target="_blank" rel="noopener noreferrer">
              themealdb.com
            </a>. No user data is sent to them.
          </li>
          <li>
            <strong>Google Analytics</strong> — Behavioral analytics. See{" "}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
              Google&rsquo;s Privacy Policy
            </a>.
          </li>
          <li>
            <strong>Google AdSense</strong> — Advertising. See{" "}
            <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">
              Google&rsquo;s Ad Policy
            </a>.
          </li>
          <li>
            <strong>Vercel</strong> — Hosting. Standard server logs (IP address,
            request path, timestamp) are retained per{" "}
            <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
              Vercel&rsquo;s Privacy Policy
            </a>.
          </li>
        </ul>
      </section>

      <section>
        <h2>Your Rights</h2>
        <ul>
          <li>
            <strong>Clear your local data</strong> — Open your browser&rsquo;s developer
            tools, go to Application → Local Storage → toeta.app, and delete any
            entries.
          </li>
          <li>
            <strong>Opt out of Analytics</strong> — Install the{" "}
            <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
              Google Analytics opt-out browser add-on
            </a>{" "}
            or use your browser&rsquo;s privacy mode.
          </li>
          <li>
            <strong>GDPR / CCPA</strong> — If you are in the EU, UK, or California
            and have questions about your data rights, contact us at the address
            below.
          </li>
        </ul>
      </section>

      <section>
        <h2>Children&rsquo;s Privacy</h2>
        <p>
          Toeta is not directed at children under 13. We do not knowingly collect
          data from children. If you believe a child has provided us information,
          contact us and we will delete it promptly.
        </p>
      </section>

      <section>
        <h2>Changes to This Policy</h2>
        <p>
          We may update this policy as Toeta grows (e.g., when we add accounts or
          premium features). The &ldquo;Last updated&rdquo; date at the top reflects the
          most recent revision. Continued use of Toeta after changes constitutes
          acceptance.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          Questions? Email us at{" "}
          <a href="mailto:sean.a.protho1@gmail.com">sean.a.protho1@gmail.com</a>.
        </p>
      </section>

    </LegalPage>
  );
}
