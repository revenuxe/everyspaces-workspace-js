export interface CityLanding {
  city: string;
  citySlug: string;
  state: string;
  metaTitle: string;
  metaDescription: string;
  heroHeading: string;
  heroSubheading: string;
  statsHeading: string;
  statsDesc: string;
  servicesHeading: string;
  goalsHeading: string;
  testimonial: {
    quote: string;
    name: string;
    initials: string;
    location: string;
  };
  whyTitle: string;
  whyPoints: string[];
  popularAreas: string[];
}

export const cityContent: Record<string, CityLanding> = {
  bangalore: {
    city: "Bangalore",
    citySlug: "bangalore",
    state: "Karnataka",
    metaTitle: "Best Coworking & Office Space in Bangalore | EverySpaces",
    metaDescription: "Find affordable coworking spaces, private offices & managed workspaces across Bangalore. Premium office space for rent in Koramangala, Whitefield, HSR Layout, Indiranagar & more. EverySpaces workspace solutions.",
    heroHeading: "Office Space & Coworking in Bangalore",
    heroSubheading: "Bangalore is India's Silicon Valley — home to 10,000+ tech companies, unicorn startups, and global enterprises. Find your ideal coworking desk, private office, or managed workspace across 20+ premium locations.",
    statsHeading: "Trusted by teams across Bangalore",
    statsDesc: "Whether you need a private office in Koramangala, a coworking desk in HSR Layout, or a managed workspace in Whitefield — we match you with the right space in Bangalore's best business locations.",
    servicesHeading: "Workspace Solutions Across Bangalore",
    goalsHeading: "Why Teams in Bangalore Choose EverySpaces",
    testimonial: {
      quote: "EverySpaces helped us find the ideal office in Koramangala within a week. Their local expertise in Bangalore's commercial market is unmatched — we couldn't have done it without them!",
      name: "Rahul Krishnan",
      initials: "RK",
      location: "Koramangala, Bangalore",
    },
    whyTitle: "Why Bangalore for Your Office?",
    whyPoints: [
      "India's #1 startup ecosystem with 45,000+ startups and 100+ unicorns",
      "Access to 1.5M+ IT professionals — India's largest tech talent pool",
      "World-class infrastructure with metro, ORR & upcoming suburban rail",
      "Competitive rental rates from ₹8,000 to ₹60,000 per seat per month",
      "Thriving ecosystem of VCs, accelerators & co-innovation hubs",
      "Pleasant climate year-round — the Garden City advantage",
    ],
    popularAreas: ["Koramangala", "Whitefield", "HSR Layout", "Indiranagar", "MG Road", "Electronic City"],
  },
};
