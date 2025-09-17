import * as yup from 'yup';

export const teamSchema = yup.object({
  name: yup.string().required("Name is required"),
  designation: yup.string().nullable(),
  facebook: yup
    .string()
    .url('Must be a valid URL')
    .test('includes-www', 'URL must include "www."', (value) => !value || value.includes('www.'))
    .nullable(),
  instagram: yup
    .string()
    .url('Must be a valid URL')
    .test('includes-www', 'URL must include "www."', (value) => !value || value.includes('www.'))
    .nullable(),
  image: yup
    .mixed<File>()
    .required("Image is required here")
    .test('file-required', 'A file must be selected', (value) => {
      return value instanceof File;
    }),
});

// Yup generate the type from the schema
export type TeamPayload = yup.InferType<typeof teamSchema>;
