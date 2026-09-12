import { Building2, CheckCircle2, MapPinned, Timer } from "lucide-react";
import { Link } from "@/compat/react-router-dom";

const stats = [
  { number: "92%", label: "Client Retention Rate" },
  { number: "3.5x", label: "Avg. Productivity Boost" },
  { number: "40%", label: "Cost Savings Achieved" },
  { number: "< 59 min", label: "Avg. Response Time" },
];

const workspaceCards = [
  {
    icon: MapPinned,
    title: "Local guidance",
    lines: ["Find office areas", "that fit your team", "and daily travel."],
  },
  {
    icon: Building2,
    title: "Space matching",
    lines: ["Compare spaces", "that fit your team", "and work style."],
  },
  {
    icon: Timer,
    title: "Planned visits",
    lines: ["Visit your top picks", "to review layouts", "and amenities."],
  },
  {
    icon: CheckCircle2,
    title: "Lease guidance",
    lines: ["Review lease costs,", "terms and deposits", "before you decide."],
  },
];

const StatsSection = () => {
  return (
    <section id="insight" className="py-16 md:py-24 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 md:mb-14 grid gap-6 lg:gap-16 lg:grid-cols-2 lg:items-start">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">Your workspace partner</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif leading-snug">
              Find a Bangalore office that fits your team, budget, and next move.
            </h2>
          </div>
          <div className="lg:max-w-xl lg:pt-8">
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              Numunix turns scattered office options into a clear decision path: local market guidance, curated
              options, site visits, and practical lease support for growing teams across Bengaluru.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
              <Link
                to="/areas-we-serve"
                className="flex min-h-14 items-center justify-center rounded-full bg-primary px-3 py-2 text-center text-xs font-semibold leading-tight text-primary-foreground hover:opacity-90 transition-opacity sm:min-h-0 sm:px-5 sm:py-2.5 sm:text-sm"
              >
                Explore areas
              </Link>
              <Link
                to="/contact"
                className="flex min-h-14 items-center justify-center rounded-full border border-foreground px-3 py-2 text-center text-xs font-semibold leading-tight text-foreground hover:bg-foreground hover:text-primary-foreground transition-colors sm:min-h-0 sm:px-5 sm:py-2.5 sm:text-sm"
              >
                Talk to an expert
              </Link>
            </div>
          </div>
        </div>

        <div className="mb-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {workspaceCards.map((card, cardIndex) => {
            const Icon = card.icon;
            const isDark = cardIndex === 0 || cardIndex === 3;
            return (
              <div key={card.title} className={`relative isolate min-w-0 overflow-hidden rounded-2xl border p-4 shadow-[0_8px_24px_-12px_hsl(var(--primary)/0.35)] transition-shadow duration-300 hover:shadow-[0_16px_32px_-12px_hsl(var(--primary)/0.4)] sm:rounded-3xl sm:p-7 ${isDark ? "border-primary bg-gradient-to-br from-primary to-dark-green text-primary-foreground" : "border-primary/10 bg-gradient-to-br from-secondary to-secondary/50 text-foreground"}`}>
                <div aria-hidden="true" className={`pointer-events-none absolute -right-12 -top-12 -z-10 h-36 w-36 rounded-full border-[20px] sm:h-44 sm:w-44 ${isDark ? "border-primary-foreground/5" : "border-primary/5"}`} />
                <div className="mb-5 flex items-center justify-between gap-2 sm:mb-6">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl border shadow-sm sm:h-12 sm:w-12 ${isDark ? "border-lime/25 bg-lime/10 text-lime" : "border-primary/10 bg-primary text-primary-foreground"}`}>
                    <Icon size={20} strokeWidth={1.75} />
                  </div>
                  <span aria-hidden="true" className={`text-xs font-semibold tracking-widest ${isDark ? "text-primary-foreground/45" : "text-primary/45"}`}>0{cardIndex + 1}</span>
                </div>
                <h3 className="mb-3 min-h-[2.75rem] font-sans text-sm font-semibold leading-snug sm:text-base">{card.title}</h3>
                <p className={`border-t pt-4 text-xs leading-relaxed sm:text-sm sm:leading-7 ${isDark ? "border-primary-foreground/15 text-primary-foreground/80" : "border-primary/15 text-primary/80"}`}>
                  {card.lines.map((line, index) => (
                    <span key={line} className="block sm:inline">{line}{index < card.lines.length - 1 ? " " : ""}</span>
                  ))}
                </p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-2 gap-6 rounded-2xl bg-secondary p-6 md:grid-cols-4 md:gap-8 md:p-8">
          {stats.map((stat, i) => (
            <div key={i} className="px-2 py-2 text-center">
              <p className={`text-2xl sm:text-3xl font-bold font-serif ${i >= 2 ? "text-accent" : "text-foreground"}`}>
                {stat.number}
              </p>
              <p className="text-muted-foreground text-xs sm:text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
