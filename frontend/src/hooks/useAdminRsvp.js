import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api, { ensureCsrfCookie } from '../lib/axios';

export function useAdminRsvpList(invitationId) {
  return useQuery({
    queryKey: ['admin', 'invitations', invitationId, 'rsvp'],
    queryFn: async () =>
      (await api.get(`/api/admin/invitations/${invitationId}/rsvp`)).data,
    enabled: !!invitationId,
  });
}

export function useDeleteRsvpEntry(invitationId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      await ensureCsrfCookie();
      return (await api.delete(`/api/admin/rsvp/${id}`)).data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'invitations', invitationId, 'rsvp'] });
    },
  });
}
