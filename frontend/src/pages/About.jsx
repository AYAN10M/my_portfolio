/**
 * ABOUT PAGE - Animated skill bars, text reveal, magnetic buttons.
 */

import { motion } from "framer-motion";
import { ownerInfo, skills, experience } from "../data/data.js";
import { PageTransition, SectionHeader, FadeIn } from "../components/UI.jsx";
import MagneticWrap from "../components/MagneticWrap.jsx";
import TextReveal from "../components/TextReveal.jsx";
import { useInView } from "../hooks/index.js";
import { Link } from "react-router-dom";

/* ── Skill level mapping (simulated) ─────────────────────── */
const skillLevels = {
  "React": 95, "Next.js": 85, "Tailwind CSS": 92, "TypeScript": 82, "Framer Motion": 78,
  "Flutter": 88, "Dart": 85, "React Native": 70,
  "Python": 90, "Django": 88, "Django REST Framework": 85, "Node.js": 75, "PostgreSQL": 80,
  "Git": 92, "Docker": 72, "Figma": 78, "Vercel": 85, "AWS": 68,
};

function SkillBar({ name, level }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{name}</span>
        <span className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>{level}%</span>
      </div>
      <div className="skill-bar-track">
        <div
          className="skill-bar-fill"
          style={{ width: inView ? `${level}%` : "0%" }}
        />
      </div>
    </div>
  );
}

export default function About() {
  return (
    <PageTransition>
      <div className="pt-24 pb-24">
        <div className="container-custom">

          {/* ─── HERO BIO ──────────────────────────────────────── */}
          <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
            <FadeIn>
              <p className="font-mono text-xs tracking-widest uppercase mb-4"
                style={{
                  background: "linear-gradient(135deg, var(--accent), var(--glow-cyan))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >About Me</p>
              <h1 className="section-title mb-6">
                Designer who<br />
                <span className="italic font-display" style={{ color: "var(--text-muted)" }}>codes.</span>
              </h1>
              <div className="space-y-4 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {ownerInfo.bio.split("\n\n").map((para, i) => (
                  <p key={i}>{para.trim()}</p>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <MagneticWrap>
                  <Link to="/contact" className="btn-primary">Get in Touch →</Link>
                </MagneticWrap>
                <MagneticWrap>
                  <a href="#" className="btn-outline"
                    onClick={(e) => { e.preventDefault(); alert("Resume download would go here!"); }}
                  >Download CV</a>
                </MagneticWrap>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="relative group">
                <div className="w-full aspect-square max-w-sm mx-auto">
                  <div
                    className="absolute inset-2 rounded-3xl rotate-3 transition-transform duration-500 group-hover:rotate-6"
                    style={{
                      background: "linear-gradient(135deg, rgba(232,255,71,0.15), rgba(6,182,212,0.15))",
                      filter: "blur(20px)",
                    }}
                  />
                  <div
                    className="relative rounded-3xl overflow-hidden aspect-square"
                    style={{
                      background: "var(--glass-bg)",
                      border: "1px solid var(--glass-border)",
                    }}
                  >
                    {/* Image with parallax shift on hover */}
                    <img
                      src={"src/assets/profile_pic.png"}
                      alt={ownerInfo.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 glass-glow rounded-2xl p-4"
                  style={{ boxShadow: "0 8px 32px var(--glass-shadow)" }}
                >
                  <p className="text-xs font-mono mb-1" style={{ color: "var(--text-muted)" }}>Based in</p>
                  <p className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>📍 {ownerInfo.location}</p>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* ─── SKILLS (animated bars) ─────────────────────────── */}
          <section className="mb-24">
            <SectionHeader eyebrow="Expertise" title="Skills" subtitle="Technologies I work with on a daily basis." />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {skills.map((group, i) => (
                <FadeIn key={group.category} delay={i * 0.1}>
                  <div className="glass-glow rounded-2xl p-6 h-full">
                    <p className="font-mono text-xs tracking-widest uppercase mb-5"
                      style={{
                        background: "linear-gradient(135deg, var(--accent), var(--glow-cyan))",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >{group.category}</p>
                    <div className="space-y-3">
                      {group.items.map((skill) => (
                        <SkillBar
                          key={skill}
                          name={skill}
                          level={skillLevels[skill] || 70}
                        />
                      ))}
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </section>

          {/* ─── EXPERIENCE ────────────────────────────────────── */}
          <section className="mb-24">
            <SectionHeader eyebrow="Journey" title="Experience" />
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px hidden md:block"
                style={{
                  background: "linear-gradient(to bottom, var(--accent), var(--glow-cyan), transparent)",
                  boxShadow: "0 0 8px rgba(232,255,71,0.2)",
                }}
              />
              <div className="space-y-8">
                {experience.map((job, i) => (
                  <FadeIn key={i} delay={i * 0.1}>
                    <div className="md:pl-16 relative">
                      <div className="hidden md:block absolute left-2.5 top-6 w-3 h-3 rounded-full"
                        style={{
                          background: "var(--accent)",
                          boxShadow: "0 0 12px rgba(232,255,71,0.5), 0 0 24px rgba(232,255,71,0.2)",
                          border: "2px solid var(--bg-base)",
                        }}
                      />
                      <div className="glass-glow rounded-2xl p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                          <div>
                            <h3 className="font-semibold" style={{ color: "var(--text-primary)" }}>{job.role}</h3>
                            <p className="text-sm font-medium text-accent">{job.company}</p>
                          </div>
                          <span className="font-mono text-xs px-3 py-1 rounded-full whitespace-nowrap"
                            style={{
                              color: "var(--text-muted)",
                              background: "var(--bg-surface)",
                              border: "1px solid var(--glass-border)",
                            }}
                          >{job.period}</span>
                        </div>
                        <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{job.description}</p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>

          {/* ─── FUN FACTS ─────────────────────────────────────── */}
          <section>
            <SectionHeader eyebrow="Outside Code" title="A bit more about me" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { emoji: "☕", label: "Coffee per day", value: "3–4 cups" },
                { emoji: "📚", label: "Books read this year", value: "12" },
                { emoji: "🎸", label: "Hobby", value: "Amateur guitarist" },
              ].map((item, i) => (
                <FadeIn key={item.label} delay={i * 0.1}>
                  <div className="glass-glow rounded-2xl p-6 text-center">
                    <p className="text-4xl mb-3">{item.emoji}</p>
                    <p className="font-semibold" style={{ color: "var(--text-primary)" }}>{item.value}</p>
                    <p className="text-xs font-mono mt-1" style={{ color: "var(--text-muted)" }}>{item.label}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </section>

        </div>
      </div>
    </PageTransition>
  );
}
