import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api, { ensureCsrfCookie } from '../lib/axios';

const BRAND_CACHE_KEY = 'invitory_brand_cache';

export function resolveMediaUrl(url) {
  if (!url || typeof url !== 'string') return url;
  try {
    if (
      typeof window !== 'undefined' &&
      window.location.hostname !== 'localhost' &&
      window.location.hostname !== '127.0.0.1'
    ) {
      const parsed = new URL(url, window.location.origin);
      if (parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1') {
        parsed.hostname = window.location.hostname;
        return parsed.toString();
      }
    }
    return url;
  } catch {
    return url;
  }
}

export function normalizeBrand(data) {
  if (!data) return data;
  return {
    ...data,
    logo_url: resolveMediaUrl(data.logo_url),
    favicon_url: resolveMediaUrl(data.favicon_url),
  };
}

function getCachedBrand() {
  try {
    const raw = localStorage.getItem(BRAND_CACHE_KEY);
    return raw ? normalizeBrand(JSON.parse(raw)) : undefined;
  } catch {
    return undefined;
  }
}

export function applyFaviconToDocument(data) {
  if (typeof document === 'undefined' || !data) return;
  const href = resolveMediaUrl(data.favicon_url || data.logo_url) || '/favicon.svg';
  let link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }
  if (link.href !== href) {
    link.href = href;
  }
}

function setCachedBrand(data) {
  try {
    if (data) {
      const normalized = normalizeBrand(data);
      localStorage.setItem(BRAND_CACHE_KEY, JSON.stringify(normalized));
      applyFaviconToDocument(normalized);
    }
  } catch {
    // ignore storage errors
  }
}

// Immediately apply cached favicon on script load (0ms)
const initialCached = getCachedBrand();
if (initialCached) {
  applyFaviconToDocument(initialCached);
}

export function useLandingContent() {
  return useQuery({
    queryKey: ['landing-content'],
    initialData: getCachedBrand,
    queryFn: async () => {
      const raw = (await api.get('/api/landing-content')).data.data;
      const data = normalizeBrand(raw);
      setCachedBrand(data);
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useUpdateLandingContent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      await ensureCsrfCookie();
      return (await api.put('/api/superadmin/landing-content', payload)).data.data;
    },
    onSuccess: (data) => {
      setCachedBrand(data);
      queryClient.setQueryData(['landing-content'], data);
      queryClient.invalidateQueries({ queryKey: ['landing-content'] });
    },
  });
}

export function useUploadBrandLogo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (file) => {
      await ensureCsrfCookie();
      const formData = new FormData();
      formData.append('logo', file);
      return (await api.post('/api/superadmin/landing-content/logo', formData)).data.data;
    },
    onSuccess: (data) => {
      setCachedBrand(data);
      queryClient.setQueryData(['landing-content'], data);
      queryClient.invalidateQueries({ queryKey: ['landing-content'] });
    },
  });
}

export function useDeleteBrandLogo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      await ensureCsrfCookie();
      return (await api.delete('/api/superadmin/landing-content/logo')).data.data;
    },
    onSuccess: (data) => {
      setCachedBrand(data);
      queryClient.setQueryData(['landing-content'], data);
      queryClient.invalidateQueries({ queryKey: ['landing-content'] });
    },
  });
}

export function useUploadFavicon() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (file) => {
      await ensureCsrfCookie();
      const formData = new FormData();
      formData.append('favicon', file);
      return (await api.post('/api/superadmin/landing-content/favicon', formData)).data.data;
    },
    onSuccess: (data) => {
      setCachedBrand(data);
      queryClient.setQueryData(['landing-content'], data);
      queryClient.invalidateQueries({ queryKey: ['landing-content'] });
    },
  });
}

export function useDeleteFavicon() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      await ensureCsrfCookie();
      return (await api.delete('/api/superadmin/landing-content/favicon')).data.data;
    },
    onSuccess: (data) => {
      setCachedBrand(data);
      queryClient.setQueryData(['landing-content'], data);
      queryClient.invalidateQueries({ queryKey: ['landing-content'] });
    },
  });
}
