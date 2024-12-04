import React from 'react';
import { Heart, Clock, Truck, Bell, Shield } from 'lucide-react';

export const About = () => {
  const features = [
    {
      icon: <Heart className="h-8 w-8" />,
      text: "We get emotionally attached with the patient by providing them with a responsive medibuddy (pharmacist)."
    },
    {
      icon: <Bell className="h-8 w-8" />,
      text: "DoseTune provides routine call reminders for patients on regular medications (diabetes, BP, cholesterol, hypertension, etc.)."
    },
    {
      icon: <Truck className="h-8 w-8" />,
      text: "Team DoseTune ensures delivery of medicines to your doorstep at no additional cost, just by uploading your prescription."
    },
    {
      icon: <Clock className="h-8 w-8" />,
      text: "Our platform helps manage prescriptions, making sure patients never miss a dose and stay on top of their health."
    },
    {
      icon: <Shield className="h-8 w-8" />,
      text: "We provide health check reminders and guidance to help patients maintain their overall wellness."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">About Us</h2>
          
          <div className="space-y-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 p-6 border border-transparent bg-gray-50 rounded-lg hover:bg-gray-100 hover:border hover:border-primary transition-colors duration-200"
              >
                <div className="flex-shrink-0">
                  <div className="p-3 bg-primary rounded-full text-white">
                    {feature.icon}
                  </div>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {feature.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};