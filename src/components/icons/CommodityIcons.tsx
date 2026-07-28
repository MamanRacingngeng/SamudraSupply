import type { ComponentType } from "react";

interface IconProps {
  className?: string;
}

function CoconutIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <ellipse cx="24" cy="26" rx="14" ry="16" fill="#8B5E3C" />
      <ellipse cx="24" cy="24" rx="12" ry="14" fill="#A0714F" />
      <path d="M24 10 C20 14 18 20 18 26 C18 34 24 40 24 40 C24 40 30 34 30 26 C30 20 28 14 24 10Z" fill="#F5EDE6" opacity="0.9" />
      <circle cx="20" cy="22" r="1.2" fill="#6D4C33" />
      <circle cx="28" cy="24" r="1.2" fill="#6D4C33" />
      <circle cx="22" cy="28" r="1.2" fill="#6D4C33" />
      <path d="M24 8 C22 4 26 2 24 8 M24 8 C26 4 22 2 24 8" stroke="#5D8A48" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CoffeeIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <ellipse cx="18" cy="30" rx="8" ry="5" fill="#6F4E37" transform="rotate(-20 18 30)" />
      <ellipse cx="30" cy="28" rx="8" ry="5" fill="#8B5A3C" transform="rotate(15 30 28)" />
      <ellipse cx="24" cy="34" rx="7" ry="4.5" fill="#5C4030" />
      <path d="M14 18 C14 14 18 10 24 10 C30 10 34 14 34 18" stroke="#8B5A3C" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M34 16 H38 C40 16 42 18 42 20 C42 22 40 24 38 24 H34" stroke="#8B5A3C" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M20 8 C20 6 22 4 24 4 C26 4 28 6 28 8" stroke="#A0714F" strokeWidth="1.5" fill="none" opacity="0.6" />
    </svg>
  );
}

function SpiceIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <circle cx="24" cy="24" r="6" fill="#C45C26" />
      <circle cx="24" cy="24" r="3" fill="#E07B3A" />
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <ellipse
          key={deg}
          cx="24"
          cy="10"
          rx="2.5"
          ry="6"
          fill="#D4920A"
          transform={`rotate(${deg} 24 24)`}
        />
      ))}
      <path d="M16 34 C18 38 22 40 24 40 C26 40 30 38 32 34" stroke="#8B4513" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function CacaoIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path d="M24 8 C16 8 10 16 10 24 C10 32 16 40 24 40 C32 40 38 32 38 24 C38 16 32 8 24 8Z" fill="#B8860B" />
      <path d="M24 10 C18 10 14 16 14 24 C14 32 18 38 24 38 C30 38 34 32 34 24 C34 16 30 10 24 10Z" fill="#DAA520" />
      <path d="M20 18 C22 20 26 20 28 18 M20 26 C22 28 26 28 28 26 M20 34 C22 36 26 36 28 34" stroke="#8B6914" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function SeafoodIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <ellipse cx="24" cy="26" rx="16" ry="10" fill="#4DA3D9" />
      <path d="M8 26 C4 24 4 20 8 18 L12 26 Z" fill="#2B6FA0" />
      <circle cx="32" cy="22" r="2" fill="white" />
      <circle cx="33" cy="22" r="1" fill="#1E5278" />
      <path d="M18 32 C20 34 24 34 26 32" stroke="#2B6FA0" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M28 14 C30 12 34 14 32 16" stroke="#87CEEB" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function FurnitureIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <rect x="10" y="18" width="28" height="4" rx="1" fill="#8B6914" />
      <rect x="12" y="22" width="24" height="14" rx="2" fill="#A0714F" />
      <rect x="10" y="36" width="4" height="8" rx="1" fill="#6F4E37" />
      <rect x="34" y="36" width="4" height="8" rx="1" fill="#6F4E37" />
      <path d="M14 22 V18 M34 22 V18" stroke="#6F4E37" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function PalmOilIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path d="M24 40 V22" stroke="#5D8A48" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="24" cy="16" rx="12" ry="8" fill="#C0392B" transform="rotate(-30 24 16)" />
      <ellipse cx="24" cy="16" rx="12" ry="8" fill="#E74C3C" transform="rotate(30 24 16)" />
      <ellipse cx="24" cy="14" rx="10" ry="7" fill="#D35400" />
      <circle cx="20" cy="14" r="2" fill="#F39C12" />
      <circle cx="28" cy="15" r="2" fill="#F39C12" />
      <circle cx="24" cy="18" r="2" fill="#F39C12" />
    </svg>
  );
}

function TextileIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path d="M12 14 H36 L32 38 H16 Z" fill="#9B59B6" />
      <path d="M16 14 L20 38 M24 14 V38 M28 14 L24 38 M32 14 L28 38" stroke="#7D3C98" strokeWidth="1.5" />
      <ellipse cx="24" cy="12" rx="12" ry="3" fill="#BB8FCE" />
      <circle cx="24" cy="22" r="3" fill="#E8DAEF" opacity="0.8" />
    </svg>
  );
}

function EssentialOilIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <rect x="18" y="16" width="12" height="22" rx="2" fill="#48C9B0" />
      <rect x="20" y="10" width="8" height="8" rx="1" fill="#1ABC9C" />
      <path d="M22 8 H26 V10 H22 Z" fill="#16A085" />
      <circle cx="24" cy="28" r="3" fill="#A3E4D7" />
      <path d="M30 34 C32 30 34 26 36 22" stroke="#27AE60" strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="36" cy="20" rx="4" ry="2.5" fill="#58D68D" transform="rotate(-30 36 20)" />
    </svg>
  );
}

function AgricultureIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path d="M24 38 V20" stroke="#27AE60" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="18" cy="18" rx="8" ry="5" fill="#E74C3C" transform="rotate(-40 18 18)" />
      <ellipse cx="30" cy="16" rx="7" ry="4" fill="#F39C12" transform="rotate(30 30 16)" />
      <circle cx="24" cy="12" r="5" fill="#58D68D" />
      <path d="M24 8 C24 4 28 6 28 10" stroke="#27AE60" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function ManufactureIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <rect x="8" y="20" width="32" height="18" rx="2" fill="#5D6D7E" />
      <rect x="12" y="24" width="8" height="6" rx="1" fill="#85929E" />
      <rect x="22" y="24" width="8" height="6" rx="1" fill="#85929E" />
      <path d="M16 14 H32 L30 20 H18 Z" fill="#566573" />
      <rect x="20" y="10" width="8" height="4" rx="1" fill="#ABB2B9" />
      <circle cx="36" cy="30" r="4" fill="#F39C12" />
      <circle cx="36" cy="30" r="2" fill="#E67E22" />
    </svg>
  );
}

function OtherIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path d="M10 16 L24 8 L38 16 V34 L24 42 L10 34 Z" fill="#5DADE2" />
      <path d="M24 8 V42 M10 16 L38 34 M38 16 L10 34" stroke="#2E86C1" strokeWidth="1.5" opacity="0.5" />
      <circle cx="24" cy="24" r="6" fill="#AED6F1" />
      <text x="24" y="27" textAnchor="middle" fontSize="8" fill="#1E5278" fontWeight="bold">+</text>
    </svg>
  );
}

const ICON_MAP: Record<string, ComponentType<IconProps>> = {
  coffee: CoffeeIcon,
  spices: SpiceIcon,
  coconut: CoconutIcon,
  cocoa: CacaoIcon,
  seafood: SeafoodIcon,
  furniture: FurnitureIcon,
  "palm oil": PalmOilIcon,
  textiles: TextileIcon,
  "essential oils": EssentialOilIcon,
  agriculture: AgricultureIcon,
  manufacturing: ManufactureIcon,
  "other commodities": OtherIcon,
};

export function CommodityIcon({ name, className }: { name: string; className?: string }) {
  const key = name.toLowerCase();
  const Icon = ICON_MAP[key] ?? OtherIcon;
  return <Icon className={className} />;
}
