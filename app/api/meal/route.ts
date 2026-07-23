// GET /api/meal — consolidated meal API (single serverless function for all meal-related calls)
//
// ?type=random              (default) Today's random free-tier meal. ?dessert=true appends a TheMealDB dessert.
// ?type=breakfast|lunch|dinner|dessert  (premium) Spoonacular personalised meal — respects ?diet= and ?intolerances=
// ?type=pantry              (premium, deferred) Spoonacular findByIngredients — returns 402 until implemented.

import { NextRequest, NextResponse } from "next/server";
import { getRandomMeal, getRandomDessert } from "@/lib/mealdb";
import { checkAndAlertSpoonacularQuota } from "@/lib/spoonacular-usage";
import type { Meal } from "@/types/meal";

// ── Spoonacular types ────────────────────────────────────────────────────────

interface SpoonacularIngredient {
  id: number;
  name: string;
  nameClean?: string;
  amount: number;
  unit: string;
  original: string;
}

interface SpoonacularRecipe {
  id: number;
  title: string;
  image?: string;
  sourceUrl?: string;
  readyInMinutes?: number;
  diets?: string[];
  cuisines?: string[];
  dishTypes?: string[];
  instructions?: string;
  extendedIngredients?: SpoonacularIngredient[];
}

interface SpoonacularSearchResponse {
  results: SpoonacularRecipe[];
  totalResults: number;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function capitalize(s: string | undefined): string {
  if (!s) return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function toMealFromSpoonacular(recipe: SpoonacularRecipe): Meal {
  return {
    id: String(recipe.id),
    name: recipe.title,
    category: capitalize(recipe.diets?.[0]) || capitalize(recipe.dishTypes?.[0]) || "Premium",
    area: capitalize(recipe.cuisines?.[0]) || "International",
    instructions: recipe.instructions ?? "",
    imageUrl: recipe.image ?? "",
    sourceUrl: recipe.sourceUrl ?? "",
    youtubeUrl: "",
    readyInMinutes: recipe.readyInMinutes,
    ingredients:
      recipe.extendedIngredients?.map((ing) => ({
        name: ing.nameClean ?? ing.name,
        measure: ing.original,
      })) ?? [],
  };
}

async function fetchSpoonacularMeal(
  mealType: string,
  diet?: string,
  intolerances?: string
): Promise<Meal> {
  const key = process.env.SPOONACULAR_API_KEY;
  if (!key) throw new Error("SPOONACULAR_API_KEY not configured");

  const params = new URLSearchParams({
    apiKey: key,
    mealType,
    number: "10",
    addRecipeInformation: "true",
    instructionsRequired: "true",
    fillIngredients: "true",
  });
  if (diet) params.set("diet", diet);
  if (intolerances) params.set("intolerances", intolerances);

  const res = await fetch(
    `https://api.spoonacular.com/recipes/complexSearch?${params}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Spoonacular ${res.status}: ${body}`);
  }

  // Read quota headers and fire usage alert non-blocking
  const quotaUsed = parseInt(res.headers.get("X-API-Quota-Used") ?? "0", 10);
  const quotaLeft = parseInt(res.headers.get("X-API-Quota-Left") ?? "0", 10);
  if (quotaUsed > 0) {
    checkAndAlertSpoonacularQuota(quotaUsed, quotaLeft).catch(() => {});
  }

  const data = (await res.json()) as SpoonacularSearchResponse;
  if (!data.results.length) throw new Error("No recipes found for these preferences");

  const pick = data.results[Math.floor(Math.random() * data.results.length)];
  return toMealFromSpoonacular(pick);
}

// ── Route handler ────────────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") ?? "random";

  // Premium Spoonacular meal types
  if (type === "breakfast" || type === "lunch" || type === "dinner" || type === "dessert") {
    const diet = searchParams.get("diet") ?? undefined;
    const intolerances = searchParams.get("intolerances") ?? undefined;
    // Spoonacular uses "maincourse" for dinner
    const spoonacularType = type === "dinner" ? "maincourse" : type;

    try {
      const meal = await fetchSpoonacularMeal(spoonacularType, diet, intolerances);
      return NextResponse.json({ meal });
    } catch (err) {
      if (err instanceof Error && err.message.includes("SPOONACULAR_API_KEY")) {
        return NextResponse.json({ error: "Premium meals not configured" }, { status: 503 });
      }
      console.error("[/api/meal spoonacular]", err);
      return NextResponse.json({ error: "Could not fetch meal" }, { status: 500 });
    }
  }

  // Pantry stub — deferred
  if (type === "pantry") {
    return NextResponse.json({ error: "Premium feature coming soon" }, { status: 402 });
  }

  // Free tier: random TheMealDB meal
  const includeDessert = searchParams.get("dessert") === "true";
  try {
    const meal = await getRandomMeal();
    const dessert = includeDessert ? await getRandomDessert() : null;
    return NextResponse.json({ meal, dessert });
  } catch (err) {
    console.error("[/api/meal]", err);
    return NextResponse.json({ error: "Could not fetch meal" }, { status: 500 });
  }
}
