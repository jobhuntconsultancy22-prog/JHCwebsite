// Sends a plain transactional email via Resend (https://resend.com) using a
// simple fetch call — no SDK dependency needed.
//
// Setup required (see README): create a free Resend account, get an API key,
// and add RESEND_API_KEY to your environment variables.

const STATUS_MESSAGES = {
  Reviewing: "Your application is now being reviewed by our team.",
  Shortlisted: "Good news — you've been shortlisted for this role!",
  Interview: "You've been moved to the interview stage for this role.",
  Selected: "Congratulations — you've been selected for this role!",
  Rejected: "We've decided to move forward with other candidates for this particular role."
};

export async function sendStatusEmail({ to, candidateName, jobTitle, status }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY not set — skipping status email.");
    return { skipped: true };
  }

  const fromAddress = process.env.RESEND_FROM_EMAIL || "Job Hunt Consultancy <onboarding@resend.dev>";
  const message = STATUS_MESSAGES[status] || `Your application status has been updated to "${status}".`;

  const html = `
    <div style="font-family: sans-serif; color: #16201a; max-width: 480px; margin: 0 auto;">
      <h2 style="color: #12291c;">Application update</h2>
      <p>Hi ${candidateName || "there"},</p>
      <p>${message}</p>
      <p style="color: #4a544c; font-size: 0.9rem;">Role: <strong>${jobTitle}</strong></p>
      <p>You can view full details anytime by logging into your dashboard on our website.</p>
      <p style="margin-top: 24px;">— Job Hunt Consultancy</p>
    </div>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: fromAddress,
      to,
      subject: `Update on your application — ${jobTitle}`,
      html
    })
  });

  if (!res.ok) {
    const errBody = await res.text();
    console.error("Resend email failed:", errBody);
    return { success: false, error: errBody };
  }

  return { success: true };
}
