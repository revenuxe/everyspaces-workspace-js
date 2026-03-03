import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import AnimatedSection from "@/components/AnimatedSection";
import { Quote, Building2, Home, Wifi, Users, Heart, Rocket } from "lucide-react";

const quotes = [
  {
    text: "The office of the future is wherever you are — all you need is purpose, a good chair, and a strong Wi-Fi signal.",
    author: "EverySpaces Team",
  },
  {
    text: "Great workspaces don't just house people — they inspire movements, spark ideas, and build cultures.",
    author: "Industry Insight",
  },
  {
    text: "Remote work isn't about working from home. It's about working from anywhere life takes you.",
    author: "The New Work Era",
  },
];

const pillars = [
  {
    icon: Building2,
    title: "Smart Office Solutions",
    desc: "We help businesses discover and set up workspaces that match their culture, size, and ambitions — from coworking desks to entire floors.",
  },
  {
    icon: Home,
    title: "Home Office Essentials",
    desc: "A productive home setup starts with ergonomic furniture, proper lighting, a dedicated quiet zone, and reliable high-speed internet.",
  },
  {
    icon: Wifi,
    title: "Remote-Ready Infrastructure",
    desc: "We guide teams on the tools and setups they need — from video conferencing gear to cloud collaboration platforms — so distance never limits output.",
  },
  {
    icon: Users,
    title: "Community & Culture",
    desc: "Whether in-office or remote, we believe the best workspaces foster connection, creativity, and a sense of belonging among teams.",
  },
];

const homeSetupTips = [
  "Invest in an ergonomic chair and adjustable desk — your body will thank you.",
  "Natural light reduces eye strain and boosts mood. Position your desk near a window.",
  "Use noise-cancelling headphones for deep focus during meetings and solo work.",
  "Keep your workspace clutter-free. A tidy desk leads to a tidy mind.",
  "Separate your work zone from your living zone — boundaries matter.",
  "Ensure a stable internet connection with a backup plan for outages.",
];

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <AnimatedSection>
        <section className="py-16 md:py-28 px-4 sm:px-6 lg:px-12 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-accent font-semibold text-sm tracking-widest uppercase mb-4">Est. 2025</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif leading-tight mb-6">
              We're <span className="italic">EverySpaces</span> — Redefining
              <br className="hidden sm:block" /> How India Works
            </h1>
            <p className="text-primary-foreground/80 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Founded in 2025 in the heart of Bangalore, EverySpaces was born from a simple belief: every professional deserves a workspace that fuels their best work — whether that's a buzzing coworking hub, a private office, or a thoughtfully designed home setup.
            </p>
          </div>
        </section>
      </AnimatedSection>

      {/* Our Story */}
      <AnimatedSection delay={0.1}>
        <section className="py-14 md:py-20 px-4 sm:px-6 lg:px-12">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-start">
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif mb-5">
                Our <span className="italic">Story</span>
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-4">
                In early 2025, a group of workspace enthusiasts in Bangalore noticed a gap: finding the right commercial space was still painfully slow, opaque, and frustrating for growing businesses.
              </p>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-4">
                We set out to change that. EverySpaces brings together deep local market knowledge, a curated portfolio of premium spaces, and a consultative approach that puts your team's needs first.
              </p>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                Today, we serve startups, SMEs, and enterprises across Bangalore — helping them find, set up, and thrive in workspaces that truly fit.
              </p>
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif mb-5">
                Our <span className="italic">Mission</span>
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-4">
                To make finding and managing workspaces effortless, so businesses can focus on what matters most — building, creating, and growing.
              </p>
              <div className="bg-secondary rounded-xl p-6 mt-6">
                <div className="flex items-start gap-3">
                  <Heart size={24} className="text-accent shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-sm mb-1">Our Core Value</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      People over square footage. We believe the best workspace decisions start with understanding your team, your culture, and your vision.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-secondary rounded-xl p-6 mt-4">
                <div className="flex items-start gap-3">
                  <Rocket size={24} className="text-accent shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-sm mb-1">Our Vision</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      To become India's most trusted workspace partner — bridging the gap between where people work and how well they work.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Quotes */}
      <AnimatedSection delay={0.1}>
        <section className="py-14 md:py-20 px-4 sm:px-6 lg:px-12 bg-dark-green">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-serif text-primary-foreground text-center mb-10 md:mb-14">
              Words We <span className="italic">Work</span> By
            </h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {quotes.map((q, i) => (
                <div key={i} className="bg-dark-green-card rounded-xl p-6 sm:p-8 flex flex-col justify-between">
                  <Quote size={28} className="text-accent mb-4" />
                  <p className="text-primary-foreground/90 text-sm sm:text-base leading-relaxed mb-6 italic">
                    "{q.text}"
                  </p>
                  <p className="text-lime text-xs font-semibold tracking-wide uppercase">— {q.author}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* What We Do */}
      <AnimatedSection delay={0.1}>
        <section className="py-14 md:py-20 px-4 sm:px-6 lg:px-12">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-serif text-center mb-10 md:mb-14">
              What <span className="italic">Drives</span> Us
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {pillars.map((p, i) => (
                <div key={i} className="border border-border rounded-xl p-6 sm:p-8 hover:shadow-lg transition-shadow">
                  <p.icon size={32} className="text-accent mb-4" />
                  <h3 className="font-serif text-lg font-bold mb-2">{p.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Home Setup Tips */}
      <AnimatedSection delay={0.1}>
        <section className="py-14 md:py-20 px-4 sm:px-6 lg:px-12 bg-secondary">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-serif text-center mb-3">
              Setting Up Your <span className="italic">Home Office</span>
            </h2>
            <p className="text-muted-foreground text-sm text-center mb-10 max-w-xl mx-auto">
              Whether you're going fully remote or hybrid, here's what every productive home workspace needs.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {homeSetupTips.map((tip, i) => (
                <div key={i} className="flex items-start gap-3 bg-card rounded-xl p-5">
                  <span className="text-accent font-bold font-serif text-lg shrink-0">0{i + 1}</span>
                  <p className="text-sm text-muted-foreground leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <FooterSection />
      </AnimatedSection>
    </div>
  );
};

export default AboutUs;
