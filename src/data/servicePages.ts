import type { StaticImageData } from "next/image";
import serviceConsulting from "@/assets/service-consulting.png";
import serviceSearch from "@/assets/service-search.png";
import serviceInterior from "@/assets/service-interior.png";
import serviceResearch from "@/assets/service-research.png";
import serviceManagement from "@/assets/service-management.png";
import serviceStrategy from "@/assets/service-strategy.png";
import { serviceDetails } from "@/data/serviceDetails";

export interface ServicePageContent {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  image: StaticImageData;
  eyebrow: string;
  heroLead: string;
  bestFor: string[];
  outcomes: string[];
  proofPoints: {
    value: string;
    label: string;
  }[];
  sections: {
    title: string;
    description: string;
  }[];
  ctaTitle: string;
  ctaDescription: string;
}

export const servicePages: ServicePageContent[] = [
  {
    slug: "workspace-consulting",
    title: "Workspace Consulting",
    shortTitle: "Consulting",
    description: serviceDetails["workspace-consulting"].desc,
    metaTitle: "Workspace Consulting Services | EverySpaces",
    metaDescription:
      "Get expert workspace consulting for office search, layout planning, budget alignment, and team growth. EverySpaces helps businesses choose smarter workspaces.",
    keywords:
      "workspace consulting, office space consultant, workspace strategy, office planning, coworking advisor, managed office consulting",
    image: serviceConsulting,
    eyebrow: "Workspace advisory",
    heroLead:
      "Make workspace decisions with clarity. We translate your team size, hiring plan, budget, culture, and operating rhythm into a practical workspace roadmap.",
    bestFor: ["Startups planning their first office", "Growing teams comparing coworking and managed offices", "Founders unsure how much space to lease", "Businesses reviewing current workspace efficiency"],
    outcomes: ["A clear workspace requirement brief", "Location and format recommendations", "Budget and utilization guidance", "A practical move or optimization plan"],
    proofPoints: [
      { value: "01", label: "Requirement clarity before search" },
      { value: "90", label: "Day implementation roadmap" },
      { value: "4", label: "Step advisory process" },
    ],
    sections: [
      {
        title: "Requirement Mapping",
        description:
          "We identify how your team actually works, including meeting load, department split, privacy needs, visitor flow, leadership requirements, and hybrid policies.",
      },
      {
        title: "Workspace Model Selection",
        description:
          "We compare coworking desks, private cabins, managed offices, bare-shell offices, and hybrid arrangements so you can pick the format that fits your stage.",
      },
      {
        title: "Cost and Growth Planning",
        description:
          "We look beyond monthly rent and factor deposits, fit-out, lock-in, commute impact, expansion options, and operational overhead.",
      },
    ],
    ctaTitle: "Need a workspace decision you can defend?",
    ctaDescription:
      "Share your team size, preferred location, and timeline. We will help you turn scattered options into a clear workspace plan.",
  },
  {
    slug: "space-search-acquisition",
    title: "Space Search & Acquisition",
    shortTitle: "Search & Acquisition",
    description: serviceDetails["space-search-acquisition"].desc,
    metaTitle: "Space Search & Acquisition Services | EverySpaces",
    metaDescription:
      "Find, compare, lease, and acquire high-value workspace properties with EverySpaces. Get curated shortlists, site visits, and negotiation support.",
    keywords:
      "office space search, workspace acquisition, office leasing support, commercial property search, managed office search, coworking space search",
    image: serviceSearch,
    eyebrow: "Search and leasing",
    heroLead:
      "Move from endless property browsing to a tight, decision-ready shortlist. We handle discovery, market scan, site visits, comparison, and negotiation support.",
    bestFor: ["Teams moving within 30 to 90 days", "Companies comparing multiple neighborhoods", "Founders who want verified options", "Businesses negotiating lease or managed office terms"],
    outcomes: ["Curated property shortlist", "Guided site visits and comparisons", "Commercial term benchmarking", "Move-in and closure coordination"],
    proofPoints: [
      { value: "5", label: "Focused shortlist options" },
      { value: "30", label: "To 90 day move planning" },
      { value: "1", label: "Partner from search to closure" },
    ],
    sections: [
      {
        title: "Market Scan",
        description:
          "We search across coworking spaces, managed offices, private offices, and commercial properties that match your location, seats, budget, and amenities.",
      },
      {
        title: "Shortlist and Visit Planning",
        description:
          "We filter out weak matches, arrange site visits, and compare options across price, access, fit, scalability, and lease terms.",
      },
      {
        title: "Negotiation Support",
        description:
          "We help you evaluate deposits, lock-ins, escalation, included services, maintenance, fit-out terms, and handover conditions before you commit.",
      },
    ],
    ctaTitle: "Want a sharper office shortlist?",
    ctaDescription:
      "Tell us where you want to be, how many seats you need, and when you want to move. We will curate matching options.",
  },
  {
    slug: "office-interior-design",
    title: "Office Interior Design",
    shortTitle: "Interior Design",
    description: serviceDetails["office-interior-design"].desc,
    metaTitle: "Office Interior Design Services | EverySpaces",
    metaDescription:
      "Plan and execute productive office interiors with EverySpaces, from concept and space planning to furniture, materials, build coordination, and handover.",
    keywords:
      "office interior design, workspace interiors, office fit out, managed office interiors, commercial interior design, office space planning",
    image: serviceInterior,
    eyebrow: "Design and build",
    heroLead:
      "Create an office that works as well as it looks. We connect brand, workflow, employee experience, and execution into a practical interior plan.",
    bestFor: ["Teams moving into a new office", "Businesses upgrading old interiors", "Brands needing client-facing workspaces", "Founders balancing budget, speed, and quality"],
    outcomes: ["Concept direction and moodboard", "Space plan and 3D design direction", "Material and furniture guidance", "Execution and handover coordination"],
    proofPoints: [
      { value: "3D", label: "Design and planning support" },
      { value: "1", label: "End-to-end delivery track" },
      { value: "100%", label: "Workspace-first design thinking" },
    ],
    sections: [
      {
        title: "Concept and Moodboarding",
        description:
          "We shape the visual direction around your brand, workflow, lighting, furniture expectations, visitor experience, and future team growth.",
      },
      {
        title: "Space Planning",
        description:
          "We balance open work zones, cabins, meeting rooms, phone booths, storage, pantry, collaboration spaces, and circulation.",
      },
      {
        title: "Execution Coordination",
        description:
          "We help coordinate furniture, materials, contractors, timelines, and quality checks so the design moves from deck to real workspace.",
      },
    ],
    ctaTitle: "Planning a new office interior?",
    ctaDescription:
      "Share your floor size, team count, and brand preferences. We will help shape a workspace that supports productivity and growth.",
  },
  {
    slug: "market-research-analysis",
    title: "Market Research & Analysis",
    shortTitle: "Research",
    description: serviceDetails["market-research-analysis"].desc,
    metaTitle: "Workspace Market Research & Analysis | EverySpaces",
    metaDescription:
      "Use EverySpaces market research to compare locations, pricing, demand, competitors, and workspace investment opportunities before making a decision.",
    keywords:
      "workspace market research, office market analysis, coworking market analysis, commercial real estate research, office pricing benchmark",
    image: serviceResearch,
    eyebrow: "Market intelligence",
    heroLead:
      "Understand the market before you commit capital, sign a lease, or choose a location. We turn local workspace signals into usable decision intelligence.",
    bestFor: ["Operators evaluating new locations", "Companies comparing micro-markets", "Investors reviewing workspace opportunities", "Teams needing price and demand benchmarks"],
    outcomes: ["Pricing and demand view", "Competitor and location analysis", "Risk and opportunity mapping", "Clear recommendation framework"],
    proofPoints: [
      { value: "360", label: "Degree market view" },
      { value: "4", label: "Decision lenses" },
      { value: "0", label: "Guesswork in location choice" },
    ],
    sections: [
      {
        title: "Location Intelligence",
        description:
          "We evaluate access, business density, commute patterns, nearby demand drivers, competing inventory, and future growth signals.",
      },
      {
        title: "Pricing Benchmarks",
        description:
          "We compare rent, seat pricing, managed office packages, deposits, lock-ins, and operating assumptions across relevant areas.",
      },
      {
        title: "Decision Reporting",
        description:
          "We present findings in a structured report with clear risks, opportunities, assumptions, and recommended next steps.",
      },
    ],
    ctaTitle: "Need market clarity before you move?",
    ctaDescription:
      "Tell us the location or opportunity you are evaluating. We will help you understand the numbers and tradeoffs.",
  },
  {
    slug: "workspace-management",
    title: "Workspace Management Services",
    shortTitle: "Management",
    description: serviceDetails["workspace-management"].desc,
    metaTitle: "Workspace Management Services | EverySpaces",
    metaDescription:
      "Improve workspace operations, occupancy, cost control, vendor coordination, and tenant experience with EverySpaces workspace management services.",
    keywords:
      "workspace management, office management services, managed workspace operations, workspace occupancy, office operations support",
    image: serviceManagement,
    eyebrow: "Operations management",
    heroLead:
      "Keep your workspace performing after move-in. We help owners, operators, and teams improve occupancy, reduce waste, and make daily operations smoother.",
    bestFor: ["Coworking and managed office operators", "Businesses managing larger offices", "Owners improving occupancy and experience", "Teams needing vendor and operations structure"],
    outcomes: ["Operations playbook", "Vendor and issue management structure", "Occupancy and cost visibility", "Monthly performance review rhythm"],
    proofPoints: [
      { value: "24/7", label: "Operational mindset" },
      { value: "1", label: "Management framework" },
      { value: "30", label: "Day reporting cadence" },
    ],
    sections: [
      {
        title: "Operational Audit",
        description:
          "We review current workflows, service gaps, vendor dependencies, recurring issues, cost leaks, occupancy patterns, and experience bottlenecks.",
      },
      {
        title: "Management System Setup",
        description:
          "We define responsibilities, escalation paths, maintenance rhythms, vendor standards, reporting formats, and service expectations.",
      },
      {
        title: "Performance Improvement",
        description:
          "We track occupancy, cost, utilization, issue closure, and user experience to keep the workspace valuable over time.",
      },
    ],
    ctaTitle: "Want your workspace to run better?",
    ctaDescription:
      "Share your current workspace challenges. We will help identify the management rhythm and improvements that matter most.",
  },
  {
    slug: "custom-workspace-strategies",
    title: "Custom Workspace Strategies",
    shortTitle: "Strategies",
    description: serviceDetails["custom-workspace-strategies"].desc,
    metaTitle: "Custom Workspace Strategy Services | EverySpaces",
    metaDescription:
      "Build a custom workspace strategy for growth, hybrid work, multi-location planning, employee experience, and long-term office decisions.",
    keywords:
      "custom workspace strategy, hybrid workspace planning, office growth strategy, workplace strategy, multi location workspace planning",
    image: serviceStrategy,
    eyebrow: "Tailored strategy",
    heroLead:
      "When standard office search is not enough, we build a workspace strategy around your operating model, growth plan, culture, and long-term goals.",
    bestFor: ["Fast-growing teams planning multiple phases", "Hybrid teams redefining office use", "Companies opening multiple city locations", "Leadership teams aligning workspace with business strategy"],
    outcomes: ["Custom workspace strategy document", "Phase-wise implementation roadmap", "Pilot and validation plan", "Quarterly review framework"],
    proofPoints: [
      { value: "1:1", label: "Strategy built around your business" },
      { value: "4", label: "Quarterly review rhythm" },
      { value: "3", label: "Growth scenarios planned" },
    ],
    sections: [
      {
        title: "Business Deep Dive",
        description:
          "We study your team structure, hiring plan, client needs, employee preferences, leadership priorities, and financial guardrails.",
      },
      {
        title: "Scenario Planning",
        description:
          "We model different workspace paths across location, size, format, lease flexibility, interior investment, and expansion timing.",
      },
      {
        title: "Pilot and Scale",
        description:
          "We help validate the strategy through a pilot or phased rollout, then refine it as your business and team evolve.",
      },
    ],
    ctaTitle: "Need a workspace plan built around your business?",
    ctaDescription:
      "Tell us where the company is headed. We will help design a workspace strategy that can evolve with you.",
  },
];

export const servicePageLinks = servicePages.map((service) => ({
  label: service.title,
  href: `/services/${service.slug}`,
  isRoute: true,
}));

export function getServicePage(slug: string) {
  return servicePages.find((service) => service.slug === slug);
}
