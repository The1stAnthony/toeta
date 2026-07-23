# Toeta

> One great meal, every day. No decision fatigue.

Toeta is a daily meal suggestion app. Free users get one meal per day plus a dessert roll and a cuisine spin wheel, powered by TheMealDB. Premium members ($2/month or $20/year) get personalised Breakfast, Lunch, and Dinner cards via Spoonacular — with dietary filters and per-meal re-rolls.

**Live at [toeta.app](https://toeta.app)** — Built by [@The1stAnthony](https://github.com/The1stAnthony)

---

## Running Locally

```bash
npm install
npm run dev -- --port 3001
```

Open [http://localhost:3001](http://localhost:3001)

---

## Environment Variables

Create a `.env.local` file in the project root (see `.env.example`):

```env
NEXT_PUBLIC_GA_ID=G-8K9T0C9H84

# Supabase
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...

# Stripe
STRIPE_SECRET_KEY=...
STRIPE_WEBHOOK_SECRET=...
NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY=...
NEXT_PUBLIC_STRIPE_PRICE_ID_YEARLY=...

# Spoonacular (premium meals)
SPOONACULAR_API_KEY=...
```

Variables are also set in the Vercel dashboard under Project Settings → Environment Variables.

---

## Status

### Live & Done
- [x] Daily meal card (TheMealDB, free, no rate limits)
- [x] Dessert random roll
- [x] Cuisine spin wheel (25 cuisines, Mix It Up fusion mode)
- [x] 25 cuisine guide pages with recipes + restaurant links
- [x] "Shop Ingredients" affiliate button (Instacart — replace `YOUR_TAG_HERE` with real tag)
- [x] Ad slots wired (AdSense publisher ID ca-pub-5976607298154940, slot IDs set) — free tier only
- [x] AdSense script gated — not loaded for premium users (blocks Auto ads too)
- [x] Buy Me a Coffee link (seanaprothu)
- [x] Google Analytics (G-8K9T0C9H84)
- [x] Daily meal caching (localStorage — one meal per day)
- [x] About, Privacy Policy, Terms of Service pages
- [x] JSON-LD structured data (WebApplication + FAQPage schemas)
- [x] Sitemap + robots.txt
- [x] Domain: toeta.app (Namecheap)
- [x] Deployed to Vercel (auto-deploys on push to main)
- [x] **Supabase auth** — email + password sign-up/sign-in, no email confirmation required
- [x] **Stripe subscriptions** — $2/month or $20/year, webhooks update `is_premium` in Supabase
- [x] **Customer portal** — cancel, update payment, switch plans via Stripe hosted portal
- [x] **Premium dashboard** — Breakfast, Lunch, Dinner via Spoonacular + per-meal re-roll
- [x] **Diet & allergen preferences** — saved to profile, applied to all Spoonacular calls
- [x] **Premium dessert** — Spoonacular dessert roll respects dietary filters
- [x] **Re-roll nudge** — free-tier users see a "Go Premium to re-roll" prompt

### Action Items
- [ ] **Affiliate: Instacart** — sign up at impact.com, replace `YOUR_TAG_HERE` in `components/MealCard/MealCard.tsx`
- [ ] **Affiliate: HelloFresh / EveryPlate** — sign up at impact.com ($10–20 per signup)
- [ ] **Google AdSense** — reapply at google.com/adsense; once approved, enable Auto ads in dashboard
- [ ] **Google Search Console** — submit sitemap at toeta.app/sitemap.xml, request indexing for all pages
- [ ] **Supabase migration** — run `supabase/migrations.sql` Migration 002 in the SQL editor to add `diet` and `allergens` columns to the profiles table
- [ ] **Spoonacular** — retrieve API key from spoonacular.com and add as `SPOONACULAR_API_KEY` in `.env.local` + Vercel

---

## Serverless Function Budget (Vercel Hobby: 12 max)

| Function | File |
|---|---|
| Next.js renderer | Vercel-managed |
| `/api/meal` | `app/api/meal/route.ts` — random (free) + Spoonacular types (premium) |
| `/api/auth/callback` | Supabase OAuth redirect |
| `/api/auth/signup` | Server-side user creation (bypasses email confirmation) |
| `/api/stripe/checkout` | Creates Stripe Checkout session |
| `/api/stripe/portal` | Stripe billing portal redirect |
| `/api/stripe/webhook` | Handles Stripe payment events |

**Current: 6 · Remaining headroom: 6**

---

## Stack

| Layer | Tech |
|---|---|
| Frontend | Next.js 16 + TypeScript + SCSS Modules |
| Meal Data (free) | TheMealDB (free, no key needed) |
| Meal Data (premium) | Spoonacular (Cook plan, ~$29/mo) |
| Auth / DB | Supabase |
| Payments | Stripe |
| Hosting | Vercel (hobby plan) |
| Analytics | Google Analytics 4 (G-8K9T0C9H84) |
| Ads | Google AdSense (ca-pub-5976607298154940, free tier only) |

## Free vs Premium

| Feature | Free | Premium ($2/mo) |
|---|---|---|
| Daily meal | ✅ 1 dinner (TheMealDB) | ✅ Breakfast + Lunch + Dinner (Spoonacular) |
| Dessert roll | ✅ Random (TheMealDB) | ✅ Filtered (Spoonacular) |
| Re-roll | ❌ | ✅ Once per meal per day |
| Diet / allergen filters | ❌ | ✅ |
| Ads | ✅ Google AdSense | ❌ Ad-free |
| Cuisine wheel | ✅ | ✅ |
