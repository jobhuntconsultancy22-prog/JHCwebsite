import { SITE_URL } from "@/lib/seo";

export default function ShareButtons({ jobId, title }) {
  const url = `${SITE_URL}/jobs/${jobId}`;
  const text = `${title} — hiring now via Job Hunt Consultancy`;

  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(`${text}\n${url}`)}`;
  const linkedinHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  return (
    <div className="share-buttons">
      <span className="share-label">Share this role</span>
      <a href={whatsappHref} target="_blank" rel="noopener" className="share-btn share-whatsapp" aria-label="Share on WhatsApp">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.87 9.87 0 0 0 12.04 2m0 1.67c2.2 0 4.27.86 5.82 2.42a8.23 8.23 0 0 1 2.42 5.82c0 4.54-3.7 8.23-8.24 8.23a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23m-4.53 4.7c-.16 0-.42.06-.64.31-.22.24-.85.83-.85 2.02s.87 2.34.99 2.5c.12.16 1.69 2.7 4.19 3.68 2.07.82 2.49.66 2.94.62.45-.04 1.45-.59 1.65-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28-.24-.12-1.45-.71-1.67-.79-.22-.08-.39-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.35-1.67-.14-.24-.02-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.34-.76-1.83-.2-.48-.4-.42-.55-.42h-.06" />
        </svg>
        WhatsApp
      </a>
      <a href={linkedinHref} target="_blank" rel="noopener" className="share-btn share-linkedin" aria-label="Share on LinkedIn">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
        </svg>
        LinkedIn
      </a>
    </div>
  );
}
