import { SITE_URL } from "@/lib/seo";
import { createClient } from "@/lib/supabase/server";

export default async function sitemap() {
  const staticPages = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/services`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/jobs`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/contact`, changeFrequency: "monthly", priority: 0.6 }
  ].map((entry) => ({ ...entry, lastModified: new Date() }));

  let jobPages = [];
  try {
    const supabase = await createClient();
    const { data: jobs } = await supabase
      .from("jobs")
      .select("id, updated_at")
      .eq("status", "open");

    jobPages = (jobs || []).map((job) => ({
      url: `${SITE_URL}/jobs/${job.id}`,
      lastModified: job.updated_at ? new Date(job.updated_at) : new Date(),
      changeFrequency: "weekly",
      priority: 0.75
    }));
  } catch {
    // If Supabase isn't reachable at build time, still ship the static pages.
  }

  return [...staticPages, ...jobPages];
}
