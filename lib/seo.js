const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://jobhuntconsultancy.in";
const SITE_NAME = "Job Hunt Consultancy";
const DEFAULT_DESCRIPTION =
  "Job Hunt Consultancy connects businesses with the right talent and job seekers with the right opportunity — recruitment, staffing, GST & ITR, business consultancy and web/software services in Chennai.";

// Call this from any page.js to get a consistent, SEO-complete metadata object:
//   export const metadata = buildMetadata({ title: "About Us", path: "/about" });
export function buildMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  image = "/assets/og-image.png",
  noindex = false
} = {}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | Right People. Right Opportunity.`;
  const url = `${SITE_URL}${path}`;

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: url
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      images: [{ url: image, width: 1200, height: 630, alt: SITE_NAME }],
      locale: "en_IN",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image]
    },
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true }
  };
}

export { SITE_URL, SITE_NAME };
