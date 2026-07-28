"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { scrollToSection } from "@/lib/navigation";

export function HashScrollHandler() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const hash = window.location.hash.slice(1);

    if (hash) {
      // Wait one frame so section elements exist in the DOM
      requestAnimationFrame(() => {
        const ok = scrollToSection(hash);
        if (!ok) {
          window.history.replaceState(null, "", pathname);
          window.scrollTo(0, 0);
        }
      });
      return;
    }

    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
