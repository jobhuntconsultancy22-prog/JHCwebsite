import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request) {
  // 1. Confirm the caller is logged in and is themselves a 'team' member.
  //    (Belt-and-suspenders: middleware.js already blocks non-team visitors
  //    from ever reaching /admin pages, but an API route is reachable
  //    directly, so it re-checks independently.)
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  const { data: callerProfile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!callerProfile || callerProfile.role !== "team") {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }

  const { email, fullName } = await request.json();
  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  // 2. Use the admin client (service role key) to create the login and
  //    send them an email invite where they set their own password.
  const admin = createAdminClient();
  const { data: invited, error: inviteError } = await admin.auth.admin.inviteUserByEmail(email, {
    data: { full_name: fullName || "" },
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?redirect=/admin`
  });

  if (inviteError) {
    return NextResponse.json({ error: inviteError.message }, { status: 400 });
  }

  // 3. The signup trigger (see supabase/schema.sql) already created a
  //    'candidate' profile row for this new user — promote it to 'team'.
  const newUserId = invited.user.id;
  const { error: updateError } = await admin
    .from("profiles")
    .update({ role: "team", full_name: fullName || "" })
    .eq("id", newUserId);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
