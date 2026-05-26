import { Building2, CheckCircle2, MapPinned, Timer, Users } from "lucide-react";
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
    title: "Location-first shortlists",
    desc: "Compare Bangalore office markets with practical local guidance.",
  },
  {
    icon: Building2,
    title: "The right workspace format",
    desc: "Match coworking, cabins, managed offices, or full-floor setups to your team.",
  },
  {
    icon: Timer,
    title: "Faster site visits",
    desc: "Shortlist spaces that fit budget, commute, amenities, and move-in needs.",
  },
  {
    icon: CheckCircle2,
    title: "Negotiation-ready support",
    desc: "Compare pricing, seat costs, fit, and readiness before you commit.",
  },
];

const StatsSection = () => {
  return (
    <section id="insight" className="py-12 md:py-20 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div className="max-w-2xl">
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              <Users size={14} className="text-accent" />
              Workspace search, simplified
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif leading-snug">
              Find a Bangalore office that fits your team, budget, and next move.
            </h2>
          </div>
          <div className="lg:max-w-xl">
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              EverySpaces turns scattered office options into a clear decision path: local market guidance, curated
              options, site visits, and practical lease support for growing teams across Bengaluru.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                to="/areas-we-serve"
                className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
              >
                Explore areas
              </Link>
              <Link
                to="/certification"
                className="rounded-full border border-foreground px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-foreground hover:text-primary-foreground transition-colors"
              >
                Workspace certification
              </Link>
            </div>
          </div>
        </div>

        <div className="mb-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {workspaceCards.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.title} className="rounded-2xl border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent sm:mb-4 sm:h-11 sm:w-11">
                  <Icon size={18} />
                </div>
                <h3 className="mb-2 text-sm font-bold leading-snug sm:text-base">{card.title}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">{card.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-2 gap-3 rounded-2xl border border-border bg-secondary p-3 md:grid-cols-4 md:gap-4 md:p-4">
          {stats.map((stat, i) => (
            <div key={i} className="rounded-xl bg-card px-4 py-5 text-center">
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
