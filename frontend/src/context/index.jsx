/**
 * CONTEXT PROVIDERS
 * React Context = shared state across the entire app (without prop drilling)
 *
 * AuthProvider — uses Django JWT for real authentication
 * DataProvider — fetches projects/blogs from the Django REST API
 * ThemeProvider — dark/light mode toggle
 */

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  getAccessToken,
  getRefreshToken,
  setTokens,
  clearTokens,
  keysToCamel,
} from "../api/client.js";
import {
  fetchProjects as apiFetchProjects,
  createProject as apiCreateProject,
  updateProject as apiUpdateProject,
  deleteProject as apiDeleteProject,
} from "../api/projects.js";
import {
  fetchBlogs as apiFetchBlogs,
  createBlog as apiCreateBlog,
  updateBlog as apiUpdateBlog,
  deleteBlog as apiDeleteBlog,
} from "../api/blogs.js";

// ─── THEME CONTEXT (Dark/Light Mode) ──────────────────────────────────
const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

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

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
};

// ─── AUTH CONTEXT (Django JWT Authentication) ──────────────────────────
const AuthContext = createContext(null);

const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!getAccessToken();
  });
  const [authLoading, setAuthLoading] = useState(false);

  // On mount, verify the token is still valid by trying to refresh
  useEffect(() => {
    const verifyToken = async () => {
      const refresh = getRefreshToken();
      if (!refresh) return;

      try {
        const res = await fetch(`${API_BASE}/api/token/refresh/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refresh }),
        });

        if (res.ok) {
          const data = await res.json();
          setTokens(data.access, data.refresh || refresh);
          setIsAuthenticated(true);
        } else {
          clearTokens();
          setIsAuthenticated(false);
        }
      } catch {
        // Network error — keep existing state
      }
    };

    verifyToken();
  }, []);

  const login = async (username, password) => {
    setAuthLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/token/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        const data = await res.json();
        setTokens(data.access, data.refresh);
        setIsAuthenticated(true);
        return { success: true };
      } else {
        const err = await res.json().catch(() => ({}));
        return {
          success: false,
          error: err.detail || "Invalid credentials",
        };
      }
    } catch (e) {
      return {
        success: false,
        error: "Network error. Is the backend running?",
      };
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = () => {
    clearTokens();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};

// ─── DATA CONTEXT (API-backed CRUD) ────────────────────────────────────
const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [projects, setProjects] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all data on mount
  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [projectsData, blogsData] = await Promise.all([
        apiFetchProjects(),
        apiFetchBlogs(),
      ]);
      setProjects(projectsData);
      setBlogs(blogsData);
    } catch (e) {
      console.error("Failed to load data:", e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // PROJECT CRUD
  const addProject = async (project) => {
    try {
      const created = await apiCreateProject(project);
      setProjects((prev) => [created, ...prev]);
      return created;
    } catch (e) {
      console.error("Failed to create project:", e);
      throw e;
    }
  };

  const updateProject = async (slug, updates) => {
    try {
      const updated = await apiUpdateProject(slug, updates);
      setProjects((prev) =>
        prev.map((p) => (p.slug === slug ? updated : p))
      );
      return updated;
    } catch (e) {
      console.error("Failed to update project:", e);
      throw e;
    }
  };

  const deleteProject = async (slug) => {
    try {
      await apiDeleteProject(slug);
      setProjects((prev) => prev.filter((p) => p.slug !== slug));
    } catch (e) {
      console.error("Failed to delete project:", e);
      throw e;
    }
  };

  // BLOG CRUD
  const addBlog = async (blog) => {
    try {
      const created = await apiCreateBlog(blog);
      setBlogs((prev) => [created, ...prev]);
      return created;
    } catch (e) {
      console.error("Failed to create blog:", e);
      throw e;
    }
  };

  const updateBlog = async (slug, updates) => {
    try {
      const updated = await apiUpdateBlog(slug, updates);
      setBlogs((prev) =>
        prev.map((b) => (b.slug === slug ? updated : b))
      );
      return updated;
    } catch (e) {
      console.error("Failed to update blog:", e);
      throw e;
    }
  };

  const deleteBlog = async (slug) => {
    try {
      await apiDeleteBlog(slug);
      setBlogs((prev) => prev.filter((b) => b.slug !== slug));
    } catch (e) {
      console.error("Failed to delete blog:", e);
      throw e;
    }
  };

  return (
    <DataContext.Provider
      value={{
        projects,
        blogs,
        loading,
        error,
        addProject,
        updateProject,
        deleteProject,
        addBlog,
        updateBlog,
        deleteBlog,
        refreshData: loadData,
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
