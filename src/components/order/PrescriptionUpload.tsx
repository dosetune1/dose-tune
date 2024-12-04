import React, { useState, useCallback } from 'react';
import { Upload, X } from 'lucide-react';
import { UseFormRegister } from 'react-hook-form';
import { uploadService } from '../../services/uploadService';

interface PrescriptionUploadProps {
  register: UseFormRegister<any>;
  onImageUpload: (file: File, url: string) => void;
}

export const PrescriptionUpload: React.FC<PrescriptionUploadProps> = ({
  register,
  onImageUpload,
}) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetUpload = useCallback(() => {
    setPreviewUrl(null);
    setUploadProgress(0);
    setError(null);
  }, []);

  const handleFileUpload = async (file: File) => {
    try {
      setError(null);
      setIsUploading(true);
      setUploadProgress(0);
      
      // Create local preview for images
      if (file.type.startsWith('image/')) {
        const localPreviewUrl = URL.createObjectURL(file);
        setPreviewUrl(localPreviewUrl);
      }

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 5, 90));
      }, 100);

      // Actual upload
      const uploadedUrl = await uploadService.uploadFile(file);

      // Complete progress and cleanup
      clearInterval(progressInterval);
      setUploadProgress(100);
      onImageUpload(file, uploadedUrl);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Upload failed');
      setPreviewUrl(null);
      setUploadProgress(0);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      await handleFileUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      await handleFileUpload(file);
    }
  };

  return (
    <div className="mt-1">
      {error && (
        <div className="mb-2 text-sm text-red-600 bg-red-50 p-2 rounded-md flex items-center justify-between">
          <span>{error}</span>
          <button
            onClick={() => setError(null)}
            className="text-red-500 hover:text-red-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
      
      <div
        className={`relative flex justify-center px-6 pt-5 pb-6 border-2 ${
          isDragging ? 'border-primary' : error ? 'border-red-300' : 'border-gray-300'
        } border-dashed rounded-md transition-colors duration-200`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="space-y-1 text-center">
          {previewUrl ? (
            <div className="relative w-full max-w-[200px] mx-auto">
              <img
                src={previewUrl}
                alt="Prescription preview"
                className="mx-auto h-32 object-cover rounded-md"
              />
              {uploadProgress < 100 && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-md">
                  <div className="text-white font-semibold">
                    {uploadProgress}%
                  </div>
                </div>
              )}
              {uploadProgress === 100 && (
                <button
                  onClick={resetUpload}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          ) : (
            <>
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary/80">
                  <span>Upload a file</span>
                  <input
                    type="file"
                    className="sr-only"
                    accept="image/*,.pdf"
                    {...register('prescription')}
                    onChange={handleFileChange}
                    disabled={isUploading}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
            </>
          )}
        </div>

        {uploadProgress > 0 && uploadProgress < 100 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-200"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
};