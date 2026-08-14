import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import NewJobForm from "@/components/NewJobForm";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Post a Role", path: "/admin/jobs/new", noindex: true });

export default function NewJobPage() {
  return (
    <>
      <SiteHeader active="admin" />
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow">Team dashboard</p>
          <h1>Post a new role</h1>
        </div>
      </section>
      <section>
        <div className="wrap" style={{ maxWidth: 720 }}>
          <NewJobForm />
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
