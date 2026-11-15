import axios from 'axios';

export function getApiBaseUrl() {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL.replace(/\/$/, '');
  }
  if (
    typeof window !== 'undefined' &&
    window.location.hostname !== 'localhost' &&
    window.location.hostname !== '127.0.0.1'
  ) {
    // In production (HTTPS or standard port 80/443), frontend & backend share the same origin
    if (
      window.location.protocol === 'https:' ||
      window.location.port === '' ||
      window.location.port === '80' ||
      window.location.port === '443'
    ) {
      return window.location.origin;
    }
    return `http://${window.location.hostname}:8000`;
  }
  return 'http://localhost:8000';
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
