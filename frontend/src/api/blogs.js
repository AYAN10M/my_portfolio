/**
 * BLOGS API — All blog-related API calls.
 * Backend uses slug as the lookup field.
 */

import { apiGet, apiPost, apiPut, apiDelete } from "./client.js";

export async function fetchBlogs() {
  return await apiGet("/api/blogs/");
}

export async function fetchBlog(slug) {
  return await apiGet(`/api/blogs/${slug}/`);
}

export async function createBlog(data) {
  return await apiPost("/api/blogs/", data);
}

export async function updateBlog(slug, data) {
  return await apiPut(`/api/blogs/${slug}/`, data);
}

export async function deleteBlog(slug) {
  return await apiDelete(`/api/blogs/${slug}/`);
}
