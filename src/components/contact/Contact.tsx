import React from 'react';
import { Send, MessageSquare, Mail, Phone, MapPin } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { generateWhatsAppUrl } from '../../utils/whatsapp';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export const Contact = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>();

  const onSubmit = (data: ContactFormData) => {
    try {
      const whatsappUrl = generateWhatsAppUrl({
        name: data.name.trim(),
        email: data.email.trim(),
        message: data.message.trim()
      });
      
      // Open WhatsApp in a new window
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      
      // Reset the form after successful submission
      reset();
    } catch (error) {
      console.error('Error generating WhatsApp URL:', error);
      alert('Failed to open WhatsApp. Please try again.');
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <h2 className="text-3xl md:text-4xl font-bold mb-14 text-center">Contact Us</h2>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            <div className="md:col-span-1">
              <div className="text-center md:text-left mb-12">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">Let's Talk</h3>
                <p className="text-lg text-gray-600">
                  Whether you have a question, want to start a project, or simply want to connect.
                  Feel free to send us a message in the contact form.
                </p>
              </div>
            </div>
            <div className="md:col-span-1 bg-white p-6 rounded-lg shadow-md">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    {...register('name', { required: 'Name is required' })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Message</label>
                  <textarea
                    {...register('message', { required: 'Message is required' })}
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full flex justify-center items-center space-x-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  <Send className="h-4 w-4" />
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};