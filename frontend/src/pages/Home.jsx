/**
 * HOME PAGE - Premium glassmorphism with magnetic buttons, text reveal, tilt cards, animated counters.
 */

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ownerInfo } from "../data/data.js";
import { useData } from "../context/index.jsx";
import { PageTransition, FadeIn } from "../components/UI.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import BlogCard from "../components/BlogCard.jsx";
import TiltCard from "../components/TiltCard.jsx";
import MagneticWrap from "../components/MagneticWrap.jsx";
import TextReveal from "../components/TextReveal.jsx";
import { useCountUp, useInView } from "../hooks/index.js";

/* ── Animated stat card ──────────────────────────────────────────── */
function StatCard({ value, label }) {
  const [ref, inView] = useInView();
  const numericStr = value.replace(/[^0-9]/g, "");
  const suffix = value.replace(/[0-9]/g, "");
  const count = useCountUp(numericStr, 1500, inView);

  return (
    <div ref={ref} className="glass-glow rounded-2xl p-6 text-center">
      <p className="font-display text-4xl md:text-5xl font-black mb-1"
        style={{ color: "var(--text-primary)" }}
      >
        {inView ? `${count}${suffix}` : `0${suffix}`}
      </p>
      <p className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>{label}</p>
    </div>
  );
}

export default function Home() {
  const { projects, blogs } = useData();
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);
  const recentBlogs = blogs.filter((b) => b.published).slice(0, 3);

  return (
    <PageTransition>
      {/* ─── HERO ────────────────────────────────────────────── */}
      <section className="min-h-screen flex items-center pt-16 relative">
        <div className="container-custom py-24">
          <FadeIn>
            <div className="flex items-center gap-3 mb-8">
              <span className="w-8 h-0.5 bg-gradient-to-r from-accent to-glow-cyan" />
              <span className="font-mono text-xs tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>
                Available for work
              </span>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
            </div>
          </FadeIn>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-6xl md:text-8xl lg:text-9xl font-black leading-none tracking-tight mb-6"
          >
            {ownerInfo.name.split(" ").map((word, i) => (
              <span key={i} className="block">
                <span
                  style={
                    i === 0
                      ? {
                          background: `linear-gradient(135deg, var(--text-primary) 0%, var(--text-secondary) 100%)`,
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }
                      : {
                          background: "linear-gradient(135deg, var(--accent), var(--glow-cyan))",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }
                  }
                >
                  {word}
                </span>
                {i === 0 && <span className="text-accent glow-dot">.</span>}
              </span>
            ))}
          </motion.h1>

          <FadeIn delay={0.2}>
            <p className="text-xl md:text-2xl font-light mb-4 max-w-xl" style={{ color: "var(--text-secondary)" }}>
              {ownerInfo.role}
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="text-base mb-10 max-w-lg font-mono" style={{ color: "var(--text-muted)" }}>
              {ownerInfo.tagline}
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="flex flex-wrap items-center gap-4">
              <MagneticWrap>
                <Link to="/projects" className="btn-primary group">
                  See My Work
                  <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                </Link>
              </MagneticWrap>
              <MagneticWrap>
                <Link to="/contact" className="btn-outline">
                  Get in Touch
                </Link>
              </MagneticWrap>
            </div>
          </FadeIn>

          <FadeIn delay={0.5}>
            <div className="mt-12 flex flex-wrap gap-2">
              {["React", "Flutter", "Python", "Django", "Tailwind CSS"].map((tech) => (
                <span key={tech} className="tag">{tech}</span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── FEATURED PROJECTS (3D tilt) ────────────────────── */}
      <section className="py-24 relative">
        <div className="container-custom">
          <FadeIn>
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="font-mono text-xs tracking-widest uppercase mb-2"
                  style={{
                    background: "linear-gradient(135deg, var(--accent), var(--glow-cyan))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >Portfolio</p>
                <TextReveal text="Featured Work" className="section-title" />
              </div>
              <Link to="/projects" className="text-sm font-medium transition-colors hidden md:block"
                style={{ color: "var(--text-muted)" }}
              >
                All projects →
              </Link>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project, i) => (
              <FadeIn key={project.id} delay={i * 0.1}>
                <TiltCard>
                  <ProjectCard project={project} />
                </TiltCard>
              </FadeIn>
            ))}
          </div>

          <div className="mt-8 md:hidden text-center">
            <MagneticWrap>
              <Link to="/projects" className="btn-outline">All Projects →</Link>
            </MagneticWrap>
          </div>
        </div>
      </section>

      {/* ─── STATS (animated counters) ─────────────────────── */}
      <section className="py-20 relative">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "15+", label: "Projects Built" },
              { value: "3+", label: "Years Experience" },
              { value: "8+", label: "Blog Articles" },
              { value: "100%", label: "Remote Ready" },
            ].map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.1}>
                <StatCard value={stat.value} label={stat.label} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── RECENT BLOGS (3D tilt) ─────────────────────────── */}
      <section className="py-24 relative">
        <div className="container-custom">
          <FadeIn>
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="font-mono text-xs tracking-widest uppercase mb-2"
                  style={{
                    background: "linear-gradient(135deg, var(--accent), var(--glow-purple))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >Writing</p>
                <TextReveal text="Recent Posts" className="section-title" />
              </div>
              <Link to="/blog" className="text-sm font-medium transition-colors hidden md:block"
                style={{ color: "var(--text-muted)" }}
              >
                All posts →
              </Link>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentBlogs.map((post, i) => (
              <FadeIn key={post.id} delay={i * 0.1}>
                <TiltCard>
                  <BlogCard post={post} />
                </TiltCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA SECTION ──────────────────────────────────────── */}
      <section className="py-24 relative">
        <div className="container-custom text-center">
          <FadeIn>
            <p className="font-mono text-xs tracking-widest uppercase mb-4"
              style={{
                background: "linear-gradient(135deg, var(--accent), var(--glow-cyan))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >Let's Build Together</p>
            <TextReveal
              text="Have a project in mind?"
              className="font-display text-5xl lg:text-6xl font-black mb-6 max-w-2xl mx-auto leading-tight"
            />
            <p className="mb-8 max-w-md mx-auto" style={{ color: "var(--text-secondary)" }}>
              I'm currently available for freelance work and interesting collaborations.
            </p>
            <MagneticWrap>
              <Link to="/contact" className="btn-primary">
                Start a Conversation →
              </Link>
            </MagneticWrap>
          </FadeIn>
        </div>
      </section>
    </PageTransition>
  );
}
