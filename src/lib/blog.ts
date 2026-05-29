import { cache } from "react";
import { absoluteUrl, defaultMetadata } from "@/lib/seo";

export interface BlogImage {
  url: string;
  alt?: string;
  caption?: string;
}

export interface BlogContentSpan {
  text?: string;
  marks?: string[];
  href?: string;
}

export interface BlogContentBlock {
  _key?: string;
  _type?: "block" | "image" | "code";
  style?: "normal" | "h1" | "h2" | "h3" | "h4" | "blockquote";
  listItem?: "bullet" | "number";
  children?: BlogContentSpan[];
  image?: BlogImage;
  code?: string;
}

export interface BlogAuthor {
  name: string;
  slug?: string;
  role?: string;
  bio?: string;
  image?: BlogImage;
}

export interface BlogCategory {
  title: string;
  slug: string;
}

export interface BlogFaq {
  question: string;
  answer: string;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: BlogContentBlock[];
  coverImage?: BlogImage;
  publishedAt?: string;
  updatedAt?: string;
  featured?: boolean;
  readingTime: number;
  categoryNames: string[];
  categories: BlogCategory[];
  author?: BlogAuthor;
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    keywords: string[];
    canonicalUrl?: string;
    noIndex?: boolean;
    ogImage?: BlogImage;
    faqs: BlogFaq[];
  };
}

export interface BlogLandingData {
  posts: BlogPost[];
  featuredPost?: BlogPost;
  latestPosts: BlogPost[];
  categories: BlogCategory[];
  hasPosts: boolean;
}

const bangaloreOfficeKeywords = [
  "office space for rent in Bangalore",
  "coworking space in Bangalore",
  "managed office space in Bangalore",
  "private office space Bangalore",
  "commercial office space for rent Bangalore",
  "shared office space Bangalore",
  "serviced office space Bangalore",
  "startup office space Bangalore",
  "office space in Koramangala",
  "office space in HSR Layout",
  "office space in Whitefield",
  "office space in Indiranagar",
];

