interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
}

export function SectionHeading({
  label,
  title,
  description,
  align = "left",
  light = false,
}: SectionHeadingProps) {
  return (
    <div
      className={`mb-14 lg:mb-16 ${
        align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-xl"
      }`}
    >
      {label && (
        <p
          className={`samudra-label mb-3 ${light ? "!text-cream/80" : ""} ${
            align === "center" ? "mx-auto text-center" : ""
          }`}
        >
          {label}
        </p>
      )}
      <h2
        className={`heading-display text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.15] ${
          light ? "text-cream" : "samudra-heading"
        } ${align === "center" ? "mx-auto" : ""}`}
      >
        {title}
      </h2>
      <div
        className={`samudra-heading-line mt-4 ${align === "center" ? "mx-auto" : ""}`}
      />
      {description && (
        <p
          className={`mt-5 max-w-lg text-base leading-relaxed ${
            align === "center" ? "mx-auto" : ""
          } ${light ? "text-cream/85" : "text-muted"}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
