import { Fragment } from "react";
import { commodities } from "@/lib/data";

const MARQUEE_ITEMS = commodities.map((c) => c.name);

function MarqueeRow({ groupId }: { groupId: string }) {
  return (
    <>
      {MARQUEE_ITEMS.map((name, index) => (
        <Fragment key={`${groupId}-${name}`}>
          {index > 0 && (
            <span className="marquee-dot" aria-hidden>
              ·
            </span>
          )}
          <span className="marquee-item">{name}</span>
        </Fragment>
      ))}
    </>
  );
}

interface CommodityMarqueeProps {
  className?: string;
}

export function CommodityMarquee({ className = "" }: CommodityMarqueeProps) {
  return (
    <div
      className={`samudra-marquee ${className}`.trim()}
      aria-label="Indonesia export commodity categories"
    >
      <div className="samudra-marquee__viewport">
        <div className="marquee-track">
          <div className="marquee-group">
            <MarqueeRow groupId="a" />
          </div>
          <div className="marquee-group" aria-hidden>
            <MarqueeRow groupId="b" />
          </div>
        </div>
      </div>
    </div>
  );
}
