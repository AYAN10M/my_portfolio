/**
 * CODEFORCES STATS COMPONENT
 * Fetches live stats from Codeforces public API.
 * Shows rating, rank, contest history with a mini chart.
 */

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const CF_USERNAME = "AYAN_HALDAR";

// Rank color mapping (official CF colors)
const RANK_COLORS = {
  newbie: "#808080",
  pupil: "#008000",
  specialist: "#03a89e",
  expert: "#0000ff",
  "candidate master": "#aa00aa",
  master: "#ff8c00",
  "international master": "#ff8c00",
  grandmaster: "#ff0000",
  "international grandmaster": "#ff0000",
  "legendary grandmaster": "#ff0000",
};

/* ── Mini rating chart ──────────────────────────────────── */
function RatingChart({ history }) {
  const svgRef = useRef(null);
  if (!history || history.length === 0) return null;

  const w = 280, h = 80, pad = 4;
  const ratings = history.map((r) => r.newRating);
  const minR = Math.min(...ratings) - 50;
  const maxR = Math.max(...ratings) + 50;
  const rangeR = maxR - minR || 1;

  const points = ratings.map((r, i) => {
    const x = pad + (i / Math.max(ratings.length - 1, 1)) * (w - 2 * pad);
    const y = h - pad - ((r - minR) / rangeR) * (h - 2 * pad);
    return { x, y, rating: r };
  });

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${h} L ${points[0].x} ${h} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} className="block">
      {/* Area fill */}
      <defs>
        <linearGradient id="cf-gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={areaPath}
        fill="url(#cf-gradient)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      />
      {/* Line */}
      <motion.path
        d={linePath}
        fill="none"
        stroke="var(--accent)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
      {/* Dots */}
      {points.map((p, i) => (
        <motion.circle
          key={i}
          cx={p.x}
          cy={p.y}
          r="3"
          fill="var(--bg-base)"
          stroke="var(--accent)"
          strokeWidth="1.5"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 + i * 0.1, duration: 0.3 }}
        />
      ))}
    </svg>
  );
}

export default function CodeforcesStats() {
  const [info, setInfo] = useState(null);
  const [history, setHistory] = useState([]);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    // Fetch user info
    fetch(`https://codeforces.com/api/user.info?handles=${CF_USERNAME}`, {
      signal: controller.signal,
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.status === "OK" && data.result?.[0]) {
          setInfo(data.result[0]);
          setLive(true);
        }
      })
      .catch(() => {});

    // Fetch rating history
    fetch(`https://codeforces.com/api/user.rating?handle=${CF_USERNAME}`, {
      signal: controller.signal,
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.status === "OK" && data.result) {
          setHistory(data.result);
        }
      })
      .catch(() => {});

    return () => controller.abort();
  }, []);

  // Fallback data
  const rating = info?.rating ?? 798;
  const maxRating = info?.maxRating ?? 869;
  const rank = info?.rank ?? "newbie";
  const maxRank = info?.maxRank ?? "newbie";
  const contests = history.length || 7;
  const rankColor = RANK_COLORS[rank] || "#808080";

  return (
    <div className="glass-glow rounded-2xl p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "rgba(26, 115, 232, 0.15)" }}
          >
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path fill="#F44336" d="M12 2L14.2 8.8H21.6L15.7 13.2L17.9 20L12 15.6L6.1 20L8.3 13.2L2.4 8.8H9.8Z" />
            </svg>
          </div>
          <div>
            <h3
              className="font-semibold text-sm"
              style={{ color: "var(--text-primary)" }}
            >
              Codeforces
            </h3>
            <a
              href={`https://codeforces.com/profile/${CF_USERNAME}`}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-mono hover:text-accent transition-colors"
              style={{ color: "var(--text-muted)" }}
            >
              @{CF_USERNAME} ↗
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

      {/* Rating display */}
      <div className="text-center mb-5">
        <p
          className="font-display text-5xl font-black"
          style={{ color: rankColor }}
        >
          {rating}
        </p>
        <p className="text-xs font-mono mt-1" style={{ color: "var(--text-muted)" }}>
          Current Rating
        </p>
      </div>

      {/* Rank */}
      <div className="flex justify-center mb-5">
        <span
          className="text-xs font-bold uppercase px-3 py-1 rounded-full"
          style={{
            color: rankColor,
            background: `${rankColor}18`,
            border: `1px solid ${rankColor}30`,
          }}
        >
          {rank}
        </span>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: "Max Rating", value: maxRating },
          { label: "Contests", value: contests },
          { label: "Max Rank", value: maxRank },
        ].map((s) => (
          <div
            key={s.label}
            className="text-center rounded-xl p-2"
            style={{ background: "var(--bg-surface)" }}
          >
            <p
              className="font-semibold text-sm capitalize"
              style={{ color: "var(--text-primary)" }}
            >
              {s.value}
            </p>
            <p
              className="text-[10px] font-mono"
              style={{ color: "var(--text-muted)" }}
            >
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* Rating chart */}
      <div>
        <p
          className="font-mono text-xs tracking-widest uppercase mb-3"
          style={{
            background: "linear-gradient(135deg, var(--accent), var(--glow-cyan))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Rating History
        </p>
        <RatingChart history={history.length ? history : [
          { newRating: 370 }, { newRating: 607 }, { newRating: 774 },
          { newRating: 869 }, { newRating: 864 }, { newRating: 856 }, { newRating: 798 },
        ]} />
      </div>
    </div>
  );
}
