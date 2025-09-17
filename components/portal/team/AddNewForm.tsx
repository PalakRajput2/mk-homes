'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDropzone } from 'react-dropzone';
import { teamSchema, TeamPayload } from '@/validations/team';
import Loading from '../loader/Loading';
import { useEffect, useState } from 'react';

export default function AddNewForm() {
  const [loading, setLoading] = useState(true);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(teamSchema),
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

  const onSubmit = (data: TeamPayload) => {
    console.log('Valid Form Data:', data);
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('designation', data.designation || '');
    formData.append('facebook', data.facebook || '');
    formData.append('instagram', data.instagram || '');
    if (data.image) {
      formData.append('image', data.image);
    }
    reset()
    // axios.post('/api/team', formData)
  };

  //loading 
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500); 
  return () => clearTimeout(timeout);
  }, []);

  if (loading) return <Loading />;  




  return (
    <div className="max-w-md mx-auto p-6 mt-20 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Add new</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            {...register('name')}
            className="w-full border p-2 rounded"
            placeholder="Name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Designation */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Designation</label>
          <input
            {...register('designation')}
            className="w-full border p-2 rounded"
            placeholder="Designation"
          />
        </div>

        {/* Facebook + Instagram */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Facebook</label>
            <input
              {...register('facebook')}
              className="w-full border p-2 rounded"
              placeholder="Facebook URL"
            />
            {errors.facebook && (
              <p className="text-red-500 text-sm">{errors.facebook.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Instagram</label>
            <input
              {...register('instagram')}
              className="w-full border p-2 rounded"
              placeholder="Instagram URL"
            />
            {errors.instagram && (
              <p className="text-red-500 text-sm">{errors.instagram.message}</p>
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
            <p className="text-red-500 text-sm mt-2">
              {errors.image.message as string}
            </p>
          )}
        </div>


        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 cursor-pointer"
        >
          Save
        </button>
      </form>
    </div>
  );
}
