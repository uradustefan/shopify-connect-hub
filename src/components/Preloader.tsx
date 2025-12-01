import { useRef, useState } from "react";
import { gsap } from "gsap";
import BlurText from "./BlurText";

export const Preloader = () => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [hidePreloader, setHidePreloader] = useState(false);

  const handleBlurTextComplete = () => {
    // Fade out text-ul după animație
    if (textRef.current) {
      gsap.to(textRef.current, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          // Direct fade-out preloader (fără logo în centru)
          if (preloaderRef.current) {
            gsap.to(preloaderRef.current, {
              opacity: 0,
              duration: 0.5,
              onComplete: () => {
                setHidePreloader(true);
                // Anunță Navigation că preloader-ul s-a terminat
                window.dispatchEvent(new CustomEvent('preloaderComplete'));
              },
            });
          }
        },
      });
    }
  };

  if (hidePreloader) return null;

  return (
    <>
      <div
        ref={preloaderRef}
        className="fixed inset-0 z-[9999] bg-background flex items-center justify-center"
      >
        <div ref={textRef} className="text-center">
          <BlurText
            text="Create Connect Inspire"
            delay={600}
            animateBy="words"
            direction="top"
            onAnimationComplete={handleBlurTextComplete}
            className="text-[22px] md:text-[38px] lg:text-[58px] font-normal text-foreground tracking-tight"
          />
        </div>
      </div>
    </>
  );
};
