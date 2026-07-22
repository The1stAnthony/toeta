# Toeta

> One great meal, every day. No decision fatigue.

Toeta is a daily meal suggestion app. Free users get one meal per day plus a dessert roll and a cuisine spin wheel, powered by TheMealDB. Premium users (coming soon) get personalized, diet-filtered meals via Spoonacular.

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
- [x] Ad slots wired (AdSense publisher ID ca-pub-5976607298154940, slot IDs set)
- [x] Buy Me a Coffee link (seanaprothu)
- [x] Google Analytics (G-8K9T0C9H84)
- [x] Beta badge, Toeta branding, Nav with full page links
- [x] Daily meal caching (localStorage — one meal per day)
- [x] About, Privacy Policy, Terms of Service pages
- [x] JSON-LD structured data (WebApplication + FAQPage schemas)
- [x] Sitemap + robots.txt
- [x] Domain: toeta.app (Namecheap)
- [x] Deployed to Vercel (auto-deploys on push to main)

### Action Items
- [ ] **Affiliate: Instacart** — sign up at impact.com, replace `YOUR_TAG_HERE` in `components/MealCard/MealCard.tsx`
- [ ] **Affiliate: HelloFresh / EveryPlate** — sign up at impact.com ($10–20 per signup)
- [ ] **Google AdSense** — reapply at google.com/adsense (denied for thin content — now resolved with added pages)
- [ ] **Google Search Console** — submit sitemap at toeta.app/sitemap.xml, request indexing for all pages
- [ ] **Premium build** — see roadmap below

### Roadmap (Premium)
1. Supabase auth (user accounts)
2. Stripe subscriptions — $2/month or $20/year; webhooks set `is_premium` in Supabase
3. Spoonacular API — diet/allergen/quick-meal filtering for premium users (via `GET /api/meal?type=filter`)
4. Premium UI gates — hide AdSlots for premium users, unlock premium features
5. Pantry feature — manual ingredient input → Spoonacular `findByIngredients` (via `GET /api/meal?type=pantry`)
6. Founding member tracking — award badge after 12 continuous months via `subscribed_since` in Supabase

---

## Serverless Function Budget (Vercel Hobby: 12 max)

| Function | File |
|---|---|
| Next.js renderer | Vercel-managed |
| `/api/meal` | `app/api/meal/route.ts` — handles `?type=random\|pantry\|filter` |
| `/api/auth/callback` | *(future)* Supabase OAuth redirect |
| `/api/stripe/webhook` | *(future)* Stripe payment events |

**Current: 2 · Post-premium: 4 · Remaining headroom: 8**

---

## Stack

| Layer | Tech |
|---|---|
| Frontend | Next.js 16 + TypeScript + SCSS Modules |
| Meal Data | TheMealDB (free, no key needed) |
| Premium Meals | Spoonacular (future) |
| Auth / DB | Supabase (future) |
| Payments | Stripe (future) |
| Hosting | Vercel (hobby plan) |
| Analytics | Google Analytics 4 (G-8K9T0C9H84) |
| Ads | Google AdSense (ca-pub-5976607298154940) |
