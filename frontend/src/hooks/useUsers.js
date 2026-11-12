import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api, { ensureCsrfCookie } from '../lib/axios';

export function useSuperAdminUsers() {
  return useQuery({
    queryKey: ['superadmin', 'users'],
    queryFn: async () => (await api.get('/api/superadmin/users')).data.data,
  });
}

export function useUpdateUserRole() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, role }) => {
      await ensureCsrfCookie();
      return (await api.patch(`/api/superadmin/users/${id}/role`, { role })).data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['superadmin', 'users'] });
    },
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      await ensureCsrfCookie();
      return (await api.post('/api/superadmin/users', payload)).data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['superadmin', 'users'] });
    },
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...payload }) => {
      await ensureCsrfCookie();
      return (await api.patch(`/api/superadmin/users/${id}`, payload)).data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['superadmin', 'users'] });
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      await ensureCsrfCookie();
      return (await api.delete(`/api/superadmin/users/${id}`)).data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['superadmin', 'users'] });
    },
  });
}
