"use client";

import { motion } from "framer-motion";
import { CheckCircle, ArrowLeft, Quote } from "lucide-react";
import { useNavigate } from "@/compat/react-router-dom";

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute top-[-120px] right-[-80px] w-[300px] h-[300px] rounded-full bg-white/5 blur-2xl" />
      <div className="absolute bottom-[-100px] left-[-60px] w-[250px] h-[250px] rounded-full bg-white/5 blur-2xl" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-md w-full text-center relative z-10"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
          className="mx-auto mb-8 w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center"
        >
          <CheckCircle className="w-10 h-10 text-primary-foreground" strokeWidth={1.5} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="text-3xl sm:text-4xl font-serif text-primary-foreground mb-4"
        >
          Thank <span className="italic">You!</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="text-primary-foreground/70 text-base sm:text-lg mb-10"
        >
          Your request has been received. Our team will reach out to you shortly with curated workspace options.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="bg-white/8 backdrop-blur-xl border border-white/15 rounded-2xl p-6 sm:p-8 mb-10 relative"
        >
          <Quote className="w-8 h-8 text-primary-foreground/20 absolute top-4 left-4" />
          <blockquote className="text-primary-foreground/90 font-serif italic text-lg sm:text-xl leading-relaxed pt-4">
            "The best workspace isn't just a place - it's where your vision finds its ground."
          </blockquote>
          <p className="text-primary-foreground/50 text-sm mt-4 font-medium tracking-wide uppercase">
            - EverySpaces
          </p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm font-medium group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </motion.button>
      </motion.div>
    </div>
  );
};

export default ThankYou;
