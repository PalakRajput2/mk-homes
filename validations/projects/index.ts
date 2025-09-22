import * as Yup from "yup"
import type { InferType } from 'yup';


export const projectSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    slug: Yup.string().optional(),
    isActive: Yup.boolean().required("Active is required"),
    types: Yup.mixed().required("Types are required"),
    location: Yup.string().optional().nullable(),
    startDate: Yup.string().optional().nullable(),
    endDate: Yup.string().optional().nullable(),
    seoTitle: Yup.string().optional().nullable(),
    metaDescription: Yup.string().optional().nullable(),
    metaKeywords: Yup.string().optional().nullable(),
})


export type TTypes = { label: string; value: string; iNew?: boolean; };

const KeyCodes = {
    comma: 188,
    enter: 13,
};
export const delimiters = [KeyCodes.comma, KeyCodes.enter];

export type projectPayload = {
    title: string;
    slug?: string;
    description: string;
    isActive: boolean;
    types: TTypes[];
    location?: string;
    startDate?: string;
    endDate?: string;
    seoTitle?: string | null;
    metaDescription?: string | null;
    metaKeywords?: string | null;
}
export type projectApiPayload = {
    title: string;
    description: string;
    slug?: string;
    isActive: boolean;
    types: string;
    location?: string;
    startDate?: string;
    endDate?: string;
    seoTitle?: string | null;
    metaDescription?: string | null;
    metaKeywords?: string | null;
}


export type galleryAddPayload = {
    projectId: number;
    image: string;
    main?: boolean;
}
export type galleryEditPayload = {
    id: number;
    payload: {
        image?: string;
        main?: boolean;
    }
}
