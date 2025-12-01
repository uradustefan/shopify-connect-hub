import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export const Preloader = () => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const preloader = preloaderRef.current;
    const percent = percentRef.current;

    if (!preloader || !percent) return;

    let counter = 0;
    const interval = setInterval(() => {
      counter++;
      percent.textContent = `${counter}%`;

      if (counter === 100) {
        clearInterval(interval);
        
        gsap.to(preloader, {
          opacity: 0,
          duration: 0.5,
          delay: 0.3,
          onComplete: () => {
            preloader.style.display = "none";
          },
        });
      }
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[9999] bg-background flex items-center justify-center"
    >
      <div className="text-center">
        <div ref={percentRef} className="text-6xl font-medium text-foreground">
          0%
        </div>
      </div>
    </div>
  );
};
