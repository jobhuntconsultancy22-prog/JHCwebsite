import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Testimonials from "@/components/Testimonials";
import AuroraBackground from "@/components/AuroraBackground";
import CursorSpotlight from "@/components/CursorSpotlight";
import TiltCard from "@/components/TiltCard";

export default function HomePage() {
  return (
    <>
      <SiteHeader active="home" />

      <main>

      <section className="hero">
        <AuroraBackground />
        <CursorSpotlight />
        <div className="constellation" aria-hidden="true">
          <svg viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice">
            <g stroke="#C9962C" strokeWidth="1" opacity="0.35">
              <line x1="80" y1="480" x2="230" y2="360" />
              <line x1="230" y1="360" x2="340" y2="410" />
              <line x1="230" y1="360" x2="300" y2="230" />
              <line x1="300" y1="230" x2="440" y2="150" />
              <line x1="900" y1="120" x2="1020" y2="220" />
              <line x1="1020" y1="220" x2="960" y2="340" />
              <line x1="1020" y1="220" x2="1140" y2="260" />
              <line x1="960" y1="340" x2="1080" y2="440" />
            </g>
            <g fill="#E6B94F">
              <circle cx="80" cy="480" r="4" />
              <circle cx="230" cy="360" r="5" />
              <circle cx="340" cy="410" r="3" />
              <circle cx="300" cy="230" r="4" />
              <circle cx="440" cy="150" r="3" />
              <circle cx="900" cy="120" r="4" />
              <circle cx="1020" cy="220" r="5" />
              <circle cx="960" cy="340" r="4" />
              <circle cx="1140" cy="260" r="3" />
              <circle cx="1080" cy="440" r="4" />
            </g>
          </svg>
        </div>
        <div className="wrap">
          <p className="eyebrow">Hiring & Recruitment</p>
          <h1>Right people. <em>Right opportunity.</em></h1>
          <p className="lead">
            Job Hunt Consultancy connects growing businesses with talent worth hiring — and job seekers with roles
            worth taking. Recruitment done properly, backed by GST/ITR, business and software support under one roof.
          </p>
          <div className="cta-row">
            <Link href="/contact" className="btn btn-gold">Hire talent</Link>
            <Link href="/jobs" className="btn btn-outline btn-ghost-light">Find a job</Link>
          </div>
          <div className="hero-highlights">
            <span className="hero-highlight-chip glass"><span className="dot" />4 services under one roof</span>
            <span className="hero-highlight-chip glass"><span className="dot" />Chennai-based, pan-India reach</span>
            <span className="hero-highlight-chip glass"><span className="dot" />Direct, honest communication</span>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="section-head reveal">
            <p className="eyebrow">What we do</p>
            <h2>One consultancy, four ways we help you grow</h2>
            <p>We started in recruitment and staffing — and built out the services that businesses actually need alongside it.</p>
          </div>
          <div className="bento-grid">
            <TiltCard className="bento-large">
              <div className="card reveal reveal-1">
                <span className="num">01</span>
                <h3>Recruitment & Staffing</h3>
                <p>End-to-end hiring for permanent, contract and bulk roles — sourcing, screening and onboarding handled for you. Our founding service and still where we spend most of our time.</p>
              </div>
            </TiltCard>
            <TiltCard className="bento-b">
              <div className="card reveal reveal-2">
                <span className="num">02</span>
                <h3>GST & ITR Filing</h3>
                <p>Registration, returns and compliance support, kept simple and on time.</p>
              </div>
            </TiltCard>
            <TiltCard className="bento-c">
              <div className="card reveal reveal-3">
                <span className="num">03</span>
                <h3>Business Consultancy</h3>
                <p>Practical guidance on setting up and running a business.</p>
              </div>
            </TiltCard>
            <TiltCard className="bento-d">
              <div className="card reveal reveal-4">
                <span className="num">04</span>
                <h3>Web & Software Services</h3>
                <p>Websites, apps and business tools built for the way you actually work.</p>
              </div>
            </TiltCard>
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="wrap">
          <div className="section-head reveal">
            <p className="eyebrow">How hiring works with us</p>
            <h2>Four steps from opening to offer</h2>
          </div>
          <div className="process">
            <div className="step reveal reveal-1">
              <span className="step-num">01</span>
              <h3>Understand</h3>
              <p>We learn the role, the team and what "right fit" actually means for you.</p>
            </div>
            <div className="step reveal reveal-2">
              <span className="step-num">02</span>
              <h3>Source</h3>
              <p>We tap our network and active search to build a shortlist worth your time.</p>
            </div>
            <div className="step reveal reveal-3">
              <span className="step-num">03</span>
              <h3>Screen</h3>
              <p>Every candidate is vetted for skills, intent and fit before you meet them.</p>
            </div>
            <div className="step reveal reveal-4">
              <span className="step-num">04</span>
              <h3>Place</h3>
              <p>We manage offers, paperwork and onboarding so the hire lands cleanly.</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="grid grid-2" style={{ alignItems: "center" }}>
            <div className="reveal reveal-1">
              <p className="eyebrow">Why Job Hunt Consultancy</p>
              <h2>Recruitment that understands the rest of your business too</h2>
              <p>Because we also work in GST, compliance and business consultancy, we understand what a hire actually costs and what a business can support — not just how to fill a seat.</p>
              <ul className="check-list">
                <li>Direct, honest communication — no candidate spam, no silence</li>
                <li>Screening built around real fit, not just keyword matching</li>
                <li>One point of contact from brief to offer</li>
                <li>Support beyond hiring — compliance and consultancy under one roof</li>
              </ul>
            </div>
            <TiltCard>
              <div className="card card-dark reveal reveal-2">
                <p className="eyebrow" style={{ color: "var(--gold-light)" }}>Looking to hire?</p>
                <h3>Tell us about the role</h3>
                <p>Share the position and team you're hiring for and we'll get back to you with next steps — usually within a business day.</p>
                <Link href="/contact" className="btn btn-gold">Start a conversation</Link>
              </div>
            </TiltCard>
          </div>
        </div>
      </section>

      <Testimonials />

      <section className="bg-forest">
        <div className="wrap">
          <div className="cta-banner">
            <div>
              <h2>Ready when you are.</h2>
              <p>Call, WhatsApp or email — whichever is easiest for you.</p>
            </div>
            <div className="contact-row">
              <a href="tel:+917305512588" className="contact-item">
                <span className="icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                <span>
                  <span className="label">Call / WhatsApp</span>
                  <span className="value">73055 12588</span>
                </span>
              </a>
              <a href="mailto:info@jobhuntconsultancy.in" className="contact-item">
                <span className="icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </span>
                <span>
                  <span className="label">Email</span>
                  <span className="value">info@jobhuntconsultancy.in</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      </main>

      <SiteFooter />
    </>
  );
}
