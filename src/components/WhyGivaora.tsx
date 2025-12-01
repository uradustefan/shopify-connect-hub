import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleHelp, Store, ShoppingCart, Users } from "lucide-react";

const problems = [
  {
    icon: CircleHelp,
    title: "Oamenii nu știu ce cadouri să aleagă",
    description: "Procesul de căutare a cadoului perfect poate dura ore întregi fără rezultate satisfăcătoare.",
  },
  {
    icon: Store,
    title: "Magazinele mici nu au resurse pentru marketing",
    description: "Business-urile locale nu au capacitatea de a-și prezenta produsele într-un mod atractiv și personalizat.",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce-ul clasic nu oferă personalizare reală",
    description: "Platformele tradiționale nu ajută utilizatorii să creeze experiențe unice și memorabile.",
  },
  {
    icon: Users,
    title: "Creatorii au nevoie de instrumente simple",
    description: "Generarea de conținut util și atractiv pentru social media necesită timp și resurse considerabile.",
  },
];

export const WhyGivaora = () => {
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
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            De ce este nevoie de <span className="text-primary">GIVAORA</span>?
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Card className="bg-background border-border hover:border-primary transition-all duration-300 h-full group">
                <CardHeader>
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <problem.icon className="w-7 h-7 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                    {problem.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {problem.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center max-w-3xl mx-auto"
        >
          <p className="text-lg text-foreground font-medium leading-relaxed">
            GIVAORA rezolvă toate aceste probleme combinând <span className="text-primary">AI + produse reale + generare vizuală + social sharing + marketplace</span>.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
