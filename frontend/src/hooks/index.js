/**
 * CUSTOM HOOKS
 * Hooks let you reuse logic between components.
 * 💡 Flutter equivalent: a utility function or mixin
 */

import { useState, useEffect, useCallback, useRef } from "react";

// ─── useDebounce ───────────────────────────────────────────────────────
// Delays updating a value until the user stops typing.
// Used for search inputs — prevents API call on every keystroke.
export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer); // cleanup on re-render
  }, [value, delay]);

  return debouncedValue;
}

// ─── usePagination ─────────────────────────────────────────────────────
// Handles pagination logic. Give it an array, get back a page of items.
export function usePagination(items, itemsPerPage = 6) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const paginatedItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = useCallback(
    (page) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [totalPages]
  );

  // Reset to page 1 when items change (e.g., after filtering)
  useEffect(() => {
    setCurrentPage(1);
  }, [items]);

  return { paginatedItems, currentPage, totalPages, goToPage };
}

// ─── useLocalStorage ───────────────────────────────────────────────────
// Like useState, but persists to localStorage automatically.
// 💡 Flutter equivalent: using SharedPreferences
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setStoredValue = useCallback(
    (newValue) => {
      setValue(newValue);
      localStorage.setItem(key, JSON.stringify(newValue));
    },
    [key]
  );

  return [value, setStoredValue];
}

// ─── useScrollPosition ────────────────────────────────────────────────
// Tracks scroll Y position. Used for sticky navbar effects.
export function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scrollY;
}

// ─── useImageLoad ─────────────────────────────────────────────────────
// Returns whether an image has loaded. Used to show skeletons.
export function useImageLoad(src) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!src) return;
    setLoaded(false);
    setError(false);
    const img = new Image();
    img.onload = () => setLoaded(true);
    img.onerror = () => setError(true);
    img.src = src;
  }, [src]);

  return { loaded, error };
}

// ─── useInView ─────────────────────────────────────────────────────────
// Returns true when the element is visible in the viewport.
export function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el); // only trigger once
        }
      },
      { threshold: 0.3, ...options }
    );

    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [ref, inView];
}

// ─── useCountUp ────────────────────────────────────────────────────────
// Animates a number from 0 to the target value over `duration` ms.
// Returns the current animated value.
export function useCountUp(target, duration = 1500, inView = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    // Parse numeric part (e.g., "15+" → 15, "100%" → 100)
    const numericTarget = parseInt(target, 10);
    if (isNaN(numericTarget)) {
      setCount(target);
      return;
    }

    let startTime = null;
    let frame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * numericTarget));

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [target, duration, inView]);

  return count;
}
