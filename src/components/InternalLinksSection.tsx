"use client";

import { ArrowUpRight } from "lucide-react";
import { Link } from "@/compat/react-router-dom";

interface InternalLinkItem {
  href: string;
  title: string;
  description: string;
}

interface InternalLinksSectionProps {
  eyebrow?: string;
  title: string;
  description?: string;
  links: InternalLinkItem[];
}

const InternalLinksSection = ({
  eyebrow = "Explore More",
  title,
  description,
  links,
}: InternalLinksSectionProps) => {
  if (links.length === 0) {
    return null;
  }

  return (
    <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-8">
          <p className="text-accent text-xs font-semibold uppercase tracking-[0.24em] mb-3">{eyebrow}</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif mb-3">{title}</h2>
          {description ? <p className="text-sm sm:text-base text-muted-foreground">{description}</p> : null}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {links.map((link) => (
            <Link
              key={`${link.href}-${link.title}`}
              to={link.href}
              className="group rounded-2xl border border-border bg-card p-5 transition-all hover:border-accent hover:shadow-md"
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <h3 className="text-base font-bold font-sans leading-snug">{link.title}</h3>
                <ArrowUpRight size={16} className="shrink-0 text-muted-foreground transition-colors group-hover:text-accent" />
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{link.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InternalLinksSection;
