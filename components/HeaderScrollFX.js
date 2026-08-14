"use client";

import { useEffect } from "react";

export default function HeaderScrollFX() {
  useEffect(() => {
    const header = document.querySelector("header.site");
    if (!header) return;

    function onScroll() {
      if (window.scrollY > 12) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}
