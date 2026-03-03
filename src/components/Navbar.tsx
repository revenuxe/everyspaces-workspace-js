import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.webp";

const navLinks = [
  { label: "Home", href: "/", isRoute: true },
  { label: "About Us", href: "/about", isRoute: true },
  { label: "Contact Us", href: "#contact-form", isRoute: false },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="w-full bg-primary py-4 px-6 lg:px-12 relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="EverySpaces logo" className="h-10 w-auto brightness-0 invert" />
        </Link>

        <nav className="hidden lg:flex items-center bg-primary-foreground/10 backdrop-blur-sm rounded-full px-2 py-1 border border-primary-foreground/20">
          {navLinks.map((link) =>
            link.isRoute ? (
              <Link
                key={link.label}
                to={link.href}
                className="px-5 py-2 rounded-full text-sm font-medium transition-colors text-primary-foreground/80 hover:text-primary-foreground"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className="px-5 py-2 rounded-full text-sm font-medium transition-colors text-primary-foreground/80 hover:text-primary-foreground"
              >
                {link.label}
              </a>
            )
          )}
        </nav>

        <a
          href="/contact"
          className="hidden lg:flex w-11 h-11 rounded-full bg-accent items-center justify-center text-accent-foreground hover:scale-105 transition-transform"
        >
          <ArrowUpRight size={20} />
        </a>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-primary-foreground"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <nav className="lg:hidden mt-4 flex flex-col gap-2 bg-primary rounded-xl p-4">
          {navLinks.map((link) =>
            link.isRoute ? (
              <Link
                key={link.label}
                to={link.href}
                className="text-primary-foreground/80 hover:text-primary-foreground py-2 px-4 rounded-lg text-sm font-medium"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className="text-primary-foreground/80 hover:text-primary-foreground py-2 px-4 rounded-lg text-sm font-medium"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            )
          )}
        </nav>
      )}
    </header>
  );
};

export default Navbar;
