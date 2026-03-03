import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import heroImg from "@/assets/hero-workspace.png?format=webp";

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
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [location, setLocation] = useState("");
  const [business, setBusiness] = useState("");
  const [timeline, setTimeline] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const { error } = await supabase.from("leads").insert({
      full_name: fullName.trim(),
      email: email.trim(),
      phone: phone.trim() || null,
      team_size: teamSize || null,
      preferred_location: location.trim() || null,
      nature_of_business: business.trim() || null,
      planned_timeline: timeline || null,
    });

    setSubmitting(false);

    if (error) {
      toast({ title: "Something went wrong", description: "Please try again.", variant: "destructive" });
      return;
    }

    toast({ title: "Request submitted!", description: "We'll get back to you shortly." });
    setFullName(""); setEmail(""); setPhone(""); setTeamSize(""); setLocation(""); setBusiness(""); setTimeline("");
  };

  const inputClass =
    "w-full px-4 py-3.5 rounded-xl border border-white/20 bg-white/10 text-primary-foreground text-base placeholder:text-primary-foreground/40 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 backdrop-blur-sm transition-all";

  const labelClass = "block text-sm font-medium text-primary-foreground/90 mb-1.5";

  return (
    <section
      id="contact-form"
      className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-12 overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/85" />
      </div>

      <div className="max-w-xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-14"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif leading-snug mb-4 text-primary-foreground">
            <span className="italic">Find</span> Your Ideal Workspace
          </h2>
          <p className="text-primary-foreground/70 text-base sm:text-lg max-w-md mx-auto">
            Tell us your requirements — we'll curate the best office options for your team.
          </p>
        </motion.div>

        {/* Glassmorphism Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl shadow-black/20"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className={labelClass}>Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Mathew"
                required
                className={inputClass}
              />
            </div>

            {/* Email */}
            <div>
              <label className={labelClass}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@company.com"
                required
                className={inputClass}
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className={labelClass}>Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                required
                className={inputClass}
              />
            </div>

            {/* Team Size */}
            <div>
              <label className={labelClass}>Team Size</label>
              <div className="relative">
                <select
                  value={teamSize}
                  onChange={(e) => setTeamSize(e.target.value)}
                  required
                  className={`${inputClass} appearance-none cursor-pointer`}
                >
                  <option value="" disabled className="text-foreground bg-card">
                    Select team size
                  </option>
                  {teamSizeOptions.map((opt) => (
                    <option key={opt} value={opt} className="text-foreground bg-card">
                      {opt}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" className="text-primary-foreground/50">
                    <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Preferred Location */}
            <div>
              <label className={labelClass}>Preferred Location</label>
              <div className="relative">
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="HSR Layout, Koramangala, Whitefield…"
                  required
                  className={`${inputClass} pr-10`}
                />
                {location && (
                  <button
                    type="button"
                    onClick={() => setLocation("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-primary-foreground/20 flex items-center justify-center hover:bg-primary-foreground/30 transition-colors backdrop-blur-sm"
                  >
                    <X size={12} className="text-primary-foreground" />
                  </button>
                )}
              </div>
            </div>

            {/* Nature of Business */}
            <div>
              <label className={labelClass}>Nature of Business</label>
              <input
                type="text"
                value={business}
                onChange={(e) => setBusiness(e.target.value)}
                placeholder="IT Consulting, Marketing Agency…"
                className={inputClass}
              />
            </div>

            {/* Planned Occupancy Timeline */}
            <div>
              <label className={labelClass}>Planned Occupancy Timeline</label>
              <div className="relative">
                <select
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  required
                  className={`${inputClass} appearance-none cursor-pointer`}
                >
                  <option value="" disabled className="text-foreground bg-card">
                    Select timeline
                  </option>
                  {timelineOptions.map((opt) => (
                    <option key={opt} value={opt} className="text-foreground bg-card">
                      {opt}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" className="text-primary-foreground/50">
                    <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-3">
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-primary-foreground text-primary font-semibold text-base py-4 rounded-full hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-lg shadow-black/10 disabled:opacity-60"
              >
                {submitting ? "Submitting…" : "Start My Office Search"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;
