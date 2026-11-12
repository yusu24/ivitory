import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api, { ensureCsrfCookie } from '../lib/axios';

export function useGuestsList(invitationId) {
  return useQuery({
    queryKey: ['admin', 'invitations', invitationId, 'guests'],
    queryFn: async () => (await api.get(`/api/admin/invitations/${invitationId}/guests`)).data.data,
    enabled: !!invitationId,
  });
}

export function useAddGuest(invitationId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      await ensureCsrfCookie();
      return (await api.post(`/api/admin/invitations/${invitationId}/guests`, payload)).data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'invitations', invitationId, 'guests'] });
    },
  });
}

export function useBulkAddGuests(invitationId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (guestsArray) => {
      await ensureCsrfCookie();
      return (
        await api.post(`/api/admin/invitations/${invitationId}/guests/bulk`, {
          guests: guestsArray,
        })
      ).data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'invitations', invitationId, 'guests'] });
    },
  });
}

export function useUpdateGuest(invitationId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...payload }) => {
      await ensureCsrfCookie();
      return (await api.put(`/api/admin/guests/${id}`, payload)).data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'invitations', invitationId, 'guests'] });
    },
  });
}

export function useDeleteGuest(invitationId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      await ensureCsrfCookie();
      return (await api.delete(`/api/admin/guests/${id}`)).data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'invitations', invitationId, 'guests'] });
    },
  });
}

export function useSendGuestWhatsapp(invitationId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...payload }) => {
      await ensureCsrfCookie();
      return (await api.post(`/api/admin/guests/${id}/send-whatsapp`, payload)).data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'invitations', invitationId, 'guests'] });
    },
  });
}

