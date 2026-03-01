const stats = [
  { number: "92%", label: "Client Retention Rate" },
  { number: "3.5x", label: "Avg. Productivity Boost" },
  { number: "40%", label: "Cost Savings Achieved" },
  { number: "48hrs", label: "Avg. Turnaround Time" },
];

const StatsSection = () => {
  return (
    <section id="insight" className="py-12 md:py-20 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6 md:gap-12 mb-10 md:mb-16">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold font-sans mb-3">
              Together, we make workspaces thrive with expert management strategies
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              We unlock workspace potential with expert strategies, delivering exceptional results and ensuring client satisfaction in every project.
            </p>
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif leading-snug">
              <span className="font-bold">We Make Workspaces</span> Thrive With Expert Management Strategies.
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center md:text-left">
              <p className={`text-2xl sm:text-3xl md:text-4xl font-bold font-serif ${i >= 2 ? "text-accent" : "text-foreground"}`}>
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
