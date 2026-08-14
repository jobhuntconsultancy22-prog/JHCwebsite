import Link from "next/link";
import { getUserAndProfile } from "@/lib/supabase/server";
import NavToggle from "./NavToggle";
import SignOutButton from "./SignOutButton";
import HeaderScrollFX from "./HeaderScrollFX";

export default async function SiteHeader({ active }) {
  const { user, profile } = await getUserAndProfile();

  return (
    <header className="site">
      <HeaderScrollFX />
      <div className="bar">
        <Link href="/" className="brand">
          <img src="/assets/logo-icon.png" alt="Job Hunt Consultancy logo" />
          <span className="brand-text">
            Job Hunt Consultancy
            <small>Right People. Right Opportunity.</small>
          </span>
        </Link>

        <nav className="main" id="main-nav">
          <Link href="/" className={active === "home" ? "active" : ""}>Home</Link>
          <Link href="/about" className={active === "about" ? "active" : ""}>About</Link>
          <Link href="/services" className={active === "services" ? "active" : ""}>Services</Link>
          <Link href="/jobs" className={active === "jobs" ? "active" : ""}>Job Search</Link>
          <Link href="/contact" className={active === "contact" ? "active" : ""}>Contact</Link>

          {profile?.role === "team" && (
            <Link href="/admin" className={active === "admin" ? "active" : ""}>Team Dashboard</Link>
          )}

          {user ? (
            <>
              {profile?.role !== "team" && (
                <Link href="/dashboard" className={active === "dashboard" ? "active" : ""}>My Applications</Link>
              )}
              <SignOutButton />
            </>
          ) : (
            <Link href="/login" className="btn btn-gold btn-lg">Login</Link>
          )}
        </nav>

        <NavToggle />
      </div>
    </header>
  );
}
