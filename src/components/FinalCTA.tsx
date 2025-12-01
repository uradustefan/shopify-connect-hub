import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

export const FinalCTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 md:py-40 bg-secondary/20 text-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/10 pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-5xl mx-auto"
        >
          <h2 className="text-4xl md:text-7xl lg:text-8xl font-bold mb-10 leading-[1.05] tracking-tight">
            Creează primul tău <br />
            <span className="text-primary">gift perfect</span>
          </h2>
          
          <p className="text-lg md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-14 leading-relaxed font-light">
            Alegi. AI-ul creează. Tu distribui. <br />
            Totul în câteva secunde.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-5 justify-center items-center"
          >
            <Button variant="default" size="lg" className="min-w-[260px] text-base">
              Începe gratuit
            </Button>
            <Button variant="outline" size="lg" className="min-w-[260px] text-base">
              Pentru business-uri
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
