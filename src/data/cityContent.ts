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
  hyderabad: {
    city: "Hyderabad",
    citySlug: "hyderabad",
    state: "Telangana",
    metaTitle: "Best Coworking & Office Space in Hyderabad | EverySpaces",
    metaDescription: "Find affordable coworking spaces, private offices & managed workspaces across Hyderabad. Premium office space for rent in HITEC City, Gachibowli, Madhapur, Kondapur & more. EverySpaces workspace solutions.",
    heroHeading: "Office Space & Coworking in Hyderabad",
    heroSubheading: "Hyderabad is India's fastest-growing tech hub — home to Microsoft, Google, Amazon, and a booming startup ecosystem. Find world-class coworking desks, private offices, and managed workspaces across 15+ prime locations.",
    statsHeading: "Trusted by teams across Hyderabad",
    statsDesc: "Whether you need a premium office in HITEC City, a startup-friendly coworking space in Madhapur, or an affordable managed workspace in Kondapur — we match you with the right space in Hyderabad's top business locations.",
    servicesHeading: "Workspace Solutions Across Hyderabad",
    goalsHeading: "Why Teams in Hyderabad Choose EverySpaces",
    testimonial: {
      quote: "We found our dream office in HITEC City through EverySpaces in just 3 days. The team understood exactly what a growing SaaS company needs — professional, fast, and cost-effective!",
      name: "Priya Reddy",
      initials: "PR",
      location: "HITEC City, Hyderabad",
    },
    whyTitle: "Why Hyderabad for Your Office?",
    whyPoints: [
      "India's #2 IT hub — home to Microsoft, Google, Amazon & Facebook campuses",
      "30-40% lower office rentals compared to Bangalore & Mumbai",
      "World-class metro connectivity across 70+ stations",
      "Growing startup ecosystem with T-Hub — India's largest incubator",
      "Pharma & biotech capital with 800+ life sciences companies",
      "Strategic location with excellent air connectivity across India",
    ],
    popularAreas: ["HITEC City", "Gachibowli", "Madhapur", "Kondapur", "Banjara Hills", "Jubilee Hills"],
  },
};
