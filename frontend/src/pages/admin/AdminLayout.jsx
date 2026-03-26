/**
 * ADMIN LAYOUT
 * The sidebar + main content shell for all admin pages.
 * Uses React Router's <Outlet /> to render the current admin page.
 */

import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/index.jsx";
import { useTheme } from "../../context/index.jsx";

const sidebarLinks = [
  { path: "/admin/dashboard", label: "Dashboard", icon: "▦" },
  { path: "/admin/projects", label: "Projects", icon: "◈" },
  { path: "/admin/blogs", label: "Blog Posts", icon: "✎" },
];

export default function AdminLayout() {
  const { logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen flex bg-zinc-50 dark:bg-zinc-950">
      {/* ─── SIDEBAR ──────────────────────────────────────── */}
      <aside className="w-60 flex-shrink-0 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 flex flex-col">
        {/* Brand */}
        <div className="h-16 flex items-center px-6 border-b border-zinc-200 dark:border-zinc-800">
          <p className="font-display font-black text-lg">
            Ayan<span className="text-accent">.</span>
          </p>
          <span className="ml-2 text-xs font-mono text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full">
            admin
          </span>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 p-4 space-y-1">
          {sidebarLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-zinc-900 dark:bg-accent text-white dark:text-zinc-900"
                    : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white"
                }`
              }
            >
              <span className="text-base">{link.icon}</span>
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Bottom Controls */}
        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 space-y-2">
          <button
            onClick={toggleTheme}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
          >
            <span>{isDark ? "☀️" : "🌙"}</span>
            {isDark ? "Light Mode" : "Dark Mode"}
          </button>
          <NavLink
            to="/"
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
          >
            <span>↗</span>
            View Portfolio
          </NavLink>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
          >
            <span>⎋</span>
            Logout
          </button>
        </div>
      </aside>

      {/* ─── MAIN CONTENT ─────────────────────────────────── */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
