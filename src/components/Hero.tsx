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
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-12 pt-12 pb-24">
      <div className="container mx-auto text-center max-w-5xl">
        <h1 className="mil-up text-[34px] md:text-[60px] lg:text-[90px] font-medium leading-[1.1] mb-8">
          GIVAORA – Creează cadoul perfect, <br />
          <span className="text-primary">în câteva secunde</span>
        </h1>
        
        <p className="mil-up text-base md:text-lg text-muted-foreground max-w-3xl mx-auto mb-6 leading-relaxed font-semibold">
          AI-ul GIVAORA combină produsele tale preferate într-o cutie de cadouri personalizată, îți generează imaginea box-ului și îți oferă conținut gata de postat. Totul într-o singură platformă.
        </p>

        <p className="mil-up text-base md:text-lg text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
          Nu mai căuta ore întregi ce cadou să iai. Alege persoana, ocazia și bugetul, iar GIVAORA creează pentru tine cel mai potrivit gift box.
        </p>

        <div className="mil-up flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button variant="default">
            👉 Creează primul tău gift
          </Button>
          <Button variant="outline">
            Vezi cum funcționează
          </Button>
        </div>
      </div>
    </section>
  );
};
