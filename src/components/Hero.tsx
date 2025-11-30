import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-background text-foreground font-poppins">
      <div className="container mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
            Designing a Better <br />
            <span className="text-primary">World Today</span>
          </h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            Welcome to our world of endless imagination and boundless creativity. 
            Together, let's embark on a remarkable journey where dreams become tangible realities.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
          >
            <Button 
              size="lg" 
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg font-semibold"
            >
              What we do
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-foreground text-foreground hover:bg-foreground hover:text-background px-8 py-6 text-lg font-semibold"
            >
              View works
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="flex items-center gap-4 text-muted-foreground">
            <span className="text-sm">Scroll down</span>
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
