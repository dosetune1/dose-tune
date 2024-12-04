import React, { useState, useEffect } from 'react';
import { X, Truck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const FreeDeliveryPopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show popup after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-24 right-8 z-50 max-w-sm bg-white/30 backdrop-blur-md rounded-lg shadow-xl overflow-hidden border border-primary"
        >
          <div className="relative p-6">
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 text-primary hover:text-primary/80 transition-colors"
              aria-label="Close popup"
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 rounded-full p-3">
                <Truck className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary mb-1">
                  Free Delivery Offer!
                </h3>
                <p className="text-primary">
                  Get free delivery on your first 3 orders. Don't miss out!
                </p>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleClose}
                className="bg-primary text-white z-10 px-4 py-2 rounded-md text-sm font-medium hover:bg-white hover:text-primary transition-colors"
              >
                Got it!
              </button>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute -top-8 -left-8 w-16 h-16 bg-white/10 rounded-full" />
            <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-white/10 rounded-full" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};