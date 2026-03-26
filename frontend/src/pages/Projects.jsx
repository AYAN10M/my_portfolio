/**
 * PROJECTS PAGE — Animated layout transitions when filtering.
 */

import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { useData } from "../context/index.jsx";
import { allProjectTags } from "../data/data.js";
import { useDebounce, usePagination } from "../hooks/index.js";
import ProjectCard from "../components/ProjectCard.jsx";
import TiltCard from "../components/TiltCard.jsx";
import {
  PageTransition, SectionHeader, SearchInput, Tag,
  Pagination, EmptyState, FadeIn
} from "../components/UI.jsx";

export default function Projects() {
  const { projects } = useData();
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState("All");
  const debouncedSearch = useDebounce(search);

  const filtered = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      p.shortDesc.toLowerCase().includes(debouncedSearch.toLowerCase());
    const matchesTag = activeTag === "All" || p.tags.includes(activeTag);
    return matchesSearch && matchesTag;
  });

  const { paginatedItems, currentPage, totalPages, goToPage } = usePagination(filtered, 6);

  return (
    <PageTransition>
      <div className="pt-24 pb-24">
        <div className="container-custom">
          <SectionHeader
            eyebrow="My Work"
            title="Projects"
            subtitle="A collection of things I've built — from web apps to mobile experiences."
          />

          {/* Search + Filter Bar */}
          <div className="mb-10 space-y-4">
            <SearchInput value={search} onChange={setSearch} placeholder="Search projects..." />
            <div className="flex flex-wrap gap-2">
              <Tag label="All" active={activeTag === "All"} onClick={() => setActiveTag("All")} />
              {allProjectTags.map((tag) => (
                <Tag
                  key={tag}
                  label={tag}
                  active={activeTag === tag}
                  onClick={() => setActiveTag(tag === activeTag ? "All" : tag)}
                />
              ))}
            </div>
          </div>

          {/* Results Count */}
          <p className="text-sm font-mono mb-6" style={{ color: "var(--text-muted)" }}>
            {filtered.length} project{filtered.length !== 1 ? "s" : ""}
            {activeTag !== "All" && ` tagged "${activeTag}"`}
            {debouncedSearch && ` matching "${debouncedSearch}"`}
          </p>

          {/* Grid with layout animation */}
          {filtered.length === 0 ? (
            <EmptyState
              icon="🚀"
              title="No projects found"
              message="Try a different search term or remove the active filter."
            />
          ) : (
            <LayoutGroup>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                layout
              >
                <AnimatePresence mode="popLayout">
                  {paginatedItems.map((project) => (
                    <motion.div
                      key={project.id}
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
                        <ProjectCard project={project} />
                      </TiltCard>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </LayoutGroup>
          )}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            goToPage={goToPage}
          />
        </div>
      </div>
    </PageTransition>
  );
}
