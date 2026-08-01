"use client";

import { useState } from "react";

const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

async function submitToWeb3Forms(fields, subject) {
  const formData = new FormData();
  formData.append("access_key", ACCESS_KEY || "");
  formData.append("subject", subject);
  formData.append("from_name", "Job Hunt Consultancy Website");
  Object.entries(fields).forEach(([key, value]) => {
    if (value) formData.append(key, value);
  });

  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    body: formData
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message || "Submission failed");
}

export default function ContactForm({ kind }) {
  const [status, setStatus] = useState(null); // null | "sending" | "sent" | "error"

  async function handleSubmit(e) {
    e.preventDefault();
    if (!ACCESS_KEY) {
      setStatus("no-key");
      return;
    }
    const form = e.target;
    if (form.botcheck && form.botcheck.checked) return;

    setStatus("sending");
    try {
      if (kind === "employer") {
        await submitToWeb3Forms(
          {
            Company: form.company.value,
            "Contact name": form.contact.value,
            Phone: form.phone.value,
            Email: form.email.value,
            "Role to fill": form.role.value,
            Openings: form.openings.value,
            Details: form.details.value
          },
          "New hiring requirement"
        );
      } else {
        await submitToWeb3Forms(
          {
            Name: form.name.value,
            Phone: form.phone.value,
            Email: form.email.value,
            Message: form.message.value
          },
          "New website enquiry"
        );
      }
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (kind === "employer") {
    return (
      <form className="panel" onSubmit={handleSubmit}>
        <input type="checkbox" name="botcheck" style={{ display: "none" }} tabIndex="-1" autoComplete="off" />
        <div className="field-row">
          <div className="field">
            <label htmlFor="e-company">Company name</label>
            <input type="text" id="e-company" name="company" required />
          </div>
          <div className="field">
            <label htmlFor="e-contact">Your name</label>
            <input type="text" id="e-contact" name="contact" required />
          </div>
        </div>
        <div className="field-row">
          <div className="field">
            <label htmlFor="e-phone">Phone / WhatsApp</label>
            <input type="tel" id="e-phone" name="phone" required />
          </div>
          <div className="field">
            <label htmlFor="e-email">Email</label>
            <input type="email" id="e-email" name="email" required />
          </div>
        </div>
        <div className="field-row">
          <div className="field">
            <label htmlFor="e-role">Role to be filled</label>
            <input type="text" id="e-role" name="role" required />
          </div>
          <div className="field">
            <label htmlFor="e-openings">Number of openings</label>
            <input type="text" id="e-openings" name="openings" placeholder="e.g. 2" />
          </div>
        </div>
        <div className="field">
          <label htmlFor="e-details">Role details</label>
          <textarea id="e-details" name="details" rows="4" placeholder="Responsibilities, experience needed, location, budget, timeline"></textarea>
        </div>
        <button type="submit" className="btn btn-gold" disabled={status === "sending"}>
          {status === "sending" ? "Sending..." : "Send requirement"}
        </button>
        <StatusMessage status={status} />
      </form>
    );
  }

  return (
    <form className="panel" onSubmit={handleSubmit}>
      <input type="checkbox" name="botcheck" style={{ display: "none" }} tabIndex="-1" autoComplete="off" />
      <div className="field-row">
        <div className="field">
          <label htmlFor="c-name">Name</label>
          <input type="text" id="c-name" name="name" required />
        </div>
        <div className="field">
          <label htmlFor="c-phone">Phone</label>
          <input type="tel" id="c-phone" name="phone" />
        </div>
      </div>
      <div className="field">
        <label htmlFor="c-email">Email</label>
        <input type="email" id="c-email" name="email" required />
      </div>
      <div className="field">
        <label htmlFor="c-message">Message</label>
        <textarea id="c-message" name="message" rows="5" required></textarea>
      </div>
      <button type="submit" className="btn btn-gold" disabled={status === "sending"}>
        {status === "sending" ? "Sending..." : "Send message"}
      </button>
      <StatusMessage status={status} />
    </form>
  );
}

function StatusMessage({ status }) {
  if (!status || status === "sending") return null;
  const styles = { fontSize: "0.85rem", marginTop: 12, marginBottom: 0 };
  if (status === "sent") {
    return <p style={{ ...styles, color: "var(--forest)" }}>Thanks — we've received this and will be in touch soon.</p>;
  }
  if (status === "no-key") {
    return <p style={{ ...styles, color: "#b3261e" }}>Form isn't connected yet — add NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY to your environment variables.</p>;
  }
  return (
    <p style={{ ...styles, color: "#b3261e" }}>
      Something went wrong sending this. Please call/WhatsApp 73055 12588 or email info@jobhuntconsultancy.in directly.
    </p>
  );
}
