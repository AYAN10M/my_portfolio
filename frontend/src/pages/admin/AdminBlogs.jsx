/**
 * ADMIN BLOGS PAGE
 * Full CRUD interface for blog posts with markdown content editor.
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useData } from "../../context/index.jsx";

function BlogForm({ initial = {}, onSave, onCancel }) {
  const [form, setForm] = useState({
    title: initial.title || "",
    slug: initial.slug || "",
    excerpt: initial.excerpt || "",
    content: initial.content || "",
    coverImage: initial.coverImage || "",
    tags: initial.tags ? initial.tags.join(", ") : "",
    readTime: initial.readTime || "5 min read",
    date: initial.date || new Date().toISOString().split("T")[0],
    published: initial.published !== undefined ? initial.published : false,
  });
  const [errors, setErrors] = useState({});
  const [previewMode, setPreviewMode] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.excerpt.trim()) e.excerpt = "Excerpt is required";
    if (!form.content.trim()) e.content = "Content is required";
    return e;
  };

  const handleChange = (field, value) => {
    setForm((p) => ({ ...p, [field]: value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: "" }));
    if (field === "title") {
      setForm((p) => ({
        ...p,
        title: value,
        slug: value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
      }));
    }
  };

  const handleSubmit = () => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    onSave({
      ...form,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
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
          <input className={inputClass("title")} value={form.title} onChange={(e) => handleChange("title", e.target.value)} placeholder="Post Title" />
          {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title}</p>}
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">Slug (auto)</label>
          <input className={inputClass("slug")} value={form.slug} onChange={(e) => handleChange("slug", e.target.value)} placeholder="post-slug" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">Excerpt *</label>
        <textarea
          className={`${inputClass("excerpt")} resize-none`}
          rows={2}
          value={form.excerpt}
          onChange={(e) => handleChange("excerpt", e.target.value)}
          placeholder="Short summary shown in the blog list..."
        />
        {errors.excerpt && <p className="text-red-400 text-xs mt-1">{errors.excerpt}</p>}
      </div>

      {/* Content Editor with Preview Toggle */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400">Content (Markdown) *</label>
          <button
            onClick={() => setPreviewMode((p) => !p)}
            className="text-xs text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300 font-mono px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-700 transition-colors"
          >
            {previewMode ? "← Edit" : "Preview →"}
          </button>
        </div>

        {previewMode ? (
          <div className="min-h-40 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-700 dark:text-zinc-300 font-mono whitespace-pre-wrap overflow-auto">
            {form.content || "Nothing to preview..."}
          </div>
        ) : (
          <textarea
            className={`${inputClass("content")} resize-none font-mono`}
            rows={10}
            value={form.content}
            onChange={(e) => handleChange("content", e.target.value)}
            placeholder="# Hello World&#10;&#10;Write your blog post in **markdown**..."
          />
        )}
        {errors.content && <p className="text-red-400 text-xs mt-1">{errors.content}</p>}
        <p className="text-xs text-zinc-400 mt-1 font-mono">
          💡 Supports: **bold**, *italic*, `code`, ```code blocks```, ## headings, - lists
        </p>
      </div>

      <div>
        <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">Cover Image URL</label>
        <input className={inputClass("coverImage")} value={form.coverImage} onChange={(e) => handleChange("coverImage", e.target.value)} placeholder="https://..." />
        {form.coverImage && (
          <div className="mt-2 rounded-xl overflow-hidden h-28 border border-zinc-200 dark:border-zinc-700">
            <img src={form.coverImage} alt="Preview" className="w-full h-full object-cover" onError={() => handleChange("coverImage", "")} />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">Tags (comma-separated)</label>
          <input className={inputClass("tags")} value={form.tags} onChange={(e) => handleChange("tags", e.target.value)} placeholder="React, Django" />
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">Read Time</label>
          <input className={inputClass("readTime")} value={form.readTime} onChange={(e) => handleChange("readTime", e.target.value)} placeholder="5 min read" />
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">Date</label>
          <input type="date" className={inputClass("date")} value={form.date} onChange={(e) => handleChange("date", e.target.value)} />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="published"
          checked={form.published}
          onChange={(e) => handleChange("published", e.target.checked)}
          className="w-4 h-4 accent-[#E8FF47]"
        />
        <label htmlFor="published" className="text-sm text-zinc-700 dark:text-zinc-300">
          Publish immediately (visible to public)
        </label>
      </div>

      <div className="flex gap-3 pt-2">
        <button onClick={handleSubmit} className="btn-primary text-sm">Save Post</button>
        <button onClick={onCancel} className="btn-outline text-sm">Cancel</button>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ────────────────────────────────────────────────────
export default function AdminBlogs() {
  const { blogs, addBlog, updateBlog, deleteBlog } = useData();
  const [mode, setMode] = useState("list");
  const [editingBlog, setEditingBlog] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");

  const showSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const handleSave = (data) => {
    if (mode === "add") {
      addBlog(data);
      showSuccess("Post created successfully!");
    } else {
      updateBlog(editingBlog.id, data);
      showSuccess("Post updated successfully!");
    }
    setMode("list");
    setEditingBlog(null);
  };

  const handleTogglePublish = (blog) => {
    updateBlog(blog.id, { published: !blog.published });
    showSuccess(blog.published ? "Post unpublished." : "Post published!");
  };

  const handleDelete = (id) => {
    deleteBlog(id);
    setDeleteConfirm(null);
    showSuccess("Post deleted.");
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="font-mono text-xs text-zinc-400 uppercase tracking-widest mb-1">Manage</p>
          <h1 className="text-3xl font-display font-black text-zinc-900 dark:text-white">Blog Posts</h1>
        </div>
        {mode === "list" && (
          <button onClick={() => setMode("add")} className="btn-primary text-sm">
            + Write Post
          </button>
        )}
      </div>

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

      {(mode === "add" || mode === "edit") && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 mb-8">
          <h2 className="font-semibold text-zinc-900 dark:text-white mb-6">
            {mode === "add" ? "New Blog Post" : `Edit: ${editingBlog?.title}`}
          </h2>
          <BlogForm
            initial={editingBlog || {}}
            onSave={handleSave}
            onCancel={() => { setMode("list"); setEditingBlog(null); }}
          />
        </div>
      )}

      {mode === "list" && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
            <p className="text-sm font-mono text-zinc-400">{blogs.length} total · {blogs.filter((b) => b.published).length} published</p>
          </div>

          {blogs.length === 0 ? (
            <div className="text-center py-16 text-zinc-400">
              <p className="text-4xl mb-3">✎</p>
              <p className="font-medium">No posts yet</p>
              <button onClick={() => setMode("add")} className="btn-primary mt-4 text-sm">Write First Post</button>
            </div>
          ) : (
            <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {blogs.map((blog) => (
                <div key={blog.id} className="flex items-center gap-4 px-6 py-4 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                  <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-zinc-100 dark:bg-zinc-800">
                    {blog.coverImage && <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-zinc-900 dark:text-white text-sm truncate mb-0.5">{blog.title}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-zinc-400">{blog.date}</span>
                      <span className="text-zinc-300 dark:text-zinc-700">·</span>
                      <span className="text-xs font-mono text-zinc-400">{blog.readTime}</span>
                    </div>
                  </div>

                  {/* Published Toggle */}
                  <button
                    onClick={() => handleTogglePublish(blog)}
                    className={`text-xs px-3 py-1.5 rounded-full font-mono transition-all ${
                      blog.published
                        ? "bg-green-50 dark:bg-green-900/20 text-green-600 border border-green-200 dark:border-green-800 hover:bg-red-50 hover:text-red-500 hover:border-red-200"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 border border-zinc-200 dark:border-zinc-700 hover:bg-green-50 hover:text-green-600 hover:border-green-200"
                    }`}
                  >
                    {blog.published ? "● live" : "○ draft"}
                  </button>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => { setEditingBlog(blog); setMode("edit"); window.scrollTo(0, 0); }}
                      className="text-xs px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-zinc-400 transition-all"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(blog.id)}
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

      {/* Delete Modal */}
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
              <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">Delete this post?</h3>
              <p className="text-sm text-zinc-500 mb-6">This action cannot be undone.</p>
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
