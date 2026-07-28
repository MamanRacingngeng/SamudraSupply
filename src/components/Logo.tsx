"use client";

import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  /** light = on hero / dark backgrounds */
  light?: boolean;
  size?: "sm" | "md";
  href?: string;
}

export function Logo({ light = false, size = "md", href = "/" }: LogoProps) {
  const mark = size === "sm" ? 40 : 48;

  const goHome = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href !== "/" || window.location.pathname !== "/") return;
    e.preventDefault();
    window.history.replaceState(null, "", "/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Link
      href={href}
      onClick={goHome}
      className="group inline-flex items-center gap-2.5 sm:gap-3"
      aria-label="Samudra Supply — Home"
    >
      <div
        className={`relative shrink-0 overflow-hidden rounded-xl ring-2 ${
          light ? "ring-white/30" : "ring-brand/20 dark:ring-white/20"
        }`}
        style={{ width: mark, height: mark }}
      >
        <Image
          src="/logo.png"
          alt=""
          width={mark}
          height={mark}
          className="h-full w-full object-cover"
          priority
        />
      </div>
      <div className="leading-tight">
        <span
          className={`block font-display text-[15px] font-bold sm:text-base ${
            light ? "text-white" : "text-brand-dark dark:text-cream"
          }`}
        >
          Samudra
        </span>
        <span
          className={`block font-display text-xs font-semibold sm:text-sm ${
            light ? "text-white/90" : "text-brand dark:text-brand-soft"
          }`}
        >
          Supply
        </span>
      </div>
    </Link>
  );
}
