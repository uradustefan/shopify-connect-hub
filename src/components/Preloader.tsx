import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import BlurText from "./BlurText";
import { LogoAnimation } from "./LogoAnimation";

export const Preloader = () => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [showLogo, setShowLogo] = useState(false);
  const [hidePreloader, setHidePreloader] = useState(false);

  const handleBlurTextComplete = () => {
    // Fade out text-ul după animație
    if (textRef.current) {
      gsap.to(textRef.current, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          setShowLogo(true);
        },
      });
    }
  };

  const handleLogoComplete = () => {
    // Fade out preloader-ul complet
    if (preloaderRef.current) {
      gsap.to(preloaderRef.current, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          setHidePreloader(true);
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
        {!showLogo && (
          <div ref={textRef} className="text-center">
            <BlurText
              text="Create Connect Inspire"
              delay={200}
              animateBy="words"
              direction="top"
              onAnimationComplete={handleBlurTextComplete}
              className="text-[28px] md:text-[48px] lg:text-[72px] font-normal text-foreground tracking-tight"
            />
          </div>
        )}
      </div>
      {showLogo && <LogoAnimation onComplete={handleLogoComplete} />}
    </>
  );
};
