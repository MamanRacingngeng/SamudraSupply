"use client";

interface AnchorMarkProps {
  className?: string;
  size?: number;
}

/** Hand-drawn anchor mark — matches brand logo */
export function AnchorMark({ className = "", size = 40 }: AnchorMarkProps) {
  return (
    <svg
      viewBox="0 0 400 400"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <rect width="400" height="400" rx="48" fill="#7BA4B8" />
      <g stroke="#FFF5F0" strokeWidth="28" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="200" cy="72" r="34" fill="none" />
        <path d="M200 106 V248" fill="none" />
        <path d="M118 158 H282" fill="none" />
        <path d="M200 248 C148 248 108 286 92 336" fill="none" />
        <path d="M200 248 C252 248 292 286 308 336" fill="none" />
      </g>
    </svg>
  );
}
