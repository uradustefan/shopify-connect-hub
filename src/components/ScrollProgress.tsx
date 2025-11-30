import { useEffect, useRef } from "react";

export const ScrollProgress = () => {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateProgress = () => {
      if (!progressRef.current) return;
      
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      progressRef.current.style.height = `${scrollPercent}%`;
    };

    window.addEventListener("scroll", updateProgress);
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className="fixed right-0 top-0 bottom-0 w-[2px] bg-border z-[9999] block">
      <div
        ref={progressRef}
        className="absolute top-0 left-0 w-full bg-primary transition-all duration-100"
        style={{ height: "0%" }}
      />
    </div>
  );
};
