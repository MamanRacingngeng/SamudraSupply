import { Mail, Phone, Anchor } from "lucide-react";
import { Logo } from "./Logo";
import { NavLink } from "./NavLink";
import { navLinks } from "@/lib/data";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-[#0a3d62] via-ocean-dark to-brand-deep text-cream/80">
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cream/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-brand/30 blur-3xl" />
      </div>

      <div className="container-main relative py-16 lg:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo light size="md" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream/75">
              Indonesia&apos;s digital gateway to global commodity markets — warm,
              modern, and export-ready.
            </p>
            <div className="mt-6 flex flex-col gap-2.5 text-sm">
              <a
                href="mailto:info@samudrasupply.com"
                className="inline-flex items-center gap-2 transition-colors hover:text-cream"
              >
                <Mail className="h-4 w-4 shrink-0" />
                info@samudrasupply.com
              </a>
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-cream"
              >
                <Phone className="h-4 w-4 shrink-0" />
                +62 812-3456-7890
              </a>
            </div>
          </div>

          <div>
            <p className="label-caps mb-4 !text-cream/50">Navigation</p>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <NavLink
                    href={link.href}
                    className="text-sm transition-colors hover:text-cream"
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="label-caps mb-4 !text-cream/50">Commodities</p>
            <ul className="space-y-2.5 text-sm">
              <li>Coffee &amp; Cocoa</li>
              <li>Spices &amp; Coconut</li>
              <li>Seafood &amp; Agriculture</li>
              <li>Furniture &amp; Textiles</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-cream/15 pt-8 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2 text-cream/60">
            <Anchor className="h-3.5 w-3.5" />
            &copy; {new Date().getFullYear()} Samudra Supply
          </p>
          <p className="text-cream/50">Indonesia · Global Market</p>
        </div>
      </div>
    </footer>
  );
}
