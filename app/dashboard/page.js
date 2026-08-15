import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import StatusStepper from "@/components/StatusStepper";
import EmptyState from "@/components/EmptyState";
import { getUserAndProfile } from "@/lib/supabase/server";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "My Applications", path: "/dashboard", noindex: true });
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const { user, profile, supabase } = await getUserAndProfile();

  const { data: applications } = await supabase
    .from("applications")
    .select("*, jobs(id, title, department, location)")
    .eq("candidate_id", user.id)
    .order("applied_at", { ascending: false });

  return (
    <>
      <SiteHeader active="dashboard" />

      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow">My applications</p>
          <h1>Welcome back{profile?.full_name ? `, ${profile.full_name}` : ""}</h1>
          <p>Track the status of every role you've applied to.</p>
        </div>
      </section>

      <section>
        <div className="wrap">
          {applications && applications.length > 0 ? (
            <div className="applications-list">
              {applications.map((app, i) => (
                <div key={app.id} className={`card application-card reveal reveal-${(i % 6) + 1}`}>
                  <div className="application-card-head">
                    <div>
                      <h3>{app.jobs?.title || "Role removed"}</h3>
                      <p className="application-meta">
                        {app.jobs?.location && <span>{app.jobs.location}</span>}
                        <span>Applied {new Date(app.applied_at).toLocaleDateString()}</span>
                      </p>
                    </div>
                    {app.jobs?.id && (
                      <Link href={`/jobs/${app.jobs.id}`} className="link-btn">View role →</Link>
                    )}
                  </div>
                  <StatusStepper status={app.status} />
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              icon="checklist"
              title="No applications yet"
              message="Browse current openings and apply — your applications will show up here."
              action={<Link href="/jobs" className="btn btn-gold" style={{ marginTop: 16 }}>Browse jobs</Link>}
            />
          )}
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
