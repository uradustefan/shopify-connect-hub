import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Preloader = () => {
  const [currentWord, setCurrentWord] = useState(0);
  const [showAccent, setShowAccent] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const words = ["CREATE", "CONNECT", "CELEBRATE"];

  useEffect(() => {
    const wordDuration = 1200;

    const wordTimer = setInterval(() => {
      setCurrentWord((prev) => {
        if (prev < words.length - 1) return prev + 1;
        clearInterval(wordTimer);
        return prev;
      });
    }, wordDuration);

    const accentTimer = setTimeout(() => {
      setShowAccent(true);
    }, words.length * wordDuration + 300);

    const revealTimer = setTimeout(() => {
      setShowAccent(false);
      setIsComplete(true);
    }, words.length * wordDuration + 600);

    return () => {
      clearInterval(wordTimer);
      clearTimeout(accentTimer);
      clearTimeout(revealTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: isComplete ? "-100%" : 0 }}
      transition={{
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1],
      }}
      onAnimationComplete={() => {
        if (isComplete) setIsVisible(false);
      }}
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
    >
      <div className="relative flex items-center justify-center">
        <AnimatePresence mode="wait">
          {!showAccent && !isComplete && (
            <motion.span
              key={words[currentWord]}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="text-6xl md:text-8xl lg:text-9xl font-bold text-white tracking-tight"
            >
              {words[currentWord]}
            </motion.span>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showAccent && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-5 h-5 bg-orange-500 absolute"
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
