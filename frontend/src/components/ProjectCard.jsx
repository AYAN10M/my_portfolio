/**
 * PROJECT CARD — Glass card with image parallax shift on hover.
 */

import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { LazyImage } from "./UI.jsx";

export default function ProjectCard({ project }) {
  const imgRef = useRef(null);

  const handleMouseMove = (e) => {
    const img = imgRef.current;
    if (!img) return;
    const rect = img.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * -10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    img.style.transform = `scale(1.1) translate(${x}px, ${y}px)`;
  };

  const handleMouseLeave = () => {
    const img = imgRef.current;
    if (img) img.style.transform = "scale(1) translate(0, 0)";
  };

  return (
    <Link
      to={`/projects/${project.slug}`}
      className="card group block"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Cover Image with parallax shift */}
      <div className="overflow-hidden h-48 relative">
        <div ref={imgRef} className="h-full w-full transition-transform duration-500 ease-out">
          <LazyImage
            src={project.coverImage}
            alt={project.title}
            className="h-48 w-full"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Card Body */}
      <div className="p-5">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="tag text-xs">{tag}</span>
          ))}
        </div>

        <h3 className="font-semibold mb-2 line-clamp-1 group-hover:text-accent transition-colors duration-300"
          style={{ color: "var(--text-primary)" }}
        >
          {project.title}
        </h3>

        <p className="text-sm line-clamp-2 mb-4" style={{ color: "var(--text-muted)" }}>
          {project.shortDesc}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>{project.year}</span>
          <span className="text-xs font-medium group-hover:text-accent transition-colors duration-300 flex items-center gap-1"
            style={{ color: "var(--text-muted)" }}
          >
            View
            <span className="inline-block group-hover:translate-x-1 transition-transform duration-300">→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
