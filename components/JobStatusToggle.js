"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function JobStatusToggle({ jobId, initialStatus }) {
  const [status, setStatus] = useState(initialStatus);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

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
      router.refresh();
    }
  }

  return (
    <button className="btn btn-outline" onClick={toggle} disabled={saving}>
      {saving ? "Saving..." : status === "open" ? "Close this role" : "Reopen this role"}
    </button>
  );
}
