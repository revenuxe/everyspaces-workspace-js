import { useState } from "react";
import { X } from "lucide-react";
import { motion } from "framer-motion";

const teamSizeOptions = ["1–5", "6–15", "16–30", "31–50", "50+"];
const timelineOptions = [
  "Immediately",
  "Within 1 Month",
  "1–3 Months",
  "3–6 Months",
  "Just Exploring",
];

const ContactForm = () => {
  const [fullName, setFullName] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [location, setLocation] = useState("");
  const [business, setBusiness] = useState("");
  const [timeline, setTimeline] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log({ fullName, workEmail, phone, teamSize, location, business, timeline });
  };

  return (
    <section id="contact-form" className="py-16 md:py-24 px-4 sm:px-6 lg:px-12 bg-background">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-14"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif leading-snug mb-4">
            <span className="italic">Find</span> Your Ideal Workspace
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-md mx-auto">
            Tell us your requirements — we'll curate the best office options for your team.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="space-y-6"
        >
          {/* Full Name */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="John Mathew"
              required
              className="w-full px-4 py-3.5 rounded-xl border border-input bg-card text-foreground text-base placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>

          {/* Work Email */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              Work Email
            </label>
            <input
              type="email"
              value={workEmail}
              onChange={(e) => setWorkEmail(e.target.value)}
              placeholder="john@company.com"
              required
              className="w-full px-4 py-3.5 rounded-xl border border-input bg-card text-foreground text-base placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              Phone Number <span className="text-muted-foreground font-normal">(optional)</span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
              className="w-full px-4 py-3.5 rounded-xl border border-input bg-card text-foreground text-base placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>

          {/* Team Size */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              Team Size
            </label>
            <div className="relative">
              <select
                value={teamSize}
                onChange={(e) => setTeamSize(e.target.value)}
                required
                className="w-full px-4 py-3.5 rounded-xl border border-input bg-card text-foreground text-base appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer"
              >
                <option value="" disabled>Select team size</option>
                {teamSizeOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" className="text-muted-foreground">
                  <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Preferred Location */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              Preferred Location
            </label>
            <div className="relative">
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="HSR Layout, Koramangala, Whitefield…"
                required
                className="w-full px-4 py-3.5 rounded-xl border border-input bg-card text-foreground text-base placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all pr-10"
              />
              {location && (
                <button
                  type="button"
                  onClick={() => setLocation("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-primary flex items-center justify-center hover:bg-primary/80 transition-colors"
                >
                  <X size={12} className="text-primary-foreground" />
                </button>
              )}
            </div>
          </div>

          {/* Nature of Business */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              Nature of Business
            </label>
            <input
              type="text"
              value={business}
              onChange={(e) => setBusiness(e.target.value)}
              placeholder="IT Consulting, Marketing Agency…"
              className="w-full px-4 py-3.5 rounded-xl border border-input bg-card text-foreground text-base placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>

          {/* Planned Occupancy Timeline */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              Planned Occupancy Timeline
            </label>
            <div className="relative">
              <select
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                required
                className="w-full px-4 py-3.5 rounded-xl border border-input bg-card text-foreground text-base appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer"
              >
                <option value="" disabled>Select timeline</option>
                {timelineOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" className="text-muted-foreground">
                  <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-accent text-accent-foreground font-semibold text-base py-4 rounded-full hover:scale-[1.02] active:scale-[0.98] transition-transform"
            >
              Start My Office Search
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default ContactForm;
