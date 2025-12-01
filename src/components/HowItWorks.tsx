import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { User, Sparkles, Image, ShoppingCart } from "lucide-react";

const steps = [
  {
    icon: User,
    title: "Selectează destinatarul",
    description: "Alege ocazia și persoana pentru care creezi cadoul perfect",
  },
  {
    icon: Sparkles,
    title: "Recomandări AI personalizate",
    description: "Primești sugestii inteligente și combinații optime de produse",
  },
  {
    icon: Image,
    title: "Vizualizare instant",
    description: "Generăm automat imaginea realistă a gift box-ului tău",
  },
  {
    icon: ShoppingCart,
    title: "Comandă sau distribuie",
    description: "Cumpără produsele sau postează cadoul pe social media",
  },
];

export const HowItWorks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 bg-background text-foreground">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-4 block">Procesul</span>
          <h2 className="text-5xl md:text-6xl font-bold leading-tight">
            Cum funcționează
          </h2>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="flex gap-8 mb-16 last:mb-0 group"
            >
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
                    <step.icon className="w-9 h-9 text-primary" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                </div>
              </div>
              <div className="flex-1 pt-3">
                <h3 className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
