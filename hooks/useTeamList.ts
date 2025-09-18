// hooks/useTeamList.ts
import { useQuery } from '@tanstack/react-query';
import { fetchTeamList } from '@/client/endpoints/team';
import { TeamMember } from '@/types/team';

interface TeamListResponse {
  data: TeamMember[];
  total: number;
}

export const useTeamList = (skip: number, size: number) => {
  return useQuery<TeamListResponse, Error>({
    queryKey: ['teamList', skip, size],
    queryFn: async () => {
      const response = await fetchTeamList({
          skip, size,
          search: ''
      });

      if (Array.isArray(response)) {
        return { data: response, total: response.length };
      }

      const { data = [], total = data.length } = response;
      return { data, total };
    },
    staleTime: 10 * 60 * 1000,
    retry: 1,
  });
};
