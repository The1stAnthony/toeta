import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { stripe } from "@/lib/stripe";

const VALID_PRICES = new Set(
  [
    process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY,
    process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_YEARLY,
  ].filter((p): p is string => typeof p === "string" && p.length > 0)
);

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let priceId: string | undefined;
  try {
    const body = (await req.json()) as { priceId?: string };
    priceId = body.priceId;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!priceId || !VALID_PRICES.has(priceId))
    return NextResponse.json({ error: "Invalid price" }, { status: 400 });

  try {
    const { data: profile } = await supabase
      .from("profiles")
      .select("stripe_customer_id")
      .eq("id", user.id)
      .single();

    let customerId = profile?.stripe_customer_id ?? null;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: { supabase_user_id: user.id },
      });
      customerId = customer.id;
      await supabase
        .from("profiles")
        .update({ stripe_customer_id: customerId })
        .eq("id", user.id);
    }

    const origin = new URL(req.url).origin;
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "subscription",
      success_url: `${origin}/dashboard?premium=success`,
      cancel_url: `${origin}/premium`,
      metadata: { supabase_user_id: user.id },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[stripe/checkout]", err);
    return NextResponse.json({ error: "Could not create checkout session" }, { status: 500 });
  }
}
