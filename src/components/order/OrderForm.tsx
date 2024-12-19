import React from 'react';
import { useForm } from 'react-hook-form';
import { useOrderStore } from '../../store/orderStore';
import { useNavigate } from 'react-router-dom';
import { PrescriptionUpload } from './PrescriptionUpload';
import { TermsModal } from '../common/TermsModal';

interface OrderFormData {
  name: string;
  phone: string;
  address: string;
  medicines: string;
  prescription?: FileList;
  acceptTerms: boolean;
}

export const OrderForm = () => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    watch 
  } = useForm<OrderFormData>();
  
  const addOrder = useOrderStore((state) => state.addOrder);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [uploadedFileUrl, setUploadedFileUrl] = React.useState<string | null>(null);
  const [isTermsModalOpen, setIsTermsModalOpen] = React.useState(false);

  const medicines = watch('medicines');
  const acceptTerms = watch('acceptTerms');

  const handleImageUpload = (file: File, url: string) => {
    setUploadedFileUrl(url);
  };

  const onSubmit = async (data: OrderFormData) => {
    if (!medicines?.trim() && !uploadedFileUrl) {
      alert('Please either enter medicine names or upload a prescription');
      return;
    }

    setIsSubmitting(true);
    try {
      await addOrder({
        customerName: data.name,
        phone: data.phone,
        address: data.address,
        medicines: medicines ? medicines.split('\n').filter(Boolean) : [],
        prescriptionUrl: uploadedFileUrl || '',
      });

      alert('Order submitted successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Failed to submit order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">Order Medicines</h2>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  {...register('name')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  {...register('phone')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                )}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Delivery Address</label>
              <textarea
                {...register('address')}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter your complete delivery address"
              />
              {errors.address && (
                <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Medicine Names</label>
              <textarea
                {...register('medicines')}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                placeholder="Enter medicine names (one per line)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Upload Prescription</label>
              <PrescriptionUpload
                register={register}
                onImageUpload={handleImageUpload}
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register('acceptTerms', { required: true })}
                id="acceptTerms"
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label htmlFor="acceptTerms" className="text-sm text-gray-600">
                I agree to the{' '}
                <button
                  type="button"
                  onClick={() => setIsTermsModalOpen(true)}
                  className="text-primary hover:text-primary/80 underline"
                >
                  Terms & Conditions
                </button>
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !acceptTerms}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                isSubmitting || !acceptTerms ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-primary/80'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Order'}
            </button>
          </form>
        </div>
      </div>

      <TermsModal
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
      />
    </div>
  );
};
