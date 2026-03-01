import { ArrowUpRight, Users, Building2, BarChart3, Search, Settings, Lightbulb } from "lucide-react";

const services = [
  {
    icon: Building2,
    title: "Workspace Consulting",
    desc: "Expert guidance to help you find and optimize the perfect workspace for your team.",
    variant: "default" as const,
  },
  {
    icon: Search,
    title: "Space Search & Acquisition",
    desc: "Professional assistance with finding, leasing, and acquiring high-value workspace properties efficiently.",
    variant: "default" as const,
  },
  {
    icon: BarChart3,
    title: "Portfolio Optimization & Growth",
    desc: "Maximize returns with tailored strategies for portfolio optimization and sustainable growth in workspace real estate.",
    variant: "orange" as const,
  },
  {
    icon: Users,
    title: "Market Research & Analysis",
    desc: "In-depth analysis and insights to guide informed decisions in workspace investment opportunities.",
    variant: "default" as const,
  },
  {
    icon: Settings,
    title: "Workspace Management Services",
    desc: "Comprehensive workspace management to maximize occupancy, minimize costs, and enhance space value.",
    variant: "lime" as const,
  },
  {
    icon: Lightbulb,
    title: "Custom Workspace Strategies",
    desc: "Tailored strategies designed to meet your specific business goals, preferences, and growth profile.",
    variant: "default" as const,
  },
];

const variantClasses = {
  default: "bg-card border border-border",
  lime: "bg-lime",
  orange: "bg-accent text-accent-foreground",
};

const ServicesSection = () => {
  return (
    <section id="service" className="py-20 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-start justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-serif max-w-xl">
            <span className="font-bold">Expert</span> Workspace Solutions for Maximum Productivity
          </h2>
          <a
            href="#contact"
            className="hidden md:flex w-12 h-12 rounded-full border-2 border-foreground items-center justify-center hover:bg-foreground hover:text-primary-foreground transition-colors"
          >
            <ArrowUpRight size={20} />
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <div
              key={i}
              className={`rounded-2xl p-6 flex flex-col justify-between min-h-[260px] ${variantClasses[service.variant]}`}
            >
              <div className="w-14 h-14 rounded-full bg-background/30 backdrop-blur-sm flex items-center justify-center mb-6">
                <service.icon size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold font-sans mb-2">{service.title}</h3>
                <p className="text-sm opacity-80 mb-4">{service.desc}</p>
                {service.variant !== "orange" && (
                  <button className="text-sm font-medium border border-current rounded-full px-4 py-1.5 hover:bg-foreground hover:text-primary-foreground transition-colors">
                    Learn More
                  </button>
                )}
                {service.variant === "orange" && (
                  <button className="text-sm font-medium border border-accent-foreground rounded-full px-4 py-1.5 hover:bg-accent-foreground hover:text-accent transition-colors">
                    Learn More
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
