"use client";

import { motion } from "framer-motion";
import { CheckCircle, ArrowLeft, Award } from "lucide-react";
import { useNavigate } from "@/compat/react-router-dom";

const CertificationThankYou = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-primary px-4 py-12">
      <div className="absolute top-[-120px] right-[-80px] h-[300px] w-[300px] rounded-full bg-white/5 blur-2xl" />
      <div className="absolute bottom-[-100px] left-[-60px] h-[250px] w-[250px] rounded-full bg-white/5 blur-2xl" />

      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md text-center"
      >
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm">
          <CheckCircle className="h-10 w-10 text-primary-foreground" strokeWidth={1.5} />
        </div>

        <h1 className="mb-4 text-3xl font-serif text-primary-foreground sm:text-4xl">
          Certification <span className="italic">Request Received</span>
        </h1>

        <p className="mb-10 text-base text-primary-foreground/75 sm:text-lg">
          Your workspace certification request has been submitted. Our team will contact you shortly to begin the review.
        </p>

        <div className="relative mb-10 rounded-2xl border border-white/15 bg-white/8 p-6 backdrop-blur-xl sm:p-8">
          <Award className="absolute left-4 top-4 h-8 w-8 text-primary-foreground/20" />
          <blockquote className="pt-4 font-serif text-lg italic leading-relaxed text-primary-foreground/90 sm:text-xl">
            "Trusted workspaces earn confidence faster when quality is visible."
          </blockquote>
          <p className="mt-4 text-sm font-medium uppercase tracking-wide text-primary-foreground/50">
            EverySpaces Certification
          </p>
        </div>

        <button
          onClick={() => navigate("/certification")}
          className="inline-flex items-center gap-2 text-sm font-medium text-primary-foreground/70 transition-colors hover:text-primary-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Certification
        </button>
      </motion.div>
    </div>
  );
};

export default CertificationThankYou;
