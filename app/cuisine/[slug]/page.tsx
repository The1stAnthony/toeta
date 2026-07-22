import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CUISINES, getCuisineBySlug } from "@/lib/cuisines";
import styles from "./cuisine.module.scss";

// Pre-render all 25 cuisine pages at build time
export function generateStaticParams() {
  return CUISINES.map((c) => ({ slug: c.slug }));
}

// Revalidate once a day so recipe picks refresh without a full redeploy
export const revalidate = 86400;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cuisine = getCuisineBySlug(slug);
  if (!cuisine) return {};
  return {
    title: `${cuisine.name} Food & Recipes | Toeta`,
    description: `${cuisine.description.split(".")[0]}. Find ${cuisine.name} recipes and restaurants.`,
  };
}

interface MealPreview {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

async function fetchRecipes(areas: string[]): Promise<MealPreview[]> {
  if (areas.length === 0) return [];
  try {
    const results = await Promise.all(
      areas.map((area) =>
        fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?a=${encodeURIComponent(area)}`,
          { next: { revalidate: 86400 } }
        )
          .then((r) => r.json())
          .then((d: { meals: MealPreview[] }) => d.meals ?? [])
          .catch(() => [] as MealPreview[])
      )
    );
    const combined = results.flat();
    // Deterministic shuffle via sort on idMeal so SSG output is stable
    combined.sort((a, b) => (a.idMeal > b.idMeal ? 1 : -1));
    return combined.slice(0, 8);
  } catch {
    return [];
  }
}

export default async function CuisinePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cuisine = getCuisineBySlug(slug);
  if (!cuisine) notFound();

  const recipes = await fetchRecipes(cuisine.mealdbAreas);
  const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(cuisine.searchTerm + " restaurants")}`;
  const yelpUrl = `https://www.yelp.com/search?find_desc=${encodeURIComponent(cuisine.searchTerm + " restaurants")}`;

  return (
    <main className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <span className={styles.emoji} aria-hidden="true">{cuisine.emoji}</span>
        <h1 className={styles.title}>{cuisine.name}</h1>
        <p className={styles.description}>{cuisine.description}</p>
        <Link href="/wheel" className={styles.spinAgain}>
          🎡 Spin again
        </Link>
      </section>

      {/* Recipes */}
      {recipes.length > 0 && (
        <section className={styles.section} aria-labelledby="recipes-heading">
          <h2 id="recipes-heading" className={styles.sectionTitle}>
            {cuisine.name} Recipes
          </h2>
          <p className={styles.sectionSub}>
            Sourced from TheMealDB. Click any dish for the full recipe.
          </p>
          <ul className={styles.recipeGrid} role="list">
            {recipes.map((meal) => (
              <li key={meal.idMeal}>
                <a
                  href={`https://www.themealdb.com/meal/${meal.idMeal}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.recipeCard}
                >
                  <div className={styles.recipeThumbWrapper}>
                    <Image
                      src={`${meal.strMealThumb}/preview`}
                      alt={meal.strMeal}
                      width={200}
                      height={200}
                      className={styles.recipeThumb}
                    />
                  </div>
                  <p className={styles.recipeName}>{meal.strMeal}</p>
                </a>
              </li>
            ))}
          </ul>

          <a
            href={`https://www.google.com/search?q=${encodeURIComponent(cuisine.name + " recipes")}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.moreLink}
          >
            See more {cuisine.name} recipes on Google →
          </a>
        </section>
      )}

      {/* No MealDB mapping — show recipe search link instead */}
      {recipes.length === 0 && (
        <section className={styles.section} aria-labelledby="recipes-heading">
          <h2 id="recipes-heading" className={styles.sectionTitle}>
            Find {cuisine.name} Recipes
          </h2>
          <div className={styles.searchLinks}>
            <a
              href={`https://www.google.com/search?q=${encodeURIComponent(cuisine.name + " recipes")}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.searchBtn}
            >
              🔍 Search {cuisine.name} recipes
            </a>
            <a
              href={`https://www.youtube.com/results?search_query=${encodeURIComponent(cuisine.name + " recipe")}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.searchBtn}
            >
              ▶ Watch {cuisine.name} cooking videos
            </a>
          </div>
        </section>
      )}

      {/* Restaurants */}
      <section className={styles.section} aria-labelledby="restaurants-heading">
        <h2 id="restaurants-heading" className={styles.sectionTitle}>
          Find {cuisine.name} Restaurants
        </h2>
        <p className={styles.sectionSub}>
          Not cooking tonight? Find somewhere nearby instead.
        </p>
        <div className={styles.restaurantLinks}>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.restaurantBtn}
          >
            <span aria-hidden="true">📍</span> Google Maps
          </a>
          <a
            href={yelpUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.restaurantBtn}
          >
            <span aria-hidden="true">⭐</span> Yelp
          </a>
          <a
            href={`https://www.doordash.com/search/store/${encodeURIComponent(cuisine.searchTerm)}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.restaurantBtn}
          >
            <span aria-hidden="true">🚗</span> DoorDash
          </a>
          <a
            href={`https://www.ubereats.com/category/${encodeURIComponent(cuisine.searchTerm.toLowerCase())}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.restaurantBtn}
          >
            <span aria-hidden="true">🟢</span> Uber Eats
          </a>
        </div>
      </section>

      {/* CTA back to dashboard */}
      <section className={styles.cta}>
        <p>Ready to cook tonight?</p>
        <Link href="/dashboard" className={styles.ctaBtn}>
          See today&apos;s meal suggestion →
        </Link>
      </section>
    </main>
  );
}
