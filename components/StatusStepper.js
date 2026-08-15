const STEPS = ["Applied", "Reviewing", "Shortlisted", "Interview", "Selected"];

export default function StatusStepper({ status }) {
  const isRejected = status === "Rejected";
  const currentIndex = isRejected ? STEPS.length - 1 : STEPS.indexOf(status);

  return (
    <div className={`stepper ${isRejected ? "stepper-rejected" : ""}`}>
      {STEPS.map((step, i) => {
        const isDone = i < currentIndex || (i === currentIndex && !isRejected);
        const isCurrent = i === currentIndex && !isRejected;
        return (
          <div key={step} className={`stepper-item ${isDone ? "is-done" : ""} ${isCurrent ? "is-current" : ""}`}>
            <span className="stepper-dot">
              {isDone && !isCurrent ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              ) : (
                <span className="stepper-dot-inner" />
              )}
            </span>
            <span className="stepper-label">{step}</span>
            {i < STEPS.length - 1 && <span className="stepper-line" />}
          </div>
        );
      })}
      {isRejected && (
        <div className="stepper-rejected-note">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
          Not selected for this role
        </div>
      )}
    </div>
  );
}
