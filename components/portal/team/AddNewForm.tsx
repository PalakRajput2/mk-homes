'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { teamSchema, TeamPayload } from '@/validations/team';
import Loading from '../loader/Loading';
import { useEffect, useState, useRef } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSearchParams, useRouter } from 'next/navigation';
import { showMessage } from '@/utils/notify';
import { addTeamRequest, editTeamRequest, fetchTeam, GET_TEAM_KEY } from '@/client/endpoints/team';
import { getDataURLFromFile } from '@/utils/getDataURL';
import ImageUpload from '../common/ImageUpload';

export default function AddNewForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const idParam = searchParams.get('id');
  const id = idParam ? Number(idParam) : null;
  const isEdit = !!id;
  const [imageFile, setImageFile] = useState<File | null>(null);

  const imgUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/uploads/team_images`;

  // Fetch existing data if editing
  const { data: team, isLoading: isTeamLoading } = useQuery({
    queryKey: [GET_TEAM_KEY, id],
    queryFn: () => {
      if (!id) throw new Error("No ID");
      return fetchTeam(id);
    },
    enabled: isEdit,
  });

  const imageUploadRef = useRef<any>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(teamSchema),
  });

  // Populate form and initial image when editing
  const initializeForm = async () => {
    if (isEdit && team) {
      reset({
        name: team?.name || '',
        designation: team?.designation || '',
        facebook: team?.facebook || '',
        instagram: team?.instagram || '',
        image: team?.image ? team?.image : null,
      });
    }
  };

  useEffect(() => {
    if (!isEdit && !team) return;
    initializeForm();
  }, [isEdit, team, reset]);

  const handleFileChange = (file: File | null) => {
    setImageFile(file);
    if (file) {
      setValue("image", file);
    }
  };

  const onSubmit = async (data: TeamPayload) => {
    const { image } = data;
    const imageUrl = image && image instanceof File ? await getDataURLFromFile(image) : image ? image : null;

    const payload = { 
      ...data, 
      image: imageUrl as string, 
    };

    if (isEdit) {
      editTeam({ payload: payload, id: id as number });
    } else {
      addTeam(payload);
    }
  };

  const { mutate: addTeam, isPending: isAdding } = useMutation({
    mutationFn: addTeamRequest,
    onSuccess: (res) => {
      showMessage(res.data.message || 'Team member added successfully!');
      reset();
      if (imageUploadRef.current) imageUploadRef.current.reset();
      router.push('/portal/team');
    },
    onError: (err: any) => {
      showMessage('Error creating team');
      console.error(err);
    },
  });

  const { mutate: editTeam, isPending: isEditing } = useMutation({
    mutationFn: editTeamRequest,
    onSuccess: (res) => {
      showMessage(res.data.message || 'Team member updated successfully!');
      reset();
      if (imageUploadRef.current) imageUploadRef.current.reset();
      router.push('/portal/team');
    },
    onError: (err: any) => {
      showMessage('Error updating team');
      console.error(err);
    },
  });

  if ((isEdit && isTeamLoading) || isSubmitting) {
    return <Loading />;
  }

  return (
    <div className="md:w-[1100px] mx-auto p-8 mt-10 bg-white rounded-lg border border-gray-200">
      <h1 className="text-2xl font-bold mb-6">{isEdit ? 'Edit Team Member' : 'Add New '}</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[15px] font-medium text-gray-700 pb-2">
              Name <span className="text-red-500 text-lg">*</span>
            </label>
            <input
              {...register('name')}
              className={`w-full bg-gray-50 border p-2 rounded ${errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="Enter name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-[15px] font-medium text-gray-700 pb-3">Designation</label>
            <input
              {...register('designation')}
              className="w-full border p-2 rounded border-gray-300 bg-gray-50"
              placeholder="Enter designation"
            />
          </div>
        </div>

        {/* Social Media Links */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[15px] font-medium text-gray-700 pb-3">Facebook</label>
            <input
              {...register('facebook')}
              className={`w-full border bg-gray-50 p-2 rounded ${errors.facebook ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="https://www.facebook.com/username"
            />
            {errors.facebook && <p className="text-red-500 text-sm mt-1">{errors.facebook.message}</p>}
          </div>

          <div>
            <label className="block text-[15px] font-medium text-gray-700 pb-3">Instagram</label>
            <input
              {...register('instagram')}
              className={`w-full bg-gray-50 border p-2 rounded ${errors.instagram ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="https://www.instagram.com/username"
            />
            {errors.instagram && <p className="text-red-500 text-sm mt-1">{errors.instagram.message}</p>}
          </div>
        </div>

        {/* Image Upload Component */}
        <div className='w-full'>
          <label className="block text-[15px] font-medium text-gray-700 pb-3">
            Image <span className="text-red-500 text-lg">*</span>
          </label>
          <ImageUpload
            ref={imageUploadRef}
            initialImageUrl={isEdit && team?.image ? `${imgUrl}/${team.image}` : null}
            onFileChange={handleFileChange}
          />
          {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isAdding || isEditing}
            className={`py-2 px-4 rounded text-white font-medium ${isAdding || isEditing
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
              }`}
          >
            {isAdding || isEditing ? 'Saving...' : isEdit ? 'Update' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
}