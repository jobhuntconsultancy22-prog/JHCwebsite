import TiltCard from "@/components/TiltCard";

// IMPORTANT: The entries below are placeholders, not real client quotes.
// Replace each "quote", "name", "role" field with real testimonials from actual
// clients/candidates before this section goes live — publishing fabricated
// reviews on a real business site is misleading to visitors. If you don't
// have real quotes yet, either leave this section out of the page (just
// remove the <Testimonials /> line) or ask candidates/clients you've placed
// for a short quote you can use.
const PLACEHOLDER_TESTIMONIALS = [
  {
    quote: "[Add a real quote here — e.g. what this client said about working with you]",
    name: "[Client name]",
    role: "[Company / role]"
  },
  {
    quote: "[Add a real quote here — e.g. what this candidate said about their experience]",
    name: "[Candidate name]",
    role: "[Role placed / company]"
  },
  {
    quote: "[Add a real quote here]",
    name: "[Name]",
    role: "[Role / company]"
  }
];

export default function Testimonials({ testimonials = PLACEHOLDER_TESTIMONIALS }) {
  return (
    <section className="bg-paper">
      <div className="wrap">
        <div className="section-head reveal">
          <p className="eyebrow">What people say</p>
          <h2>Trusted by businesses and candidates alike</h2>
        </div>
        <div className="grid grid-3">
          {testimonials.map((t, i) => (
            <TiltCard key={i}>
              <div className={`card testimonial-card reveal reveal-${i + 1}`}>
                <svg className="testimonial-quote-mark" viewBox="0 0 32 24" fill="currentColor">
                  <path d="M9.4 0C4.2 2.6 0 8.2 0 14.6 0 19.8 3.4 24 8.4 24c4 0 7-3.2 7-7.2 0-3.8-2.8-6.8-6.4-6.8-.6 0-1.2.2-1.6.4C7.8 6.4 10.6 3 14.4 1.4L9.4 0zm18 0C22.2 2.6 18 8.2 18 14.6c0 5.2 3.4 9.4 8.4 9.4 4 0 7-3.2 7-7.2 0-3.8-2.8-6.8-6.4-6.8-.6 0-1.2.2-1.6.4C25.8 6.4 28.6 3 32.4 1.4L27.4 0z" />
                </svg>
                <p style={{ fontStyle: "italic" }}>{t.quote}</p>
                <p style={{ fontWeight: 700, color: "var(--forest-deep)", marginBottom: 0 }}>{t.name}</p>
                <p style={{ fontSize: "0.85rem", marginBottom: 0 }}>{t.role}</p>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
