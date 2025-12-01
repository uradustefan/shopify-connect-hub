import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleHelp, Store, ShoppingCart, Users } from "lucide-react";

const problems = [
  {
    icon: CircleHelp,
    title: "Alegerea cadourilor este complicată",
    description: "Ore întregi de căutare fără rezultate satisfăcătoare",
  },
  {
    icon: Store,
    title: "Magazinele locale sunt invizibile",
    description: "Lipsa resurselor de marketing și prezentare profesională",
  },
  {
    icon: ShoppingCart,
    title: "Shopping-ul generic nu personalizează",
    description: "Platformele clasice nu ajută la crearea de experiențe unice",
  },
  {
    icon: Users,
    title: "Conținutul cere timp și expertiză",
    description: "Generarea de materiale vizuale necesită resurse mari",
  },
];

export const WhyGivaora = () => {
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
          <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-4 block">Soluția</span>
          <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-8">
            De ce GIVAORA este <br />
            <span className="text-primary">platforma viitorului</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Card className="bg-secondary/30 border-border/50 hover:border-primary/50 transition-all duration-300 h-full group hover:shadow-lg hover:shadow-primary/5">
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                    <problem.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                    {problem.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-base text-muted-foreground leading-relaxed">
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
          className="text-center max-w-4xl mx-auto"
        >
          <div className="bg-primary/5 border border-primary/20 rounded-3xl p-8 md:p-12">
            <p className="text-xl md:text-3xl text-foreground font-bold leading-relaxed">
              Combinăm <span className="text-primary">AI, marketplace local</span> și <span className="text-primary">social shopping</span> pentru experiențe complete de gifting
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
