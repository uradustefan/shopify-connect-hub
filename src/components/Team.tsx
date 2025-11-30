import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const team = [
  { name: "Anna Oldman", role: "Art Director", initials: "AO" },
  { name: "Oscar Freeman", role: "Frontend Dev", initials: "OF" },
  { name: "Emma Newman", role: "Founder", initials: "EN" },
  { name: "Lisa Trueman", role: "UI/UX Designer", initials: "LT" },
];

export const Team = () => {
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
            Meet <br />
            <span className="text-primary">Our Team</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            We are talented individuals who are passionate about bringing ideas to life. 
            With a diverse range of backgrounds and skill sets, we collaborate to produce 
            effective solutions for our clients.
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Together, our creative team is committed to delivering impactful work that exceeds expectations.
          </p>
          <Button variant="outline" size="lg" className="border-foreground text-foreground hover:bg-foreground hover:text-background">
            Read more
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-12 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-semibold">
            We delivering <br />
            <span className="text-primary">exceptional results.</span>
          </h3>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
              className="text-center group cursor-pointer"
            >
              <Avatar className="w-32 h-32 mx-auto mb-4 border-2 border-transparent group-hover:border-primary transition-all duration-300">
                <AvatarFallback className="bg-muted text-foreground text-2xl font-semibold">
                  {member.initials}
                </AvatarFallback>
              </Avatar>
              <h4 className="text-xl font-semibold mb-1 group-hover:text-primary transition-colors">
                {member.name}
              </h4>
              <p className="text-muted-foreground">{member.role}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-8 text-sm text-muted-foreground"
        >
          * The founders of our agency
        </motion.div>
      </div>
    </section>
  );
};