const posts: BlogPost[] = [
  {
    _id: "bangalore-office-space-rent-guide",
    title: "Office Space for Rent in Bangalore: Best Areas, Office Types, Costs & Expert Consultation",
    slug: "office-space-for-rent-in-bangalore",
    excerpt:
      "A practical guide to finding office space for rent in Bangalore, including the best areas, types of offices, why teams need the right workspace, and how EverySpaces helps you shortlist faster.",
    body: [
      {
        style: "h2",
        children: [{ text: "Finding office space in Bangalore should be strategic, not random" }],
      },
      {
        children: [
          {
            text:
              "Bangalore has one of India's strongest office markets, but that also makes the search noisy. A startup looking for a 10-seat private office, a sales team needing a client-facing address, and an enterprise team planning a managed office all need different spaces.",
          },
        ],
      },
      {
        children: [
          {
            text:
              "This guide breaks down the office types, best business areas, decision factors, SEO-friendly topic ideas, and the reason EverySpaces consultation can make the search faster and cleaner.",
          },
        ],
      },
      {
        style: "h2",
        children: [{ text: "Types of office spaces available in Bangalore" }],
      },
      {
        listItem: "bullet",
        children: [{ text: "Coworking desks: Best for freelancers, founders, remote teams, and companies that want plug-and-play flexibility." }],
      },
      {
        listItem: "bullet",
        children: [{ text: "Private offices: Ideal for teams that need privacy, brand identity, secure access, and a dedicated cabin or suite." }],
      },
      {
        listItem: "bullet",
        children: [{ text: "Managed offices: A strong fit for growing companies that want a custom workspace without handling setup, operations, vendors, and maintenance." }],
      },
      {
        listItem: "bullet",
        children: [{ text: "Serviced offices: Ready-to-move offices with reception, meeting rooms, internet, housekeeping, and shared amenities." }],
      },
      {
        listItem: "bullet",
        children: [{ text: "Conventional leased offices: Better for larger teams that need long-term control, custom interiors, and a standalone workplace." }],
      },
      {
        style: "h2",
        children: [{ text: "Best areas for office space for rent in Bangalore" }],
      },
      {
        style: "h3",
        children: [{ text: "Koramangala" }],
      },
      {
        children: [{ text: "Koramangala is a high-demand startup and product-company hub with strong access to HSR Layout, Indiranagar, BTM Layout, and investor networks. It works well for funded startups, digital agencies, SaaS teams, and client-facing brands." }],
      },
      {
        style: "h3",
        children: [{ text: "HSR Layout" }],
      },
      {
        children: [{ text: "HSR Layout is popular with startups and SMEs that want good connectivity, residential convenience, and better value than some premium central neighborhoods." }],
      },
      {
        style: "h3",
        children: [{ text: "Whitefield" }],
      },
      {
        children: [{ text: "Whitefield is one of Bangalore's major enterprise and IT hubs. It is a strong choice for larger teams, GCCs, IT services, and companies that need Grade-A inventory near tech parks." }],
      },
      {
        style: "h3",
        children: [{ text: "Indiranagar" }],
      },
      {
        children: [{ text: "Indiranagar is suited for premium brands, consulting teams, creative studios, design companies, and businesses that value metro access and a polished client-facing neighborhood." }],
      },
      {
        style: "h3",
        children: [{ text: "MG Road and CBD" }],
      },
      {
        children: [{ text: "MG Road, Brigade Road, and nearby CBD pockets suit corporates, legal firms, financial services, consultants, and companies that need a central business address." }],
      },
      {
        style: "h3",
        children: [{ text: "Electronic City, Bellandur, Marathahalli and ORR" }],
      },
      {
        children: [{ text: "These corridors work well for IT teams, engineering-heavy companies, BPO operations, and teams that want access to large tech talent pools while balancing cost and commute." }],
      },
      {
        children: [
          { text: "You can also compare EverySpaces location pages for " },
          { text: "Koramangala", href: "/office-space/bangalore/koramangala" },
          { text: ", " },
          { text: "HSR Layout", href: "/office-space/bangalore/hsr-layout" },
          { text: ", " },
          { text: "Whitefield", href: "/office-space/bangalore/whitefield" },
          { text: ", and " },
          { text: "Indiranagar", href: "/office-space/bangalore/indiranagar" },
          { text: " before booking visits." },
        ],
      },
      {
        style: "h2",
        children: [{ text: "Why businesses still need offices" }],
      },
      {
        listItem: "bullet",
        children: [{ text: "A real office improves team rhythm, collaboration, onboarding, culture, and accountability." }],
      },
      {
        listItem: "bullet",
        children: [{ text: "Client meetings and investor conversations feel more credible in a professional workspace." }],
      },
      {
        listItem: "bullet",
        children: [{ text: "Hybrid teams still need reliable meeting rooms, focus zones, and project spaces." }],
      },
      {
        listItem: "bullet",
        children: [{ text: "A well-located office can help hiring because commute and neighborhood experience matter to employees." }],
      },
      {
        listItem: "bullet",
        children: [{ text: "The right workspace reduces operational distraction so leaders can focus on growth." }],
      },
      {
        style: "h2",
        children: [{ text: "Why EverySpaces consultation is different" }],
      },
      {
        children: [{ text: "EverySpaces is built for teams that do not want to waste weeks calling random operators, comparing unclear quotes, or visiting spaces that do not match the brief. The consultation starts with your team size, budget, preferred areas, lease expectations, privacy needs, and growth plan." }],
      },
      {
        listItem: "bullet",
        children: [{ text: "Requirement mapping: We clarify seats, cabins, meeting rooms, access hours, branding needs, parking, and move-in timeline." }],
      },
      {
        listItem: "bullet",
        children: [{ text: "Area strategy: We compare locations based on commute, talent access, price, client perception, and neighborhood fit." }],
      },
      {
        listItem: "bullet",
        children: [{ text: "Curated shortlisting: You see relevant coworking spaces, private offices, managed offices, and leased options instead of a long unfiltered list." }],
      },
      {
        listItem: "bullet",
        children: [{ text: "Visit coordination: We help align site visits so the search stays fast and decision-friendly." }],
      },
      {
        listItem: "bullet",
        children: [{ text: "Commercial clarity: We help compare pricing, lock-ins, inclusions, setup costs, flexibility, and long-term suitability." }],
      },
      {
        style: "h2",
        children: [{ text: "How to shortlist office space for rent in Bangalore" }],
      },
      {
        listItem: "number",
        children: [{ text: "Define the team size today and the likely headcount for the next 6 to 18 months." }],
      },
      {
        listItem: "number",
        children: [{ text: "Choose two or three preferred areas instead of searching the whole city." }],
      },
      {
        listItem: "number",
        children: [{ text: "Decide whether flexibility, privacy, brand identity, or cost is the main priority." }],
      },
      {
        listItem: "number",
        children: [{ text: "Compare total monthly cost, not just rent per seat." }],
      },
      {
        listItem: "number",
        children: [{ text: "Visit only spaces that match your brief, budget, and move-in timeline." }],
      },
      {
        style: "h2",
        children: [{ text: "Conclusion: choose the office that fits the business, not just the map" }],
      },
      {
        children: [{ text: "The best office space for rent in Bangalore depends on your people, customers, budget, operating style, and growth plan. A beautiful workspace in the wrong area can slow hiring. A cheap workspace with poor access can hurt productivity. A flexible office with the right terms can give a growing team room to move." }],
      },
      {
        children: [{ text: "EverySpaces helps teams make that decision with sharper shortlists, local guidance, and practical consultation from search to site visit." }],
      },
    ],
    publishedAt: "2026-05-22",
    updatedAt: "2026-05-22",
    featured: true,
    readingTime: 9,
    categoryNames: ["Bangalore", "Office Space", "Workspace Strategy"],
    categories: [
      { title: "Bangalore", slug: "bangalore" },
      { title: "Office Space", slug: "office-space" },
      { title: "Workspace Strategy", slug: "workspace-strategy" },
    ],
    author: {
      name: "EverySpaces Editorial Team",
      role: "Workspace Research Desk",
      bio: "EverySpaces researches office space, coworking, managed offices, and business locations across Bangalore and Bengaluru.",
    },
    seo: {
      metaTitle: "Office Space for Rent in Bangalore | Best Areas & Office Types",
      metaDescription:
        "Find office space for rent in Bangalore with this EverySpaces guide to best areas, office types, consultation benefits, keywords, and workspace shortlisting tips.",
      keywords: bangaloreOfficeKeywords,
      faqs: [
        {
          question: "Which area is best for office space for rent in Bangalore?",
          answer:
            "Koramangala, HSR Layout, Whitefield, Indiranagar, MG Road, Electronic City, Bellandur, Marathahalli and Hebbal are strong choices. The best area depends on your budget, commute, client access, and team profile.",
        },
        {
          question: "What type of office is best for a startup in Bangalore?",
          answer:
            "Most startups begin with coworking desks, private offices, or managed offices because these options reduce setup time and offer flexibility as the team grows.",
        },
        {
          question: "Why use EverySpaces for office consultation?",
          answer:
            "EverySpaces helps map requirements, compare locations, curate relevant spaces, coordinate visits, and bring clarity to pricing, lock-ins, amenities, and long-term suitability.",
        },
      ],
    },
  },
  {
    _id: "best-workspace-consultant-everyspaces",
    title: "Best Workspace Consultant: Why EverySpaces Makes Office Search Easier",
    slug: "best-workspace-consultant-everyspaces",
    excerpt:
      "Learn why EverySpaces is the best workspace consultant for Bangalore teams who want fast, practical office search support, curated shortlists, and clear lease guidance.",
    body: [
      {
        style: "h2",
        children: [{ text: "What makes the best workspace consultant?" }],
      },
      {
        children: [
          {
            text:
              "A strong workspace consultant blends market insight, needs mapping, operator relationships, and a clear process that saves teams time and reduces uncertainty.",
          },
        ],
      },
      {
        listItem: "bullet",
        children: [{ text: "Requirement mapping: understand team size, budget, privacy, amenities, and move-in timing." }],
      },
      {
        listItem: "bullet",
        children: [{ text: "Area strategy: compare Bangalore locations by commute, talent access, client perception, and operational fit." }],
      },
      {
        listItem: "bullet",
        children: [{ text: "Space type guidance: recommend coworking, private office, managed office, serviced office, or lease options based on the brief." }],
      },
      {
        listItem: "bullet",
        children: [{ text: "Commercial clarity: explain pricing, lock-in, inclusions, and total occupancy cost in plain language." }],
      },
      {
        style: "h2",
        children: [{ text: "How EverySpaces helps teams make better workspace decisions" }],
      },
      {
        children: [
          {
            text:
              "EverySpaces works as a practical extension of your team. We turn broad office search questions into a shortlist of spaces that match your needs and avoid wasted visits.",
          },
        ],
      },
      {
        listItem: "bullet",
        children: [{ text: "Curated shortlists, not long lists: only spaces that satisfy your budget, area, headcount, privacy and branding needs." }],
      },
      {
        listItem: "bullet",
        children: [{ text: "Market-aware comparisons: evaluate coworking, private office, managed office, and serviced office options within Bangalore and Bengaluru." }],
      },
      {
        listItem: "bullet",
        children: [{ text: "Visit coordination: every site visit is arranged to keep the search fast, focused, and decision-friendly." }],
      },
      {
        listItem: "bullet",
        children: [{ text: "Commercial review: highlight what is included, what is extra, and how each option impacts your monthly cost." }],
      },
      {
        style: "h2",
        children: [{ text: "EverySpaces consulting advantage" }],
      },
      {
        children: [
          {
            text:
              "EverySpaces is rooted in Bangalore workspace consulting, so our guidance reflects current supply, operator offerings, and what modern teams need to move confidently.",
          },
        ],
      },
      {
        listItem: "bullet",
        children: [{ text: "Local Bangalore expertise across coworking, private office, managed office, serviced office and small commercial space." }],
      },
      {
        listItem: "bullet",
        children: [{ text: "A consultative process focused on your brief instead of generic listings." }],
      },
      {
        listItem: "bullet",
        children: [{ text: "A single contact point for shortlist creation, budget clarity, visit planning, and lease comparison." }],
      },
      {
        listItem: "bullet",
        children: [{ text: "End-to-end support from workspace research to move-in readiness with transparency on timelines and commercial terms." }],
      },
      {
        style: "h2",
        children: [{ text: "When to work with a consultant instead of searching alone" }],
      },
      {
        listItem: "number",
        children: [{ text: "When your team is too busy to vet dozens of operators and still needs a shortlist tailored to the brief." }],
      },
      {
        listItem: "number",
        children: [{ text: "When you want a direct comparison of coworking, private office, managed office, and serviced office options." }],
      },
      {
        listItem: "number",
        children: [{ text: "When budget, move-in timing, and location preference must align with growth and employee experience." }],
      },
      {
        listItem: "number",
        children: [{ text: "When you need transparent advice on pricing, deposit terms, notice periods, and fit-out risk." }],
      },
      {
        style: "h2",
        children: [{ text: "Why EverySpaces is the best choice for your workspace consulting needs" }],
      },
      {
        children: [
          {
            text:
              "EverySpaces makes the office search clearer. We listen to the brief, sharpen the shortlist, and keep the recommendation practical so you can decide faster.",
          },
        ],
      },
      {
        listItem: "bullet",
        children: [{ text: "We match your team to spaces that meet both functional and brand needs." }],
      },
      {
        listItem: "bullet",
        children: [{ text: "We save time by prioritizing spaces that are ready to tour, priced clearly, and aligned with your move-in plan." }],
      },
      {
        listItem: "bullet",
        children: [{ text: "We keep the recommendation grounded in Bangalore market realities and the way modern teams work." }],
      },
      {
        children: [
          {
            text: "Contact EverySpaces to turn your workspace strategy into a shortlist of office options that can be reviewed, visited, and chosen with confidence.",
          },
        ],
      },
      {
        style: "h2",
        children: [{ text: "Conclusion" }],
      },
      {
        children: [
          {
            text:
              "The best workspace consultant is the one that connects your needs to the right local options, removes guesswork, and helps your team choose a space that supports productivity, culture, and growth.",
          },
        ],
      },
      {
        children: [
          {
            text:
              "EverySpaces delivers that clarity through Bangalore office market knowledge, curated shortlists, transparent comparisons, and a customer-first consultation process.",
          },
        ],
      },
    ],
    publishedAt: "2026-05-29",
    updatedAt: "2026-05-29",
    readingTime: 7,
    categoryNames: ["Workspace Consultant", "Workspace Strategy", "Office Search"],
    categories: [
      { title: "Workspace Consultant", slug: "workspace-consultant" },
      { title: "Workspace Strategy", slug: "workspace-strategy" },
      { title: "Office Search", slug: "office-search" },
    ],
    author: {
      name: "EverySpaces Editorial Team",
      role: "Workspace Research Desk",
      bio: "EverySpaces researches office space, coworking, managed offices, and workspace consulting across Bangalore and Bengaluru.",
    },
    seo: {
      metaTitle: "Best Workspace Consultant | EverySpaces Workspace Consulting Guide",
      metaDescription:
        "Discover why EverySpaces is the best workspace consultant for Bangalore teams. Learn how we simplify office search with curated shortlists, market clarity, and consultation-led workspace decisions.",
      keywords: [
        "best workspace consultant",
        "workspace consultant Bangalore",
        "workspace consulting",
        "office space consultant",
        "EverySpaces workspace consultant",
        "workspace strategy Bangalore",
      ],
      faqs: [
        {
          question: "What does a workspace consultant do?",
          answer:
            "A workspace consultant helps teams define requirements, compare location and office format options, shortlist suitable spaces, clarify commercial terms, and coordinate visits so the search stays efficient.",
        },
        {
          question: "Why choose EverySpaces for workspace consulting?",
          answer:
            "EverySpaces combines Bangalore market knowledge, curated shortlists, transparent comparisons, and consultation support that helps teams select the right coworking, private office, managed office, or leased workspace.",
        },
        {
          question: "Can EverySpaces help with coworking and private office search?",
          answer:
            "Yes. EverySpaces supports coworking, private offices, managed offices, serviced offices and small commercial workspace searches with a focus on matching your brief to the right local options.",
        },
      ],
    },
  },
  {
    _id: "best-areas-office-space-bangalore",
    title: "Best Areas for Office Space in Bangalore: Koramangala, HSR, Whitefield, Indiranagar and More",
    slug: "best-areas-for-office-space-in-bangalore",
    excerpt:
      "Compare Bangalore's strongest office locations by business fit, commute, talent access, and workspace type before you shortlist.",
    body: [
      { style: "h2", children: [{ text: "Choose the area before choosing the building" }] },
      { children: [{ text: "Area strategy shapes rent, commute, hiring, client access, and team experience. Start with the location brief, then shortlist spaces." }] },
      { listItem: "bullet", children: [{ text: "Koramangala: startups, SaaS, agencies and investor proximity." }] },
      { listItem: "bullet", children: [{ text: "Whitefield: enterprise teams, IT companies and Grade-A supply." }] },
      { listItem: "bullet", children: [{ text: "Indiranagar: premium brands, consulting, design and client-facing teams." }] },
      { listItem: "bullet", children: [{ text: "HSR Layout: value-focused startups and SMEs near the ORR ecosystem." }] },
    ],
    publishedAt: "2026-05-22",
    updatedAt: "2026-05-22",
    readingTime: 4,
    categoryNames: ["Bangalore", "Location Guide"],
    categories: [
      { title: "Bangalore", slug: "bangalore" },
      { title: "Location Guide", slug: "location-guide" },
    ],
    seo: {
      metaTitle: "Best Areas for Office Space in Bangalore | EverySpaces",
      metaDescription: "Compare the best Bangalore areas for office space, coworking, managed offices and private offices.",
      keywords: ["best areas for office space in Bangalore", "office space in Koramangala", "office space in Whitefield"],
      faqs: [],
    },
  },
  {
    _id: "managed-office-vs-coworking-bangalore",
    title: "Managed Office vs Coworking in Bangalore: Which Workspace Should You Choose?",
    slug: "managed-office-vs-coworking-bangalore",
    excerpt:
      "A simple decision guide for teams comparing coworking desks, private offices, and managed office space in Bangalore.",
    body: [
      { style: "h2", children: [{ text: "The right format depends on control, flexibility and growth" }] },
      { children: [{ text: "Coworking is fast and flexible. Managed offices provide more privacy, branding and operational control. Conventional leases work when long-term customization matters." }] },
      { listItem: "bullet", children: [{ text: "Choose coworking for speed, community and small teams." }] },
      { listItem: "bullet", children: [{ text: "Choose managed offices for growing teams that want a dedicated workspace without operational load." }] },
      { listItem: "bullet", children: [{ text: "Choose leased offices when scale, customization and long-term control matter most." }] },
    ],
    publishedAt: "2026-05-22",
    updatedAt: "2026-05-22",
    readingTime: 3,
    categoryNames: ["Office Types", "Managed Offices"],
    categories: [
      { title: "Office Types", slug: "office-types" },
      { title: "Managed Offices", slug: "managed-offices" },
    ],
    seo: {
      metaTitle: "Managed Office vs Coworking in Bangalore | EverySpaces",
      metaDescription: "Compare managed offices, coworking spaces and private offices in Bangalore before choosing your workspace.",
      keywords: ["managed office space Bangalore", "coworking space Bangalore", "private office space Bangalore"],
      faqs: [],
    },
  },
  {
    _id: "best-office-space-for-rent-hbr-layout",
    title: "Best Office Space for Rent in HBR Layout: Coworking, Private Offices & Managed Workspaces",
    slug: "best-office-space-for-rent-in-hbr-layout",
    excerpt:
      "Explore why HBR Layout is a smart Bangalore office location for startups, consultants, small businesses, and growing teams looking for value, connectivity, and practical workspace options.",
    body: [
      {
        style: "h2",
        children: [{ text: "Why HBR Layout is becoming a practical office location" }],
      },
      {
        children: [
          {
            text:
              "HBR Layout is one of North-East Bangalore's most practical business neighborhoods for teams that want a balanced office location without paying premium CBD or Indiranagar rents. It offers good access to Hebbal, Manyata Tech Park, Kalyan Nagar, HRBR Layout, Kammanahalli, and Outer Ring Road routes.",
          },
        ],
      },
      {
        children: [
          {
            text:
              "For founders, consultants, small teams, service businesses, and remote-first companies, office space for rent in HBR Layout can offer the right mix of affordability, neighborhood convenience, client access, and team comfort.",
          },
        ],
      },
      {
        style: "h2",
        children: [{ text: "Best office types to consider in HBR Layout" }],
      },
      {
        listItem: "bullet",
        children: [{ text: "Coworking spaces: Good for founders, freelancers, hybrid teams, and companies that need a fast move-in." }],
      },
      {
        listItem: "bullet",
        children: [{ text: "Private offices: Best for compact teams that need focus, privacy, dedicated seating, and a professional address." }],
      },
      {
        listItem: "bullet",
        children: [{ text: "Managed offices: Useful for growing teams that want a customized office without managing interiors, internet, housekeeping, and daily operations." }],
      },
      {
        listItem: "bullet",
        children: [{ text: "Small commercial offices: A practical choice for consultants, agencies, clinics, education businesses, and local service brands." }],
      },
      {
        style: "h2",
        children: [{ text: "Who should choose HBR Layout for office space?" }],
      },
      {
        listItem: "bullet",
        children: [{ text: "Startups that want affordable office space near North Bangalore talent pools." }],
      },
      {
        listItem: "bullet",
        children: [{ text: "Consulting firms, agencies, and professional service teams that need a calm but connected location." }],
      },
      {
        listItem: "bullet",
        children: [{ text: "Teams that need access to Hebbal, Manyata Tech Park, Kalyan Nagar, Kammanahalli, and central Bangalore routes." }],
      },
      {
        listItem: "bullet",
        children: [{ text: "Businesses that want practical rent, easier parking possibilities, and a residential-commercial neighborhood feel." }],
      },
      {
        style: "h2",
        children: [{ text: "What to check before renting an office in HBR Layout" }],
      },
      {
        listItem: "number",
        children: [{ text: "Confirm the exact commute routes for your team and clients." }],
      },
      {
        listItem: "number",
        children: [{ text: "Compare the full monthly cost, including maintenance, internet, meeting room usage, deposits, and setup charges." }],
      },
      {
        listItem: "number",
        children: [{ text: "Check parking, power backup, lift access, washrooms, security, reception, and building upkeep." }],
      },
      {
        listItem: "number",
        children: [{ text: "Decide whether you need coworking flexibility, a private office, a managed office, or a conventional lease." }],
      },
      {
        listItem: "number",
        children: [{ text: "Shortlist spaces based on your next 6 to 12 months of growth, not only today's headcount." }],
      },
      {
        style: "h2",
        children: [{ text: "Why EverySpaces is a strong choice for HBR Layout office consultation" }],
      },
      {
        children: [
          {
            text:
              "EverySpaces is based in HBR Layout and understands the local office market, nearby business pockets, and the practical tradeoffs between budget, commute, amenities, and team size. Instead of browsing random listings, you get a curated shortlist based on your actual requirement.",
          },
        ],
      },
      {
        listItem: "bullet",
        children: [{ text: "Local understanding of HBR Layout, Kalyan Nagar, Hebbal, HRBR Layout, and nearby North Bangalore office options." }],
      },
      {
        listItem: "bullet",
        children: [{ text: "Support for coworking, private office, managed office, serviced office, and small commercial office searches." }],
      },
      {
        listItem: "bullet",
        children: [{ text: "Clear comparison of budget, lock-in, amenities, location fit, and move-in readiness." }],
      },
      {
        listItem: "bullet",
        children: [{ text: "Faster visits and better-fit shortlists for teams that do not want to waste time on mismatched spaces." }],
      },
      {
        children: [
          { text: "You can also explore the EverySpaces " },
          { text: "HBR Layout office location page", href: "/office-space/bangalore/hbr-layout" },
          { text: " or contact the team for a curated shortlist." },
        ],
      },
      {
        style: "h2",
        children: [{ text: "Final takeaway" }],
      },
      {
        children: [
          {
            text:
              "HBR Layout is a strong office location for teams that want Bangalore connectivity without unnecessary complexity. If you want a practical workspace with the right cost, access, and setup, EverySpaces can help compare options and guide the search from brief to site visit.",
          },
        ],
      },
    ],
    publishedAt: "2026-05-22",
    updatedAt: "2026-05-22",
    readingTime: 6,
    categoryNames: ["HBR Layout", "Bangalore", "Office Space"],
    categories: [
      { title: "HBR Layout", slug: "hbr-layout" },
      { title: "Bangalore", slug: "bangalore" },
      { title: "Office Space", slug: "office-space" },
    ],
    author: {
      name: "EverySpaces Editorial Team",
      role: "Workspace Research Desk",
      bio: "EverySpaces researches office space, coworking, managed offices, and business locations across Bangalore and Bengaluru.",
    },
    seo: {
      metaTitle: "Best Office Space for Rent in HBR Layout | EverySpaces",
      metaDescription:
        "Find the best office space for rent in HBR Layout, Bangalore. Compare coworking, private offices, managed offices, location benefits, and EverySpaces consultation support.",
      keywords: [
        "office space for rent in HBR Layout",
        "best office space in HBR Layout",
        "coworking space in HBR Layout",
        "private office in HBR Layout",
        "managed office space HBR Layout",
        "commercial office space HBR Layout Bangalore",
      ],
      faqs: [
        {
          question: "Is HBR Layout good for office space in Bangalore?",
          answer:
            "Yes. HBR Layout is practical for startups, consultants, SMEs, and growing teams that want good access to Hebbal, Kalyan Nagar, Manyata Tech Park, and North Bangalore while keeping costs sensible.",
        },
        {
          question: "What office types are available in HBR Layout?",
          answer:
            "Teams can consider coworking spaces, private offices, managed offices, serviced offices, and smaller commercial office spaces depending on budget, team size, and privacy needs.",
        },
        {
          question: "How can EverySpaces help find office space in HBR Layout?",
          answer:
            "EverySpaces helps map your requirement, compare nearby locations, shortlist relevant office options, coordinate visits, and clarify commercial terms before you decide.",
        },
      ],
    },
  },
];

