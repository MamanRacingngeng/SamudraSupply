"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ComponentProps, ReactNode } from "react";
import { parseNavHref, scrollToSection } from "@/lib/navigation";

type NavLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
  children?: ReactNode;
};

export function NavLink({
  href,
  onClick,
  children,
  className,
  ...rest
}: NavLinkProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { path, hash } = parseNavHref(href);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;

    if (!hash) return;

    e.preventDefault();

    if (pathname === path) {
      scrollToSection(hash);
      window.history.pushState(null, "", `${path}#${hash}`);
      return;
    }

    router.push(`${path}#${hash}`);
  };

  if (hash) {
    return (
      <a href={href} onClick={handleClick} className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} onClick={onClick} className={className} {...rest}>
      {children}
    </Link>
  );
}
