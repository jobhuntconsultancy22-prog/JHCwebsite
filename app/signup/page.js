import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SignupForm from "@/components/SignupForm";

export const metadata = {
  title: "Sign Up | Job Hunt Consultancy"
};

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
