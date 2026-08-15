const ICONS = {
  inbox: (
    <svg viewBox="0 0 64 64" fill="none">
      <rect x="10" y="24" width="44" height="30" rx="3" stroke="currentColor" strokeWidth="2" />
      <path d="M10 34h13l3 6h12l3-6h13" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M20 24l4-12h16l4 12" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  ),
  search: (
    <svg viewBox="0 0 64 64" fill="none">
      <circle cx="27" cy="27" r="15" stroke="currentColor" strokeWidth="2" />
      <line x1="38" y1="38" x2="52" y2="52" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  briefcase: (
    <svg viewBox="0 0 64 64" fill="none">
      <rect x="8" y="22" width="48" height="30" rx="3" stroke="currentColor" strokeWidth="2" />
      <path d="M22 22v-6a4 4 0 0 1 4-4h12a4 4 0 0 1 4 4v6" stroke="currentColor" strokeWidth="2" />
      <line x1="8" y1="34" x2="56" y2="34" stroke="currentColor" strokeWidth="2" />
      <rect x="28" y="30" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  checklist: (
    <svg viewBox="0 0 64 64" fill="none">
      <rect x="14" y="8" width="36" height="48" rx="3" stroke="currentColor" strokeWidth="2" />
      <path d="M22 22l4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="38" y1="24" x2="44" y2="24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M22 36l4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="38" y1="38" x2="44" y2="38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="20" y1="48" x2="44" y2="48" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
    </svg>
  )
};

export default function EmptyState({ icon = "inbox", title, message, action = null }) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">{ICONS[icon] || ICONS.inbox}</div>
      <h3>{title}</h3>
      {message && <p>{message}</p>}
      {action}
    </div>
  );
}
