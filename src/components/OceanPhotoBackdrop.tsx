interface OceanPhotoBackdropProps {
  variant?: "hero" | "page";
  className?: string;
}

export function OceanPhotoBackdrop({
  variant = "hero",
  className = "",
}: OceanPhotoBackdropProps) {
  const isHero = variant === "hero";

  return (
    <div
      className={`ocean-photo ${isHero ? "ocean-photo--hero" : "ocean-photo--page"} ${className}`}
      aria-hidden
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/hero-ocean.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-[center_35%]"
        fetchPriority={isHero ? "high" : "auto"}
        decoding="async"
      />
      <div className={`ocean-photo__overlay ${isHero ? "ocean-photo__overlay--hero" : ""}`} />
      {!isHero && <div className="ocean-photo__fade" />}
    </div>
  );
}
