/**
 * ADMIN DASHBOARD
 * Overview stats and quick access to recent content.
 */

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useData } from "../../context/index.jsx";

function StatCard({ label, value, icon, color, linkTo }) {
  return (
    <Link to={linkTo}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all cursor-pointer"
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 font-mono mb-1">{label}</p>
            <p className="text-4xl font-display font-black text-zinc-900 dark:text-white">{value}</p>
          </div>
          <span className={`text-2xl w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
            {icon}
          </span>
        </div>
        <p className="text-xs text-zinc-400 mt-3">Click to manage →</p>
      </motion.div>
    </Link>
  );
}

export default function Dashboard() {
  const { projects, blogs } = useData();
  const publishedBlogs = blogs.filter((b) => b.published).length;
  const featuredProjects = projects.filter((p) => p.featured).length;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-10">
        <p className="font-mono text-xs text-zinc-400 uppercase tracking-widest mb-1">Admin Panel</p>
        <h1 className="text-3xl font-display font-black text-zinc-900 dark:text-white">Dashboard</h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">
          Welcome back. Here's an overview of your content.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatCard
          label="Total Projects"
          value={projects.length}
          icon="◈"
          color="bg-blue-50 dark:bg-blue-900/20 text-blue-500"
          linkTo="/admin/projects"
        />
        <StatCard
          label="Featured Projects"
          value={featuredProjects}
          icon="★"
          color="bg-accent/10 text-zinc-700 dark:text-zinc-300"
          linkTo="/admin/projects"
        />
        <StatCard
          label="Blog Posts"
          value={blogs.length}
          icon="✎"
          color="bg-purple-50 dark:bg-purple-900/20 text-purple-500"
          linkTo="/admin/blogs"
        />
        <StatCard
          label="Published"
          value={publishedBlogs}
          icon="◉"
          color="bg-green-50 dark:bg-green-900/20 text-green-500"
          linkTo="/admin/blogs"
        />
      </div>

      {/* Recent Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-zinc-900 dark:text-white">Recent Projects</h2>
            <Link to="/admin/projects" className="text-xs font-mono text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300">
              Manage →
            </Link>
          </div>
          <div className="space-y-3">
            {projects.slice(0, 4).map((p) => (
              <div key={p.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={p.coverImage} alt={p.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-zinc-900 dark:text-white truncate">{p.title}</p>
                  <p className="text-xs text-zinc-400 font-mono">{p.year}</p>
                </div>
                {p.featured && (
                  <span className="text-xs bg-accent/20 text-zinc-700 dark:text-zinc-300 px-2 py-0.5 rounded-full font-mono flex-shrink-0">
                    featured
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Recent Blogs */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-zinc-900 dark:text-white">Blog Posts</h2>
            <Link to="/admin/blogs" className="text-xs font-mono text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300">
              Manage →
            </Link>
          </div>
          <div className="space-y-3">
            {blogs.slice(0, 4).map((b) => (
              <div key={b.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={b.coverImage} alt={b.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-zinc-900 dark:text-white truncate">{b.title}</p>
                  <p className="text-xs text-zinc-400 font-mono">{b.readTime}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-mono flex-shrink-0 ${
                  b.published
                    ? "bg-green-50 dark:bg-green-900/20 text-green-600"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400"
                }`}>
                  {b.published ? "live" : "draft"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6">
        <h2 className="font-semibold text-zinc-900 dark:text-white mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link to="/admin/projects" className="btn-primary text-sm">
            + Add Project
          </Link>
          <Link to="/admin/blogs" className="btn-outline text-sm">
            + Write Post
          </Link>
          <Link to="/" target="_blank" className="btn-outline text-sm">
            ↗ View Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}
