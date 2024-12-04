import React from 'react';
import { Bell, UserCheck, RefreshCcw, Heart, Truck, Clock } from 'lucide-react';

export const Services = () => {
  const services = [
    {
      icon: <Bell className="h-8 w-8" />,
      title: "Dose Reminder",
      description: "Set reminders for taking medications on time."
    },
    {
      icon: <UserCheck className="h-8 w-8" />,
      title: "Patient Compliance",
      description: "Help patients adhere to their prescribed medication schedules."
    },
    {
      icon: <RefreshCcw className="h-8 w-8" />,
      title: "Medication Refill Reminder",
      description: "Remind patients when it's time to restock their medications."
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Healthy Lifestyle Guide",
      description: "Provide guidance and tips for a healthier lifestyle."
    },
    {
      icon: <Truck className="h-8 w-8" />,
      title: "Doorstep Medicine Delivery",
      description: "Deliver medications right to patients' doors (available upon subscription)."
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Fast Medicine Delivery",
      description: "Get your medications delivered to your doorstep in no time."
    }
  ];

  return (
    <section className="py-12 px-4 md:px-24 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white border border-transparent p-6 text-center rounded-lg shadow-md hover:shadow-lg hover:border hover:border-primary transition-shadow duration-300"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-primary text-white rounded-full">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};