import { motion, Variants } from "framer-motion";

interface BlurTextProps {
  text: string;
  delay?: number;
  animateBy?: "words" | "characters";
  direction?: "top" | "bottom";
  className?: string;
  onAnimationComplete?: () => void;
}

export default function BlurText({
  text,
  delay = 0,
  animateBy = "words",
  direction = "top",
  className = "",
  onAnimationComplete,
}: BlurTextProps) {
  const defaultVariants: Variants = {
    hidden: {
      filter: "blur(10px)",
      opacity: 0,
      y: direction === "top" ? -20 : 20,
    },
    visible: {
      filter: "blur(0px)",
      opacity: 1,
      y: 0,
    },
  };

  const items = animateBy === "words" ? text.split(" ") : text.split("");

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      onAnimationComplete={onAnimationComplete}
      className={`flex ${animateBy === "words" ? "gap-2 md:gap-3 lg:gap-4" : "gap-0"} ${className}`}
    >
      {items.map((item, index) => (
        <motion.span
          key={index}
          variants={defaultVariants}
          transition={{
            delay: (delay / 1000) * index,
            duration: 0.4,
            ease: "easeOut",
          }}
          className="inline-block whitespace-nowrap"
        >
          {item}
          {animateBy === "characters" && item === " " ? "\u00A0" : ""}
        </motion.span>
      ))}
    </motion.div>
  );
}
