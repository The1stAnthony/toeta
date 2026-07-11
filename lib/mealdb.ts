// Wrapper for TheMealDB API — used for the free tier daily meal
// Docs: https://www.themealdb.com/api.php

import type { Meal, RawMealDBMeal } from "@/types/meal";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

// Categories we treat as valid "main meals" — excludes Dessert intentionally
const MAIN_MEAL_CATEGORIES = [
  "Beef", "Chicken", "Lamb", "Pasta", "Pork",
  "Seafood", "Miscellaneous", "Vegetarian", "Vegan", "Breakfast", "Side", "Starter",
];

// TheMealDB sometimes returns UTF-8 with a wrong content-type header, causing
// double-encoding. Decoding explicitly as UTF-8 from the raw buffer fixes it.
async function fetchJson(url: string, init?: RequestInit): Promise<unknown> {
  const res = await fetch(url, init);
  if (!res.ok) throw new Error(`TheMealDB request failed: ${res.status}`);
  const buffer = await res.arrayBuffer();
  const text = new TextDecoder("utf-8").decode(buffer);
  return JSON.parse(text);
}

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

// Returns a random main meal — retries up to 3 times if a dessert comes back
export async function getRandomMeal(): Promise<Meal> {
  for (let attempt = 0; attempt < 3; attempt++) {
    const data = await fetchJson(`${BASE_URL}/random.php`, { cache: "no-store" }) as { meals: RawMealDBMeal[] };
    const meal = toMeal(data.meals[0]);
    if (MAIN_MEAL_CATEGORIES.includes(meal.category)) return meal;
  }
  // Fallback: fetch directly from a guaranteed main-meal category
  const data = await fetchJson(`${BASE_URL}/filter.php?c=Chicken`, { cache: "no-store" }) as { meals: { idMeal: string }[] };
  const pick = data.meals[Math.floor(Math.random() * data.meals.length)];
  const detail = await fetchJson(`${BASE_URL}/lookup.php?i=${pick.idMeal}`, { cache: "no-store" }) as { meals: RawMealDBMeal[] };
  return toMeal(detail.meals[0]);
}

// Returns a random dessert
export async function getRandomDessert(): Promise<Meal> {
  // Fetch all desserts and pick one randomly, then get full details
  const data = await fetchJson(`${BASE_URL}/filter.php?c=Dessert`, { cache: "force-cache" }) as { meals: { idMeal: string }[] };
  const pick = data.meals[Math.floor(Math.random() * data.meals.length)];
  const detail = await fetchJson(`${BASE_URL}/lookup.php?i=${pick.idMeal}`, { cache: "no-store" }) as { meals: RawMealDBMeal[] };
  return toMeal(detail.meals[0]);
}
