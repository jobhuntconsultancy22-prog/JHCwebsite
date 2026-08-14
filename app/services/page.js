import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Link from "next/link";

export const metadata = {
  title: "Services | Job Hunt Consultancy",
  description: "Recruitment & staffing, GST & ITR filing, business consultancy, and web & software services."
};

export default function ServicesPage() {
  return (
    <>
      <SiteHeader active="services" />

      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow">Services</p>
          <h1>Four services, one point of contact</h1>
          <p>We started with recruitment — and added the services that businesses need alongside it.</p>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="grid grid-2" style={{ marginBottom: 28 }}>
            <div className="card reveal reveal-1">
              <span className="num">01</span>
              <h3>Recruitment & Staffing</h3>
              <p>Full-cycle hiring support for permanent, contract and bulk/volume roles.</p>
              <ul className="check-list">
                <li>Role scoping & job description support</li>
                <li>Candidate sourcing and active headhunting</li>
                <li>Screening, shortlisting and interview coordination</li>
                <li>Offer management and onboarding support</li>
                <li>Bulk hiring for seasonal or high-volume needs</li>
              </ul>
            </div>
            <div className="card reveal reveal-2">
              <span className="num">02</span>
              <h3>GST & ITR Filing</h3>
              <p>Compliance support that keeps your filings accurate and on time.</p>
              <ul className="check-list">
                <li>GST registration and monthly/quarterly returns</li>
                <li>Income tax return (ITR) filing for individuals and businesses</li>
                <li>Notice handling and correction support</li>
                <li>Ongoing compliance reminders and record-keeping guidance</li>
              </ul>
            </div>
          </div>
          <div className="grid grid-2">
            <div className="card reveal reveal-3">
              <span className="num">03</span>
              <h3>Business Consultancy</h3>
              <p>Practical guidance for setting up and running a business well.</p>
              <ul className="check-list">
                <li>New business registration and structuring guidance</li>
                <li>Operational and process consultancy</li>
                <li>HR policy and workforce planning support</li>
                <li>General advisory for small and growing businesses</li>
              </ul>
            </div>
            <div className="card reveal reveal-4">
              <span className="num">04</span>
              <h3>Web & Software Services</h3>
              <p>Digital tools built around how your business actually runs.</p>
              <ul className="check-list">
                <li>Business websites and landing pages</li>
                <li>Custom web and mobile applications</li>
                <li>Internal tools and process automation</li>
                <li>Ongoing support and maintenance</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="wrap">
          <div className="cta-banner">
            <div>
              <h2>Not sure which service you need?</h2>
              <p>Tell us what you're trying to solve — we'll point you in the right direction.</p>
            </div>
            <Link href="/contact" className="btn btn-gold" style={{ background: "var(--forest-deep)", color: "var(--white)" }}>Talk to us</Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
