# Toeta

> One great meal, every day. No decision fatigue.

Toeta is a daily meal suggestion app. Free users get one meal per day plus a dessert roll, powered by TheMealDB. Premium users (coming soon) get personalized, diet-filtered meals via Spoonacular.

Built by [@The1stAnthony](https://github.com/The1stAnthony)

---

## Running Locally

```bash
npm install
npm run dev -- --port 3001
```

Open [http://localhost:3001](http://localhost:3001)

---

## Environment Variables

Create a `.env.local` file in the project root:

```env
# Google Analytics — get your ID from analytics.google.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

## Launch Checklist

### Live & Done
- [x] Daily meal card (TheMealDB, free, no rate limits)
- [x] Dessert random roll
- [x] "Shop Ingredients" affiliate button (Instacart)
- [x] Ad slots (banner + rectangle, ready for AdSense tags)
- [x] Buy Me a Coffee link
- [x] Google Analytics wired up (needs Measurement ID)
- [x] Beta badge, Toeta branding
- [x] Daily meal caching (localStorage — one meal per day, no repeat API calls)

### Needs Action Before Launch
- [ ] **Add GA4 Measurement ID** — create property at analytics.google.com, add `NEXT_PUBLIC_GA_ID` to `.env.local` and hosting env vars
- [ ] **Get domain** — toeta.app (check Cloudflare Registrar)
- [ ] **Deploy** — Vercel recommended (free tier, zero config for Next.js)

### Monetization — In Progress
- [ ] **Affiliate: Instacart** — sign up at impact.com, search "Instacart", replace `YOUR_TAG_HERE` in `components/MealCard/MealCard.tsx`
- [ ] **Affiliate: HelloFresh** — sign up at impact.com, $10–20 per signup commission
- [ ] **Affiliate: EveryPlate** — sign up at impact.com, similar meal kit commission
- [ ] **Google AdSense** — apply at google.com/adsense *after* site is live with real traffic + Analytics data; swap placeholder divs in `components/AdSlot/AdSlot.tsx` with your `<ins>` tags

### Future (Post-Launch)
- [ ] Supabase auth (sign up / sign in)
- [ ] User profiles saved server-side (diet preferences, allergies)
- [ ] Premium tier — Spoonacular API, personalized & filtered meals
- [ ] Favorites, skip, save-for-later recipe actions
- [ ] React Native mobile app (shared logic with this codebase)

---

## Stack

| Layer | Tech |
|---|---|
| Frontend | Next.js 16 + TypeScript + SCSS Modules |
| Meal Data | TheMealDB (free, no key needed) |
| Premium Meals | Spoonacular (future) |
| Auth / DB | Supabase (future) |
| Payments | Stripe (future) |
| Hosting | Vercel (recommended) or self-hosted |
| Analytics | Google Analytics 4 |
