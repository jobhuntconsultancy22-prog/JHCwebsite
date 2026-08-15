"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "@/components/ToastProvider";

export default function ApplyForm({ jobId, userId }) {
  const [coverNote, setCoverNote] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const showToast = useToast();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (!file) {
      setError("Please attach your resume (PDF or Word, max 5MB).");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("That file is over 5MB — please attach a smaller file.");
      return;
    }

    setLoading(true);
    const supabase = createClient();

    const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
    const path = `${userId}/${jobId}-${Date.now()}-${safeName}`;

    const { error: uploadError } = await supabase.storage.from("resumes").upload(path, file);
    if (uploadError) {
      setLoading(false);
      setError("Couldn't upload your resume: " + uploadError.message);
      return;
    }

    const { error: insertError } = await supabase.from("applications").insert({
      job_id: jobId,
      candidate_id: userId,
      resume_path: path,
      cover_note: coverNote
    });

    setLoading(false);
    if (insertError) {
      setError("Couldn't submit your application: " + insertError.message);
      return;
    }

    showToast("Application submitted", "success");
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="apply-success">
        <div className="apply-success-check">
          <svg viewBox="0 0 52 52" fill="none">
            <circle className="apply-success-circle" cx="26" cy="26" r="24" stroke="currentColor" strokeWidth="2" />
            <path className="apply-success-tick" d="M15 27l7 7 15-15" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3>Application submitted</h3>
        <p>We've received your resume and details — you can track this application's status anytime from your dashboard.</p>
        <Link href="/dashboard" className="btn btn-gold">View my applications</Link>
      </div>
    );
  }

  return (
    <form className="panel" onSubmit={handleSubmit}>
      {error && <div className="auth-error">{error}</div>}
      <div className="field">
        <label htmlFor="cover-note">A note for the team (optional)</label>
        <textarea
          id="cover-note"
          rows="4"
          placeholder="Why you're a fit, notice period, expected salary, etc."
          value={coverNote}
          onChange={(e) => setCoverNote(e.target.value)}
        ></textarea>
      </div>
      <div className="field">
        <label htmlFor="resume">Resume (PDF or Word, max 5MB)</label>
        <input
          id="resume"
          type="file"
          accept=".pdf,.doc,.docx"
          required
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>
      <button type="submit" className="btn btn-gold" disabled={loading}>
        {loading ? "Submitting..." : "Submit application"}
      </button>
    </form>
  );
}
