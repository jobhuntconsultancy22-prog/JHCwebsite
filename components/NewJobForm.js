"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function NewJobForm() {
  const [form, setForm] = useState({
    title: "",
    department: "",
    location: "Chennai",
    job_type: "Full-time",
    salary_range: "",
    description: "",
    requirements: ""
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const {
      data: { user }
    } = await supabase.auth.getUser();

    const { error: insertError } = await supabase.from("jobs").insert({
      ...form,
      posted_by: user.id,
      status: "open"
    });

    setLoading(false);
    if (insertError) {
      setError(insertError.message);
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <form className="panel" onSubmit={handleSubmit}>
      {error && <div className="auth-error">{error}</div>}
      <div className="field">
        <label htmlFor="title">Job title</label>
        <input id="title" required value={form.title} onChange={(e) => update("title", e.target.value)} />
      </div>
      <div className="field-row">
        <div className="field">
          <label htmlFor="department">Department</label>
          <input id="department" value={form.department} onChange={(e) => update("department", e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="location">Location</label>
          <input id="location" value={form.location} onChange={(e) => update("location", e.target.value)} />
        </div>
      </div>
      <div className="field-row">
        <div className="field">
          <label htmlFor="job_type">Job type</label>
          <select id="job_type" value={form.job_type} onChange={(e) => update("job_type", e.target.value)}>
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Contract</option>
            <option>Internship</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="salary_range">Salary range (optional)</label>
          <input id="salary_range" placeholder="e.g. ₹4–6 LPA" value={form.salary_range} onChange={(e) => update("salary_range", e.target.value)} />
        </div>
      </div>
      <div className="field">
        <label htmlFor="description">Role description</label>
        <textarea id="description" rows="5" value={form.description} onChange={(e) => update("description", e.target.value)}></textarea>
      </div>
      <div className="field">
        <label htmlFor="requirements">Requirements</label>
        <textarea id="requirements" rows="4" value={form.requirements} onChange={(e) => update("requirements", e.target.value)}></textarea>
      </div>
      <button type="submit" className="btn btn-gold" disabled={loading}>
        {loading ? "Posting..." : "Post role"}
      </button>
    </form>
  );
}
