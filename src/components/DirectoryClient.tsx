"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { SupplierCard } from "./SupplierCard";
import { supplierCategories } from "@/lib/data";
import type { Supplier } from "@/lib/types";

interface DirectoryClientProps {
  suppliers: Supplier[];
}

export function DirectoryClient({ suppliers }: DirectoryClientProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return suppliers.filter((s) => {
      if (verifiedOnly && !s.verified) return false;
      if (category !== "All" && s.category !== category) return false;
      if (!q) return true;
      return (
        s.name.toLowerCase().includes(q) ||
        s.commodity.toLowerCase().includes(q) ||
        s.location.toLowerCase().includes(q) ||
        s.province.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q)
      );
    });
  }, [suppliers, query, category, verifiedOnly]);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search suppliers, commodities, or locations..."
            className="input-base !pl-11"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted hover:text-ink"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={() => setShowFilters(!showFilters)}
          className="btn-secondary !py-3 sm:hidden"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filter
        </button>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        <aside
          className={`lg:w-56 lg:shrink-0 ${
            showFilters ? "block" : "hidden lg:block"
          }`}
        >
          <div className="industrial-panel-accent p-5 lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto">
            <p className="label-caps mb-4">Category</p>
            <div className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
              {supplierCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`rounded-full px-3 py-1.5 text-left text-xs font-medium transition-colors lg:w-full lg:rounded-lg lg:px-3 lg:py-2 lg:text-sm ${
                    category === cat
                      ? "bg-ocean text-white dark:bg-ocean-light"
                      : "bg-surface text-muted hover:text-ocean dark:bg-ocean/10 dark:hover:text-ocean-soft"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <hr className="my-5 border-border" />

            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={(e) => setVerifiedOnly(e.target.checked)}
                className="h-4 w-4 rounded border-border text-ocean focus:ring-ocean/20"
              />
              <span className="text-sm text-muted">Verified only</span>
            </label>
          </div>
        </aside>

        <div className="flex-1">
          <p className="mb-5 text-sm text-muted">
            Showing{" "}
            <span className="font-semibold text-ink">{filtered.length}</span>{" "}
            suppliers
            {category !== "All" && (
              <>
                {" "}
                in category{" "}
                <span className="font-semibold text-ink">{category}</span>
              </>
            )}
          </p>

          {filtered.length === 0 ? (
            <div className="card-base flex flex-col items-center px-6 py-16 text-center">
              <p className="heading-display text-xl text-ink">No results found</p>
              <p className="mt-2 max-w-sm text-sm text-muted">
                Try different keywords or adjust your category filter.
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setCategory("All");
                  setVerifiedOnly(false);
                }}
                className="btn-secondary mt-6"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-2">
              {filtered.map((s) => (
                <SupplierCard key={s.id} supplier={s} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
