export interface Area {
  name: string;
  slug: string;
  city: string;
  citySlug: string;
  shortDesc: string;
  metaTitle: string;
  metaDescription: string;
  heroHeading: string;
  heroSubheading: string;
  whyTitle: string;
  whyPoints: string[];
  popularFor: string[];
  statsHeading: string;
  servicesHeading: string;
  goalsHeading: string;
  testimonial: {
    quote: string;
    name: string;
    initials: string;
    location: string;
  };
}

const makeArea = (
  name: string,
  slug: string,
  city: string,
  citySlug: string,
  shortDesc: string,
  overrides: Partial<Area>
): Area => ({
  name,
  slug,
  city,
  citySlug,
  shortDesc,
  metaTitle: `Coworking & Office Space in ${name}, ${city} | EverySpaces`,
  metaDescription: `Find affordable coworking spaces & office space for rent in ${name}, ${city}. Premium managed offices, hot desks & private cabins. EverySpaces workspace solutions.`,
  heroHeading: `Office Space & Coworking in ${name}`,
  heroSubheading: `Find the perfect coworking desk, private office, or managed workspace in ${name}, ${city}. EverySpaces helps startups, enterprises & growing teams find their ideal workspace.`,
  whyTitle: `Why ${name} for Your Office?`,
  whyPoints: [
    `Prime location in ${city}'s business ecosystem`,
    "Excellent connectivity via metro & road networks",
    "Competitive rental rates with flexible lease terms",
    `Growing community of startups & enterprises in ${name}`,
  ],
  popularFor: ["Tech Startups", "IT Companies", "Freelancers", "SMEs"],
  statsHeading: `Trusted by teams across ${name}`,
  servicesHeading: `Workspace Solutions in ${name}, ${city}`,
  goalsHeading: `Why Teams in ${name} Choose EverySpaces`,
  testimonial: {
    quote: `EverySpaces helped us find the ideal office in ${name} within a week. Their local expertise in ${city}'s commercial market is unmatched!`,
    name: "Happy Client",
    initials: "HC",
    location: name,
  },
  ...overrides,
});

