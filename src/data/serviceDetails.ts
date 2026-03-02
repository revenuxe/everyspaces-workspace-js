export interface ServiceDetail {
  title: string;
  desc: string;
  variant: "default" | "lime" | "orange";
  steps: {
    number: string;
    title: string;
    description: string;
  }[];
  deliverables: string[];
}

export const serviceDetails: Record<string, ServiceDetail> = {
  "workspace-consulting": {
    title: "Workspace Consulting",
    desc: "Expert guidance to help you find and optimize the perfect workspace for your team.",
    variant: "default",
    steps: [
      {
        number: "01",
        title: "Discovery Call",
        description: "We start with a deep-dive conversation to understand your team size, work culture, budget, and growth plans.",
      },
      {
        number: "02",
        title: "Workspace Audit",
        description: "Our experts assess your current setup — identifying inefficiencies, underused areas, and opportunities for improvement.",
      },
      {
        number: "03",
        title: "Strategy Blueprint",
        description: "We deliver a tailored workspace strategy with layout recommendations, cost analysis, and implementation timelines.",
      },
      {
        number: "04",
        title: "Execution & Support",
        description: "We guide you through implementation, vendor coordination, and provide ongoing support to ensure success.",
      },
    ],
    deliverables: ["Workspace Assessment Report", "Custom Floor Plan Recommendations", "Cost-Benefit Analysis", "90-Day Implementation Roadmap"],
  },
  "space-search-acquisition": {
    title: "Space Search & Acquisition",
    desc: "Professional assistance with finding, leasing, and acquiring high-value workspace properties efficiently.",
    variant: "default",
    steps: [
      {
        number: "01",
        title: "Requirements Gathering",
        description: "We map your exact needs — location preferences, capacity, amenities, lease terms, and budget constraints.",
      },
      {
        number: "02",
        title: "Curated Shortlist",
        description: "Our team scours the market and presents a handpicked selection of spaces that match your criteria perfectly.",
      },
      {
        number: "03",
        title: "Site Visits & Evaluation",
        description: "We arrange guided tours, evaluate each space against your checklist, and provide detailed comparison reports.",
      },
      {
        number: "04",
        title: "Negotiation & Closing",
        description: "We handle lease negotiations, legal review coordination, and ensure you get the best terms possible.",
      },
    ],
    deliverables: ["Market Comparison Report", "Top 5 Space Shortlist", "Lease Negotiation Support", "Move-in Coordination Plan"],
  },
  "office-interior-design": {
    title: "Office Interior Design",
    desc: "End-to-end office interior solutions — from concept ideation to final execution.",
    variant: "orange",
    steps: [
      {
        number: "01",
        title: "Vision & Moodboarding",
        description: "We collaborate on your brand aesthetic, functional needs, and create inspiring mood boards that capture your vision.",
      },
      {
        number: "02",
        title: "Space Planning & 3D Design",
        description: "Our designers create detailed floor plans, 3D renders, and material palettes for your review and approval.",
      },
      {
        number: "03",
        title: "Procurement & Build",
        description: "We manage everything — furniture sourcing, contractor coordination, and quality control throughout construction.",
      },
      {
        number: "04",
        title: "Handover & Styling",
        description: "Final touches, styling, and a walkthrough to ensure every detail meets your expectations before move-in day.",
      },
    ],
    deliverables: ["Mood Board & Concept Deck", "3D Renders & Floor Plans", "Furniture & Material Specifications", "Project Timeline & Budget Tracker"],
  },
  "market-research-analysis": {
    title: "Market Research & Analysis",
    desc: "In-depth analysis and insights to guide informed decisions in workspace investment opportunities.",
    variant: "default",
    steps: [
      {
        number: "01",
        title: "Define Research Scope",
        description: "We identify your key questions — market trends, competitor analysis, pricing benchmarks, or location viability.",
      },
      {
        number: "02",
        title: "Data Collection",
        description: "Our analysts gather data from proprietary databases, market surveys, and on-ground intelligence networks.",
      },
      {
        number: "03",
        title: "Analysis & Insights",
        description: "We synthesize raw data into actionable insights with visual dashboards, trend forecasts, and risk assessments.",
      },
      {
        number: "04",
        title: "Strategic Recommendations",
        description: "A final report with clear recommendations, opportunity mapping, and decision frameworks tailored to your goals.",
      },
    ],
    deliverables: ["Market Intelligence Report", "Competitor Landscape Analysis", "Pricing & Demand Forecast", "Investment Risk Assessment"],
  },
  "workspace-management": {
    title: "Workspace Management Services",
    desc: "Comprehensive workspace management to maximize occupancy, minimize costs, and enhance space value.",
    variant: "lime",
    steps: [
      {
        number: "01",
        title: "Onboarding & Assessment",
        description: "We audit your current operations, identify pain points, and establish KPIs for workspace performance.",
      },
      {
        number: "02",
        title: "Operations Setup",
        description: "We implement management systems, vendor partnerships, and standard operating procedures for smooth daily operations.",
      },
      {
        number: "03",
        title: "Ongoing Management",
        description: "Our team handles day-to-day operations — maintenance, tenant relations, space optimization, and cost control.",
      },
      {
        number: "04",
        title: "Performance Reporting",
        description: "Monthly reports with occupancy metrics, financial summaries, and improvement recommendations to keep you informed.",
      },
    ],
    deliverables: ["Operations Playbook", "Vendor Management System", "Monthly Performance Dashboard", "Cost Optimization Report"],
  },
  "custom-workspace-strategies": {
    title: "Custom Workspace Strategies",
    desc: "Tailored strategies designed to meet your specific business goals, preferences, and growth profile.",
    variant: "default",
    steps: [
      {
        number: "01",
        title: "Business Deep-Dive",
        description: "We analyze your business model, growth trajectory, team dynamics, and long-term vision to understand your unique needs.",
      },
      {
        number: "02",
        title: "Strategy Development",
        description: "Our team crafts a bespoke workspace strategy covering location, design, technology, and scalability planning.",
      },
      {
        number: "03",
        title: "Pilot & Validation",
        description: "We implement a pilot phase, gather feedback, and iterate to ensure the strategy delivers measurable results.",
      },
      {
        number: "04",
        title: "Scale & Evolve",
        description: "Roll out the refined strategy across your organization with continuous optimization and quarterly reviews.",
      },
    ],
    deliverables: ["Custom Strategy Document", "Implementation Roadmap", "Pilot Program Results", "Quarterly Review Framework"],
  },
};

export const serviceSlugMap: Record<string, string> = {
  "Workspace Consulting": "workspace-consulting",
  "Space Search & Acquisition": "space-search-acquisition",
  "Office Interior Design": "office-interior-design",
  "Market Research & Analysis": "market-research-analysis",
  "Workspace Management Services": "workspace-management",
  "Custom Workspace Strategies": "custom-workspace-strategies",
};
