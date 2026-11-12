import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api, { ensureCsrfCookie } from '../lib/axios';

export function useCreateOrder() {
  return useMutation({
    mutationFn: async ({ invitation_id, package_id }) => {
      await ensureCsrfCookie();
      return (await api.post('/api/orders', { invitation_id, package_id })).data;
    },
  });
}

export function useOrder(id, options = {}) {
  return useQuery({
    queryKey: ['orders', id],
    queryFn: async () => (await api.get(`/api/orders/${id}`)).data.data,
    enabled: !!id,
    ...options,
  });
}

export function useSuperAdminOrders(status) {
  return useQuery({
    queryKey: ['superadmin', 'orders', status ?? 'all'],
    queryFn: async () =>
      (await api.get('/api/superadmin/orders', { params: status ? { status } : {} })).data.data,
  });
}

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }) => {
      await ensureCsrfCookie();
      return (await api.patch(`/api/superadmin/orders/${id}/status`, { status })).data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['superadmin', 'orders'] });
    },
  });
}
