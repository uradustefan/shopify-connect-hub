import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
      });
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
      });
    };

    const hoverEffect = () => {
      gsap.to(cursor, {
        scale: 0.5,
        duration: 0.3,
      });
      gsap.to(follower, {
        scale: 3,
        duration: 0.3,
      });
    };

    const unhoverEffect = () => {
      gsap.to(cursor, {
        scale: 1,
        duration: 0.3,
      });
      gsap.to(follower, {
        scale: 1,
        duration: 0.3,
      });
    };

    window.addEventListener("mousemove", moveCursor);

    const links = document.querySelectorAll("a, button");
    links.forEach((link) => {
      link.addEventListener("mouseenter", hoverEffect);
      link.addEventListener("mouseleave", unhoverEffect);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      links.forEach((link) => {
        link.removeEventListener("mouseenter", hoverEffect);
        link.removeEventListener("mouseleave", unhoverEffect);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed w-2 h-2 bg-primary rounded-full pointer-events-none z-[9998]"
        style={{ transform: "translate(-50%, -50%)" }}
      />
      <div
        ref={followerRef}
        className="fixed w-10 h-10 border border-primary rounded-full pointer-events-none z-[9997]"
        style={{ transform: "translate(-50%, -50%)" }}
      />
    </>
  );
};
