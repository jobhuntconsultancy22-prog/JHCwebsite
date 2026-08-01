"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const STATUSES = ["Applied", "Reviewing", "Shortlisted", "Interview", "Selected", "Rejected"];

export default function ApplicantRow({ application }) {
  const [status, setStatus] = useState(application.status);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  async function handleChange(e) {
    const newStatus = e.target.value;
    setStatus(newStatus);
    setSaving(true);
    const supabase = createClient();
    await supabase
      .from("applications")
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq("id", application.id);
    setSaving(false);
    router.refresh();
  }

  return (
    <tr>
      <td>{application.profiles?.full_name || "—"}</td>
      <td>{application.profiles?.phone || "—"}</td>
      <td>{new Date(application.applied_at).toLocaleDateString()}</td>
      <td>
        {application.resumeUrl ? (
          <a href={application.resumeUrl} target="_blank" rel="noopener">Download</a>
        ) : (
          "—"
        )}
      </td>
      <td>
        <select value={status} onChange={handleChange} disabled={saving}>
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </td>
    </tr>
  );
}
