import { useQuery } from '@tanstack/react-query';
import { fetchTeamList } from '@/client/endpoints/team';
import { TeamMember } from '@/types/team';

interface TeamListResponse {
  data: TeamMember[];
  total: number;
}

interface TeamListPayload {
  skip: number;
  size: number;
  search?: string;
}

export const useTeamList = (skip: number, size: number, search: string) => {
  return useQuery<TeamListResponse, Error>({
    queryKey: ['teamList', skip, size, search],  // include search in cache key
    queryFn: async () => {
      const response = await fetchTeamList({
        skip,
        size,
        search,
      });

      if (Array.isArray(response)) {
        return { data: response, total: response.length };
      }

      const { data = [], total = data.length } = response;
      return { data, total };
    },
    staleTime: 0,
    retry: 1,
  });
};
