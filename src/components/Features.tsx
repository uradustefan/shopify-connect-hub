import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageIcon, Bot, Shuffle, Video, Trophy, Store } from "lucide-react";

const features = [
  {
    icon: ImageIcon,
    title: "Dynamic Visual Gift Generator",
    description: "Imagine realistă generată automat pentru fiecare cutie creată.",
  },
  {
    icon: Bot,
    title: "Gift Builder cu AI",
    description: "Recomandări în funcție de ocazie, relație și buget.",
  },
  {
    icon: Shuffle,
    title: "Randomizer tematic",
    description: "Idei rapide: \"Gift pentru mama\", \"Sub 50 lei\", \"Pentru prietenul cel mai bun\".",
  },
  {
    icon: Video,
    title: "Video Templates",
    description: "Mini-clipuri gata de postat, generate automat.",
  },
  {
    icon: Trophy,
    title: "Gamificare & puncte",
    description: "Creezi, deblochezi cutii speciale, câștigi recompense.",
  },
  {
    icon: Store,
    title: "Marketplace conectat",
    description: "Branduri, magazine și creatori își pot încărca produsele și ritualurile.",
  },
];

export const Features = () => {
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
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Ce face GIVAORA <span className="text-primary">diferit</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Card className="bg-secondary border-border hover:border-primary transition-all duration-300 group cursor-pointer h-full">
                <CardHeader>
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="w-7 h-7 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-base leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
