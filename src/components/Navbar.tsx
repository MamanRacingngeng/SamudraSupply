"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { NavLink } from "./NavLink";
import { ThemeToggle } from "./ThemeToggle";
import { navLinks } from "@/lib/data";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const onHero = !scrolled && !open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          onHero ? "nav-samudra-glass" : "nav-blur shadow-sm"
        }`}
      >
        <nav className="container-main flex items-center justify-between gap-4 py-3.5 lg:py-4">
          <Logo size="sm" light={onHero} />

          <ul className="hidden items-center gap-0.5 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <NavLink
                  href={link.href}
                  className={
                    onHero
                      ? "nav-link-hero"
                      : "rounded-lg px-3.5 py-2 text-[15px] font-semibold text-brand-dark transition-colors hover:bg-brand/10 dark:text-cream dark:hover:bg-brand/15"
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-2.5 lg:flex">
            <ThemeToggle light={onHero} />
            <NavLink
              href="/direktori"
              className={onHero ? "nav-btn-outline-hero" : "btn-secondary !py-2.5 !text-sm"}
            >
              Find Suppliers
            </NavLink>
            <NavLink
              href="/#contact"
              className={onHero ? "nav-btn-solid-hero" : "btn-primary !py-2.5 !text-sm"}
            >
              Join Us
            </NavLink>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle light={onHero} />
            <button
              type="button"
              className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${
                onHero
                  ? "bg-white/15 text-white ring-1 ring-white/35 hover:bg-white/25"
                  : "bg-surface text-ink ring-1 ring-border"
              }`}
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-gradient-to-br from-ocean-deep to-brand-deep transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
      >
        <div className="flex h-full flex-col px-5 pb-8 pt-24">
          <nav className="flex flex-1 flex-col gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-cream/15 py-4 font-display text-xl font-semibold text-white"
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <div className="mt-auto flex flex-col gap-3">
            <NavLink
              href="/direktori"
              onClick={() => setOpen(false)}
              className="nav-btn-outline-hero w-full"
            >
              Find Suppliers
            </NavLink>
            <NavLink
              href="/#contact"
              onClick={() => setOpen(false)}
              className="nav-btn-solid-hero w-full"
            >
              Join as Supplier
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}
