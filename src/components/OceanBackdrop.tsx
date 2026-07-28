interface OceanBackdropProps {
  variant?: "hero" | "section" | "page";
  className?: string;
}

export function OceanBackdrop({ variant = "section", className = "" }: OceanBackdropProps) {
  return (
    <div className={`ocean-backdrop ocean-backdrop--${variant} ${className}`} aria-hidden>
      <div className="ocean-backdrop__grid" />
      <div className="ocean-backdrop__glow" />
      <div className="ocean-backdrop__waves">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="ocean-backdrop__wave">
          <path
            d="M0,64 C240,120 480,0 720,48 C960,96 1200,32 1440,64 L1440,120 L0,120 Z"
            fill="rgba(255,245,240,0.15)"
          />
        </svg>
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="ocean-backdrop__wave ocean-backdrop__wave--2"
        >
          <path
            d="M0,80 C360,32 720,112 1080,56 C1260,32 1380,72 1440,80 L1440,120 L0,120 Z"
            fill="rgba(255,245,240,0.08)"
          />
        </svg>
      </div>
    </div>
  );
}
