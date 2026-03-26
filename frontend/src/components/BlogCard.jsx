/**
 * BLOG CARD — Glass card with image parallax shift on hover.
 */

import { useRef } from "react";
import { Link } from "react-router-dom";
import { LazyImage } from "./UI.jsx";

export default function BlogCard({ post }) {
  const imgRef = useRef(null);
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric", month: "short", day: "numeric",
  });

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
      to={`/blog/${post.slug}`}
      className="card group block"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="overflow-hidden h-44 relative">
        <div ref={imgRef} className="h-full w-full transition-transform duration-500 ease-out">
          <LazyImage src={post.coverImage} alt={post.title} className="h-44 w-full" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div className="p-5">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {post.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="tag text-xs">{tag}</span>
          ))}
        </div>

        <h3 className="font-semibold mb-2 line-clamp-2 leading-snug group-hover:text-accent transition-colors duration-300"
          style={{ color: "var(--text-primary)" }}
        >{post.title}</h3>

        <p className="text-sm line-clamp-2 mb-4" style={{ color: "var(--text-muted)" }}>
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between text-xs font-mono" style={{ color: "var(--text-muted)" }}>
          <span>{formattedDate}</span>
          <span>{post.readTime}</span>
        </div>
      </div>
    </Link>
  );
}
