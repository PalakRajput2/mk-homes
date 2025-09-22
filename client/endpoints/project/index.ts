import { backendClient } from "@/client/backendClient";

import { TQueryData } from "@/types/common";
import { searchApiUrl } from "@/utils/searchApiUrl";
import { galleryAddPayload, galleryEditPayload, projectApiPayload } from "@/validations/projects";



const path = '/admin/project';

// Key Constants
export const FETCH_PROJECTS_KEY = 'list-projects';
export const GET_PROJECT_KEY = 'get-project';
export const FETCH_GALLERY_KEY = 'list-gallery';

type editProjectPayload = {
    payload: projectApiPayload, id: number
}

// Edit  Request
export const editProjectRequest = async ({ payload, id }: editProjectPayload) => {

   
    try {
        const response = await backendClient.patch(`${path}/update/${id}`, payload);
        return response;
    } catch (error) {
        throw error;
    } 
};

// Add Request
export const addProjectRequest = async (payload: projectApiPayload) => {

    try {
        const response = await backendClient.post(`${path}/create`, payload
        );
        return response;

    } catch (error) {
        throw error;
    } 
};

// Fetch 
export const fetchProject = async (id: number) => {
    try {
        const response = await backendClient.get(`${path}/${id}`);
        return response?.data?.data;
    } catch (error) {
        throw error;
    } 
};

// Fetch All 
export const fetchProjects = async (payload: TQueryData) => {
 
    let url = searchApiUrl({ path, size: payload?.size, skip: payload?.skip, search: payload?.search, sorting: payload?.sorting });

    try {
        const response = await backendClient.get(
            `${url}`,
        );
        return response?.data?.data;
    } catch (error) {
        throw error;
    } 
};

export const deleteProjectRequest = async (ids: number[]) => {
       try {
        const response = await backendClient.delete(`${path}/delete`, {
            data: { ids },
        });
        return response;
    } catch (error) {
        throw error;
    } 
};




// -----gallery

// Fetch All 
export const fetchAllGallery = async (payload: TQueryData,projectId:number) => {
   
    let url = searchApiUrl({ path, additionalPath: `/gallery/list/${projectId}`, size: payload?.size, skip: payload?.skip, search: payload?.search, sorting: payload?.sorting });

    try {
        const response = await backendClient.get(
            `${url}`,
        );
        return response?.data?.data;
    } catch (error) {
        throw error;
    } 
};

export const editGalleryRequest = async ({ payload, id }: galleryEditPayload) => {

     try {
        const response = await backendClient.patch(`${path}/gallery/update/${id}`, payload);
        return response;
    } catch (error) {
        throw error;
    }  
};

export const addGalleryRequest = async (payload: galleryAddPayload) => {

     try {
        const response = await backendClient.post(`${path}/gallery/create`, payload
        );
        return response;

    } catch (error) {
        throw error;
    } 
};

export const deleteGalleryRequest = async (ids: number[]) => {
     try {
        const response = await backendClient.delete(`${path}/gallery/delete`, {
            data: { ids },
        });
        return response;
    } catch (error) {
        throw error;
    } 
};
export const setMainRequest = async (ids:{imageId: number, projectId:number}) => {
     try {
        const response = await backendClient.patch(`${path}/gallery/set/main`,ids);
        return response;
    } catch (error) {
        throw error;
    } 
};