/**
 * BLOG PAGE — Animated layout transitions when filtering.
 */

import { useState, useMemo } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { useData } from "../context/index.jsx";
import { useDebounce, usePagination } from "../hooks/index.js";
import BlogCard from "../components/BlogCard.jsx";
import TiltCard from "../components/TiltCard.jsx";
import {
  PageTransition, SectionHeader, SearchInput, Tag,
  Pagination, EmptyState, FadeIn
} from "../components/UI.jsx";

export default function Blog() {
  const { blogs } = useData();
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState("All");
  const debouncedSearch = useDebounce(search);

  const allBlogTags = useMemo(
    () => [...new Set(blogs.flatMap((b) => b.tags || []))].sort(),
    [blogs]
  );

  const publishedBlogs = blogs.filter((b) => b.published);

  const filtered = publishedBlogs.filter((b) => {
    const matchesSearch =
      b.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      b.excerpt.toLowerCase().includes(debouncedSearch.toLowerCase());
    const matchesTag = activeTag === "All" || b.tags.includes(activeTag);
    return matchesSearch && matchesTag;
  });

  const { paginatedItems, currentPage, totalPages, goToPage } = usePagination(filtered, 6);

  return (
    <PageTransition>
      <div className="pt-24 pb-24">
        <div className="container-custom">
          <SectionHeader
            eyebrow="Writing"
            title="Blog"
            subtitle="Thoughts on development, design, and building things for the web."
          />

          {/* Search + Filter */}
          <div className="mb-10 space-y-4">
            <SearchInput value={search} onChange={setSearch} placeholder="Search posts..." />
            <div className="flex flex-wrap gap-2">
              <Tag label="All" active={activeTag === "All"} onClick={() => setActiveTag("All")} />
              {allBlogTags.map((tag) => (
                <Tag
                  key={tag}
                  label={tag}
                  active={activeTag === tag}
                  onClick={() => setActiveTag(tag === activeTag ? "All" : tag)}
                />
              ))}
            </div>
          </div>

          <p className="text-sm font-mono mb-6" style={{ color: "var(--text-muted)" }}>
            {filtered.length} post{filtered.length !== 1 ? "s" : ""}
          </p>

          {filtered.length === 0 ? (
            <EmptyState icon="📝" title="No posts found" message="Try a different search or filter." />
          ) : (
            <LayoutGroup>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                layout
              >
                <AnimatePresence mode="popLayout">
                  {paginatedItems.map((post) => (
                    <motion.div
                      key={post.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{
                        opacity: { duration: 0.2 },
                        layout: { type: "spring", stiffness: 300, damping: 30 },
                      }}
                    >
                      <TiltCard>
                        <BlogCard post={post} />
                      </TiltCard>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </LayoutGroup>
          )}

          <Pagination currentPage={currentPage} totalPages={totalPages} goToPage={goToPage} />
        </div>
      </div>
    </PageTransition>
  );
}
