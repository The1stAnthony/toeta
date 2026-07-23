import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { stripe } from "@/lib/stripe";
import type Stripe from "stripe";
import type { Database } from "@/types/database";

function getAdminClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) return NextResponse.json({ error: "Missing signature" }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("[stripe/webhook] Signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const admin = getAdminClient();

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.supabase_user_id;
      if (userId) {
        await admin
          .from("profiles")
          .update({
            is_premium: true,
            subscribed_since: new Date().toISOString(),
            stripe_customer_id: session.customer as string,
          })
          .eq("id", userId);
      } else {
        console.error("[stripe/webhook] checkout.session.completed missing supabase_user_id — session:", session.id);
      }
      break;
    }

    case "customer.subscription.updated": {
      const sub = event.data.object as Stripe.Subscription;
      const isPremium = sub.status === "active" || sub.status === "trialing";
      await admin
        .from("profiles")
        .update({ is_premium: isPremium })
        .eq("stripe_customer_id", sub.customer as string);
      break;
    }

    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;
      await admin
        .from("profiles")
        .update({ is_premium: false })
        .eq("stripe_customer_id", sub.customer as string);
      break;
    }

    case "invoice.paid": {
      const invoice = event.data.object as Stripe.Invoice;
      const hasSubscription =
        invoice.parent?.type === "subscription_details" &&
        invoice.parent.subscription_details?.subscription;
      if (hasSubscription) {
        await admin
          .from("profiles")
          .update({ is_premium: true })
          .eq("stripe_customer_id", invoice.customer as string);
      }
      break;
    }

    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice;
      console.warn("[stripe/webhook] Payment failed for customer:", invoice.customer);
      break;
    }

    default:
      break;
  }

  return NextResponse.json({ received: true });
}
