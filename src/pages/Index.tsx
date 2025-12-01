import { Preloader } from "@/components/Preloader";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { HowItWorks } from "@/components/HowItWorks";
import { Features } from "@/components/Features";
import { ForCreators } from "@/components/ForCreators";
import { SocialGamification } from "@/components/SocialGamification";
import { WhyGivaora } from "@/components/WhyGivaora";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="bg-background">
      <Preloader />
      <ScrollProgress />
      <Navigation />
      <Hero />
      <About />
      <HowItWorks />
      <Features />
      <ForCreators />
      <SocialGamification />
      <WhyGivaora />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Index;
