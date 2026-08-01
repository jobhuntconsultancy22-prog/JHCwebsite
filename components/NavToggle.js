"use client";

export default function NavToggle() {
  function toggle() {
    const nav = document.getElementById("main-nav");
    if (!nav) return;
    const isOpen = nav.classList.toggle("open");
    const btn = document.getElementById("nav-toggle-btn");
    if (btn) btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
  }

  return (
    <button
      id="nav-toggle-btn"
      className="nav-toggle"
      aria-label="Toggle menu"
      aria-expanded="false"
      onClick={toggle}
    >
      <span></span>
    </button>
  );
}
