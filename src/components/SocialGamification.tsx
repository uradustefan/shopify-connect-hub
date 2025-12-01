import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Sparkles, Gift, PlaySquare, ShoppingBag } from "lucide-react";

const rewards = [
  {
    icon: Sparkles,
    title: "Efecte premium",
    description: "Filtre exclusive și efecte vizuale avansate",
  },
  {
    icon: Gift,
    title: "Cutii speciale",
    description: "Acces la colecții și teme premium",
  },
  {
    icon: PlaySquare,
    title: "Video PRO",
    description: "Template-uri video profesionale",
  },
  {
    icon: ShoppingBag,
    title: "Capacitate extinsă",
    description: "Creează multiple gift box-uri simultan",
  },
];

export const SocialGamification = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 bg-secondary/20 text-foreground">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-4 block">Comunitate</span>
          <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-8">
            Mai mult decât shopping
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-4">
            Distribuie creațiile tale, participă la challenge-uri și câștigă recompense
          </p>
          <p className="text-base text-foreground/80 max-w-2xl mx-auto">
            Fiecare cutie creată te apropie de beneficii exclusive
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {rewards.map((reward, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="w-24 h-24 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                <reward.icon className="w-11 h-11 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors">
                {reward.title}
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                {reward.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
