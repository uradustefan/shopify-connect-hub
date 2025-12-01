import { useEffect, useRef } from 'react';
import { Menu } from 'lucide-react';
import gsap from 'gsap';

interface FloatingMenuButtonProps {
  isVisible: boolean;
  onClick: () => void;
}

export const FloatingMenuButton = ({ isVisible, onClick }: FloatingMenuButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!buttonRef.current) return;

    if (isVisible) {
      gsap.to(buttonRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: 'back.out(1.7)'
      });
    } else {
      gsap.to(buttonRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.2,
        ease: 'power2.in'
      });
    }
  }, [isVisible]);

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      className="fixed top-6 right-6 z-50 w-12 h-12 rounded-full bg-background/80 backdrop-blur-md border border-border flex items-center justify-center hover:bg-background transition-colors shadow-lg opacity-0 scale-80"
      aria-label="Menu"
      style={{ pointerEvents: isVisible ? 'auto' : 'none' }}
    >
      <Menu className="w-5 h-5" />
    </button>
  );
};
