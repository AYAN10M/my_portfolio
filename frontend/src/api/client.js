/**
 * API CLIENT — Centralized fetch wrapper with JWT auth and snake_case conversion.
 *
 * All API calls go through this module. It handles:
 * - Base URL configuration (uses Vite proxy in dev)
 * - JWT token attachment on every request
 * - Automatic token refresh on 401
 * - snake_case ↔ camelCase field name conversion
 */

const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

// ─── Token Management ─────────────────────────────────────────────────
export function getAccessToken() {
  return localStorage.getItem("access_token");
}

export function getRefreshToken() {
  return localStorage.getItem("refresh_token");
}

export function setTokens(access, refresh) {
  localStorage.setItem("access_token", access);
  if (refresh) localStorage.setItem("refresh_token", refresh);
}

export function clearTokens() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
}

// ─── Case Conversion Utilities ────────────────────────────────────────
// Backend uses snake_case, frontend uses camelCase.
// These convert objects transparently so neither side needs to change.

function snakeToCamel(str) {
  return str.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
}

function camelToSnake(str) {
  return str.replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`);
}

export function keysToCamel(obj) {
  if (Array.isArray(obj)) return obj.map(keysToCamel);
  if (obj !== null && typeof obj === "object" && !(obj instanceof Date)) {
    return Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [snakeToCamel(k), keysToCamel(v)])
    );
  }
  return obj;
}

export function keysToSnake(obj) {
  if (Array.isArray(obj)) return obj.map(keysToSnake);
  if (obj !== null && typeof obj === "object" && !(obj instanceof Date)) {
    return Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [camelToSnake(k), keysToSnake(v)])
    );
  }
  return obj;
}

// ─── Core Fetch Wrapper ───────────────────────────────────────────────
async function refreshAccessToken() {
  const refresh = getRefreshToken();
  if (!refresh) return null;

  try {
    const res = await fetch(`${API_BASE}/api/token/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh }),
    });

    if (!res.ok) {
      clearTokens();
      return null;
    }

    const data = await res.json();
    setTokens(data.access, data.refresh || refresh);
    return data.access;
  } catch {
    clearTokens();
    return null;
  }
}

async function apiFetch(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const token = getAccessToken();

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  let res = await fetch(url, { ...options, headers });

  // If 401, try refreshing the token and retry once
  if (res.status === 401 && token) {
    const newToken = await refreshAccessToken();
    if (newToken) {
      headers["Authorization"] = `Bearer ${newToken}`;
      res = await fetch(url, { ...options, headers });
    }
  }

  return res;
}

// ─── HTTP Method Helpers ──────────────────────────────────────────────
export async function apiGet(endpoint) {
  const res = await apiFetch(endpoint);
  if (!res.ok) throw new Error(`GET ${endpoint} failed: ${res.status}`);
  const data = await res.json();
  return keysToCamel(data);
}

export async function apiPost(endpoint, body) {
  const res = await apiFetch(endpoint, {
    method: "POST",
    body: JSON.stringify(keysToSnake(body)),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(JSON.stringify(keysToCamel(err)));
  }
  return keysToCamel(await res.json());
}

export async function apiPut(endpoint, body) {
  const res = await apiFetch(endpoint, {
    method: "PUT",
    body: JSON.stringify(keysToSnake(body)),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(JSON.stringify(keysToCamel(err)));
  }
  return keysToCamel(await res.json());
}

export async function apiPatch(endpoint, body) {
  const res = await apiFetch(endpoint, {
    method: "PATCH",
    body: JSON.stringify(keysToSnake(body)),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(JSON.stringify(keysToCamel(err)));
  }
  return keysToCamel(await res.json());
}

export async function apiDelete(endpoint) {
  const res = await apiFetch(endpoint, { method: "DELETE" });
  if (!res.ok) throw new Error(`DELETE ${endpoint} failed: ${res.status}`);
  // DELETE often returns 204 No Content
  if (res.status === 204) return null;
  return res.json();
}
