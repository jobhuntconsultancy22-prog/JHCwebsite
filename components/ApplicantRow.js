"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const STATUSES = ["Applied", "Reviewing", "Shortlisted", "Interview", "Selected", "Rejected"];

export default function ApplicantRow({ application }) {
  const [status, setStatus] = useState(application.status);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  async function handleChange(e) {
    const newStatus = e.target.value;
    const previousStatus = status;
    setStatus(newStatus); // optimistic update
    setSaving(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/update-application-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ applicationId: application.id, newStatus })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Update failed");
      router.refresh();
    } catch (err) {
      setStatus(previousStatus); // roll back on failure
      setError(err.message);
    } finally {
      setSaving(false);
    }
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
        {error && <div style={{ color: "#b3261e", fontSize: "0.78rem", marginTop: 4 }}>{error}</div>}
      </td>
    </tr>
  );
}
