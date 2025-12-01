import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Sparkles, Gift, PlaySquare, ShoppingBag } from "lucide-react";

const rewards = [
  {
    icon: Sparkles,
    title: "Efecte vizuale",
    description: "Deblochează filtre și efecte speciale pentru box-urile tale",
  },
  {
    icon: Gift,
    title: "Cutii speciale",
    description: "Accesează colecții exclusive și teme premium",
  },
  {
    icon: PlaySquare,
    title: "Template-uri video",
    description: "Obține acces la șabloane video avansate",
  },
  {
    icon: ShoppingBag,
    title: "Extra coșuri de creat",
    description: "Creează mai multe gift box-uri simultan",
  },
];

export const SocialGamification = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-background text-foreground">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            O aplicație <span className="text-primary">socială</span>, <br />
            nu doar un magazin
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-6">
            Fiecare gift creat poate fi distribuit pe social media și devine parte dintr-un challenge. Utilizatorii câștigă puncte pentru cutii create, conexiuni, postări și interacțiuni.
          </p>
          <p className="text-base text-foreground max-w-2xl mx-auto font-medium">
            Cu punctele pot debloca:
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mb-12">
          {rewards.map((reward, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                <reward.icon className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                {reward.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {reward.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Acest sistem transformă gifting-ul într-o experiență distractivă și virală.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
