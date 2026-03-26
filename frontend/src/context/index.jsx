/**
 * CONTEXT PROVIDERS
 * React Context = shared state across the entire app (without prop drilling)
 *
 * 💡 LEARNING TIP: Context is like a global variable, but reactive.
 * In Flutter, this is similar to using InheritedWidget or Provider.
 * In Django, you don't need this — backend state lives in the database.
 */

import { createContext, useContext, useState, useEffect } from "react";

// ─── THEME CONTEXT (Dark/Light Mode) ──────────────────────────────────
const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  // Check if user already has a preference saved in localStorage
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    // Default to system preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // Apply/remove the "dark" class on <html> whenever isDark changes
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook — easier than calling useContext everywhere
export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
};

// ─── AUTH CONTEXT (Admin Login) ────────────────────────────────────────
// 💡 LEARNING TIP: Right now this uses localStorage (no real backend).
// Later, you'll replace this with a real API call to Django's JWT endpoint:
// POST /api/token/ with { username, password } → returns { access, refresh }
const AuthContext = createContext(null);

const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "admin123",
};

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("admin_auth") === "true";
  });

  const login = (username, password) => {
    if (
      username === ADMIN_CREDENTIALS.username &&
      password === ADMIN_CREDENTIALS.password
    ) {
      localStorage.setItem("admin_auth", "true");
      setIsAuthenticated(true);
      return { success: true };
    }
    return { success: false, error: "Invalid credentials" };
  };

  const logout = () => {
    localStorage.removeItem("admin_auth");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};

// ─── DATA CONTEXT (Admin CRUD) ─────────────────────────────────────────
// 💡 LEARNING TIP: This simulates a backend. Each function here will
// later be replaced with an API call. For example:
// deleteProject(id) → fetch('/api/projects/' + id, { method: 'DELETE' })
import { projects as initialProjects, blogs as initialBlogs } from "../data/data.js";

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [projects, setProjects] = useState(initialProjects);
  const [blogs, setBlogs] = useState(initialBlogs);

  // PROJECT CRUD
  const addProject = (project) => {
    const newProject = { ...project, id: Date.now().toString() };
    setProjects((prev) => [newProject, ...prev]);
    return newProject;
  };

  const updateProject = (id, updates) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const deleteProject = (id) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  // BLOG CRUD
  const addBlog = (blog) => {
    const newBlog = { ...blog, id: Date.now().toString() };
    setBlogs((prev) => [newBlog, ...prev]);
    return newBlog;
  };

  const updateBlog = (id, updates) => {
    setBlogs((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updates } : b))
    );
  };

  const deleteBlog = (id) => {
    setBlogs((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <DataContext.Provider
      value={{
        projects,
        blogs,
        addProject,
        updateProject,
        deleteProject,
        addBlog,
        updateBlog,
        deleteBlog,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used inside DataProvider");
  return ctx;
};
