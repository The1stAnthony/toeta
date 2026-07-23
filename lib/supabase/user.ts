import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database";

type Profile = Database["public"]["Tables"]["profiles"]["Row"] | null;

export const getUserAndProfile = cache(async () => {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return { user: null, profile: null as Profile, isPremium: false };
    const { data: profile } = await supabase
      .from("profiles")
      .select("is_premium, subscribed_since, stripe_customer_id")
      .eq("id", user.id)
      .single();
    return {
      user,
      profile: profile as Profile,
      isPremium: profile?.is_premium ?? false,
    };
  } catch {
    return { user: null, profile: null as Profile, isPremium: false };
  }
});