const bangaloreAreas: Area[] = [
  makeArea("Koramangala", "koramangala", "Bangalore", "bangalore", "Startup hub with vibrant coworking culture", {
    metaDescription: "Find affordable coworking spaces & office space for rent in Koramangala, Bangalore. Premium managed offices near 4th Block, 5th Block & 8th Block.",
    heroSubheading: "Koramangala is Bangalore's startup capital — home to hundreds of tech companies, venture capital firms, and buzzing cafés. Find your ideal workspace in one of India's most dynamic business neighborhoods.",
    whyPoints: [
      "India's #1 startup neighborhood with 500+ funded startups",
      "Excellent connectivity via Outer Ring Road and upcoming metro",
      "Vibrant after-work culture with cafés, restaurants & networking events",
      "Proximity to HSR Layout, Indiranagar & BTM Layout talent pools",
    ],
    popularFor: ["Tech Startups", "VC & Angel Investors", "SaaS Companies", "Digital Agencies"],
    testimonial: { quote: "EverySpaces helped us find the ideal office in Koramangala within a week. Their local expertise in Bangalore's commercial market is unmatched — we couldn't have done it without them!", name: "Rahul Krishnan", initials: "RK", location: "Koramangala" },
  }),
  makeArea("HSR Layout", "hsr-layout", "Bangalore", "bangalore", "Affordable offices near Outer Ring Road", {
    heroSubheading: "HSR Layout offers the perfect blend of affordability and accessibility, sitting right next to the Outer Ring Road tech corridor. Ideal for startups and growing teams looking for value-driven workspaces.",
    whyPoints: [
      "Strategic location along the Outer Ring Road IT corridor",
      "30–40% more affordable than Koramangala & Indiranagar",
      "Strong residential infrastructure for employee convenience",
      "Growing ecosystem of freelancers, startups & SMEs",
    ],
    popularFor: ["Bootstrap Startups", "Freelancers", "SMEs", "Remote Teams"],
  }),
  makeArea("Whitefield", "whitefield", "Bangalore", "bangalore", "Major IT hub with enterprise-grade offices", {
    heroSubheading: "Whitefield is Bangalore's largest IT hub, home to ITPL and major tech parks housing global enterprises. Find enterprise-grade offices and flexible coworking spaces.",
    whyPoints: [
      "Home to ITPL and 200+ multinational companies",
      "Purple Line metro connectivity (Whitefield station)",
      "Abundant Grade-A commercial office stock",
      "Excellent social infrastructure — malls, hospitals & schools",
    ],
    popularFor: ["IT Companies", "MNCs", "BPO/KPO", "Enterprise Teams"],
  }),
  makeArea("Indiranagar", "indiranagar", "Bangalore", "bangalore", "Premium locale with metro connectivity", {
    heroSubheading: "Indiranagar is Bangalore's most upscale commercial-residential neighborhood. With direct metro connectivity and a premium vibe, it's the top choice for brands, design studios, and consulting firms.",
    whyPoints: [
      "Direct Purple Line metro connectivity (Indiranagar station)",
      "Premium brand presence — ideal for client-facing businesses",
      "Walkable neighborhood with boutique cafés & co-living spaces",
      "Close to MG Road, Koramangala & Domlur business districts",
    ],
    popularFor: ["Design Studios", "Consulting Firms", "Creative Agencies", "Premium Brands"],
  }),
  makeArea("MG Road", "mg-road", "Bangalore", "bangalore", "CBD with prestigious business address", {
    heroSubheading: "MG Road is Bangalore's central business district — the city's most prestigious commercial address. Perfect for businesses that need a premium location with unmatched connectivity.",
    whyPoints: [
      "Bangalore's most prestigious business address",
      "Dual metro line connectivity (Purple & Green lines)",
      "Walking distance to Brigade Road, Church Street & UB City",
      "Ideal for client meetings, corporate events & networking",
    ],
    popularFor: ["Corporate Offices", "Law Firms", "Financial Services", "Consulting"],
  }),
  makeArea("Electronic City", "electronic-city", "Bangalore", "bangalore", "IT corridor with cost-effective spaces", {
    heroSubheading: "Electronic City is one of India's oldest and largest IT parks, home to Infosys, Wipro, and TCS campuses. Get cost-effective office solutions in this well-established tech corridor.",
    whyPoints: [
      "Home to Infosys, Wipro, TCS & 150+ tech companies",
      "Elevated expressway for quick access to central Bangalore",
      "Most affordable Grade-A office spaces in Bangalore",
      "Dedicated bus rapid transit & upcoming metro extension",
    ],
    popularFor: ["IT Services", "GCCs", "Tech Startups", "BPO Centers"],
  }),
  makeArea("Marathahalli", "marathahalli", "Bangalore", "bangalore", "ORR hub connecting key IT corridors", {
    whyPoints: [
      "Central ORR location connecting major IT hubs",
      "Competitive rental rates compared to Whitefield & Koramangala",
      "Large pool of IT professionals living in the vicinity",
      "Easy access to Varthur, Bellandur & Sarjapur tech clusters",
    ],
    popularFor: ["Mid-size IT Firms", "Staffing Companies", "EdTech", "E-commerce"],
  }),
  makeArea("JP Nagar", "jp-nagar", "Bangalore", "bangalore", "Well-connected South Bangalore locale", {
    whyPoints: [
      "Well-established residential area with excellent amenities",
      "Connected to Bannerghatta Road & Outer Ring Road",
      "Affordable commercial spaces with good parking facilities",
      "Growing demand from healthcare, education & services sectors",
    ],
    popularFor: ["Healthcare Firms", "Education Companies", "Professional Services", "SMEs"],
  }),
  makeArea("Bannerghatta Road", "bannerghatta-road", "Bangalore", "bangalore", "Emerging tech corridor in South Bangalore", {
    whyPoints: [
      "Rapidly developing commercial corridor with modern office stock",
      "Proximity to JP Nagar, BTM Layout & Jayanagar talent base",
      "Competitive pricing compared to ORR-adjacent locations",
      "Improved connectivity with road widening projects underway",
    ],
    popularFor: ["SaaS Startups", "Fintech", "Consulting Firms", "Research Labs"],
  }),
  makeArea("BTM Layout", "btm-layout", "Bangalore", "bangalore", "Budget-friendly hub for small teams", {
    whyPoints: [
      "Among the most affordable locations in central Bangalore",
      "Large freelancer & startup community for networking",
      "Adjacent to Koramangala, HSR Layout & Silk Board junction",
      "Abundant food options & co-living spaces for teams",
    ],
    popularFor: ["Freelancers", "Solo Founders", "Small Teams", "Content Creators"],
  }),
  makeArea("Hebbal", "hebbal", "Bangalore", "bangalore", "North Bangalore gateway near Manyata Tech Park", {
    whyPoints: [
      "Gateway to Kempegowda International Airport (25 min drive)",
      "Adjacent to Manyata Tech Park — Bangalore's largest business campus",
      "Rapid infrastructure development with flyovers & metro extension",
      "Premium residential neighborhoods attracting top talent",
    ],
    popularFor: ["MNCs", "GCCs", "Travel & Logistics", "Biotech Firms"],
  }),
  makeArea("HBR Layout", "hbr-layout", "Bangalore", "bangalore", "EverySpaces HQ — emerging coworking destination", {
    whyPoints: [
      "Affordable rents with excellent value for money",
      "Good connectivity to Hebbal, Kalyan Nagar & Outer Ring Road",
      "Growing commercial ecosystem with modern office buildings",
      "Residential neighborhood ensuring easy commute for teams",
    ],
    popularFor: ["Startups", "Small Businesses", "Freelancers", "Professional Services"],
  }),
  makeArea("Rajajinagar", "rajajinagar", "Bangalore", "bangalore", "West Bangalore with metro connectivity", {
    whyPoints: [
      "Green Line metro connectivity (Rajajinagar station)",
      "Proximity to Malleshwaram, Yeshwanthpur & Peenya industrial area",
      "Established commercial district with diverse business presence",
      "Competitive rental rates for well-connected premium location",
    ],
    popularFor: ["Manufacturing HQs", "Trading Companies", "Legal Firms", "Retail Brands"],
  }),
  makeArea("Yelahanka", "yelahanka", "Bangalore", "bangalore", "Airport-adjacent with growing infrastructure", {
    whyPoints: [
      "Closest commercial area to Kempegowda International Airport",
      "Rapidly developing infrastructure with NH-44 connectivity",
      "Affordable rents compared to central Bangalore locations",
      "Growing aerospace & defense industry ecosystem",
    ],
    popularFor: ["Aerospace Companies", "Defense Contractors", "Logistics Firms", "Import-Export"],
  }),
  makeArea("Jayanagar", "jayanagar", "Bangalore", "bangalore", "Heritage neighborhood with metro access", {
    whyPoints: [
      "Green Line metro connectivity (Jayanagar station)",
      "One of Bangalore's most well-planned & prestigious localities",
      "Strong local business ecosystem with established clientele",
      "Excellent social amenities — shopping complexes, parks & hospitals",
    ],
    popularFor: ["CA & CS Firms", "Medical Practices", "Educational Institutes", "Retail HQs"],
  }),
  // Additional Bangalore areas
  makeArea("Sarjapur Road", "sarjapur-road", "Bangalore", "bangalore", "Fast-growing IT corridor near ORR", {
    whyPoints: [
      "Rapidly developing IT corridor between ORR and Sarjapur",
      "Home to major tech parks including Wipro's campus",
      "New-age office spaces with modern amenities",
      "Growing residential ecosystem attracting young professionals",
    ],
    popularFor: ["IT Companies", "Tech Startups", "Product Companies", "GCCs"],
  }),
  makeArea("Bellandur", "bellandur", "Bangalore", "bangalore", "Central ORR location near major tech parks", {
    whyPoints: [
      "Located on the Outer Ring Road IT corridor",
      "Between Marathahalli & HSR Layout — central access",
      "Home to several mid-rise commercial complexes",
      "Large talent pool from surrounding residential areas",
    ],
    popularFor: ["IT Services", "SaaS Companies", "Mid-size Firms", "Consulting"],
  }),
  makeArea("Domlur", "domlur", "Bangalore", "bangalore", "Central Bangalore near MakeMyTrip & Flipkart offices", {
    whyPoints: [
      "Central location between Indiranagar & Koramangala",
      "Home to major unicorn company offices",
      "Excellent road connectivity via 100 Feet Road & HAL Road",
      "Premium yet competitive rental rates",
    ],
    popularFor: ["Unicorn Startups", "Product Companies", "VC Firms", "Media Companies"],
  }),
  makeArea("Kalyan Nagar", "kalyan-nagar", "Bangalore", "bangalore", "North-East hub with vibrant community", {
    whyPoints: [
      "Well-connected to Hebbal, HBR Layout & Outer Ring Road",
      "Growing commercial ecosystem with modern coworking spaces",
      "Vibrant food and lifestyle scene for work-life balance",
      "Affordable rents with good infrastructure",
    ],
    popularFor: ["Startups", "Freelancers", "Creative Agencies", "Tech Teams"],
  }),
  makeArea("Sadashivanagar", "sadashivanagar", "Bangalore", "bangalore", "Premium North Bangalore address", {
    whyPoints: [
      "One of Bangalore's most upscale neighborhoods",
      "Close to Palace Grounds & CBD",
      "Premium address for client-facing businesses",
      "Quiet, tree-lined environment for focused work",
    ],
    popularFor: ["Consulting Firms", "Legal Offices", "Architecture Studios", "Wealth Management"],
  }),
];

export const allAreas: Area[] = [...bangaloreAreas];

export const areasByCity: Record<string, Area[]> = {
  bangalore: bangaloreAreas,
};

export const getAreaBySlug = (citySlug: string, areaSlug: string): Area | undefined =>
  allAreas.find((a) => a.citySlug === citySlug && a.slug === areaSlug);
