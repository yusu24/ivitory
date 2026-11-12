import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api, { ensureCsrfCookie } from '../lib/axios';

export function useInvitationsList() {
  return useQuery({
    queryKey: ['admin', 'invitations'],
    queryFn: async () => (await api.get('/api/admin/invitations')).data.data,
  });
}

export function useInvitation(id) {
  return useQuery({
    queryKey: ['admin', 'invitations', id],
    queryFn: async () => (await api.get(`/api/admin/invitations/${id}`)).data.data,
    enabled: !!id,
  });
}

export function useCreateInvitation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      await ensureCsrfCookie();
      return (await api.post('/api/admin/invitations', payload)).data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'invitations'] });
    },
  });
}

export function useUpdateInvitation(id) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      await ensureCsrfCookie();
      return (await api.put(`/api/admin/invitations/${id}`, payload)).data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'invitations', id] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'invitations'] });
    },
  });
}

export function useQuickUpdateInvitation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...payload }) => {
      await ensureCsrfCookie();
      return (await api.put(`/api/admin/invitations/${id}`, payload)).data.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'invitations', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'invitations'] });
    },
  });
}

export function useDeleteInvitation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      await ensureCsrfCookie();
      return (await api.delete(`/api/admin/invitations/${id}`)).data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'invitations'] });
    },
  });
}

export function useUploadCoverPhoto(id) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (file) => {
      await ensureCsrfCookie();
      const form = new FormData();
      form.append('cover_photo', file);
      return (await api.post(`/api/admin/invitations/${id}/cover-photo`, form)).data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'invitations', id] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'invitations'] });
    },
  });
}

export function useUploadSlotPhoto(id) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ slot, file }) => {
      await ensureCsrfCookie();
      const form = new FormData();
      form.append('photo', file);
      return (await api.post(`/api/admin/invitations/${id}/photo/${slot}`, form)).data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'invitations', id] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'invitations'] });
    },
  });
}

export function useDeleteSlotPhoto(id) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (slot) => {
      await ensureCsrfCookie();
      return (await api.delete(`/api/admin/invitations/${id}/photo/${slot}`)).data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'invitations', id] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'invitations'] });
    },
  });
}

export function useUploadMusic(id) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (file) => {
      await ensureCsrfCookie();
      const form = new FormData();
      form.append('music', file);
      return (await api.post(`/api/admin/invitations/${id}/music`, form)).data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'invitations', id] });
    },
  });
}
