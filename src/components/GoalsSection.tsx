import { Target, TrendingUp, Shield } from "lucide-react";

const goals = [
  {
    icon: Target,
    title: "A focused office shortlist",
    description: "Compare spaces that suit your location, budget, and move-in timeline.",
    color: "text-lime",
  },
  {
    icon: TrendingUp,
    title: "Space for your best work",
    description: "Find coworking desks and managed offices that support the way your team works.",
    color: "text-accent",
  },
  {
    icon: Shield,
    title: "Room for your next stage",
    description: "Plan for growth with practical lease guidance and flexible workspace options.",
    color: "text-primary-foreground",
  },
];

const GoalsSection = () => {
  return (
    <section id="goals" className="py-16 md:py-24 px-4 sm:px-6 lg:px-12 bg-dark-green">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-primary-foreground mb-5 leading-tight">
          <span className="italic">Why</span> Startups &amp; Enterprises Trust Us
          <br />
          for Workspace Solutions
        </h2>
        <p className="mx-auto mb-10 md:mb-14 max-w-2xl text-sm leading-relaxed text-primary-foreground/75 sm:text-base">
          Bring your budget, commute, office needs, and growth plans into one clear decision. Numunix helps you compare the right workspace options for your team.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {goals.map((goal, i) => (
            <div
              key={i}
              className="bg-dark-green-card rounded-2xl p-7 sm:p-8 flex flex-col items-start text-left"
            >
              <goal.icon size={36} className={goal.color} />
              <p className="text-primary-foreground text-lg font-semibold mt-7 mb-3">
                {goal.title}
              </p>
              <p className="text-sm leading-7 text-primary-foreground/75">{goal.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GoalsSection;
