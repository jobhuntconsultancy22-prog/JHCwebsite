import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact | Job Hunt Consultancy",
  description: "Get in touch with Job Hunt Consultancy — call, WhatsApp, email or send us a message directly."
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader active="contact" />

      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow">Contact</p>
          <h1>Let's talk</h1>
          <p>Call, WhatsApp, email, or use the form — whichever's easiest.</p>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="grid grid-3" style={{ marginBottom: 56 }}>
            <a href="tel:+917305512588" className="card contact-item" style={{ flexDirection: "column", alignItems: "flex-start", gap: 16 }}>
              <span className="icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </span>
              <div>
                <span className="label">Call or WhatsApp</span>
                <span className="value" style={{ fontSize: "1.2rem" }}>73055 12588</span>
              </div>
            </a>
            <a href="mailto:info@jobhuntconsultancy.in" className="card contact-item" style={{ flexDirection: "column", alignItems: "flex-start", gap: 16 }}>
              <span className="icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </span>
              <div>
                <span className="label">Email us</span>
                <span className="value" style={{ fontSize: "1.2rem" }}>info@jobhuntconsultancy.in</span>
              </div>
            </a>
            <a href="https://wa.me/917305512588" target="_blank" rel="noopener" className="card contact-item" style={{ flexDirection: "column", alignItems: "flex-start", gap: 16 }}>
              <span className="icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </span>
              <div>
                <span className="label">WhatsApp</span>
                <span className="value" style={{ fontSize: "1.2rem" }}>Scan or click to chat</span>
              </div>
            </a>
          </div>

          <div className="grid grid-2" style={{ alignItems: "start" }}>
            <div>
              <p className="eyebrow">Send a message</p>
              <h2>Write to us directly</h2>
              <p>Fill this in and it'll come straight to our inbox.</p>
              <ContactForm kind="contact" />
            </div>
            <div>
              <p className="eyebrow">Business hours</p>
              <h2>When to reach us</h2>
              <ul className="check-list">
                <li>Monday – Saturday, 9:30 AM – 6:30 PM</li>
                <li>WhatsApp messages are usually answered within a few hours</li>
                <li>Sundays and public holidays: closed</li>
              </ul>
              <div className="card" style={{ marginTop: 24 }}>
                <h3>Based in Chennai</h3>
                <p>Working with businesses and candidates across India — most of our process runs over call, WhatsApp and email, so location is rarely a barrier.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
