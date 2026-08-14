import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ApplyForm from "@/components/ApplyForm";
import JsonLd from "@/components/JsonLd";
import { getUserAndProfile } from "@/lib/supabase/server";
import { buildMetadata, SITE_URL } from "@/lib/seo";

export const dynamic = "force-dynamic";

const STATUS_BADGE = {
  Applied: "badge-applied",
  Reviewing: "badge-reviewing",
  Shortlisted: "badge-shortlisted",
  Interview: "badge-interview",
  Selected: "badge-selected",
  Rejected: "badge-rejected"
};

// Dynamic per-job title/description/OG tags — this is what makes each role
// shareable and indexable as its own page, not just a generic "jobs" listing.
export async function generateMetadata({ params }) {
  const { supabase } = await getUserAndProfile();
  const { data: job } = await supabase.from("jobs").select("title, department, location, description").eq("id", params.id).single();

  if (!job) {
    return buildMetadata({ title: "Role not found", path: `/jobs/${params.id}`, noindex: true });
  }

  const description = job.description
    ? job.description.slice(0, 155).trim() + (job.description.length > 155 ? "…" : "")
    : `${job.title} — ${job.department || "open role"} at Job Hunt Consultancy${job.location ? `, ${job.location}` : ""}.`;

  return buildMetadata({
    title: job.title,
    description,
    path: `/jobs/${params.id}`
  });
}

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

  // JobPosting structured data — this is what lets a role show up in
  // Google's dedicated "Jobs" search results, not just regular web results.
  const jobPostingSchema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description || job.title,
    datePosted: job.created_at,
    employmentType: (job.job_type || "FULL_TIME").toUpperCase().replace(/[\s-]/g, "_"),
    hiringOrganization: {
      "@type": "Organization",
      name: "Job Hunt Consultancy",
      sameAs: SITE_URL,
      logo: `${SITE_URL}/assets/logo-icon.png`
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.location || "Chennai",
        addressRegion: "Tamil Nadu",
        addressCountry: "IN"
      }
    },
    directApply: true,
    ...(job.salary_range
      ? {
          baseSalary: {
            "@type": "MonetaryAmount",
            currency: "INR",
            value: { "@type": "QuantitativeValue", value: job.salary_range, unitText: "YEAR" }
          }
        }
      : {})
  };

  return (
    <>
      <JsonLd data={jobPostingSchema} />
      <SiteHeader active="jobs" />

      <main>

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

      </main>

      <SiteFooter />
    </>
  );
}
