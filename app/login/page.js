import { Suspense } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import LoginForm from "@/components/LoginForm";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Log In",
  path: "/login",
  noindex: true
});

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
