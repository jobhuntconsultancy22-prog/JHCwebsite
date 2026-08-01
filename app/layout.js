import "./globals.css";

export const metadata = {
  title: "Job Hunt Consultancy | Right People. Right Opportunity.",
  description:
    "Job Hunt Consultancy connects businesses with the right talent and job seekers with the right opportunity — recruitment, staffing, GST & ITR, business consultancy and web/software services.",
  icons: {
    icon: "/assets/logo-icon.png"
  }
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
      </head>
      <body>{children}</body>
    </html>
  );
}
