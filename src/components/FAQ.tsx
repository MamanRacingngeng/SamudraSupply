"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { faqs } from "@/lib/data";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section-padding bg-surface dark:bg-ocean-dark/30">
      <div className="container-main max-w-2xl">
        <Reveal>
          <SectionHeading label="FAQ" title="Common questions" align="center" />
        </Reveal>

        <Reveal delay={100}>
          <div className="industrial-panel-accent divide-y divide-border overflow-hidden">
            {faqs.map((faq, i) => {
              const isOpen = open === i;
              return (
                <div key={i}>
                  <button
                    type="button"
                    className="flex w-full items-start justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-cyan/[0.03]"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                  >
                    <span className="text-[15px] font-semibold sm:text-base">{faq.question}</span>
                    <ChevronDown
                      className={`mt-0.5 h-5 w-5 shrink-0 text-cyan transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-5 text-sm leading-relaxed text-muted sm:text-[15px]">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
