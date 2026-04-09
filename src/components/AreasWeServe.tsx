"use client";

import { useRef, useEffect } from "react";
import { Link } from "@/compat/react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";
import { allAreas } from "@/data/areas";

const AreasWeServe = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let raf: number;
    let speed = 0.5;
    let paused = false;

    const scroll = () => {
      if (!paused && el) {
        el.scrollLeft += speed;
        if (el.scrollLeft >= el.scrollWidth - el.clientWidth) {
          el.scrollLeft = 0;
        }
      }
      raf = requestAnimationFrame(scroll);
    };

    raf = requestAnimationFrame(scroll);
    const pause = () => { paused = true; };
    const resume = () => { paused = false; };
    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);
    el.addEventListener("touchstart", pause);
    el.addEventListener("touchend", resume);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", resume);
      el.removeEventListener("touchstart", pause);
      el.removeEventListener("touchend", resume);
    };
  }, []);

  return (
    <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-8 md:mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif mb-2">
              <span className="font-bold italic">Areas</span> We Serve
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-lg">
              Premium coworking &amp; office space for rent across India's top tech cities and business hubs.
            </p>
          </div>
          <Link
            to="/areas-we-serve"
            className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline shrink-0"
          >
            View All Areas
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Single-row auto-scroll carousel */}
        <div
          ref={scrollRef}
          className="flex gap-3 md:gap-4 overflow-x-auto scrollbar-hide pb-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {allAreas.map((area) => (
            <Link
              key={`${area.citySlug}-${area.slug}`}
              to={`/office-space/${area.citySlug}/${area.slug}`}
              className="group flex-shrink-0 w-[160px] sm:w-[180px] bg-card border border-border rounded-2xl p-4 hover:border-accent hover:shadow-md transition-all"
            >
              <MapPin size={14} className="text-accent mb-2" />
              <h3 className="text-sm font-bold font-sans mb-0.5 truncate">{area.name}</h3>
              <p className="text-[11px] text-muted-foreground">{area.city}</p>
            </Link>
          ))}
        </div>

        <Link
          to="/areas-we-serve"
          className="sm:hidden flex items-center justify-center gap-1.5 text-sm font-semibold text-accent mt-4"
        >
          View All Areas
          <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
};

export default AreasWeServe;

