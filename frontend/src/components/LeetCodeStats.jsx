/**
 * LEETCODE STATS COMPONENT
 * Fetches live stats from LeetCode via alfa-leetcode-api proxy.
 * Falls back to last-known data if the API is unavailable.
 */

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const LEETCODE_USERNAME = "ayan_haldar";
const API_URL = `https://alfa-leetcode-api.onrender.com/${LEETCODE_USERNAME}/solved`;

// Fallback data (scraped 2026-03-27)
const FALLBACK = {
  solvedProblem: 64,
  easySolved: 43,
  mediumSolved: 19,
  hardSolved: 2,
  totalEasy: 933,
  totalMedium: 2030,
  totalHard: 916,
  totalQuestions: 3879,
};

/* ── Circular progress ring ──────────────────────────────── */
function ProgressRing({ solved, total, color, size = 80, strokeWidth = 6 }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = total > 0 ? solved / total : 0;
  const offset = circumference * (1 - pct);

  return (
    <svg width={size} height={size} className="block mx-auto">
      {/* Track */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="var(--glass-border)"
        strokeWidth={strokeWidth}
      />
      {/* Progress */}
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
      />
      {/* Center text */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="central"
        fill="var(--text-primary)"
        fontFamily="var(--font-display)"
        fontWeight="800"
        fontSize={size * 0.22}
      >
        {solved}
      </text>
    </svg>
  );
}

export default function LeetCodeStats() {
  const [stats, setStats] = useState(FALLBACK);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    fetch(API_URL, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then((data) => {
        if (data && data.solvedProblem) {
          setStats({
            solvedProblem: data.solvedProblem,
            easySolved: data.easySolved,
            mediumSolved: data.mediumSolved,
            hardSolved: data.hardSolved,
            totalEasy: data.totalEasy || FALLBACK.totalEasy,
            totalMedium: data.totalMedium || FALLBACK.totalMedium,
            totalHard: data.totalHard || FALLBACK.totalHard,
            totalQuestions: data.totalQuestions || FALLBACK.totalQuestions,
          });
          setLive(true);
        }
      })
      .catch(() => {
        // Use fallback silently
      });

    return () => controller.abort();
  }, []);

  const difficulties = [
    {
      label: "Easy",
      solved: stats.easySolved,
      total: stats.totalEasy,
      color: "#00b8a3",
    },
    {
      label: "Medium",
      solved: stats.mediumSolved,
      total: stats.totalMedium,
      color: "#ffc01e",
    },
    {
      label: "Hard",
      solved: stats.hardSolved,
      total: stats.totalHard,
      color: "#ef4743",
    },
  ];

  return (
    <div className="glass-glow rounded-2xl p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "rgba(255, 161, 22, 0.15)" }}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="#FFA116">
              <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l.842.696a1.378 1.378 0 0 0 1.745-2.13l-.842-.697c-2.166-1.75-5.357-1.513-7.28.554l-.02.022z" />
              <path d="M19.779 5.71l-4.277-4.193c-2.248-2.165-5.852-2.133-8.063.074l-2.396 2.392a1.378 1.378 0 0 0 1.948 1.958l2.396-2.392a3.021 3.021 0 0 1 4.244 0l4.278 4.192a3.021 3.021 0 0 1 0 4.281l-3.946 3.946a3.026 3.026 0 0 1-4.163.118l-.038-.033-1.781-1.749a1.378 1.378 0 0 0-1.931 1.965l1.78 1.748c2.248 2.165 5.852 2.133 8.063-.074l3.946-3.946a5.804 5.804 0 0 0 0-8.287z" />
            </svg>
          </div>
          <div>
            <h3
              className="font-semibold text-sm"
              style={{ color: "var(--text-primary)" }}
            >
              LeetCode
            </h3>
            <a
              href={`https://leetcode.com/u/${LEETCODE_USERNAME}/`}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-mono hover:text-accent transition-colors"
              style={{ color: "var(--text-muted)" }}
            >
              @{LEETCODE_USERNAME} ↗
            </a>
          </div>
        </div>
        {live && (
          <span
            className="text-[10px] font-mono px-2 py-0.5 rounded-full"
            style={{
              color: "#00b8a3",
              background: "rgba(0, 184, 163, 0.1)",
              border: "1px solid rgba(0, 184, 163, 0.2)",
            }}
          >
            ● Live
          </span>
        )}
      </div>

      {/* Total solved — big ring */}
      <div className="text-center mb-6">
        <ProgressRing
          solved={stats.solvedProblem}
          total={stats.totalQuestions}
          color="var(--accent)"
          size={100}
          strokeWidth={7}
        />
        <p
          className="text-xs font-mono mt-2"
          style={{ color: "var(--text-muted)" }}
        >
          {stats.solvedProblem} / {stats.totalQuestions} solved
        </p>
      </div>

      {/* Difficulty breakdown */}
      <div className="grid grid-cols-3 gap-4">
        {difficulties.map((d) => (
          <div key={d.label} className="text-center">
            <ProgressRing
              solved={d.solved}
              total={d.total}
              color={d.color}
              size={64}
              strokeWidth={5}
            />
            <p
              className="text-xs font-medium mt-2"
              style={{ color: d.color }}
            >
              {d.label}
            </p>
            <p
              className="text-[10px] font-mono"
              style={{ color: "var(--text-muted)" }}
            >
              {d.solved}/{d.total}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
