import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getUserAndProfile } from "@/lib/supabase/server";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "My Applications", path: "/dashboard", noindex: true });
export const dynamic = "force-dynamic";

const STATUS_BADGE = {
  Applied: "badge-applied",
  Reviewing: "badge-reviewing",
  Shortlisted: "badge-shortlisted",
  Interview: "badge-interview",
  Selected: "badge-selected",
  Rejected: "badge-rejected"
};

export default async function DashboardPage() {
  const { user, profile, supabase } = await getUserAndProfile();

  const { data: applications } = await supabase
    .from("applications")
    .select("*, jobs(title, department, location)")
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
            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Role</th>
                    <th>Location</th>
                    <th>Applied on</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app) => (
                    <tr key={app.id}>
                      <td>{app.jobs?.title || "Role removed"}</td>
                      <td>{app.jobs?.location || "—"}</td>
                      <td>{new Date(app.applied_at).toLocaleDateString()}</td>
                      <td>
                        <span className={`badge ${STATUS_BADGE[app.status] || "badge-applied"}`}>
                          {app.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty-state">
              <h3>No applications yet</h3>
              <p>Browse current openings and apply — your applications will show up here.</p>
              <Link href="/jobs" className="btn btn-gold" style={{ marginTop: 16 }}>Browse jobs</Link>
            </div>
          )}
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
