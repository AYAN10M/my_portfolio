/**
 * PROJECT DETAIL PAGE - Theme-adaptive glassmorphism.
 */

import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useData } from "../context/index.jsx";
import { LazyImage, PageTransition, FadeIn } from "../components/UI.jsx";

export default function ProjectDetail() {
  const { slug } = useParams();
  const { projects } = useData();
  const navigate = useNavigate();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="pt-32 text-center">
        <p className="text-5xl mb-4">🤔</p>
        <h2 className="text-2xl font-semibold mb-4" style={{ color: "var(--text-primary)" }}>Project not found</h2>
        <button onClick={() => navigate("/projects")} className="btn-primary">Back to Projects</button>
      </div>
    );
  }

  const descLines = project.description.trim().split("\n");

  return (
    <PageTransition>
      <div className="pt-24 pb-24">
        <div className="container-custom max-w-4xl">
          <FadeIn>
            <Link to="/projects"
              className="inline-flex items-center gap-2 text-sm transition-colors mb-10 group"
              style={{ color: "var(--text-muted)" }}
            >
              <span className="group-hover:-translate-x-1 transition-transform">←</span>
              Back to Projects
            </Link>
          </FadeIn>

          <FadeIn>
            <div className="rounded-2xl overflow-hidden mb-10 h-72 md:h-96" style={{ border: "1px solid var(--glass-border)" }}>
              <LazyImage src={project.coverImage} alt={project.title} className="h-72 md:h-96 w-full" />
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="md:col-span-2">
              <FadeIn>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.map((tag) => (<span key={tag} className="tag">{tag}</span>))}
                </div>
                <h1 className="font-display text-4xl md:text-5xl font-black mb-4 leading-tight" style={{ color: "var(--text-primary)" }}>
                  {project.title}
                </h1>
                <p className="text-lg" style={{ color: "var(--text-secondary)" }}>{project.shortDesc}</p>
              </FadeIn>
            </div>

            <FadeIn delay={0.1}>
              <div className="glass-glow rounded-2xl p-6 space-y-4">
                <div>
                  <p className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: "var(--text-muted)" }}>Year</p>
                  <p className="font-medium" style={{ color: "var(--text-secondary)" }}>{project.year}</p>
                </div>
                <div>
                  <p className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: "var(--text-muted)" }}>Tech Stack</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="text-xs font-mono px-2 py-0.5 rounded"
                        style={{ color: "var(--text-secondary)", background: "var(--bg-surface)", border: "1px solid var(--glass-border)" }}
                      >{tech}</span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2 pt-2">
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn-primary text-sm justify-center">View Live →</a>
                  )}
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noreferrer" className="btn-outline text-sm justify-center">GitHub →</a>
                  )}
                </div>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.15}>
            <div className="prose prose-lg max-w-none">
              {descLines.map((line, i) => {
                if (line.startsWith("## ")) return <h2 key={i} className="font-display text-2xl font-bold mt-8 mb-3" style={{ color: "var(--text-primary)" }}>{line.slice(3)}</h2>;
                if (line.startsWith("- ")) return <li key={i} className="ml-4" style={{ color: "var(--text-secondary)" }}>{line.slice(2)}</li>;
                if (line.trim() === "") return <br key={i} />;
                return <p key={i} className="leading-relaxed" style={{ color: "var(--text-secondary)" }}>{line}</p>;
              })}
            </div>
          </FadeIn>

          {project.images.length > 1 && (
            <FadeIn delay={0.2}>
              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.images.slice(1).map((img, i) => (
                  <div key={i} className="rounded-xl overflow-hidden h-48" style={{ border: "1px solid var(--glass-border)" }}>
                    <LazyImage src={img} alt={`${project.title} screenshot ${i + 2}`} className="h-48 w-full" />
                  </div>
                ))}
              </div>
            </FadeIn>
          )}

          <div className="mt-16 pt-8" style={{ borderTop: "1px solid var(--glass-border)" }}>
            <Link to="/projects" className="btn-outline">← All Projects</Link>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
