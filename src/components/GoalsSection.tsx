import { Flower2, CircleDot, Asterisk } from "lucide-react";

const goals = [
  {
    icon: Flower2,
    title: "Maximize Return on Investments",
    color: "text-lime",
  },
  {
    icon: CircleDot,
    title: "Simplify Workspace Decisions Effectively",
    color: "text-accent",
  },
  {
    icon: Asterisk,
    title: "Build Long-Term Growth Strategically",
    color: "text-primary-foreground",
  },
];

const GoalsSection = () => {
  return (
    <section id="goals" className="py-20 px-6 lg:px-12 bg-dark-green">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-serif text-primary-foreground mb-12">
          <span className="italic">Achieve</span> Your Ambitions
          <br />
          Goal Setting for Success
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {goals.map((goal, i) => (
            <div
              key={i}
              className="bg-dark-green-card rounded-2xl p-8 flex flex-col items-start justify-between min-h-[200px]"
            >
              <goal.icon size={40} className={goal.color} />
              <p className="text-primary-foreground text-left text-lg font-medium mt-auto">
                {goal.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GoalsSection;
