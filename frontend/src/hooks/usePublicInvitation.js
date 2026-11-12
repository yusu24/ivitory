import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../lib/axios';

export function usePublicInvitation(slug) {
  return useQuery({
    queryKey: ['public', 'invitation', slug],
    queryFn: async () => (await api.get(`/api/invitations/${slug}`)).data.data,
    enabled: !!slug,
    retry: false,
  });
}

export function usePublicRsvpWall(slug) {
  return useQuery({
    queryKey: ['public', 'invitation', slug, 'rsvp'],
    queryFn: async () => (await api.get(`/api/invitations/${slug}/rsvp`)).data,
    enabled: !!slug,
  });
}

export function useSubmitRsvp(slug) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) =>
      (await api.post(`/api/invitations/${slug}/rsvp`, payload)).data.data,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['public', 'invitation', slug, 'rsvp'] });
    },
  });
}
