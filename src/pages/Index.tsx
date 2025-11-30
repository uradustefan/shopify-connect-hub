import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Team } from "@/components/Team";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="bg-background">
      <Navigation />
      <Hero />
      <About />
      <Services />
      <Team />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;
