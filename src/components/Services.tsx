import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const services = [
  {
    title: "Branding and Identity Design",
    description: "Our creative agency is a team of professionals focused on helping your brand grow.",
  },
  {
    title: "Website Design and Development",
    description: "Our creative agency is a team of professionals focused on helping your brand grow.",
  },
  {
    title: "Advertising and Marketing Campaigns",
    description: "Our creative agency is a team of professionals focused on helping your brand grow.",
  },
  {
    title: "Creative Consulting and Development",
    description: "Our creative agency is a team of professionals focused on helping your brand grow.",
  },
];

export const Services = () => {
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
            Unique Ideas <br />
            For Your <span className="text-primary">Business.</span>
          </h2>
          <Button variant="outline" size="lg" className="border-foreground text-foreground hover:bg-foreground hover:text-background mt-6">
            What we do
          </Button>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Card className="bg-secondary border-border hover:border-primary transition-all duration-300 group cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground text-base">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
