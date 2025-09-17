import { backendClient } from "@/client/backendClient";
import { TQueryData } from "@/types/query";
import { TeamMember } from "@/types/team";
import { TeamPayload } from "@/validations/team";

const path = '/admin/team/list';


type editTeamPayload = {
  payload: TeamPayload, id: number
}

//Fetch all 
export const fetchTeamList = async (payload: TQueryData) => {
  const response = await backendClient.get(`${path}?size=${payload.size}&skip=${payload.skip}`);
  return response?.data?.data;
};


// Add Request
export const addTeamRequest = async (payload: TeamPayload) => {
  try {
    const response = await backendClient.post(`${path}/create`, payload
    );
    return response;

  } catch (error) {
    throw error;
  } 
};

//Edit Request 

export const editTeamRequest = async ({ payload, id }: editTeamPayload) => {

  try {
    const response = await backendClient.patch(`${path}/update/${id}`, payload);
    return response;
  } catch (error) {
    throw error;
  }
};

//delete 
export const deleteTeamRequest = async (ids: number[]) => {

  try {
    const response = await backendClient.delete(`${path}/delete`, {
      data: { ids },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// Fetch 
export const fetchTeam = async (id: number) => {
    try {
        const response = await backendClient.get(`${path}/${id}`);
        return response?.data?.data;
    } catch (error) {
        throw error;
    } 
};