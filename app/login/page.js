import { Suspense } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import LoginForm from "@/components/LoginForm";

export const metadata = {
  title: "Log In | Job Hunt Consultancy"
};

export default function LoginPage() {
  return (
    <>
      <SiteHeader />
      <div className="auth-shell">
        <div className="auth-card">
          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
      <SiteFooter />
    </>
  );
}
