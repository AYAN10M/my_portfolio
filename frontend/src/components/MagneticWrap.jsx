/**
 * MAGNETIC BUTTON
 * Button that subtly pulls toward the cursor on hover, creating a magnetic effect.
 */

import { useRef, useState } from "react";

export default function MagneticWrap({ children, intensity = 0.3, className = "" }) {
  const ref = useRef(null);
  const [transform, setTransform] = useState("translate(0px, 0px)");

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTransform(`translate(${x * intensity}px, ${y * intensity}px)`);
  };

  const handleMouseLeave = () => {
    setTransform("translate(0px, 0px)");
  };

  return (
    <div
      ref={ref}
      className={`inline-block ${className}`}
      style={{
        transform,
        transition: "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}
