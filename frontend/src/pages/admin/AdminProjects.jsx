/**
 * ADMIN PROJECTS PAGE
 * Full CRUD interface: list, add, edit, delete projects.
 *
 * 💡 LEARNING TIP: Each action here maps to a DRF API call:
 * - List:   GET    /api/projects/
 * - Add:    POST   /api/projects/
 * - Edit:   PUT    /api/projects/{id}/
 * - Delete: DELETE /api/projects/{id}/
 *
 * In Flutter, you'd use a similar pattern with http/dio package.
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useData } from "../../context/index.jsx";

// ─── PROJECT FORM ─────────────────────────────────────────────────────
// Reused for both Add and Edit
function ProjectForm({ initial = {}, onSave, onCancel }) {
  const [form, setForm] = useState({
    title: initial.title || "",
    slug: initial.slug || "",
    shortDesc: initial.shortDesc || "",
    description: initial.description || "",
    coverImage: initial.coverImage || "",
    tags: initial.tags ? initial.tags.join(", ") : "",
    techStack: initial.techStack ? initial.techStack.join(", ") : "",
    liveUrl: initial.liveUrl || "",
    githubUrl: initial.githubUrl || "",
    featured: initial.featured || false,
    year: initial.year || new Date().getFullYear(),
  });
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(initial.coverImage || "");

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.shortDesc.trim()) e.shortDesc = "Short description is required";
    if (!form.tags.trim()) e.tags = "At least one tag is required";
    return e;
  };

  const handleChange = (field, value) => {
    setForm((p) => ({ ...p, [field]: value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: "" }));

    // Auto-generate slug from title
    if (field === "title") {
      setForm((p) => ({
        ...p,
        title: value,
        slug: value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
      }));
    }

    // Preview image URL
    if (field === "coverImage") setImagePreview(value);
  };

  const handleSubmit = () => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    onSave({
      ...form,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      techStack: form.techStack.split(",").map((t) => t.trim()).filter(Boolean),
      images: [form.coverImage].filter(Boolean),
      year: Number(form.year),
    });
  };

  const inputClass = (field) =>
    `w-full px-4 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 transition-all ${
      errors[field] ? "border-red-400" : "border-zinc-200 dark:border-zinc-700"
    }`;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">Title *</label>
          <input className={inputClass("title")} value={form.title} onChange={(e) => handleChange("title", e.target.value)} placeholder="My Project" />
          {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title}</p>}
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">Slug (auto)</label>
          <input className={inputClass("slug")} value={form.slug} onChange={(e) => handleChange("slug", e.target.value)} placeholder="my-project" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">Short Description *</label>
        <input className={inputClass("shortDesc")} value={form.shortDesc} onChange={(e) => handleChange("shortDesc", e.target.value)} placeholder="One line summary..." />
        {errors.shortDesc && <p className="text-red-400 text-xs mt-1">{errors.shortDesc}</p>}
      </div>

      <div>
        <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">Full Description (Markdown)</label>
        <textarea
          className={`${inputClass("description")} resize-none`}
          rows={5}
          value={form.description}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="## Features&#10;- Feature 1&#10;- Feature 2"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">Cover Image URL</label>
        <input className={inputClass("coverImage")} value={form.coverImage} onChange={(e) => handleChange("coverImage", e.target.value)} placeholder="https://..." />
        {/* Image Preview */}
        {imagePreview && (
          <div className="mt-2 rounded-xl overflow-hidden h-32 border border-zinc-200 dark:border-zinc-700">
            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" onError={() => setImagePreview("")} />
          </div>
        )}
        <p className="text-xs text-zinc-400 mt-1 font-mono">💡 Tip: Use unsplash.com URLs for testing</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">Tags * (comma-separated)</label>
          <input className={inputClass("tags")} value={form.tags} onChange={(e) => handleChange("tags", e.target.value)} placeholder="React, Django, Flutter" />
          {errors.tags && <p className="text-red-400 text-xs mt-1">{errors.tags}</p>}
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">Tech Stack (comma-separated)</label>
          <input className={inputClass("techStack")} value={form.techStack} onChange={(e) => handleChange("techStack", e.target.value)} placeholder="React 18, Tailwind CSS" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">Live URL</label>
          <input className={inputClass("liveUrl")} value={form.liveUrl} onChange={(e) => handleChange("liveUrl", e.target.value)} placeholder="https://..." />
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">GitHub URL</label>
          <input className={inputClass("githubUrl")} value={form.githubUrl} onChange={(e) => handleChange("githubUrl", e.target.value)} placeholder="https://github.com/..." />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div>
          <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">Year</label>
          <input type="number" className={`${inputClass("year")} w-28`} value={form.year} onChange={(e) => handleChange("year", e.target.value)} min="2000" max="2030" />
        </div>
        <div className="flex items-center gap-2 mt-4">
          <input
            type="checkbox"
            id="featured"
            checked={form.featured}
            onChange={(e) => handleChange("featured", e.target.checked)}
            className="w-4 h-4 accent-[#E8FF47]"
          />
          <label htmlFor="featured" className="text-sm text-zinc-700 dark:text-zinc-300">Featured project</label>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button onClick={handleSubmit} className="btn-primary text-sm">Save Project</button>
        <button onClick={onCancel} className="btn-outline text-sm">Cancel</button>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ────────────────────────────────────────────────────
