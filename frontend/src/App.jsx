/**
 * APP.JSX - ROOT COMPONENT
 * Lazy-loaded routes, AnimatePresence transitions, full accessibility & mobile support.
 */

import { useState, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider, AuthProvider, DataProvider } from "./context/index.jsx";
import Navbar from "./components/Navbar.jsx";
import { Footer, CustomCursor } from "./components/Footer.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ParallaxBackground from "./components/ParallaxBackground.jsx";
import SplashScreen from "./components/SplashScreen.jsx";
import ScrollProgress from "./components/ScrollProgress.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import RouteScrollReset from "./components/RouteScrollReset.jsx";
import MobileBottomNav from "./components/MobileBottomNav.jsx";

// ─── Lazy-loaded pages ─────────────────────────────
const Home = lazy(() => import("./pages/Home.jsx"));
const Projects = lazy(() => import("./pages/Projects.jsx"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail.jsx"));
const Blog = lazy(() => import("./pages/Blog.jsx"));
const BlogDetail = lazy(() => import("./pages/BlogDetail.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));
const AdminLogin = lazy(() => import("./pages/admin/Login.jsx"));
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout.jsx"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard.jsx"));
const AdminProjects = lazy(() => import("./pages/admin/AdminProjects.jsx"));
const AdminBlogs = lazy(() => import("./pages/admin/AdminBlogs.jsx"));

// ─── Loading fallback ──────────────────────────────
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div
          className="w-8 h-8 rounded-full animate-spin"
          style={{
            border: "2px solid var(--glass-border)",
            borderTopColor: "var(--accent)",
          }}
        />
        <p className="text-sm font-mono" style={{ color: "var(--text-muted)" }}>
          Loading...
        </p>
      </div>
    </div>
  );
}

function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      <main id="main-content" className="relative" style={{ zIndex: 1 }}>
        {children}
      </main>
      <Footer />
      <MobileBottomNav />
    </>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<PageLoader />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/projects" element={<PublicLayout><Projects /></PublicLayout>} />
          <Route path="/projects/:slug" element={<PublicLayout><ProjectDetail /></PublicLayout>} />
          <Route path="/blog" element={<PublicLayout><Blog /></PublicLayout>} />
          <Route path="/blog/:slug" element={<PublicLayout><BlogDetail /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="projects" element={<AdminProjects />} />
            <Route path="blogs" element={<AdminBlogs />} />
          </Route>
          <Route path="*" element={
            <PublicLayout>
              <div className="min-h-screen flex flex-col items-center justify-center text-center pt-20">
                <p className="font-display text-9xl font-black" style={{ color: "var(--bg-surface-hover)" }}>404</p>
                <h2 className="text-2xl font-semibold -mt-8 mb-4" style={{ color: "var(--text-primary)" }}>Page not found</h2>
                <a href="/" className="btn-primary">Go Home →</a>
              </div>
            </PublicLayout>
          } />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

// Only render portfolio visual chrome on public (non-admin) routes
function PublicChrome() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  if (isAdmin) return null;

  return (
    <>
      <ParallaxBackground />
      <ScrollProgress />
      <CustomCursor />
      <ScrollToTop />
    </>
  );
}

export default function App() {
  const [splashDone, setSplashDone] = useState(false);

  return (
    <ThemeProvider>
      <AuthProvider>
        <DataProvider>
          {!splashDone && <SplashScreen onComplete={() => setSplashDone(true)} />}

          <BrowserRouter>
            {/* Skip to content — accessibility */}
            <a href="#main-content" className="skip-to-content">
              Skip to content
            </a>

            <PublicChrome />
            <RouteScrollReset />

            <AnimatedRoutes />
          </BrowserRouter>
        </DataProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
