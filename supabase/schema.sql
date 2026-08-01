-- ============================================================
-- Job Hunt Consultancy — Supabase schema
-- Run this once in Supabase Dashboard -> SQL Editor -> New query -> Run
-- ============================================================

-- ---------- PROFILES ----------
-- Every login (candidate or team) gets a matching row here.
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  full_name text,
  phone text,
  role text not null default 'candidate' check (role in ('candidate', 'team')),
  created_at timestamptz default now()
);

-- Automatically create a profile row whenever someone signs up.
-- New signups always start as 'candidate' — the only way to become 'team'
-- is via the admin invite flow, which updates this row afterwards.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, role)
  values (new.id, new.raw_user_meta_data ->> 'full_name', 'candidate');
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ---------- JOBS ----------
create table if not exists public.jobs (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  department text,
  location text default 'Chennai',
  job_type text default 'Full-time',
  description text,
  requirements text,
  salary_range text,
  status text not null default 'open' check (status in ('open', 'closed')),
  posted_by uuid references public.profiles(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ---------- APPLICATIONS ----------
create table if not exists public.applications (
  id uuid default gen_random_uuid() primary key,
  job_id uuid references public.jobs(id) on delete cascade,
  candidate_id uuid references public.profiles(id) on delete cascade,
  resume_path text,
  cover_note text,
  status text not null default 'Applied'
    check (status in ('Applied', 'Reviewing', 'Shortlisted', 'Interview', 'Selected', 'Rejected')),
  applied_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique (job_id, candidate_id) -- one application per candidate per job
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
alter table public.profiles enable row level security;
alter table public.jobs enable row level security;
alter table public.applications enable row level security;

-- Small helper so policies below stay readable.
create or replace function public.is_team_member(uid uuid)
returns boolean
language sql
security definer set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles where id = uid and role = 'team'
  );
$$;

-- ---------- profiles policies ----------
drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);

drop policy if exists "profiles_select_team" on public.profiles;
create policy "profiles_select_team" on public.profiles
  for select using (public.is_team_member(auth.uid()));

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);

-- ---------- jobs policies ----------
drop policy if exists "jobs_select_public_open" on public.jobs;
create policy "jobs_select_public_open" on public.jobs
  for select using (status = 'open' or public.is_team_member(auth.uid()));

drop policy if exists "jobs_insert_team" on public.jobs;
create policy "jobs_insert_team" on public.jobs
  for insert with check (public.is_team_member(auth.uid()));

drop policy if exists "jobs_update_team" on public.jobs;
create policy "jobs_update_team" on public.jobs
  for update using (public.is_team_member(auth.uid()));

drop policy if exists "jobs_delete_team" on public.jobs;
create policy "jobs_delete_team" on public.jobs
  for delete using (public.is_team_member(auth.uid()));

-- ---------- applications policies ----------
drop policy if exists "applications_select_own" on public.applications;
create policy "applications_select_own" on public.applications
  for select using (candidate_id = auth.uid());

drop policy if exists "applications_select_team" on public.applications;
create policy "applications_select_team" on public.applications
  for select using (public.is_team_member(auth.uid()));

drop policy if exists "applications_insert_own" on public.applications;
create policy "applications_insert_own" on public.applications
  for insert with check (candidate_id = auth.uid());

drop policy if exists "applications_update_team" on public.applications;
create policy "applications_update_team" on public.applications
  for update using (public.is_team_member(auth.uid()));

-- ============================================================
-- STORAGE (resumes)
-- ============================================================
-- After running this file, also go to Storage in the dashboard and create
-- a bucket named exactly:  resumes   — set it to PRIVATE (not public).
-- Then run the policies below (they reference that bucket by name).

drop policy if exists "resumes_insert_own" on storage.objects;
create policy "resumes_insert_own" on storage.objects
  for insert with check (
    bucket_id = 'resumes'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

drop policy if exists "resumes_select_own" on storage.objects;
create policy "resumes_select_own" on storage.objects
  for select using (
    bucket_id = 'resumes'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

drop policy if exists "resumes_select_team" on storage.objects;
create policy "resumes_select_team" on storage.objects
  for select using (
    bucket_id = 'resumes'
    and public.is_team_member(auth.uid())
  );

-- ============================================================
-- DONE. Next steps (see README.md):
-- 1. Create the 'resumes' storage bucket (private) in the dashboard.
-- 2. Sign up once through your deployed site — this creates your own login.
-- 3. Run the "make me a team member" snippet in README.md to promote yourself.
-- ============================================================
