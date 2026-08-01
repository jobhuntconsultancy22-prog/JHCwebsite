import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import NewJobForm from "@/components/NewJobForm";

export const metadata = { title: "Post a Role | Job Hunt Consultancy" };

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
