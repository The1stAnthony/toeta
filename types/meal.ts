// Shapes returned by TheMealDB and used throughout the app

export interface Meal {
  id: string;
  name: string;
  category: string;
  area: string;
  instructions: string;
  imageUrl: string;
  sourceUrl: string;
  youtubeUrl: string;
  ingredients: Ingredient[];
  readyInMinutes?: number;
}

export interface Ingredient {
  name: string;
  measure: string;
}

// Raw shape from TheMealDB API
export interface RawMealDBMeal {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strSource: string;
  strYoutube: string;
  [key: string]: string | null; // ingredient/measure fields are dynamic (strIngredient1..20)
}
