const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'https://nexus-rifa.onrender.com').replace(/\/+$/g, '');

export function getToken() {
  return window.localStorage.getItem('nexus_rifa_token');
}

export async function apiFetch(path: string, options: RequestInit = {}) {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (options.headers) {
      for (const [key, value] of Object.entries(options.headers)) {
          if(value !== undefined) {
              headers[key] = value as string;
          }
      }
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const isAbsolute = /^https?:\/\//i.test(path);
  const normalizedPath = isAbsolute ? path : path.replace(/^\/+/, '');
  const url = isAbsolute
    ? normalizedPath
    : new URL(normalizedPath, `${API_BASE_URL}/`).toString();

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const body = await response.text().catch(() => '');
    throw new Error(body || `${response.status} ${response.statusText}`);
  }

  if (response.status === 204) return null;
  return response.json();
}
