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

const hyderabadAreas: Area[] = [
  makeArea("HITEC City", "hitec-city", "Hyderabad", "hyderabad", "Hyderabad's premier IT & business hub", {
    metaDescription: "Premium coworking & office space in HITEC City, Hyderabad. India's top IT hub with enterprise-grade workspaces near Cyber Towers, Mindspace & Raheja IT Park.",
    heroSubheading: "HITEC City is Hyderabad's iconic IT corridor, home to Microsoft, Google, Amazon, and hundreds of tech companies. Find world-class office spaces in India's leading technology business district.",
    whyPoints: [
      "India's #1 IT hub — home to Microsoft, Google, Amazon & Facebook",
      "MMTS & Metro Rail connectivity (HITEC City station)",
      "Premium Grade-A office stock with modern amenities",
      "Proximity to Gachibowli, Madhapur & Kondapur tech clusters",
    ],
    popularFor: ["Global Tech Companies", "GCCs", "IT Services", "SaaS Startups"],
    testimonial: { quote: "We found our dream office in HITEC City through EverySpaces in just 3 days. The team understood exactly what a growing SaaS company needs!", name: "Priya Reddy", initials: "PR", location: "HITEC City" },
  }),
  makeArea("Gachibowli", "gachibowli", "Hyderabad", "hyderabad", "Financial district with world-class infrastructure", {
    heroSubheading: "Gachibowli is Hyderabad's financial district and tech powerhouse, home to DLF Cyber City and the ISB campus. Premium office spaces with world-class infrastructure.",
    whyPoints: [
      "Hyderabad's financial district with premium commercial spaces",
      "Home to DLF Cyber City, ISB & major pharma companies",
      "Excellent road connectivity via ORR & Nehru Outer Ring Road",
      "Thriving ecosystem of fintech, pharma & deep tech companies",
    ],
    popularFor: ["Financial Services", "Pharma Companies", "Deep Tech", "Research Labs"],
  }),
  makeArea("Madhapur", "madhapur", "Hyderabad", "hyderabad", "Startup-friendly area near HITEC City", {
    heroSubheading: "Madhapur bridges HITEC City and the residential neighborhoods, offering startup-friendly coworking spaces at competitive prices. The go-to area for young companies and agile teams.",
    whyPoints: [
      "Adjacent to HITEC City with lower rental rates",
      "Vibrant startup ecosystem with networking opportunities",
      "Excellent food, entertainment & lifestyle options",
      "Metro connectivity and easy access to ORR",
    ],
    popularFor: ["Tech Startups", "Digital Agencies", "E-commerce", "Content Companies"],
  }),
  makeArea("Jubilee Hills", "jubilee-hills", "Hyderabad", "hyderabad", "Premium address for upscale businesses", {
    whyPoints: [
      "Hyderabad's most prestigious & upscale business address",
      "Home to media houses, film production & entertainment industry",
      "Premium clientele base for consulting & luxury businesses",
      "Excellent connectivity to Banjara Hills, HITEC City & Secunderabad",
    ],
    popularFor: ["Media Houses", "Luxury Brands", "Consulting Firms", "Architecture Studios"],
  }),
  makeArea("Banjara Hills", "banjara-hills", "Hyderabad", "hyderabad", "Central upscale area with diverse businesses", {
    whyPoints: [
      "Central location with proximity to all major areas",
      "Premium address enhancing brand perception",
      "Diverse business ecosystem — healthcare, legal, creative & corporate",
      "Iconic dining, shopping & cultural landmarks nearby",
    ],
    popularFor: ["Healthcare Clinics", "Legal Firms", "Creative Studios", "Corporate Offices"],
  }),
  makeArea("Kondapur", "kondapur", "Hyderabad", "hyderabad", "Affordable offices near IT corridor", {
    whyPoints: [
      "30–40% more affordable than HITEC City & Gachibowli",
      "Excellent metro connectivity (Kondapur station)",
      "Large residential population ensuring easy talent acquisition",
      "Growing commercial infrastructure with modern office buildings",
    ],
    popularFor: ["IT Startups", "Staffing Firms", "EdTech", "SMEs"],
  }),
  makeArea("Kukatpally", "kukatpally", "Hyderabad", "hyderabad", "Budget-friendly with metro access", {
    whyPoints: [
      "Direct metro connectivity (KPHB Colony station)",
      "Affordable rental rates with good commercial infrastructure",
      "Proximity to JNTU, KPHB & Hi-Tech corridor",
      "Well-established residential area with all amenities",
    ],
    popularFor: ["Small Businesses", "Coaching Centers", "Retail Companies", "Freelancers"],
  }),
  makeArea("Begumpet", "begumpet", "Hyderabad", "hyderabad", "Central business area near old airport", {
    whyPoints: [
      "Central location with connectivity to all parts of Hyderabad",
      "Proximity to Secunderabad Railway Station & Begumpet Airport Road",
      "Established commercial district with government offices nearby",
      "Competitive pricing for premium central location",
    ],
    popularFor: ["Government Contractors", "Trading Firms", "Event Companies", "PR Agencies"],
  }),
  makeArea("Ameerpet", "ameerpet", "Hyderabad", "hyderabad", "Major metro junction with training hub", {
    whyPoints: [
      "Major metro interchange — Blue & Red line junction",
      "Highest footfall area — excellent for training & coaching businesses",
      "Very affordable commercial spaces compared to western Hyderabad",
      "Proximity to SR Nagar, Punjagutta & Somajiguda business areas",
    ],
    popularFor: ["Training Institutes", "Coaching Centers", "Small Businesses", "IT Training"],
  }),
  makeArea("Secunderabad", "secunderabad", "Hyderabad", "hyderabad", "Twin city with railway connectivity", {
    whyPoints: [
      "Home to Secunderabad Junction — one of India's busiest railway stations",
      "Established cantonment area with premium commercial spaces",
      "Excellent connectivity to all parts of Hyderabad via metro & road",
      "Diverse business ecosystem — defense, logistics, retail & services",
    ],
    popularFor: ["Logistics Companies", "Defense Suppliers", "Retail Chains", "Service Companies"],
  }),
  // Additional Hyderabad areas
  makeArea("Uppal", "uppal", "Hyderabad", "hyderabad", "Eastern Hyderabad with affordable workspaces", {
    whyPoints: [
      "Affordable commercial spaces on the eastern corridor",
      "Metro connectivity (Uppal station — terminal)",
      "Growing IT presence with Infosys & other tech companies",
      "Well-connected to Secunderabad & LB Nagar via metro",
    ],
    popularFor: ["IT Companies", "Manufacturing", "Logistics", "SMEs"],
  }),
  makeArea("Miyapur", "miyapur", "Hyderabad", "hyderabad", "Western metro terminal with growing offices", {
    whyPoints: [
      "Metro terminal station — excellent connectivity",
      "Affordable rents with modern commercial developments",
      "Close proximity to HITEC City & financial district",
      "Rapidly developing residential & commercial infrastructure",
    ],
    popularFor: ["Startups", "Small Businesses", "Freelancers", "Training Centers"],
  }),
  makeArea("Somajiguda", "somajiguda", "Hyderabad", "hyderabad", "Central Hyderabad with premium offices", {
    whyPoints: [
      "Central location near Raj Bhavan & Secretariat",
      "Premium office buildings with corporate presence",
      "Excellent connectivity to Ameerpet, Begumpet & Banjara Hills",
      "Government & diplomatic area — ideal for consulting firms",
    ],
    popularFor: ["Corporate Offices", "Consulting Firms", "Legal Offices", "Government Relations"],
  }),
  makeArea("Manikonda", "manikonda", "Hyderabad", "hyderabad", "Affordable alternative near HITEC City", {
    whyPoints: [
      "Adjacent to HITEC City at 40–50% lower rental rates",
      "Rapidly developing commercial infrastructure",
      "Well-connected via ORR to all IT hubs",
      "Growing residential population ensuring talent availability",
    ],
    popularFor: ["IT Startups", "BPO", "EdTech", "E-commerce"],
  }),
  makeArea("Nanakramguda", "nanakramguda", "Hyderabad", "hyderabad", "Financial district extension with new-age offices", {
    whyPoints: [
      "Extension of the Gachibowli financial district",
      "Home to Telangana state government's new Secretariat",
      "Premium Grade-A office spaces & tech parks",
      "Excellent ORR connectivity to all western Hyderabad hubs",
    ],
    popularFor: ["GCCs", "Financial Services", "Government IT", "Large Enterprises"],
  }),
];

export const allAreas: Area[] = [...bangaloreAreas, ...hyderabadAreas];

export const areasByCity: Record<string, Area[]> = {
  bangalore: bangaloreAreas,
  hyderabad: hyderabadAreas,
};

export const getAreaBySlug = (citySlug: string, areaSlug: string): Area | undefined =>
  allAreas.find((a) => a.citySlug === citySlug && a.slug === areaSlug);
