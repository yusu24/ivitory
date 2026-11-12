import { useMutation, useQueryClient } from '@tanstack/react-query';
import api, { ensureCsrfCookie } from '../lib/axios';

const invalidateInvitation = (queryClient, invitationId) => {
  queryClient.invalidateQueries({ queryKey: ['admin', 'invitations', invitationId] });
};

export function useAddLoveStoryItem(invitationId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      await ensureCsrfCookie();
      return (await api.post(`/api/admin/invitations/${invitationId}/love-story`, payload)).data.data;
    },
    onSuccess: () => invalidateInvitation(queryClient, invitationId),
  });
}

export function useUpdateLoveStoryItem(invitationId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...payload }) => {
      await ensureCsrfCookie();
      return (await api.put(`/api/admin/love-story/${id}`, payload)).data.data;
    },
    onSuccess: () => invalidateInvitation(queryClient, invitationId),
  });
}

export function useDeleteLoveStoryItem(invitationId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      await ensureCsrfCookie();
      return (await api.delete(`/api/admin/love-story/${id}`)).data;
    },
    onSuccess: () => invalidateInvitation(queryClient, invitationId),
  });
}

export function useAddGalleryPhoto(invitationId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ file, caption }) => {
      await ensureCsrfCookie();
      const form = new FormData();
      form.append('photo', file);
      if (caption) form.append('caption', caption);
      return (await api.post(`/api/admin/invitations/${invitationId}/gallery`, form)).data.data;
    },
    onSuccess: () => invalidateInvitation(queryClient, invitationId),
  });
}

export function useDeleteGalleryPhoto(invitationId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      await ensureCsrfCookie();
      return (await api.delete(`/api/admin/gallery/${id}`)).data;
    },
    onSuccess: () => invalidateInvitation(queryClient, invitationId),
  });
}

export function useAddBankAccount(invitationId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      await ensureCsrfCookie();
      return (await api.post(`/api/admin/invitations/${invitationId}/bank-accounts`, payload)).data.data;
    },
    onSuccess: () => invalidateInvitation(queryClient, invitationId),
  });
}

export function useDeleteBankAccount(invitationId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      await ensureCsrfCookie();
      return (await api.delete(`/api/admin/bank-accounts/${id}`)).data;
    },
    onSuccess: () => invalidateInvitation(queryClient, invitationId),
  });
}
