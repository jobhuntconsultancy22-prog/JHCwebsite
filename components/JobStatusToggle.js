"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "@/components/ToastProvider";

export default function JobStatusToggle({ jobId, initialStatus }) {
  const [status, setStatus] = useState(initialStatus);
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const showToast = useToast();

  async function toggle() {
    setSaving(true);
    const newStatus = status === "open" ? "closed" : "open";
    const supabase = createClient();
    const { error } = await supabase
      .from("jobs")
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq("id", jobId);
    setSaving(false);
    if (!error) {
      setStatus(newStatus);
      showToast(newStatus === "open" ? "Role reopened" : "Role closed", "success");
      router.refresh();
    } else {
      showToast("Couldn't update the role status", "error");
    }
  }

  return (
    <button className="btn btn-outline" onClick={toggle} disabled={saving}>
      {saving ? "Saving..." : status === "open" ? "Close this role" : "Reopen this role"}
    </button>
  );
}
