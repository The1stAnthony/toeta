import { createClient } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";
import type { Database } from "@/types/database";

export async function POST(req: NextRequest) {
  let email: string, password: string;
  try {
    const body = (await req.json()) as { email?: string; password?: string };
    email = body.email?.trim() ?? "";
    password = body.password ?? "";
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
  }

  const admin = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  const { data: { user }, error } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  if (!user) {
    return NextResponse.json({ error: "Could not create account" }, { status: 500 });
  }

  // Use upsert: Supabase's on_auth_user_created trigger may have already inserted
  // the profile row. A plain insert would fail with a duplicate key error,
  // causing the signup route to delete the user it just created.
  const { error: profileError } = await admin
    .from("profiles")
    .upsert({ id: user.id, email }, { onConflict: "id" });
  if (profileError) {
    console.error("[auth/signup] Profile upsert failed:", profileError.message);
    await admin.auth.admin.deleteUser(user.id);
    return NextResponse.json({ error: "Could not create account. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
