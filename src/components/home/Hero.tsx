import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import home from '../../assets/home.png';
export const Hero = () => {
  return (
    <div className="relative bg-gradient-to-r from-primary to-primary">
      <div className="container mx-auto px-4 sm:px-24 py-12 md:py-24">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-1/2 text-white text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-3">
              Welcome to Dose Tune!!
            </h1>
            <p className="text-xl sm:text-2xl mb-4 ml-1 font-bold">Making patient life easier!</p>
            <p className='text-lg sm:text-xl mb-2 font-bold'>Do you ever forget to take your medication?</p>
            <p className="text-lg sm:text-xl mb-6 opacity-90">
              Do you ever forget to take your medication? Juggling a busy schedule, managing multiple medications, and simply remembering that daily pill can be a challenge. Missing doses can disrupt your treatment plan and potentially harm your health. Here as a Team DoseTune, we understand the struggle.
            </p>
            <Link
    to="/order"
              className="inline-flex items-center bg-white text-primary px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
            >
              Order Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <img
              src={home}
              alt="Medical Professional"
              className="rounded-lg drop-shadow-xl w-full max-w-lg mx-auto"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
};