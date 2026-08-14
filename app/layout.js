import "./globals.css";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import ScrollReveal from "@/components/ScrollReveal";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, SITE_URL, SITE_NAME } from "@/lib/seo";

export const metadata = {
  ...buildMetadata({ path: "/" }),
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: "/assets/logo-icon.png"
  }
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#12291c"
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EmploymentAgency",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/assets/logo-icon.png`,
  image: `${SITE_URL}/assets/og-image.png`,
  description:
    "Hiring, recruitment and business support consultancy based in Chennai, serving businesses and job seekers across India.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Chennai",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN"
  },
  telephone: "+917305512588",
  email: "info@jobhuntconsultancy.in",
  sameAs: []
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Public+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <JsonLd data={organizationSchema} />
      </head>
      <body>
        <ScrollProgressBar />
        {children}
        <ScrollReveal />
      </body>
    </html>
  );
}
