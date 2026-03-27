/**
 * ABOUT PAGE - Skills as tags, education, certifications, achievements, interests.
 */

import { motion } from "framer-motion";
import { ownerInfo, skills, experience, education, certifications, achievements } from "../data/data.js";
import { PageTransition, SectionHeader, FadeIn } from "../components/UI.jsx";
import MagneticWrap from "../components/MagneticWrap.jsx";
import TextReveal from "../components/TextReveal.jsx";
import { useInView } from "../hooks/index.js";
import { Link } from "react-router-dom";
import LeetCodeStats from "../components/LeetCodeStats.jsx";
import CodeforcesStats from "../components/CodeforcesStats.jsx";

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
                Developer who<br />
                <span className="italic font-display" style={{ color: "var(--text-muted)" }}>builds.</span>
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
                    <img
                      src={"/profile_pic.png"}
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

          {/* ─── EDUCATION ──────────────────────────────────────── */}
          <section className="mb-24">
            <SectionHeader eyebrow="Academic" title="Education" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {education.map((edu, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="glass-glow rounded-2xl p-6 h-full">
                    <p className="font-mono text-xs tracking-widest uppercase mb-3"
                      style={{
                        background: "linear-gradient(135deg, var(--accent), var(--glow-cyan))",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >{edu.period}</p>
                    <h3 className="font-semibold mb-1" style={{ color: "var(--text-primary)" }}>{edu.degree}</h3>
                    <p className="text-sm mb-3" style={{ color: "var(--text-secondary)" }}>{edu.institution}</p>
                    <span className="inline-block font-mono text-xs px-3 py-1 rounded-full"
                      style={{
                        color: "var(--accent)",
                        background: "var(--bg-surface)",
                        border: "1px solid var(--glass-border)",
                      }}
                    >{edu.grade}</span>
                  </div>
                </FadeIn>
              ))}
            </div>
          </section>

          {/* ─── DSA / COMPETITIVE PROGRAMMING ──────────────── */}
          <section className="mb-24">
            <SectionHeader eyebrow="Problem Solving" title="DSA & Competitive" subtitle="Sharpening algorithmic thinking one problem at a time." />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <FadeIn>
                <LeetCodeStats />
              </FadeIn>
              <FadeIn delay={0.15}>
                <CodeforcesStats />
              </FadeIn>
            </div>
          </section>

          {/* ─── SKILLS (tag cloud — no percentages) ──────────── */}
          <section className="mb-24">
            <SectionHeader eyebrow="Expertise" title="Skills" subtitle="Technologies I work with on a daily basis." />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((skill) => (
                        <span
                          key={skill}
                          className="tag"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </section>

          {/* ─── EXPERIENCE / PROJECTS ─────────────────────────── */}
          <section className="mb-24">
            <SectionHeader eyebrow="Journey" title="Projects & Experience" />
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

          {/* ─── CERTIFICATIONS & ACHIEVEMENTS ──────────────────── */}
          <section className="mb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Certifications */}
              <FadeIn>
                <div className="glass-glow rounded-2xl p-6 h-full">
                  <p className="font-mono text-xs tracking-widest uppercase mb-5"
                    style={{
                      background: "linear-gradient(135deg, var(--accent), var(--glow-cyan))",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >Certifications</p>
                  <div className="space-y-4">
                    {certifications.map((cert, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="text-accent text-lg mt-0.5">◈</span>
                        <div>
                          <p className="font-medium text-sm" style={{ color: "var(--text-primary)" }}>{cert.title}</p>
                          <p className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>{cert.issuer}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              {/* Achievements */}
              <FadeIn delay={0.1}>
                <div className="glass-glow rounded-2xl p-6 h-full">
                  <p className="font-mono text-xs tracking-widest uppercase mb-5"
                    style={{
                      background: "linear-gradient(135deg, var(--accent), var(--glow-purple))",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >Achievements</p>
                  <div className="space-y-4">
                    {achievements.map((ach, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="text-accent text-lg mt-0.5">🏆</span>
                        <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{ach}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>
          </section>

          {/* ─── BEYOND CODE (Personal Interests) ─────────────── */}
          <section>
            <SectionHeader eyebrow="Beyond Code" title="A bit more about me" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  emoji: "⚽",
                  label: "Football Fanatic",
                  value: "Visca el Barça!",
                  detail: "Huge FC Barcelona fan and Messi loyalist. La Pulga is the GOAT, no debate.",
                },
                {
                  emoji: "🎌",
                  label: "Anime Enthusiast",
                  value: "94+ Anime Watched",
                  detail: "AoT, Naruto, FMA:B, Death Note — all 10/10. Currently watching Frieren S2.",
                  link: "https://myanimelist.net/animelist/AYAN10M",
                },
                {
                  emoji: "💻",
                  label: "Builder at Heart",
                  value: "Full Stack Dev",
                  detail: "From Flutter apps to Django APIs — I love turning ideas into working products.",
                },
              ].map((item, i) => (
                <FadeIn key={item.label} delay={i * 0.1}>
                  <div className="glass-glow rounded-2xl p-6 text-center h-full flex flex-col">
                    <p className="text-4xl mb-3">{item.emoji}</p>
                    <p className="font-semibold mb-1" style={{ color: "var(--text-primary)" }}>{item.value}</p>
                    <p className="text-xs font-mono mb-2" style={{ color: "var(--text-muted)" }}>{item.label}</p>
                    <p className="text-xs leading-relaxed mt-auto" style={{ color: "var(--text-secondary)" }}>{item.detail}</p>
                    {item.link && (
                      <a href={item.link} target="_blank" rel="noreferrer"
                        className="text-xs text-accent hover:underline mt-2 font-mono"
                      >MyAnimeList ↗</a>
                    )}
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
