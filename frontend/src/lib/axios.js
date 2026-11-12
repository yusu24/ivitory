import axios from 'axios';

export function getApiBaseUrl() {
  const envUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
  if (
    typeof window !== 'undefined' &&
    window.location.hostname !== 'localhost' &&
    window.location.hostname !== '127.0.0.1'
  ) {
    try {
      const parsed = new URL(envUrl, window.location.origin);
      if (parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1') {
        parsed.hostname = window.location.hostname;
        return parsed.toString().replace(/\/$/, '');
      }
    } catch {
      // ignore
    }
  }
  return envUrl;
}

const api = axios.create({
  baseURL: getApiBaseUrl(),
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    Accept: 'application/json',
  },
});

export async function ensureCsrfCookie() {
  await api.get('/sanctum/csrf-cookie');
}

export default api;
