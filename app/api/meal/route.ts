// GET /api/meal — consolidated meal API (single serverless function for all meal-related calls)
//
// ?type=random              (default) Today's random free-tier meal. ?dessert=true appends a TheMealDB dessert.
// ?type=breakfast|lunch|dinner|dessert  (premium) Spoonacular personalised meal — respects ?diet= and ?intolerances=
// ?type=pantry              (premium, deferred) Spoonacular findByIngredients — returns 402 until implemented.

import { NextRequest, NextResponse } from "next/server";
import { getRandomMeal, getRandomDessert } from "@/lib/mealdb";
import { checkAndAlertSpoonacularQuota } from "@/lib/spoonacular-usage";
import { createClient } from "@/lib/supabase/server";
import type { Meal } from "@/types/meal";

const VALID_DIETS = new Set(["vegetarian", "vegan", "ketogenic", "paleo", "pescetarian", "whole30"]);
const VALID_ALLERGENS = new Set(["dairy", "egg", "gluten", "peanut", "shellfish", "soy", "tree nut"]);

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
}

// ── Calorie floors — keeps meal types substantive (no shakes as dinner) ──────

const MIN_CALORIES: Record<string, number> = {
  breakfast: 300,
  lunch:     400,
  dinner:    500,
  dessert:   150,
};

// ── Helpers ──────────────────────────────────────────────────────────────────

function capitalize(s: string | undefined): string {
  if (!s) return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// Spoonacular mis-tags many recipes with meal-time labels in dishTypes regardless of
// the mealType filter. Strip those out and use the first structural tag instead.
const MEAL_TIME_TAGS = new Set([
  "breakfast", "lunch", "dinner", "brunch", "supper", "morning meal",
]);

function toMealFromSpoonacular(recipe: SpoonacularRecipe, requestedType: string): Meal {
  const structuralTag = recipe.dishTypes?.find((t) => !MEAL_TIME_TAGS.has(t.toLowerCase()));
  return {
    id: String(recipe.id),
    name: recipe.title,
    category: capitalize(structuralTag) || (requestedType === "dessert" ? "Dessert" : "Meal"),
    area: capitalize(recipe.cuisines?.[0]) || (recipe.readyInMinutes ? `${recipe.readyInMinutes} min` : ""),
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
  intolerances?: string,
  excludeIds?: string[]
): Promise<Meal> {
  const key = process.env.SPOONACULAR_API_KEY;
  if (!key) throw new Error("SPOONACULAR_API_KEY not configured");

  function buildParams(withCalorieFloor: boolean): URLSearchParams {
    const p = new URLSearchParams({
      apiKey: key!,
      number: "20",
      sort: "popularity",
      sortDirection: "desc",
      addRecipeInformation: "true",
      instructionsRequired: "true",
      fillIngredients: "true",
    });
    // Only filter by mealType for dessert — breakfast/lunch/dinner tags are unreliable
    // in Spoonacular's data and severely limit the pool.
    if (mealType === "dessert") p.set("mealType", "dessert");
    if (diet) p.set("diet", diet);
    if (intolerances) p.set("intolerances", intolerances);
    if (withCalorieFloor && MIN_CALORIES[mealType]) {
      p.set("minCalories", String(MIN_CALORIES[mealType]));
    }
    return p;
  }

  async function callAPI(params: URLSearchParams): Promise<{ results: SpoonacularRecipe[]; res: Response }> {
    const res = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?${params}`,
      { cache: "no-store" }
    );
    if (!res.ok) {
      const body = await res.text();
      throw new Error(`Spoonacular ${res.status}: ${body}`);
    }
    const data = (await res.json()) as SpoonacularSearchResponse;
    return { results: data.results, res };
  }

  // First attempt: all filters including calorie floor
  let { results, res } = await callAPI(buildParams(true));

  // If filters drained the pool, retry without the calorie floor (costs one extra point)
  if (results.length === 0 && MIN_CALORIES[mealType]) {
    ({ results, res } = await callAPI(buildParams(false)));
  }

  // Read quota headers from the last response and alert if needed
  const quotaUsed = parseInt(res.headers.get("X-API-Quota-Used") ?? "0", 10);
  const quotaLeft = parseInt(res.headers.get("X-API-Quota-Left") ?? "0", 10);
  if (quotaUsed > 0) {
    checkAndAlertSpoonacularQuota(quotaUsed, quotaLeft).catch(() => {});
  }

  if (!results.length) throw new Error("No recipes found for these preferences");

  // Prefer recipes not seen in the last 30 days; fall back to full pool if history covers all
  let candidates = results;
  if (excludeIds?.length) {
    const excluded = new Set(excludeIds);
    const fresh = candidates.filter((r) => !excluded.has(String(r.id)));
    if (fresh.length > 0) candidates = fresh;
  }

  const pick = candidates[Math.floor(Math.random() * candidates.length)];
  return toMealFromSpoonacular(pick, mealType);
}

// ── Route handler ────────────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") ?? "random";

  // Premium Spoonacular meal types — require auth + active subscription
  if (type === "breakfast" || type === "lunch" || type === "dinner" || type === "dessert") {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Authentication required" }, { status: 401 });

    const { data: profile } = await supabase
      .from("profiles")
      .select("is_premium")
      .eq("id", user.id)
      .single();
    if (!profile?.is_premium) {
      return NextResponse.json({ error: "Premium subscription required" }, { status: 403 });
    }

    const rawDiet = searchParams.get("diet");
    const rawIntolerances = searchParams.get("intolerances");
    const diet = rawDiet && VALID_DIETS.has(rawDiet) ? rawDiet : undefined;
    const intolerances = rawIntolerances
      ? rawIntolerances.split(",").map(s => s.trim().toLowerCase()).filter(s => VALID_ALLERGENS.has(s)).join(",") || undefined
      : undefined;
    const excludeIds = searchParams.get("exclude")?.split(",").filter(Boolean) ?? [];

    try {
      const meal = await fetchSpoonacularMeal(type, diet, intolerances, excludeIds);
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
