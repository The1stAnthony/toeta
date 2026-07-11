// Wrapper for TheMealDB API — used for the free tier daily meal
// Docs: https://www.themealdb.com/api.php

import type { Meal, RawMealDBMeal } from "@/types/meal";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

// Converts TheMealDB's flat ingredient/measure fields into a clean array
function parseIngredients(raw: RawMealDBMeal): { name: string; measure: string }[] {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const name = raw[`strIngredient${i}`];
    const measure = raw[`strMeasure${i}`];
    if (name && name.trim()) {
      ingredients.push({ name: name.trim(), measure: measure?.trim() ?? "" });
    }
  }
  return ingredients;
}

function toMeal(raw: RawMealDBMeal): Meal {
  return {
    id: raw.idMeal,
    name: raw.strMeal,
    category: raw.strCategory,
    area: raw.strArea,
    instructions: raw.strInstructions,
    imageUrl: raw.strMealThumb,
    sourceUrl: raw.strSource ?? "",
    youtubeUrl: raw.strYoutube ?? "",
    ingredients: parseIngredients(raw),
  };
}

// Returns a single random meal
export async function getRandomMeal(): Promise<Meal> {
  const res = await fetch(`${BASE_URL}/random.php`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch meal from TheMealDB");
  const data = await res.json();
  return toMeal(data.meals[0]);
}

// Returns a random meal filtered to the "Dessert" category
export async function getRandomDessert(): Promise<Meal> {
  // TheMealDB doesn't support random + filter together, so we fetch all desserts
  // and pick one at random client-side
  const res = await fetch(`${BASE_URL}/filter.php?c=Dessert`, { cache: "force-cache" });
  if (!res.ok) throw new Error("Failed to fetch desserts from TheMealDB");
  const data = await res.json();

  const list: { idMeal: string }[] = data.meals;
  const pick = list[Math.floor(Math.random() * list.length)];

  // Fetch full details for the chosen dessert
  const detailRes = await fetch(`${BASE_URL}/lookup.php?i=${pick.idMeal}`, { cache: "no-store" });
  if (!detailRes.ok) throw new Error("Failed to fetch dessert details");
  const detail = await detailRes.json();
  return toMeal(detail.meals[0]);
}
