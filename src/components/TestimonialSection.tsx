import { Star } from "lucide-react";
import testimonialBg from "@/assets/testimonial-bg.png";

const TestimonialSection = () => {
  return (
    <section id="testimonial" className="py-12 md:py-20 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-center mb-8 md:mb-12">
          <span className="italic font-bold">Customer</span> Experiences Real
          <br />
          Success Stories with EverySpaces
        </h2>

        <div className="relative rounded-none overflow-hidden min-h-[300px] sm:min-h-[400px]">
          <img
            src={testimonialBg}
            alt="Team collaboration"
            className="w-full h-full object-cover absolute inset-0"
          />
          <div className="relative z-10 flex items-center justify-center min-h-[300px] sm:min-h-[400px] p-4 sm:p-8">
            <div className="bg-card rounded-none p-6 sm:p-8 max-w-md shadow-xl w-full sm:w-auto">
              <div className="flex items-center justify-between mb-4">
                <span className="text-accent text-3xl font-serif">"</span>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
              <p className="text-foreground text-sm sm:text-base leading-relaxed mb-6">
                "EverySpaces made my workspace search seamless. Their expert guidance and personalized approach helped me secure the perfect office space!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground font-bold text-sm">
                  MT
                </div>
                <div>
                  <p className="font-bold text-sm text-foreground">Maria Torres</p>
                  <p className="text-muted-foreground text-xs">Startup Founder</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
