# Job Hunt Consultancy — Next.js + Supabase

Full site with job listings, candidate accounts + application tracking, and a
team dashboard for posting roles and managing applicants.

## What's in this project
- Public pages: Home, About, Services, Job Search, Contact (same design as before)
- `/signup`, `/login` — candidate accounts (email + password)
- `/dashboard` — candidate's own applications and status
- `/admin` — team-only dashboard: post/close jobs, review applicants, download resumes, update status
- `/admin/team` — invite new team member logins
- **Automatic email when an applicant's status changes** (Applied → Reviewing → Shortlisted → Interview → Selected/Rejected), sent via Resend
- **SEO**: per-page titles/descriptions, Open Graph + Twitter share cards, auto-generated `sitemap.xml` and `robots.txt`, and structured data (JSON-LD) — including `JobPosting` schema on every role, which is what lets individual openings appear in Google's dedicated Jobs search results, not just regular web results
- **Responsive**: nav switches to the mobile menu earlier (at tablet width, not just phone width) so it never overflows on iPad-sized screens; grids ease down gradually across breakpoints instead of jumping straight from 4 columns to 1; touch targets sized to accessibility guidelines (44px minimum) on mobile

---

## 1. Create a Supabase project
1. Go to https://supabase.com → New Project (free tier is fine)
2. Once it's created, go to **Project Settings → API** and note down:
   - **Project URL**
   - **anon public key**
   - **service_role key** (keep this one secret — never share or commit it)

## 2. Run the database schema
1. In the Supabase dashboard, open **SQL Editor → New query**
2. Paste in the entire contents of `supabase/schema.sql` from this project
3. Click **Run**

This creates the `profiles`, `jobs`, and `applications` tables, the trigger that
auto-creates a profile on signup, and all the Row Level Security policies.

## 3. Create the resume storage bucket
1. In the dashboard, go to **Storage → Create a new bucket**
2. Name it exactly `resumes`
3. Set it to **Private** (not public)
4. The storage policies for this bucket are already included at the bottom of `schema.sql` — no extra step needed here as long as you ran that file after creating the bucket. (If you ran the SQL before creating the bucket, just re-run the storage policy section at the bottom of the file.)

## 4. Set up environment variables
1. Find `env.local.example.txt` in the project root and rename it to exactly `.env.local` (note the leading dot, and no `.txt` at the end). It's shipped with that longer name so it doesn't get hidden by your OS/file browser when unzipping — some systems hide files that start with a dot.
2. Fill in the three Supabase values from step 1
3. Add your Web3Forms access key (same one from the previous version of the site — see `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`)
4. Set `NEXT_PUBLIC_SITE_URL` to your real domain (`https://jobhuntconsultancy.in`) — this is used in team-invite emails to build the correct link
5. Get a free Resend API key (see step 5 below) and add it as `RESEND_API_KEY`

## 5. Set up Resend (for status-change emails)
1. Go to **https://resend.com** and sign up (free)
2. In the dashboard, go to **API Keys → Create API Key**, copy it
3. Paste it into `.env.local` as `RESEND_API_KEY`
4. To start, leave `RESEND_FROM_EMAIL` blank — Resend's shared test address (`onboarding@resend.dev`) works out of the box and can send to any recipient
5. **Later, for a more professional look**: go to **Domains** in Resend, add `jobhuntconsultancy.in`, and add the DNS records they give you (similar to the Vercel domain setup — same registrar dashboard). Once verified, set `RESEND_FROM_EMAIL` to something like `Job Hunt Consultancy <notifications@jobhuntconsultancy.in>`.

Note: this only handles **email**. Automated WhatsApp messages require Meta's WhatsApp Business API, which needs business verification and has per-message costs — not something we've wired up yet. Worth revisiting once/if it's worth the setup.

## 6. Install and run locally
```
npm install
npm run dev
```
Visit http://localhost:3000

## 7. Create your own account and make yourself a team member
Since there's no public "become a team member" page (on purpose — see below),
you bootstrap your own admin account once, manually:

1. On your running site, go to `/signup` and create your own account as normal
2. Check your email and click the confirmation link
3. Back in the Supabase dashboard, go to **Table Editor → profiles**
4. Find the row with your email/id, and change its `role` column from `candidate` to `team`
5. Log out and log back in on the site — you should now see "Team Dashboard" in the nav and be able to visit `/admin`

From this point on, you can invite every other teammate directly from `/admin/team` — no more manual database edits needed for future team members.

## 8. Deploy to Vercel
1. Push this project to a GitHub repo
2. In Vercel: **Add New → Project → Import Git Repository**
3. Framework preset: Vercel will detect **Next.js** automatically
4. Before deploying, add all the same environment variables from your `.env.local` in **Settings → Environment Variables**
5. Deploy

Your domain (`jobhuntconsultancy.in`) connects the same way as before — **Settings → Domains**.

---

## How the roles/security work (good to understand before inviting people)
- Anyone can browse open jobs on `/jobs` without an account.
- Signing up always creates a `candidate` account — there is no public form that creates a `team` account, by design, so a random visitor can never grant themselves access to post jobs or see applicants.
- Team accounts are created only two ways: (a) the one-time manual bootstrap in step 6 above, or (b) an existing team member inviting someone from `/admin/team`, which uses a secure server-side route — never exposed to the browser.
- Every database rule is enforced by Supabase itself (Row Level Security), not just hidden in the app's UI — so even a technically savvy visitor poking at the API directly can't see another candidate's applications or post a job without a `team` role.

## Things you'll likely want to adjust
- **Email confirmation**: Supabase requires confirming your email by default before you can log in. If you'd rather skip that step for a smoother signup, go to **Authentication → Providers → Email** in the Supabase dashboard and turn off "Confirm email" — just know this makes signup instant but slightly less spam-resistant.
- **Job posting fields**: `salary_range`, `department`, etc. are free-text right now — fine to start, but let me know if you want dropdowns or structured fields later.
- **Emails for status changes**: right now, updating an applicant's status in `/admin` does not email the candidate automatically. If you want candidates notified when their status changes, that's a small addition (a Supabase Edge Function or a simple email API call) — just ask.

## SEO — what's set up and what to do after deploying
- Every public page has a unique title, description, and social share card (Open Graph/Twitter) — visible when the link is shared on WhatsApp, LinkedIn, etc.
- `/admin`, `/dashboard`, `/login`, `/signup` are marked `noindex` — they won't show up in search results, which is what you want for private pages.
- `sitemap.xml` and `robots.txt` are generated automatically and update themselves — every open job posting is added to the sitemap the moment you post it, no manual step needed.
- Every job posting page carries `JobPosting` structured data, which is what makes a role eligible to appear in Google's "Jobs" search feature (the card-based job results with a company logo and "Apply" button) — this is the single highest-impact SEO feature for a recruitment site, and it updates automatically as you post/close roles.

**After you deploy**, two manual one-time steps to get search engines to actually notice the site:
1. Go to **Google Search Console** (search.google.com/search-console), add `jobhuntconsultancy.in` as a property, verify ownership (Google gives you a DNS record or HTML file to add — similar process to the Vercel domain setup)
2. Once verified, submit your sitemap: `https://jobhuntconsultancy.in/sitemap.xml`

After that, Google will crawl and index the site on its own schedule (typically days to a couple of weeks for a new site) — nothing further needed on your end unless you want to track how it's performing (Search Console also shows you what people search to find the site, and any indexing errors).
