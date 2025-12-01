import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 bg-secondary/20 text-foreground">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Despre platformă</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-12 text-center leading-tight">
            Un ecosistem complet <br />pentru <span className="text-primary">gifting inteligent</span>
          </h2>
          
          <div className="space-y-8 text-center">
            <p className="text-lg md:text-2xl text-foreground/90 leading-relaxed font-light">
              GIVAORA este o aplicație de gifting și social shopping unde creezi cutii de cadouri personalizate, generate vizual în timp real
            </p>
            
            <p className="text-base text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Alegi produsele, platforma construiește gift-ul, generează imaginea finală și oferă conținut gata de distribuit pe social media
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
