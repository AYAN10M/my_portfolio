/**
 * SPLASH SCREEN
 * Animated intro that plays once on first visit.
 * Name reveals letter-by-letter with staggered fade, then slides away.
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashScreen({ onComplete }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onComplete, 600); // wait for exit animation
    }, 2200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  const firstName = "Ayan";
  const lastName = "Haldar";

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center"
          style={{
            zIndex: 9999,
            background: "var(--bg-base)",
          }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Glow orb behind text */}
          <div
            className="absolute"
            style={{
              width: 300,
              height: 300,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(232,255,71,0.08) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />

          <div className="relative text-center">
            {/* First name */}
            <div className="flex justify-center overflow-hidden">
              {firstName.split("").map((char, i) => (
                <motion.span
                  key={`f-${i}`}
                  className="font-display text-6xl md:text-8xl font-black inline-block"
                  style={{ color: "var(--text-primary)" }}
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.2 + i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {char}
                </motion.span>
              ))}
              <motion.span
                className="font-display text-6xl md:text-8xl font-black text-accent glow-dot inline-block"
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 0.2 + firstName.length * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                .
              </motion.span>
            </div>

            {/* Last name */}
            <div className="flex justify-center overflow-hidden">
              {lastName.split("").map((char, i) => (
                <motion.span
                  key={`l-${i}`}
                  className="font-display text-6xl md:text-8xl font-black inline-block"
                  style={{
                    background: "linear-gradient(135deg, var(--accent), var(--glow-cyan))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.5 + i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </div>

            {/* Subtitle */}
            <motion.p
              className="font-mono text-xs tracking-[0.3em] uppercase mt-4"
              style={{ color: "var(--text-muted)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.4 }}
            >
              Developer & Designer
            </motion.p>

            {/* Loading bar */}
            <motion.div
              className="mx-auto mt-6 h-0.5 rounded-full overflow-hidden"
              style={{
                width: 120,
                background: "var(--glass-border)",
              }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, var(--accent), var(--glow-cyan))",
                }}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.8, delay: 0.4, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
