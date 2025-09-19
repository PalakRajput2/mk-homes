'use client';

import React, { useEffect, useState, useImperativeHandle, forwardRef } from 'react';
import { useDropzone } from 'react-dropzone';

interface ImageUploadProps {
  initialImageUrl?: string | null;
  onFileChange: (file: File | null) => void;
}

const ImageUpload = forwardRef(({ initialImageUrl = null, onFileChange }: ImageUploadProps, ref) => {
  const [files, setFiles] = useState<(File & { preview: string })[]>([]);
  const [existingImage, setExistingImage] = useState<string | null>(initialImageUrl);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': [] },
    multiple: false,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const fileWithPreview = Object.assign(acceptedFiles[0], {
          preview: URL.createObjectURL(acceptedFiles[0]),
        });
        setFiles([fileWithPreview]);
        setExistingImage(null);
        onFileChange(acceptedFiles[0]);
      }
    },
  });

  useEffect(() => {
    return () => {
      files.forEach(file => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  useImperativeHandle(ref, () => ({
    reset: () => {
      setFiles([]);
      setExistingImage(null);
      onFileChange(null);
    }
  }));

  const thumbs = files.map(file => (
    <div
      key={file.name}
      className="inline-flex border border-gray-300 rounded-md mb-2 mr-2 w-32 h-32 p-1 box-border"
    >
      <div className="flex min-w-0 overflow-hidden">
        <img
          src={file.preview}
          alt="preview"
          className="block w-auto h-full"
          onLoad={() => { URL.revokeObjectURL(file.preview); }}
        />
      </div>
    </div>
  ));

  return (
    <section className="">
      <div
        {...getRootProps({
          className: `border-2 border-dashed rounded-md p-6 cursor-pointer text-center hover:bg-blue-100
            ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
            w-[500px] h-[200px]  flex items-center justify-center`
        })}
      >
        <input {...getInputProps()} />
        {files.length > 0 ? (
          <div className="flex flex-wrap justify-center">
            {thumbs}
          </div>
        ) : existingImage ? (
          <img
            src={existingImage}
            alt="Existing"
            className="max-w-[200px] max-h-[160px] object-contain "
          />
        ) : (
          <div >
            <p className="text-sm text-gray-700 mb-1">
              <span className='text-blue-500'>Click to upload</span> or drag & drop an image
            </p>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        )}
      </div>
    </section>
  );
});

ImageUpload.displayName = 'ImageUpload';

export default ImageUpload;
