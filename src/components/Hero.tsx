import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = document.querySelectorAll(".mil-up");
    
    elements.forEach((element) => {
      gsap.to(element, {
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse",
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      });
    });
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-6 md:px-12 pt-32 pb-24">
      <div className="container mx-auto text-center max-w-6xl">
        <h1 className="mil-up text-[36px] md:text-[72px] lg:text-[96px] font-bold leading-[1.05] mb-8 tracking-tight">
          Creează cadoul perfect <br />
          <span className="text-primary">în câteva secunde</span>
        </h1>
        
        <p className="mil-up text-base md:text-xl text-foreground/80 max-w-2xl mx-auto mb-16 leading-relaxed font-light">
          AI personalizat care transformă selecția ta de produse într-un gift box vizual impresionant, gata de distribuit
        </p>

        <div className="mil-up flex flex-col sm:flex-row gap-5 justify-center items-center">
          <Button variant="default" size="lg" className="min-w-[240px]">
            Începe acum
          </Button>
          <Button variant="outline" size="lg" className="min-w-[240px]">
            Descoperă platforma
          </Button>
        </div>
      </div>
    </section>
  );
};
