import { SITE_URL } from "@/lib/seo";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/dashboard/", "/api/", "/login", "/signup", "/auth/"]
      }
    ],
    sitemap: `${SITE_URL}/sitemap.xml`
  };
}