function estimateReadingTime(excerpt: string, body: BlogContentBlock[]) {
  const blockWords = body
    .flatMap((block) => block.children || [])
    .map((child) => child.text || "")
    .join(" ");

  const totalWords = `${excerpt} ${blockWords}`.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(totalWords / 220));
}

function sortCategories(posts: BlogPost[]) {
  const categoryMap = new Map<string, BlogCategory>();

  posts.forEach((post) => {
    post.categories.forEach((category) => {
      if (!categoryMap.has(category.slug)) {
        categoryMap.set(category.slug, category);
      }
    });
  });

  return Array.from(categoryMap.values()).sort((left, right) => left.title.localeCompare(right.title));
}

export function getBlogPostUrl(slug: string) {
  return `/blog/${slug}`;
}

export function getBlogPostAbsoluteUrl(slug: string) {
  return absoluteUrl(getBlogPostUrl(slug));
}

export function getBlogPostCoverImage(post?: BlogPost) {
  return post?.seo.ogImage?.url || post?.coverImage?.url || "";
}

const getAllPosts = cache(async () => {
  return posts.map((post) => ({
    ...post,
    readingTime: post.readingTime || estimateReadingTime(post.excerpt, post.body),
  }));
});

export const getBlogLandingData = cache(async (): Promise<BlogLandingData> => {
  const posts = await getAllPosts();
  const featuredPost = posts.find((post) => post.featured) || posts[0];
  const latestPosts = featuredPost ? posts.filter((post) => post.slug !== featuredPost.slug) : posts;

  return {
    posts,
    featuredPost,
    latestPosts,
    categories: sortCategories(posts),
    hasPosts: posts.length > 0,
  };
});

