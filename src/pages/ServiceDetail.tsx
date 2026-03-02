import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { serviceDetails } from "@/data/serviceDetails";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? serviceDetails[slug] : null;

  if (!service) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif mb-4">Service not found</h1>
          <Link to="/#service" className="text-accent underline">Back to services</Link>
        </div>
      </div>
    );
  }

  const variantBg = {
    default: "bg-primary",
    lime: "bg-lime",
    orange: "bg-accent",
  };

  const variantText = {
    default: "text-primary-foreground",
    lime: "text-foreground",
    orange: "text-accent-foreground",
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className={`${variantBg[service.variant]} ${variantText[service.variant]} pt-10 sm:pt-16 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-12`}>
        <div className="max-w-5xl mx-auto">
          <Link
            to="/#service"
            className="inline-flex items-center gap-2 text-sm opacity-80 hover:opacity-100 transition-opacity mb-8"
          >
            <ArrowLeft size={16} />
            Back to Services
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif leading-tight mb-4"
          >
            {service.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-base sm:text-lg opacity-80 max-w-2xl"
          >
            {service.desc}
          </motion.p>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 sm:mb-16"
          >
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">Our Process</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif mt-2">
              <span className="font-bold">How</span> We Work
            </h2>
          </motion.div>

          <div className="space-y-0">
            {service.steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative flex gap-4 sm:gap-8"
              >
                {/* Timeline line */}
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-lg sm:text-xl font-serif shrink-0">
                    {step.number}
                  </div>
                  {i < service.steps.length - 1 && (
                    <div className="w-[2px] flex-1 bg-border my-2" />
                  )}
                </div>

                {/* Content */}
                <div className="pb-10 sm:pb-14 pt-1">
                  <h3 className="text-xl sm:text-2xl font-bold font-sans mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-xl">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-12 bg-muted">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10 sm:mb-14"
          >
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">What You Get</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif mt-2">
              <span className="font-bold">Key</span> Deliverables
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {service.deliverables.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-card rounded-2xl p-5 sm:p-6 shadow-md border border-border flex items-start gap-4"
              >
                <CheckCircle2 size={24} className="text-accent shrink-0 mt-0.5" />
                <p className="text-foreground font-medium text-base sm:text-lg">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif mb-4">
              Ready to Get <span className="italic">Started?</span>
            </h2>
            <p className="text-muted-foreground mb-8 text-sm sm:text-base">
              Book a free strategy call and let's discuss how we can transform your workspace.
            </p>
            <Link
              to="/#contact"
              className="inline-flex items-center justify-between bg-primary text-primary-foreground font-semibold text-base sm:text-lg py-3 sm:py-4 pl-6 sm:pl-8 pr-3 sm:pr-4 rounded-full hover:opacity-90 transition-opacity"
            >
              <span>Book Strategy Call</span>
              <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-primary-foreground/30 flex items-center justify-center ml-4">
                <ArrowUpRight size={20} />
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default ServiceDetail;
