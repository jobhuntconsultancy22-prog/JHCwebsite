import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Use this inside server components, server actions, and route handlers.
// It reads/writes the auth session via cookies so the logged-in user carries
// through from page to page.
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Called from a Server Component that can't set cookies directly.
            // Safe to ignore — middleware.js refreshes the session on navigation.
          }
        }
      }
    }
  );
}

// Fetches the logged-in user plus their profile row (name, phone, role) in one go.
// Returns { user: null, profile: null } if nobody is logged in.
export async function getUserAndProfile() {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) return { user: null, profile: null, supabase };

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return { user, profile, supabase };
}
