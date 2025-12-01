import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageIcon, Bot, Shuffle, Video, Trophy, Store } from "lucide-react";

const features = [
  {
    icon: ImageIcon,
    title: "Generator vizual dinamic",
    description: "Fiecare cutie devine o imagine realistă, generată automat și gata de distribuit",
  },
  {
    icon: Bot,
    title: "AI personalizat",
    description: "Recomandări bazate pe ocazie, relația cu destinatarul și bugetul tău",
  },
  {
    icon: Shuffle,
    title: "Idei în câteva click-uri",
    description: "Randomizer tematic pentru inspirație rapidă și rezultate instant",
  },
  {
    icon: Video,
    title: "Conținut video automat",
    description: "Template-uri video pentru social media, generate pe loc",
  },
  {
    icon: Trophy,
    title: "Sistem de recompense",
    description: "Gamificare completă: creezi, deblochezi, câștigi puncte și premii",
  },
  {
    icon: Store,
    title: "Marketplace integrat",
    description: "Acces direct la branduri locale și creatori de conținut verificați",
  },
];

export const Features = () => {
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
          <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-4 block">Caracteristici</span>
          <h2 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
            De ce GIVAORA
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tehnologie avansată pentru experiențe de gifting memorabile
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Card className="bg-background/60 backdrop-blur border-border/50 hover:border-primary/50 transition-all duration-300 group cursor-pointer h-full hover:shadow-lg hover:shadow-primary/5">
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
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
