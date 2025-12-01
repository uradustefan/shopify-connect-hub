import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const benefits = [
  "Dashboard complet pentru gestionarea produselor",
  "Imagini și video generate automat",
  "Conținut optimizat pentru social media",
  "Vizibilitate crescută prin AI",
  "Monetizare transparentă",
  "Integrare brand personalizată",
];

export const ForCreators = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 bg-background text-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-4 block">Pentru business</span>
          <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-8">
            Platforma ta de <br />
            <span className="text-primary">vânzări inteligentă</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Transformă produsele în experiențe memorabile și ajunge la clienți noi prin tehnologie AI
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className="flex gap-4 items-start bg-secondary/30 p-6 rounded-2xl hover:bg-secondary/50 transition-colors"
              >
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                  <Check className="w-4 h-4 text-primary" strokeWidth={3} />
                </div>
                <p className="text-base text-foreground font-medium leading-relaxed">{benefit}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <Button variant="default" size="lg" className="min-w-[280px]">
            Aplică acum
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
