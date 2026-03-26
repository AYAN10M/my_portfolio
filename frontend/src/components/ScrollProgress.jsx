/**
 * SCROLL PROGRESS BAR
 * A thin accent-gradient line at the top of the viewport showing scroll depth.
 */

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 origin-left"
      style={{
        zIndex: 100,
        height: 3,
        scaleX,
        background: "linear-gradient(90deg, var(--accent), var(--glow-cyan), var(--glow-purple))",
        boxShadow: "0 0 10px rgba(232,255,71,0.3), 0 0 20px rgba(6,182,212,0.2)",
      }}
    />
  );
}
