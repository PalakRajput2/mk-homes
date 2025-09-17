import { backendClient } from "@/client/backendClient";
import { TQueryData } from "@/types/query";
import { TeamMember } from "@/types/team";
import { TeamPayload } from "@/validations/team";

const path = '/admin/team';


type editTeamPayload = {
    payload: TeamPayload, id: number
}  

//fetch all 
export const fetchTeamList = async (payload: TQueryData): Promise<TeamMember[]> => {
  const response = await backendClient.get(`${path}`);
  return response.data?.data ;
};


// Add Request
export const addTeamRequest = async (payload: TeamPayload) => {
    try {
        const response = await backendClient.post(`${path}/create`, payload
        );
        return response;

    } catch (error) {
        throw error;
    } finally {
        
    }
};