"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import styles from "./account.module.scss";

const DIET_OPTIONS = [
  { value: "vegetarian", label: "Vegetarian" },
  { value: "vegan", label: "Vegan" },
  { value: "gluten free", label: "Gluten-Free" },
  { value: "ketogenic", label: "Keto" },
  { value: "paleo", label: "Paleo" },
];

const ALLERGEN_OPTIONS = [
  { value: "dairy", label: "Dairy" },
  { value: "egg", label: "Egg" },
  { value: "gluten", label: "Gluten" },
  { value: "peanut", label: "Peanut" },
  { value: "shellfish", label: "Shellfish" },
  { value: "soy", label: "Soy" },
  { value: "tree nut", label: "Tree Nuts" },
  { value: "wheat", label: "Wheat" },
];

interface Props {
  userId: string;
  initialDiet: string;
  initialAllergens: string;
}

export default function PreferencesForm({ userId, initialDiet, initialAllergens }: Props) {
  const [diet, setDiet] = useState(initialDiet);
  const [allergens, setAllergens] = useState<string[]>(
    initialAllergens ? initialAllergens.split(",").filter(Boolean) : []
  );
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function toggleAllergen(value: string) {
    setAllergens((prev) =>
      prev.includes(value) ? prev.filter((a) => a !== value) : [...prev, value]
    );
    setSaved(false);
  }

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    setError(null);

    const supabase = createClient();
    const { error: sbError } = await supabase
      .from("profiles")
      .update({ diet: diet || null, allergens: allergens.join(",") || null })
      .eq("id", userId);

    if (sbError) {
      setError("Could not save preferences. Please try again.");
    } else {
      setSaved(true);
      // Clear cached meals so next dashboard load uses new preferences
      const today = new Date().toISOString().slice(0, 10);
      ["breakfast", "lunch", "dinner", "dessert"].forEach((type) => {
        localStorage.removeItem(`toeta-meal-${type}-${today}`);
      });
    }
    setSaving(false);
  }

  return (
    <div className={styles.preferences}>
      <h2 className={styles.prefHeading}>Meal Preferences</h2>
      <p className={styles.prefNote}>
        These filters apply to your premium meals via Spoonacular. Changes take effect on your next dashboard visit.
      </p>

      <div className={styles.prefGroup}>
        <span className={styles.prefLabel}>Diet</span>
        <div className={styles.prefChips}>
          <button
            type="button"
            className={`${styles.chip} ${diet === "" ? styles.chipActive : ""}`}
            onClick={() => { setDiet(""); setSaved(false); }}
          >
            No preference
          </button>
          {DIET_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              className={`${styles.chip} ${diet === opt.value ? styles.chipActive : ""}`}
              onClick={() => { setDiet(opt.value); setSaved(false); }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.prefGroup}>
        <span className={styles.prefLabel}>Avoid (allergens / intolerances)</span>
        <div className={styles.prefChips}>
          {ALLERGEN_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              className={`${styles.chip} ${allergens.includes(opt.value) ? styles.chipActive : ""}`}
              onClick={() => toggleAllergen(opt.value)}
            >
              {allergens.includes(opt.value) ? `✓ ${opt.label}` : opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.prefActions}>
        <button
          className={styles.prefSaveBtn}
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? "Saving…" : "Save Preferences"}
        </button>
        {saved && <span className={styles.prefSavedMsg}>✓ Saved</span>}
        {error && <span className={styles.prefError}>{error}</span>}
      </div>
    </div>
  );
}
