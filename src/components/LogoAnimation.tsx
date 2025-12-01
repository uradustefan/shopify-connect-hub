import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface LogoAnimationProps {
  onComplete?: () => void;
}

export const LogoAnimation = ({ onComplete }: LogoAnimationProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const logo = logoRef.current;

    if (!overlay || !logo) return;

    // Timeline pentru animație
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete?.();
      },
    });

    // Logo slide in de la stânga
    tl.fromTo(
      logo,
      {
        opacity: 0,
        x: -40,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.38,
        ease: "power2.out",
      }
    )
    // Hold logo vizibil
    .to(logo, {
      delay: 0.3,
    })
    // Fade out overlay
    .to(overlay, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut",
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] bg-background flex items-center justify-center"
    >
      <span
        ref={logoRef}
        className="text-[42px] font-medium gradient-logo"
        style={{ fontFamily: 'Runalto, sans-serif', letterSpacing: '0.376em' }}
      >
        GIVAORA
      </span>
    </div>
  );
};
