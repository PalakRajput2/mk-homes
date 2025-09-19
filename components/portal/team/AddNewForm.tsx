'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDropzone } from 'react-dropzone';
import { teamSchema, TeamPayload } from '@/validations/team';
import Loading from '../loader/Loading';
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { showMessage } from '@/utils/notify';
import { addTeamRequest } from '@/client/endpoints/team';
import { getDataURLFromFile } from '@/utils/getDataURL';

export default function AddNewForm() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const {
    register,  handleSubmit,  setValue,  reset,  watch, formState: { errors, isSubmitting }, } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(teamSchema),
    defaultValues: {
      name: '',
      designation: '',
      facebook: '',
      instagram: '',
    }
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': [],
    },
    multiple: false,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        setValue('image', acceptedFiles[0], { shouldValidate: true });
      }
    },
  });

  const { mutate: addTeam, isPending: isAdding } = useMutation({
    mutationFn: addTeamRequest,
    onSuccess: (res) => {
      showMessage(res.data.message || 'Team member added successfully!');
      reset();
      router.push('/portal/team');
    },
    onError: (err: any) => {
      showMessage('Error creating team');
      console.log('Error details:', err.response?.data || err.message);
      
    },
  });

  const onSubmit = async (data: TeamPayload) => {

   
     const { image } = data
        const imageFile = image
        console.log(imageFile)
        const imageUrl = imageFile && imageFile instanceof File ? await getDataURLFromFile(imageFile) : imageFile ? imageFile : null;

        const payload = { ...data, image: imageUrl as string, }

   
    addTeam(payload);

  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => clearTimeout(timeout);
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="max-w-md mx-auto p-6 mt-20 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Add new</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name - Fixed with proper validation */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            {...register('name', { required: 'Name is required' })}
            className={`w-full border p-2 rounded ${errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
            placeholder="Enter name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Designation */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Designation</label>
          <input
            {...register('designation')}
            className="w-full border p-2 rounded border-gray-300"
            placeholder="Enter designation"
          />
        </div>

        {/* Facebook  Instagram */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Facebook</label>
            <input
              {...register('facebook')}
              className={`w-full border p-2 rounded ${errors.facebook ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="https://www.facebook.com/username"
            />
            {errors.facebook && (
              <p className="text-red-500 text-sm mt-1">{errors.facebook.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Instagram</label>
            <input
              {...register('instagram')}
              className={`w-full border p-2 rounded ${errors.instagram ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="https://www.instagram.com/username"
            />
            {errors.instagram && (
              <p className="text-red-500 text-sm mt-1">{errors.instagram.message}</p>
            )}
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Image <span className="text-red-500">*</span>
          </label>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-md p-6 text-center cursor-pointer transition-colors ${isDragActive
                ? 'border-blue-500 bg-blue-50'
                : errors.image
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
          >
            <input {...getInputProps()} />
            {watch('image') ? (
              <div>
                <p className="text-sm text-green-600 font-medium">
                  Uploaded: {watch('image')?.name}
                </p>
                <p className="text-xs text-gray-500">Click or drop to change</p>
              </div>
            ) : (
              <div>
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-blue-600 hover:text-blue-500">
                    Click to upload
                  </span>{' '}
                  or drag and drop
                </p>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            )}
          </div>
          {errors.image && (
            <p className="text-red-500 text-sm mt-2">{errors.image.message as string}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isAdding || isSubmitting}
          className={`w-full py-2 px-4 rounded text-white font-medium ${isAdding || isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
            }`}
        >
          {isAdding || isSubmitting ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  );
}