import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import InviteTeamMemberForm from "@/components/InviteTeamMemberForm";
import { getUserAndProfile } from "@/lib/supabase/server";

export const metadata = { title: "Manage Team | Job Hunt Consultancy" };
export const dynamic = "force-dynamic";

export default async function TeamPage() {
  const { supabase, user } = await getUserAndProfile();

  const { data: teamMembers } = await supabase
    .from("profiles")
    .select("*")
    .eq("role", "team")
    .order("created_at", { ascending: true });

  return (
    <>
      <SiteHeader active="admin" />

      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow">Team dashboard</p>
          <h1>Team logins</h1>
          <p>Invite teammates who should be able to post jobs and manage applicants.</p>
        </div>
      </section>

      <section>
        <div className="wrap grid grid-2" style={{ alignItems: "start" }}>
          <div>
            <h2>Invite a team member</h2>
            <InviteTeamMemberForm />
          </div>
          <div>
            <h2>Current team</h2>
            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {(teamMembers || []).map((member) => (
                    <tr key={member.id}>
                      <td>
                        {member.full_name || "—"}
                        {member.id === user.id && " (you)"}
                      </td>
                      <td>{new Date(member.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
