import axios from 'axios';

interface UploadResponse {
  secure_url: string;
}

export const uploadService = {
  uploadFile: async (file: File): Promise<string> => {
    try {
      // Validate file size (10MB limit)
      const MAX_FILE_SIZE = 10 * 1024 * 1024;
      if (file.size > MAX_FILE_SIZE) {
        throw new Error('File size exceeds 10MB limit');
      }

      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        throw new Error('Invalid file type. Only JPG, PNG, and PDF files are allowed');
      }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'dosetune');

      const response = await axios.post<UploadResponse>(
        'https://api.cloudinary.com/v1_1/dgzwooorj/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const percentage = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              console.log('Upload progress:', percentage);
            }
          },
          timeout: 30000,
        }
      );

      return response.data.secure_url;
    } catch (error) {
      console.error('Upload error:', error);
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Upload failed');
      }
      throw error;
    }
  }
};