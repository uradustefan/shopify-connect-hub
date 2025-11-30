import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-background text-foreground font-poppins">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Discover <br />
            <span className="text-primary">Our Studio</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 text-muted-foreground"
          >
            <p className="text-lg leading-relaxed">
              At our design studio, we are a collective of talented individuals ignited by our 
              unwavering passion for transforming ideas into reality. With a harmonious blend of 
              diverse backgrounds and a vast array of skill sets, we join forces to create compelling 
              solutions for our esteemed clients.
            </p>
            <p className="text-lg leading-relaxed">
              Collaboration is at the heart of what we do. Our team thrives on the synergy that arises 
              when unique perspectives converge, fostering an environment of boundless creativity. By 
              harnessing our collective expertise, we produce extraordinary results that consistently 
              surpass expectations.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="aspect-square bg-muted rounded-sm overflow-hidden">
              <div className="w-full h-full flex items-center justify-center text-6xl font-bold text-primary">
                A.
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <p className="text-2xl md:text-3xl font-semibold">
            Professionals focused on helping your brand <br />
            <span className="text-primary">grow and move forward.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};
