"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "@/compat/react-router-dom";
import { z } from "zod";

const certificationLeadSchema = z.object({
  lead_type: z.literal("certification"),
  company_name: z.string().trim().min(1, "Company name is required").max(200, "Company name is too long"),
  full_name: z.string().trim().min(1, "Your name is required").max(200, "Name is too long"),
  phone: z.string().trim().min(1, "Phone number is required").max(30, "Phone number is too long"),
  email: z.string().trim().email("Invalid email address").max(255, "Email is too long"),
  preferred_location: z.string().trim().min(1, "Location is required").max(300, "Location is too long"),
});

const CertificationLeadForm = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const inputClass =
    "w-full rounded-2xl border border-border bg-background px-4 py-3.5 text-base text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-accent/40";
  const labelClass = "mb-1.5 block text-sm font-medium text-foreground/90";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError("");

    const result = certificationLeadSchema.safeParse({
      lead_type: "certification",
      company_name: companyName,
      full_name: fullName,
      phone,
      email,
      preferred_location: location,
    });

    if (!result.success) {
      setFormError(result.error.errors[0]?.message || "Invalid input");
      setSubmitting(false);
      return;
    }

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(result.data),
    });

    setSubmitting(false);

    if (!response.ok) {
      const payload = await response.json().catch(() => null);
      setFormError(payload?.error || "Something went wrong. Please try again.");
      return;
    }

    navigate("/certification/thank-you");
  };

  return (
    <section className="px-4 py-16 sm:px-6 md:py-20 lg:px-12">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-[2rem] bg-primary p-8 text-primary-foreground shadow-xl sm:p-10"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">Certification booking</p>
          <h1 className="mt-4 text-3xl font-serif leading-tight sm:text-4xl md:text-5xl">
            Claim your free workspace certification review.
          </h1>
          <p className="mt-5 text-sm leading-relaxed text-primary-foreground/80 sm:text-base">
            Share a few details about your workspace and our team will reach out to start the certification process.
          </p>
          <div className="mt-8 space-y-3 text-sm text-primary-foreground/80">
            <p>Simple review request</p>
            <p>Minimal details only</p>
            <p>Direct EverySpaces follow-up</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="rounded-[2rem] border border-border bg-card p-6 shadow-sm sm:p-8 md:p-10"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            {formError ? (
              <div className="rounded-2xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                {formError}
              </div>
            ) : null}
            <div>
              <label className={labelClass}>Company Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="EverySpaces"
                className={inputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Your Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Rahul Sharma"
                className={inputClass}
                required
              />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="team@company.com"
                  className={inputClass}
                  required
                />
              </div>
            </div>
            <div>
              <label className={labelClass}>Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Bangalore, Hyderabad, Whitefield..."
                className={inputClass}
                required
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="flex min-h-[64px] w-full items-center justify-between rounded-full bg-primary px-7 py-3 text-base font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              <span>{submitting ? "Submitting..." : "Claim a Free Certification"}</span>
              <span className="ml-4 flex h-11 w-11 items-center justify-center rounded-full border-2 border-primary-foreground/30">
                →
              </span>
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default CertificationLeadForm;
