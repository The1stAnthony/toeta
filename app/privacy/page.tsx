import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage/LegalPage";
import AdPageConfig from "@/components/AdPageConfig/AdPageConfig";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Toeta collects, uses, and protects your data. Compliant with GDPR, UK GDPR, and CCPA.",
  alternates: { canonical: "https://toeta.app/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <AdPageConfig anchorOnly />
      <LegalPage title="Privacy Policy" updated="July 23, 2026">

      <section>
        <h2>Overview</h2>
        <p>
          Toeta (&ldquo;we,&rdquo; &ldquo;our,&rdquo; &ldquo;us&rdquo;) is a meal suggestion app at{" "}
          <a href="https://toeta.app">toeta.app</a>. We collect minimal data and
          never sell your personal information. This policy covers what we collect,
          the legal basis for doing so, how long we keep it, and your rights under
          GDPR, UK GDPR, and CCPA.
        </p>
      </section>

      <section>
        <h2>Data Controller</h2>
        <p>
          The data controller is the individual operating Toeta. For any privacy
          request, use the{" "}
          <a href="/contact">contact form</a>. We respond to all requests within
          30 days.
        </p>
      </section>

      <section>
        <h2>What We Collect &amp; Why</h2>
        <ul>
          <li>
            <strong>Analytics data</strong> — We use Google Analytics 4 to
            understand how visitors use Toeta (pages visited, session length, general
            device and country). IP addresses are anonymized before storage. We do
            not use this data to identify individuals.{" "}
            <em>Legal basis: consent (GDPR Art. 6(1)(a)).</em>
          </li>
          <li>
            <strong>Advertising cookies</strong> — Free-tier users may see ads via
            Google AdSense. AdSense may set cookies for ad personalization and
            measurement. Premium subscribers are fully excluded — the AdSense script
            is never loaded for their sessions.{" "}
            <em>Legal basis: consent (GDPR Art. 6(1)(a)).</em>
          </li>
          <li>
            <strong>Account data</strong> — If you create a Toeta account, we
            collect your email address and a securely hashed password via Supabase.
            We also store your subscription status, member-since date, and any meal
            preferences (diet type, allergens) you choose to set.{" "}
            <em>Legal basis: contract (GDPR Art. 6(1)(b)).</em>
          </li>
          <li>
            <strong>Payment data</strong> — Premium subscriptions are processed by
            Stripe. We store only a Stripe customer ID — never card numbers, bank
            details, or full payment information.{" "}
            <em>Legal basis: contract &amp; legal obligation (GDPR Art. 6(1)(b)(c)).</em>
          </li>
          <li>
            <strong>Browser cache (localStorage)</strong> — Today&rsquo;s meal suggestion
            and your 30-day meal history are stored in your browser&rsquo;s localStorage.
            This data never leaves your device; we cannot access it. You can clear
            it from Account → Reset history, or via your browser developer tools.{" "}
            <em>This is not a cookie and does not require consent under ePrivacy.</em>
          </li>
        </ul>
      </section>

      <section>
        <h2>Cookies</h2>
        <p>
          We only set tracking cookies <strong>after you give consent</strong> via
          the banner shown on your first visit. You can withdraw consent at any time
          by clicking &ldquo;Cookie preferences&rdquo; in the footer.
        </p>
        <ul>
          <li>
            <strong>Google Analytics</strong> — Sets <code>_ga</code> (2-year
            retention) and <code>_ga_*</code> session cookies. Used to count unique
            visitors and understand usage patterns.
          </li>
          <li>
            <strong>Google AdSense</strong> — Sets various cookies (up to 13-month
            retention) for ad personalization, frequency capping, and conversion
            measurement. Only set for free-tier users who have given consent.
          </li>
          <li>
            <strong>Supabase auth</strong> — Sets a session cookie (<code>sb-*</code>)
            strictly necessary to keep you logged in. This cookie is set only when
            you create an account or sign in, and is exempt from consent requirements
            as a technically necessary cookie under ePrivacy.
          </li>
        </ul>
      </section>

      <section>
        <h2>What We Do NOT Collect</h2>
        <ul>
          <li>We never collect your full name, phone number, or physical address.</li>
          <li>We do not sell, rent, or broker any user data to third parties.</li>
          <li>We do not build behavioral profiles for advertising outside of what Google AdSense does directly.</li>
          <li>We do not track you across other websites outside of standard GA4 / AdSense behavior.</li>
          <li>We never store raw payment card numbers.</li>
        </ul>
      </section>

      <section>
        <h2>Data Retention</h2>
        <ul>
          <li><strong>Analytics data</strong> — Retained by Google for up to 14 months (GA4 default), then automatically deleted.</li>
          <li><strong>Account data</strong> — Retained until you request deletion. Contact us via the contact form to delete your account.</li>
          <li><strong>Stripe payment records</strong> — Retained as required by financial regulations (typically 7 years).</li>
          <li><strong>Server logs (Vercel)</strong> — Retained per Vercel&rsquo;s policy (typically 30 days).</li>
          <li><strong>Browser localStorage</strong> — Persists until you clear it or use the Reset History feature in your account.</li>
        </ul>
      </section>

      <section>
        <h2>Third-Party Services</h2>
        <ul>
          <li>
            <strong>TheMealDB</strong> — Free-tier recipe data. No user data is sent to them.
          </li>
          <li>
            <strong>Spoonacular</strong> — Premium recipe data. Your diet and allergen
            preferences are sent as anonymous query parameters — no account identifier
            is shared with Spoonacular.
          </li>
          <li>
            <strong>Supabase</strong> — Authentication and database. Stores your email
            and profile data. See{" "}
            <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer">
              Supabase&rsquo;s Privacy Policy
            </a>.
          </li>
          <li>
            <strong>Stripe</strong> — Payment processing. See{" "}
            <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer">
              Stripe&rsquo;s Privacy Policy
            </a>.
          </li>
          <li>
            <strong>Google Analytics</strong> — Behavioral analytics. See{" "}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
              Google&rsquo;s Privacy Policy
            </a>.
          </li>
          <li>
            <strong>Google AdSense</strong> — Advertising (free tier only). See{" "}
            <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">
              Google&rsquo;s Ad Policy
            </a>.
          </li>
          <li>
            <strong>Vercel</strong> — Hosting. Standard server logs (IP address,
            request path, timestamp) per{" "}
            <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
              Vercel&rsquo;s Privacy Policy
            </a>.
          </li>
          <li>
            <strong>Resend</strong> — Email delivery for contact form messages. Your
            name and email are included in messages you send us. See{" "}
            <a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
              Resend&rsquo;s Privacy Policy
            </a>.
          </li>
        </ul>
      </section>

      <section>
        <h2>International Transfers</h2>
        <p>
          Toeta is operated from the United States. Our service providers (Google,
          Supabase, Stripe, Vercel) may process data in multiple countries. Where
          data is transferred outside the EU/EEA, our providers rely on Standard
          Contractual Clauses or equivalent transfer mechanisms under GDPR Chapter V.
        </p>
      </section>

      <section>
        <h2>Your Rights</h2>
        <p>Under GDPR (EU/UK) and CCPA (California) you have the right to:</p>
        <ul>
          <li>
            <strong>Withdraw cookie consent</strong> — Click &ldquo;Cookie preferences&rdquo;
            in the site footer at any time. This resets your choice and no further
            tracking cookies will be set until you re-consent.
          </li>
          <li>
            <strong>Access your data</strong> — Request a copy of the personal data
            we hold about you.
          </li>
          <li>
            <strong>Correct inaccurate data</strong> — Ask us to fix incorrect
            information.
          </li>
          <li>
            <strong>Erase your data</strong> — Request deletion of your account and
            all associated personal data. Contact us via the contact form.
          </li>
          <li>
            <strong>Restrict processing</strong> — Ask us to pause processing of
            your data in certain circumstances.
          </li>
          <li>
            <strong>Data portability</strong> — Request your data in a
            machine-readable format.
          </li>
          <li>
            <strong>Object to processing</strong> — Object to processing based on
            legitimate interests (we do not rely on this basis for analytics or ads).
          </li>
          <li>
            <strong>Lodge a complaint</strong> — If you believe we have handled your
            data unlawfully, you have the right to lodge a complaint with your local
            data protection authority (e.g., the ICO in the UK, or your EU member
            state&rsquo;s DPA).
          </li>
          <li>
            <strong>Clear your local data</strong> — Open your browser&rsquo;s developer
            tools → Application → Local Storage → toeta.app, and delete any entries.
            Or use Account → Reset history.
          </li>
        </ul>
      </section>

      <section>
        <h2>Children&rsquo;s Privacy</h2>
        <p>
          Toeta is not directed at children under 13 (or under 16 in the EU). We
          do not knowingly collect data from children. If you believe a child has
          provided us information, contact us and we will delete it promptly.
        </p>
      </section>

      <section>
        <h2>Changes to This Policy</h2>
        <p>
          We may update this policy as Toeta grows. The &ldquo;Last updated&rdquo; date at
          the top reflects the most recent revision. For material changes, we will
          update the date and note the change.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          Privacy requests, data deletion, or questions:{" "}
          <a href="/contact">contact form</a>.
        </p>
      </section>

    </LegalPage>
    </>
  );
}
