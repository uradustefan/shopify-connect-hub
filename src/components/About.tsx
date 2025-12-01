import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-background text-foreground">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            Ce este <span className="text-primary">GIVAORA</span>?
          </h2>
          
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
            GIVAORA este o aplicație de gifting și social shopping unde poți crea cutii de cadouri personalizate, generate vizual în timp real. Alegi produsele, platforma îți construiește gift-ul, îți creează imaginea finală și îți oferă un text sau un video gata de share.
          </p>
          
          <p className="text-base md:text-lg text-foreground leading-relaxed font-medium">
            Este mai mult decât un shop – este un ecosistem în care utilizatorii, brandurile și creatorii construiesc împreună experiențe.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
