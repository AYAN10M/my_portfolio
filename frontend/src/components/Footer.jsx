/**
 * FOOTER COMPONENT - Theme-adaptive
 */
import { Link } from "react-router-dom";
import { ownerInfo } from "../data/data.js";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="relative mt-24"
      style={{
        zIndex: 1,
        background: "var(--nav-bg-scrolled)",
        backdropFilter: "blur(24px)",
        borderTop: "1px solid var(--glass-border)",
      }}
    >
      <div className="container-custom py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <Link to="/" className="font-display font-bold text-xl">
              <span style={{ color: "var(--text-primary)" }}>Ayan</span><span className="text-accent glow-dot">.</span>
            </Link>
            <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
              Building things for the web.
            </p>
          </div>
          <div className="flex items-center gap-6">
            {Object.entries(ownerInfo.socials).map(([platform, url]) => (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-mono hover:text-accent capitalize transition-colors duration-300"
                style={{ color: "var(--text-muted)" }}
              >
                {platform}
              </a>
            ))}
          </div>
        </div>
        <div className="mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-2"
          style={{ borderTop: "1px solid var(--glass-border)" }}
        >
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>© {year} Ayan Haldar. All rights reserved.</p>
          <p className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>Built with React + Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}

/**
 * CUSTOM CURSOR
 */
import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let animFrame;

    const moveCursor = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.transform = `translate(${ringX - 16}px, ${ringY - 16}px)`;
      animFrame = requestAnimationFrame(animate);
    };

    const handleMouseOver = (e) => {
      const el = e.target.closest("a, button, [data-hover]");
      setHovering(!!el);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    animFrame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className={`cursor-ring ${hovering ? "hovering" : ""}`} />
    </>
  );
}
