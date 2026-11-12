import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api, { ensureCsrfCookie } from '../lib/axios';

export function useTemplatesList() {
  return useQuery({
    queryKey: ['templates'],
    queryFn: async () => (await api.get('/api/templates')).data.data,
  });
}

export function useSuperAdminTemplates() {
  return useQuery({
    queryKey: ['superadmin', 'templates'],
    queryFn: async () => (await api.get('/api/superadmin/templates')).data.data,
  });
}

function toFormData(payload) {
  const form = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (value === null || value === undefined) return;
    if (key === 'thumbnail' && value instanceof File) {
      form.append('thumbnail', value);
    } else if (typeof value === 'boolean') {
      form.append(key, value ? '1' : '0');
    } else {
      form.append(key, value);
    }
  });
  return form;
}

export function useCreateTemplate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      await ensureCsrfCookie();
      return (await api.post('/api/superadmin/templates', toFormData(payload))).data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['superadmin', 'templates'] });
      queryClient.invalidateQueries({ queryKey: ['templates'] });
    },
  });
}

export function useUpdateTemplate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...payload }) => {
      await ensureCsrfCookie();
      return (await api.post(`/api/superadmin/templates/${id}`, toFormData(payload))).data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['superadmin', 'templates'] });
      queryClient.invalidateQueries({ queryKey: ['templates'] });
    },
  });
}

export function useDeleteTemplate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      await ensureCsrfCookie();
      return (await api.delete(`/api/superadmin/templates/${id}`)).data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['superadmin', 'templates'] });
      queryClient.invalidateQueries({ queryKey: ['templates'] });
    },
  });
}
