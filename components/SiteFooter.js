import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="site">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <Link href="/" className="brand" style={{ marginBottom: 16 }}>
              <img src="/assets/logo-icon.png" alt="Job Hunt Consultancy logo" style={{ height: 52 }} />
              <span className="brand-text">
                Job Hunt Consultancy
                <small>Right People. Right Opportunity.</small>
              </span>
            </Link>
            <p style={{ maxWidth: 320 }}>
              Hiring, recruitment and business support consultancy based in Chennai, serving businesses across India.
            </p>
          </div>
          <div>
            <h4>Explore</h4>
            <ul className="foot-links">
              <li><Link href="/about">About us</Link></li>
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/jobs">Job search</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul className="foot-links">
              <li><a href="tel:+917305512588">73055 12588</a></li>
              <li><a href="mailto:info@jobhuntconsultancy.in">info@jobhuntconsultancy.in</a></li>
              <li><a href="https://wa.me/917305512588" target="_blank" rel="noopener">WhatsApp us</a></li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <span>&copy; {new Date().getFullYear()} Job Hunt Consultancy. All rights reserved.</span>
          <span>jobhuntconsultancy.in</span>
        </div>
      </div>
    </footer>
  );
}
