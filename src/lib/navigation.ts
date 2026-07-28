/** Maps legacy / bookmarked hashes to current section IDs */
export const SECTION_ALIASES: Record<string, string> = {
  supplier: "featured-suppliers",
  suppliers: "featured-suppliers",
  tentang: "about",
  komoditas: "commodities",
  "cara-kerja": "how-it-works",
  kontak: "contact",
};

export function resolveSectionId(hash: string): string {
  const id = hash.replace(/^#/, "").trim();
  return SECTION_ALIASES[id] ?? id;
}

export function scrollToSection(id: string): boolean {
  const resolved = resolveSectionId(id);
  const el = document.getElementById(resolved);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    return true;
  }
  return false;
}

export function parseNavHref(href: string) {
  const hashIndex = href.indexOf("#");
  if (hashIndex === -1) {
    return { path: href, hash: null };
  }
  const path = href.slice(0, hashIndex) || "/";
  const hash = href.slice(hashIndex + 1);
  return { path, hash: hash || null };
}
