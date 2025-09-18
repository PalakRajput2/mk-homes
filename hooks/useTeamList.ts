// hooks/useTeamList.ts
import { useQuery } from '@tanstack/react-query';
import { FETCH_TEAMS_KEY, fetchTeamList } from '@/client/endpoints/team';
import { TeamMember } from '@/types/team';

export const useTeamList = (skip: number, size: number = 10) => {
  return useQuery<TeamMember[], Error>({
    queryKey: [FETCH_TEAMS_KEY, skip, size],
    queryFn: async () => {
      const response = await fetchTeamList({ skip, size, search: '' });

      if (Array.isArray(response)) return response;
      if (Array.isArray(response.data)) return response.data;

      console.warn('Unexpected team data structure:', response);
      return [];
    }
  });
};
