import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import JobStatusToggle from "@/components/JobStatusToggle";
import ApplicantRow from "@/components/ApplicantRow";
import { getUserAndProfile } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function ManageJobPage({ params }) {
  const { id } = params;
  const { supabase } = await getUserAndProfile();

  const { data: job } = await supabase.from("jobs").select("*").eq("id", id).single();
  if (!job) notFound();

  const { data: applications } = await supabase
    .from("applications")
    .select("*, profiles(full_name, phone)")
    .eq("job_id", id)
    .order("applied_at", { ascending: false });

  // Generate a short-lived signed URL for each resume so the team can download it.
  const applicationsWithUrls = await Promise.all(
    (applications || []).map(async (app) => {
      if (!app.resume_path) return { ...app, resumeUrl: null };
      const { data } = await supabase.storage.from("resumes").createSignedUrl(app.resume_path, 3600);
      return { ...app, resumeUrl: data?.signedUrl || null };
    })
  );

  return (
    <>
      <SiteHeader active="admin" />

      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow">Team dashboard</p>
          <h1>{job.title}</h1>
          <p>{job.location} · {job.job_type} · <span className={`badge ${job.status === "open" ? "badge-open" : "badge-closed"}`}>{job.status}</span></p>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="dashboard-head">
            <h2 style={{ margin: 0 }}>Applicants ({applicationsWithUrls.length})</h2>
            <JobStatusToggle jobId={job.id} initialStatus={job.status} />
          </div>

          {applicationsWithUrls.length > 0 ? (
            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Applied on</th>
                    <th>Resume</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {applicationsWithUrls.map((app) => (
                    <ApplicantRow key={app.id} application={app} />
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty-state">
              <h3>No applicants yet</h3>
              <p>Applications will show up here as candidates apply.</p>
            </div>
          )}
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
