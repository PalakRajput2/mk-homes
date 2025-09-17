// hooks/useTeamList.ts
import { useQuery } from '@tanstack/react-query';
import { fetchTeamList } from '@/client/endpoints/team';
import { TeamMember } from '@/types/team';
import { TQueryData } from '@/types/query';

const payload: TQueryData = {
    size: 10,
    skip: 0,
    search: '',
};

export const useTeamList = () => {
    return useQuery<TeamMember[], Error>({
        queryKey: ['teamList'],
        queryFn: async () => {
            const response = await fetchTeamList(payload);

            // Normalize response structure
            if (Array.isArray(response)) return response;
            if (Array.isArray(response.data)) return response.data;

            console.warn('Unexpected team data structure:', response);
            return [];
        },
        staleTime: 5 * 60 * 1000, // Cache for 5 mins
        retry: 1,                // Retry once on failure
    });
};
