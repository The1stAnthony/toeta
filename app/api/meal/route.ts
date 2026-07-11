// API route: GET /api/meal
// Returns the day's meal (and optionally a dessert).
// Keeping API calls server-side protects any future API keys from being exposed.

import { NextRequest, NextResponse } from "next/server";
import { getRandomMeal, getRandomDessert } from "@/lib/mealdb";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
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