export const getBlogPostBySlug = cache(async (slug: string) => {
  const allPosts = await getAllPosts();
  const post = allPosts.find((item) => item.slug === slug);

  if (!post) {
    return null;
  }

  const categorySlugs = post.categories.map((category) => category.slug);
  const relatedPosts = allPosts
    .filter((item) => item.slug !== slug && item.categories.some((category) => categorySlugs.includes(category.slug)))
    .slice(0, 3);

  return {
    post,
    relatedPosts,
  };
});

export const getAllBlogSlugs = cache(async () => {
  const allPosts = await getAllPosts();
  return allPosts.map((post) => post.slug);
});

export function getBlogMetadata(post: BlogPost) {
  const canonicalPath = getBlogPostUrl(post.slug);
  const ogImage = getBlogPostCoverImage(post) || defaultMetadata.ogImage;

  return {
    title: post.seo.metaTitle || `${post.title} | EverySpaces Journal`,
    description: post.seo.metaDescription || post.excerpt,
    path: post.seo.canonicalUrl || canonicalPath,
    keywords: post.seo.keywords.length ? post.seo.keywords.join(", ") : undefined,
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
    authors: post.author?.name ? [post.author.name] : ["EverySpaces Editorial Team"],
    section: post.categories[0]?.title || "Workspace Insights",
    tags: post.categoryNames,
    image: ogImage,
    noIndex: post.seo.noIndex,
  };
}

export function getAuthorProfileUrl(author?: BlogAuthor) {
  if (!author?.slug) {
    return absoluteUrl("/about");
  }

  return absoluteUrl(`/about#${author.slug}`);
}
