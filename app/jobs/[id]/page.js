import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ApplyForm from "@/components/ApplyForm";
import { getUserAndProfile } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const STATUS_BADGE = {
  Applied: "badge-applied",
  Reviewing: "badge-reviewing",
  Shortlisted: "badge-shortlisted",
  Interview: "badge-interview",
  Selected: "badge-selected",
  Rejected: "badge-rejected"
};

export default async function JobDetailPage({ params }) {
  const { id } = params;
  const { user, profile, supabase } = await getUserAndProfile();

  const { data: job } = await supabase.from("jobs").select("*").eq("id", id).single();
  if (!job) notFound();

  let existingApplication = null;
  if (user) {
    const { data } = await supabase
      .from("applications")
      .select("*")
      .eq("job_id", id)
      .eq("candidate_id", user.id)
      .maybeSingle();
    existingApplication = data;
  }

  return (
    <>
      <SiteHeader active="jobs" />

      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow">{job.department || "Open role"}</p>
          <h1>{job.title}</h1>
          <p>
            {job.location && <span>{job.location}</span>}
            {job.job_type && <span> · {job.job_type}</span>}
            {job.salary_range && <span> · {job.salary_range}</span>}
          </p>
        </div>
      </section>

      <section>
        <div className="wrap grid grid-2" style={{ alignItems: "start" }}>
          <div>
            {job.description && (
              <>
                <h2>About the role</h2>
                <p style={{ whiteSpace: "pre-line" }}>{job.description}</p>
              </>
            )}
            {job.requirements && (
              <>
                <h2>What we're looking for</h2>
                <p style={{ whiteSpace: "pre-line" }}>{job.requirements}</p>
              </>
            )}
          </div>

          <div>
            {!user && (
              <div className="card">
                <h3>Log in to apply</h3>
                <p>Create a free account (or log in) to apply for this role and track your application status.</p>
                <div style={{ display: "flex", gap: 12 }}>
                  <Link href={`/login?redirect=/jobs/${id}`} className="btn btn-gold">Log in</Link>
                  <Link href="/signup" className="btn btn-outline">Sign up</Link>
                </div>
              </div>
            )}

            {user && profile?.role === "team" && (
              <div className="alert-banner">
                You're logged in as a team member — applying isn't available from a team account.
              </div>
            )}

            {user && profile?.role !== "team" && existingApplication && (
              <div className="card">
                <h3>You've applied to this role</h3>
                <p>Submitted on {new Date(existingApplication.applied_at).toLocaleDateString()}.</p>
                <span className={`badge ${STATUS_BADGE[existingApplication.status] || "badge-applied"}`}>
                  {existingApplication.status}
                </span>
                <p style={{ marginTop: 16 }}>
                  <Link href="/dashboard">View all your applications →</Link>
                </p>
              </div>
            )}

            {user && profile?.role !== "team" && !existingApplication && (
              <>
                <h3 style={{ marginBottom: 16 }}>Apply for this role</h3>
                <ApplyForm jobId={job.id} userId={user.id} />
              </>
            )}
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
