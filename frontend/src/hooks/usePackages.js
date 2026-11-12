import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api, { ensureCsrfCookie } from '../lib/axios';

export function usePackagesList() {
  return useQuery({
    queryKey: ['packages'],
    queryFn: async () => (await api.get('/api/packages')).data.data,
  });
}

export function useSuperAdminPackages() {
  return useQuery({
    queryKey: ['superadmin', 'packages'],
    queryFn: async () => (await api.get('/api/superadmin/packages')).data.data,
  });
}

export function useCreatePackage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      await ensureCsrfCookie();
      return (await api.post('/api/superadmin/packages', payload)).data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['superadmin', 'packages'] });
      queryClient.invalidateQueries({ queryKey: ['packages'] });
    },
  });
}

export function useUpdatePackage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...payload }) => {
      await ensureCsrfCookie();
      return (await api.put(`/api/superadmin/packages/${id}`, payload)).data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['superadmin', 'packages'] });
      queryClient.invalidateQueries({ queryKey: ['packages'] });
    },
  });
}

export function useDeletePackage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      await ensureCsrfCookie();
      return (await api.delete(`/api/superadmin/packages/${id}`)).data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['superadmin', 'packages'] });
      queryClient.invalidateQueries({ queryKey: ['packages'] });
    },
  });
}
