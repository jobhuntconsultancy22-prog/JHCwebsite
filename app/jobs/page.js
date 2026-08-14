import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ContactForm from "@/components/ContactForm";
import { createClient } from "@/lib/supabase/server";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Job Search — Current Openings",
  description: "Browse current job openings from Job Hunt Consultancy in Chennai, or post a role you're hiring for.",
  path: "/jobs"
});

export const dynamic = "force-dynamic";

export default async function JobsPage() {
  const supabase = await createClient();
  const { data: jobs } = await supabase
    .from("jobs")
    .select("*")
    .eq("status", "open")
    .order("created_at", { ascending: false });

  return (
    <>
      <SiteHeader active="jobs" />

      <main>

      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow">Job search</p>
          <h1>Current openings</h1>
          <p>Create a free account to apply and track your application status — or send us a resume anytime, we're always open to meeting good people.</p>
        </div>
      </section>

      <section>
        <div className="wrap">
          {jobs && jobs.length > 0 ? (
            jobs.map((job, i) => (
              <Link key={job.id} href={`/jobs/${job.id}`} className={`job-card reveal reveal-${(i % 6) + 1}`}>
                <div>
                  <h3>{job.title}</h3>
                  <div className="meta">
                    {job.department && <span>{job.department}</span>}
                    {job.location && <span>{job.location}</span>}
                    {job.job_type && <span>{job.job_type}</span>}
                  </div>
                </div>
                <span className="btn btn-outline">View & apply</span>
              </Link>
            ))
          ) : (
            <div className="empty-state">
              <h3>No open roles right now</h3>
              <p>Check back soon, or send us your details below and we'll reach out when something fits.</p>
            </div>
          )}
        </div>
      </section>

      <section className="bg-paper">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">For employers</p>
            <h2>Post a requirement</h2>
            <p>Tell us about the role you're hiring for and we'll start shortlisting candidates.</p>
          </div>
          <div style={{ maxWidth: 640 }}>
            <ContactForm kind="employer" />
          </div>
        </div>
      </section>

      <section className="bg-forest">
        <div className="wrap">
          <div className="cta-banner" style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.2)" }}>
            <div>
              <h2 style={{ color: "var(--white)" }}>Prefer to talk it through?</h2>
              <p style={{ color: "rgba(255,255,255,0.75)" }}>Message us directly on WhatsApp — quickest way to reach us.</p>
            </div>
            <a href="https://wa.me/917305512588" target="_blank" rel="noopener" className="btn btn-gold">Chat on WhatsApp</a>
          </div>
        </div>
      </section>

      </main>

      <SiteFooter />
    </>
  );
}
