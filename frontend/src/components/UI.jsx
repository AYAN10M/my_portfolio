/**
 * REUSABLE UI COMPONENTS - Theme-adaptive
 */

import { motion } from "framer-motion";
import { useImageLoad } from "../hooks/index.js";

// ─── Loading Skeleton ──────────────────────────────────────────────────
export function SkeletonCard() {
  return (
    <div className="card p-5 space-y-4">
      <div className="skeleton h-48 w-full rounded-xl" />
      <div className="flex gap-2">
        <div className="skeleton h-5 w-16 rounded-full" />
        <div className="skeleton h-5 w-20 rounded-full" />
      </div>
      <div className="skeleton h-6 w-3/4 rounded" />
      <div className="skeleton h-4 w-full rounded" />
      <div className="skeleton h-4 w-5/6 rounded" />
    </div>
  );
}

// ─── Tag Badge ─────────────────────────────────────────────────────────
export function Tag({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`${active ? "tag-accent" : "tag"} cursor-pointer hover:scale-105 transition-transform duration-150`}
    >
      {label}
    </button>
  );
}

// ─── Pagination ────────────────────────────────────────────────────────
export function Pagination({ currentPage, totalPages, goToPage }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="btn-outline px-4 py-2 text-sm disabled:opacity-30"
      >
        ← Prev
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => goToPage(page)}
          className={`w-9 h-9 rounded-full text-sm font-medium transition-all duration-200 ${
            page === currentPage
              ? "bg-accent text-black shadow-[0_0_20px_rgba(232,255,71,0.3)]"
              : "hover:bg-[var(--bg-surface-hover)]"
          }`}
          style={{
            color: page === currentPage ? "#000" : "var(--text-muted)",
          }}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="btn-outline px-4 py-2 text-sm disabled:opacity-30"
      >
        Next →
      </button>
    </div>
  );
}

// ─── Empty State ───────────────────────────────────────────────────────
export function EmptyState({ icon = "🔍", title, message }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-24 px-6"
    >
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2" style={{ color: "var(--text-secondary)" }}>{title}</h3>
      <p className="max-w-sm mx-auto" style={{ color: "var(--text-muted)" }}>{message}</p>
    </motion.div>
  );
}

// ─── Search Input ──────────────────────────────────────────────────────
export function SearchInput({ value, onChange, placeholder = "Search..." }) {
  return (
    <div className="relative">
      <svg
        className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4"
        style={{ color: "var(--text-muted)" }}
        fill="none" stroke="currentColor" viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-11 pr-4 py-3 rounded-full glass-input"
        style={{ borderRadius: "9999px", paddingLeft: "2.75rem" }}
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors"
          style={{ color: "var(--text-muted)" }}
        >
          ✕
        </button>
      )}
    </div>
  );
}

// ─── Image with loading skeleton ───────────────────────────────────────
export function LazyImage({ src, alt, className }) {
  const { loaded } = useImageLoad(src);

  return (
    <div className={`relative ${className}`}>
      {!loaded && <div className="absolute inset-0 skeleton rounded-inherit" />}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}

// ─── Section Header ────────────────────────────────────────────────────
export function SectionHeader({ eyebrow, title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mb-12 lg:mb-16"
    >
      {eyebrow && (
        <p className="font-mono text-xs tracking-widest uppercase mb-3"
          style={{
            background: "linear-gradient(135deg, var(--accent), var(--glow-cyan))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {eyebrow}
        </p>
      )}
      <h2 className="section-title mb-4">{title}</h2>
      {subtitle && (
        <p className="text-lg max-w-2xl" style={{ color: "var(--text-secondary)" }}>{subtitle}</p>
      )}
    </motion.div>
  );
}

// ─── Fade-in Wrapper ───────────────────────────────────────────────────
export function FadeIn({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Page Transition Wrapper ────────────────────────────────────────────
export function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
