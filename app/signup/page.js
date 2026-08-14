import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SignupForm from "@/components/SignupForm";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Sign Up",
  path: "/signup",
  noindex: true
});

export default function SignupPage() {
  return (
    <>
      <SiteHeader />
      <div className="auth-shell">
        <div className="auth-card">
          <SignupForm />
        </div>
      </div>
      <SiteFooter />
    </>
  );
}
