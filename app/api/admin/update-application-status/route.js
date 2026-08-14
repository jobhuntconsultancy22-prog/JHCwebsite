import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendStatusEmail } from "@/lib/email";

export async function POST(request) {
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

  const { applicationId, newStatus } = await request.json();
  if (!applicationId || !newStatus) {
    return NextResponse.json({ error: "applicationId and newStatus are required" }, { status: 400 });
  }

  // 1. Update the status (RLS still applies here — only allowed because the
  //    caller is a 'team' member, verified above).
  const { data: updatedApp, error: updateError } = await supabase
    .from("applications")
    .update({ status: newStatus, updated_at: new Date().toISOString() })
    .eq("id", applicationId)
    .select("*, jobs(title), profiles(id, full_name)")
    .single();

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 400 });
  }

  // 2. Look up the candidate's email (lives in auth.users, not in profiles,
  //    so this needs the admin client) and send the notification.
  const admin = createAdminClient();
  const { data: candidateAuth } = await admin.auth.admin.getUserById(updatedApp.profiles.id);

  if (candidateAuth?.user?.email) {
    await sendStatusEmail({
      to: candidateAuth.user.email,
      candidateName: updatedApp.profiles.full_name,
      jobTitle: updatedApp.jobs?.title || "the role",
      status: newStatus
    });
  }

  return NextResponse.json({ success: true });
}
