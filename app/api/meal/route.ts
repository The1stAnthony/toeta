// GET /api/meal — consolidated meal API (single serverless function for all meal-related calls)
//
// ?type=random            (default) Today's random meal. ?dessert=true appends a dessert.
// ?type=pantry            (premium) Spoonacular findByIngredients — add when Spoonacular key is live.
// ?type=filter            (premium) Spoonacular complex-search with diet/allergen/cuisine filters.
//
// Keeping all meal logic here avoids new Vercel function slots for each premium feature.

import { NextRequest, NextResponse } from "next/server";
import { getRandomMeal, getRandomDessert } from "@/lib/mealdb";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") ?? "random";

  if (type === "pantry" || type === "filter") {
    // Stubs — implemented when Spoonacular key is configured
    return NextResponse.json({ error: "Premium feature coming soon" }, { status: 402 });
  }

  // type === "random" (free tier)
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
