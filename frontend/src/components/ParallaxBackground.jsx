/**
 * PARALLAX BACKGROUND
 * Animated floating gradient orbs that shift on scroll, creating a living background.
 * Adapts to light/dark mode.
 */

import { useEffect, useState, useRef } from "react";
import { useTheme } from "../context/index.jsx";

export default function ParallaxBackground() {
  const [scrollY, setScrollY] = useState(0);
  const { isDark } = useTheme();
  const rafRef = useRef(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        rafRef.current = requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Adjust orb opacity and base background for light/dark
  const orbOpacity = isDark ? 1 : 0.5;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Base gradient */}
      <div
        className="absolute inset-0 transition-colors duration-500"
        style={{
          background: isDark
            ? "radial-gradient(ellipse 80% 60% at 50% -20%, rgba(15, 15, 40, 1) 0%, #07070f 100%)"
            : "radial-gradient(ellipse 80% 60% at 50% -20%, rgba(230, 230, 255, 0.5) 0%, #f8f8fc 100%)",
        }}
      />

      {/* Orb 1 — Large Cyan (top-left) */}
      <div
        className="absolute animate-float-slow"
        style={{
          width: "600px",
          height: "600px",
          left: "-10%",
          top: "-5%",
          borderRadius: "50%",
          background: isDark
            ? "radial-gradient(circle, rgba(6, 182, 212, 0.12) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(6, 182, 212, 0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
          transform: `translate(0, ${scrollY * 0.08}px)`,
          opacity: orbOpacity,
        }}
      />

      {/* Orb 2 — Purple (right) */}
      <div
        className="absolute animate-float-mid"
        style={{
          width: "500px",
          height: "500px",
          right: "-5%",
          top: "20%",
          borderRadius: "50%",
          background: isDark
            ? "radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(168, 85, 247, 0.07) 0%, transparent 70%)",
          filter: "blur(60px)",
          transform: `translate(0, ${scrollY * -0.06}px)`,
          opacity: orbOpacity,
        }}
      />

      {/* Orb 3 — Accent Lime (center-bottom) */}
      <div
        className="absolute animate-float-fast"
        style={{
          width: "400px",
          height: "400px",
          left: "30%",
          top: "60%",
          borderRadius: "50%",
          background: isDark
            ? "radial-gradient(circle, rgba(232, 255, 71, 0.06) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(232, 255, 71, 0.05) 0%, transparent 70%)",
          filter: "blur(50px)",
          transform: `translate(0, ${scrollY * -0.1}px)`,
          opacity: orbOpacity,
        }}
      />

      {/* Orb 4 — Pink (bottom-left) */}
      <div
        className="absolute animate-float-mid"
        style={{
          width: "350px",
          height: "350px",
          left: "5%",
          top: "80%",
          borderRadius: "50%",
          background: isDark
            ? "radial-gradient(circle, rgba(236, 72, 153, 0.08) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(236, 72, 153, 0.06) 0%, transparent 70%)",
          filter: "blur(50px)",
          transform: `translate(0, ${scrollY * 0.05}px)`,
          opacity: orbOpacity,
        }}
      />

      {/* Orb 5 — second Cyan (far down) */}
      <div
        className="absolute animate-float-slow"
        style={{
          width: "450px",
          height: "450px",
          right: "10%",
          top: "120%",
          borderRadius: "50%",
          background: isDark
            ? "radial-gradient(circle, rgba(6, 182, 212, 0.08) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(6, 182, 212, 0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
          transform: `translate(0, ${scrollY * -0.07}px)`,
          opacity: orbOpacity,
        }}
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0"
        style={{
          opacity: isDark ? 0.03 : 0.04,
          backgroundImage: `
            linear-gradient(${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'} 1px, transparent 1px),
            linear-gradient(90deg, ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'} 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}
