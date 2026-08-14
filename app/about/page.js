import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About Us",
  description: "Job Hunt Consultancy is a Chennai-based hiring, recruitment and business support consultancy, working with businesses and job seekers across India.",
  path: "/about"
});

export default function AboutPage() {
  return (
    <>
      <SiteHeader active="about" />

      <main>

      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow">About us</p>
          <h1>Built on one idea: match well, and everything else follows.</h1>
          <p>Job Hunt Consultancy is a hiring, recruitment and business support consultancy based in Chennai, working with businesses and job seekers across India.</p>
        </div>
      </section>

      <section>
        <div className="wrap grid grid-2" style={{ alignItems: "start" }}>
          <div className="reveal reveal-1">
            <p className="eyebrow">Our story</p>
            <h2>Why we started Job Hunt Consultancy</h2>
            <p>We saw the same problem from both sides of the table — businesses spending weeks sorting through candidates who weren't a fit, and good candidates never hearing back from roles they were genuinely right for. Job Hunt Consultancy exists to close that gap: proper screening, honest communication, and a process that respects everyone's time.</p>
            <p>Alongside recruitment, we work closely with small and growing businesses on GST filing, ITR compliance and general business consultancy — so we understand the operational reality behind every hiring decision, not just the job description.</p>
          </div>
          <div className="reveal reveal-2">
            <p className="eyebrow">What we believe</p>
            <h2>Our approach</h2>
            <ul className="check-list">
              <li>A good hire is a match of skill, intent and fit — not just a filled seat</li>
              <li>Every candidate deserves a clear, timely response, whether it's a yes or a no</li>
              <li>Every client deserves a point of contact who actually understands the role</li>
              <li>Recruitment works better when it's connected to the rest of the business — compliance, structure and growth</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="wrap">
          <div className="section-head reveal">
            <p className="eyebrow">What guides our work</p>
            <h2>Our values</h2>
          </div>
          <div className="grid grid-3">
            <div className="card reveal reveal-1">
              <h3>Transparency</h3>
              <p>Clear timelines, honest feedback and no disappearing acts — for clients and candidates alike.</p>
            </div>
            <div className="card reveal reveal-2">
              <h3>Fit over speed</h3>
              <p>We'd rather take an extra day and get the right person in front of you than rush a mismatch.</p>
            </div>
            <div className="card reveal reveal-3">
              <h3>Full-picture support</h3>
              <p>Hiring doesn't happen in isolation — we help with the compliance and consultancy around it too.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-forest">
        <div className="wrap">
          <div className="cta-banner" style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.2)" }}>
            <div>
              <h2 style={{ color: "var(--white)" }}>Want to work with us?</h2>
              <p style={{ color: "rgba(255,255,255,0.75)" }}>Whether you're hiring or job hunting, we'd like to hear from you.</p>
            </div>
            <Link href="/contact" className="btn btn-gold">Contact us</Link>
          </div>
        </div>
      </section>

      </main>

      <SiteFooter />
    </>
  );
}
