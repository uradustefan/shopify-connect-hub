import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { User, Sparkles, Image, ShoppingCart } from "lucide-react";

const steps = [
  {
    icon: User,
    title: "Alegi ocazia, persoana și bugetul",
    description: "Spui pentru cine și pentru ce moment creezi un cadou.",
  },
  {
    icon: Sparkles,
    title: "Primești recomandări inteligente",
    description: "AI-ul îți sugerează produse potrivite și combină automat 6–12 articole într-un gift box ideal.",
  },
  {
    icon: Image,
    title: "Vezi imaginea box-ului tău",
    description: "Primești un vizual realist al cutiei create, plus textul explicativ \"De ce acest cadou?\".",
  },
  {
    icon: ShoppingCart,
    title: "Comanzi, salvezi sau distribui",
    description: "Poți comanda produsele, poți salva cutia sau o poți posta pe social media direct din aplicație.",
  },
];

export const HowItWorks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-secondary/30 text-foreground">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Cum funcționează <span className="text-primary">GIVAORA</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="flex gap-6 group"
            >
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
              </div>
              <div>
                <div className="text-sm font-semibold text-primary mb-2">Pasul {index + 1}</div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
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
