/**
 * PROJECTS API — All project-related API calls.
 * Backend uses slug as the lookup field.
 */

import { apiGet, apiPost, apiPut, apiDelete } from "./client.js";

export async function fetchProjects() {
  return await apiGet("/api/projects/");
}

export async function fetchProject(slug) {
  return await apiGet(`/api/projects/${slug}/`);
}

export async function fetchFeaturedProjects() {
  return await apiGet("/api/projects/featured/");
}

export async function createProject(data) {
  return await apiPost("/api/projects/", data);
}

export async function updateProject(slug, data) {
  return await apiPut(`/api/projects/${slug}/`, data);
}

export async function deleteProject(slug) {
  return await apiDelete(`/api/projects/${slug}/`);
}
