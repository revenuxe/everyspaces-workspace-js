import Image from "next/image";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "@/compat/react-router-dom";
import logo from "../../public/numunix-logo-optimized.webp";
import { servicePageLinks } from "@/data/servicePages";

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "We Help", href: "/we-help" },
  { label: "Workspace Listings", href: "/listings" },
  { label: "Areas We Serve", href: "/areas-we-serve" },
  { label: "Contact Us", href: "/contact" },
];
const resourceLinks = [
  { label: "Bangalore Office Guide", href: "/blog/office-space-for-rent-in-bangalore" },
  { label: "Best Areas in Bangalore", href: "/blog/best-areas-for-office-space-in-bangalore" },
  { label: "Managed Office vs Coworking", href: "/blog/managed-office-vs-coworking-bangalore" },
  { label: "Workspace Certification", href: "/certification" },
  { label: "Numunix Journal", href: "/blog" },
];
const legalLinks = [
  { label: "Blog", href: "/blog" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Contact", href: "/contact" },
];
const linkClass = "text-sm leading-7 text-muted-foreground transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

const FooterSection = () => (
  <footer id="contact" className="bg-muted/40 px-4 py-10 sm:px-6 sm:py-12 lg:px-12">
    <div className="mx-auto max-w-7xl rounded-3xl border border-border bg-card px-6 py-8 shadow-[0_16px_60px_-24px_hsl(var(--primary)/0.18)] sm:rounded-[40px] sm:p-10 lg:p-12">
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.65fr_0.85fr_1fr_1fr] lg:gap-10 xl:gap-14">
        <div className="min-w-0 sm:col-span-2 lg:col-span-1">
          <Link to="/" aria-label="Numunix home" className="inline-flex max-w-full rounded-xl bg-primary px-4 py-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
            <Image src={logo} alt="Numunix Workspaces Consulting" sizes="(max-width: 640px) 220px, 267px" className="h-auto w-[220px] max-w-full sm:w-[267px]" />
          </Link>
          <p className="mt-6 max-w-sm text-sm leading-7 text-muted-foreground sm:mt-8">Workspace consulting, coworking, and office space solutions in Bangalore, planned around your team and your next move.</p>
          <address className="mt-6 space-y-3 text-sm not-italic text-muted-foreground">
            <a href="mailto:numunix@gmail.com" className="inline-flex items-center gap-3 transition-colors hover:text-accent"><Mail size={18} aria-hidden="true" />numunix@gmail.com</a>
            <p className="flex items-center gap-3"><MapPin size={18} className="shrink-0" aria-hidden="true" />HBR Layout, Bangalore, India</p>
          </address>
        </div>

        <nav aria-label="Footer company links">
          <h2 className="mb-5 font-sans text-sm font-semibold sm:mb-6">Company</h2>
          <ul className="space-y-3">
            {companyLinks.map((link) => <li key={link.href}><Link to={link.href} className={linkClass}>{link.label}</Link></li>)}
          </ul>
        </nav>
        <nav aria-label="Footer services">
          <h2 className="mb-5 font-sans text-sm font-semibold sm:mb-6">Services</h2>
          <ul className="space-y-3">
            {servicePageLinks.map((link) => <li key={link.href}><Link to={link.href} className={linkClass}>{link.label}</Link></li>)}
          </ul>
          <Link to="/we-help" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">Explore our solutions <ArrowUpRight size={16} aria-hidden="true" /></Link>
        </nav>
        <nav aria-label="Footer resources">
          <h2 className="mb-5 font-sans text-sm font-semibold sm:mb-6">Resources</h2>
          <ul className="space-y-3">
            {resourceLinks.map((link) => <li key={link.href}><Link to={link.href} className={linkClass}>{link.label}</Link></li>)}
          </ul>
          <a href="tel:+919886285028" className="mt-6 inline-flex items-center gap-3 text-sm font-semibold transition-colors hover:text-accent"><Phone size={18} aria-hidden="true" />+91 98862 85028</a>
        </nav>
      </div>

      <div className="mt-10 flex flex-col gap-5 border-t border-border pt-6 sm:mt-12 sm:pt-8 lg:flex-row lg:items-center lg:justify-between">
        <p className="text-xs leading-6 text-muted-foreground">&copy; 2026 Numunix. All rights reserved.</p>
        <nav aria-label="Footer legal links" className="flex flex-wrap gap-x-6 gap-y-3">
          {legalLinks.map((link) => <Link key={link.href} to={link.href} className="text-xs leading-6 text-muted-foreground transition-colors hover:text-accent">{link.label}</Link>)}
        </nav>
      </div>
    </div>
  </footer>
);

export default FooterSection;
