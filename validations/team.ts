import * as Yup from 'yup';


export const teamSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    designation: Yup.string().optional().nullable(),
    facebook: Yup.string().optional().url('Must be a valid URL')
        .test('includes-www', 'URL must include "www."',
            (value) => {
                if (!value) return true;
                return value.includes('www.');
            }).optional().nullable(),
    instagram: Yup.string().optional().url('Must be a valid URL')
        .test('includes-www', 'URL must include "www."',
            (value) => {
                if (!value) return true;
                return value.includes('www.');
            }).optional().nullable(),
    image: Yup.mixed().required("Image is required"),
})



// Yup generate the type from the schema
export type TeamPayload = Yup.InferType<typeof teamSchema>;
