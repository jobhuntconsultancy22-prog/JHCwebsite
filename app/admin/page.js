import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getUserAndProfile } from "@/lib/supabase/server";

export const metadata = { title: "Team Dashboard | Job Hunt Consultancy" };
export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const { supabase } = await getUserAndProfile();
  // Access here is already guaranteed to be a 'team' account — middleware.js
  // redirects anyone else away from /admin before this page ever renders.

  const { data: jobs } = await supabase
    .from("jobs")
    .select("*, applications:applications(count)")
    .order("created_at", { ascending: false });

  return (
    <>
      <SiteHeader active="admin" />

      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow">Team dashboard</p>
          <h1>Manage job postings</h1>
          <p>Create roles, review applicants, and update their status.</p>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="dashboard-head">
            <Link href="/admin/team" className="link-btn">Manage team logins →</Link>
            <Link href="/admin/jobs/new" className="btn btn-gold">+ Post a new role</Link>
          </div>

          {jobs && jobs.length > 0 ? (
            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Role</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Applicants</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((job) => (
                    <tr key={job.id}>
                      <td>{job.title}</td>
                      <td>{job.location || "—"}</td>
                      <td>
                        <span className={`badge ${job.status === "open" ? "badge-open" : "badge-closed"}`}>
                          {job.status}
                        </span>
                      </td>
                      <td>{job.applications?.[0]?.count ?? 0}</td>
                      <td>
                        <Link href={`/admin/jobs/${job.id}`} className="link-btn">Manage →</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty-state">
              <h3>No job postings yet</h3>
              <p>Create your first one to start receiving applications.</p>
            </div>
          )}
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