export default function AdminProjects() {
  const { projects, addProject, updateProject, deleteProject } = useData();
  const [mode, setMode] = useState("list"); // "list" | "add" | "edit"
  const [editingProject, setEditingProject] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");

  const showSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const handleSave = (data) => {
    if (mode === "add") {
      addProject(data);
      showSuccess("Project added successfully!");
    } else {
      updateProject(editingProject.id, data);
      showSuccess("Project updated successfully!");
    }
    setMode("list");
    setEditingProject(null);
  };

  const handleDelete = (id) => {
    deleteProject(id);
    setDeleteConfirm(null);
    showSuccess("Project deleted.");
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="font-mono text-xs text-zinc-400 uppercase tracking-widest mb-1">Manage</p>
          <h1 className="text-3xl font-display font-black text-zinc-900 dark:text-white">Projects</h1>
        </div>
        {mode === "list" && (
          <button onClick={() => setMode("add")} className="btn-primary text-sm">
            + Add Project
          </button>
        )}
      </div>

      {/* Success Toast */}
      <AnimatePresence>
        {successMsg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 px-4 py-3 rounded-xl text-sm"
          >
            ✓ {successMsg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Form (Add / Edit) */}
      {(mode === "add" || mode === "edit") && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 mb-8">
          <h2 className="font-semibold text-zinc-900 dark:text-white mb-6">
            {mode === "add" ? "Add New Project" : `Edit: ${editingProject?.title}`}
          </h2>
          <ProjectForm
            initial={editingProject || {}}
            onSave={handleSave}
            onCancel={() => { setMode("list"); setEditingProject(null); }}
          />
        </div>
      )}

      {/* Projects Table */}
      {mode === "list" && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
            <p className="text-sm font-mono text-zinc-400">{projects.length} projects total</p>
          </div>

          {projects.length === 0 ? (
            <div className="text-center py-16 text-zinc-400">
              <p className="text-4xl mb-3">◈</p>
              <p className="font-medium">No projects yet</p>
              <button onClick={() => setMode("add")} className="btn-primary mt-4 text-sm">Add First Project</button>
            </div>
          ) : (
            <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {projects.map((project) => (
                <div key={project.id} className="flex items-center gap-4 px-6 py-4 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                  {/* Thumbnail */}
                  <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-zinc-100 dark:bg-zinc-800">
                    {project.coverImage && (
                      <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="font-medium text-zinc-900 dark:text-white text-sm truncate">{project.title}</p>
                      {project.featured && (
                        <span className="text-xs bg-accent/20 text-zinc-700 dark:text-zinc-300 px-1.5 py-0.5 rounded font-mono">★ featured</span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-xs text-zinc-400 font-mono">{tag}</span>
                      )).reduce((acc, el, i, arr) => i < arr.length - 1 ? [...acc, el, <span key={`sep-${i}`} className="text-zinc-300 dark:text-zinc-700">·</span>] : [...acc, el], [])}
                    </div>
                  </div>

                  {/* Year */}
                  <span className="text-xs font-mono text-zinc-400 hidden sm:block">{project.year}</span>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => { setEditingProject(project); setMode("edit"); window.scrollTo(0, 0); }}
                      className="text-xs px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-zinc-400 transition-all"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(project.id)}
                      className="text-xs px-3 py-1.5 rounded-lg border border-red-200 dark:border-red-800 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl"
            >
              <p className="text-3xl mb-3">🗑️</p>
              <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">Delete this project?</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">This action cannot be undone.</p>
              <div className="flex gap-3">
                <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 bg-red-500 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-red-600 transition-colors">
                  Delete
                </button>
                <button onClick={() => setDeleteConfirm(null)} className="flex-1 btn-outline text-sm justify-center">
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
