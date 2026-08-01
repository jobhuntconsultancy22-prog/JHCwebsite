"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function InviteTeamMemberForm() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [status, setStatus] = useState(null); // null | "sending" | "sent" | "error"
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/admin/create-team-member", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, fullName })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");

      setStatus("sent");
      setEmail("");
      setFullName("");
      router.refresh();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message);
    }
  }

  return (
    <form className="panel" onSubmit={handleSubmit}>
      {status === "sent" && <div className="auth-success">Invite sent — they'll get an email to set their password.</div>}
      {status === "error" && <div className="auth-error">{errorMsg}</div>}
      <div className="field-row">
        <div className="field">
          <label htmlFor="tm-name">Full name</label>
          <input id="tm-name" required value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="tm-email">Email</label>
          <input id="tm-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
      </div>
      <button type="submit" className="btn btn-gold" disabled={status === "sending"}>
        {status === "sending" ? "Sending invite..." : "Send invite"}
      </button>
    </form>
  );
}
