import React from 'react';
import { X } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Terms & Conditions</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto">
          <div className="space-y-4">
            <p>Welcome to DoseTune! By accessing or using our services, you agree to comply with the following Terms & Conditions. Please read them carefully.</p>
            <h3 className="text-lg font-semibold">1. Nature of Services</h3>
            <p>
              <li>DoseTune is a logistics and dose reminder platform.</li>
              <li>We do not prescribe, recommend, or endorse any medicines or treatments.</li>
              <li>Our services are limited to reminding users about their medication schedule as   per the details provided by the user.</li>
            </p>

            <h3 className="text-lg font-semibold">2. No Medical Advice</h3>
            <p>
              <li>DoseTune is not a medical service provider, nor does it offer medical advice or consultation.</li>
              <li>Any health-related decisions or medication usage should be made in consultation with a qualified healthcare professional.</li>
            </p>

            <h3 className="text-lg font-semibold">3. Accuracy of Information</h3>
            <p>
              <li> Users are solely responsible for providing accurate and up-to-date information, including prescription details and schedules.</li>
              <li>DoseTune does not verify or validate the prescriptions or medication details provided by the user.</li>
            </p>

            <h3 className="text-lg font-semibold">4. Limitation of Liability</h3>
            <p>
              <li>DoseTune acts only as a logistics partner and dose reminder service provider.</li>
              <li>We are not responsible for any health-related consequences, side effects, or issues arising from medication usage, incorrect prescriptions, or non-compliance with medical advice.</li>
              <li>Users assume full responsibility for their health and medication-related decisions.</li>
            </p>

            <h3 className="text-lg font-semibold">5. Third-Party Services</h3>
            <p>
              <li>DoseTune may collaborate with third-party service providers (e.g., pharmacies or delivery partners).</li>
              <li>We do not guarantee the quality, availability, or suitability of products or services offered by these third parties.</li>
            </p>
            
            <h3 className="text-lg font-semibold">6. User Responsibilities</h3>
            <p>
              <li>Users must ensure that their prescriptions are valid and provided by licensed healthcare professionals.</li>
              <li>DoseTune must not be used to obtain controlled substances, illegal drugs, or any medication without a valid prescription.</li>
            </p>
            
            <h3 className="text-lg font-semibold">7. Indemnification</h3>
            <p>
              <li>Users agree to indemnify and hold DoseTune harmless against any claims, damages, or liabilities arising from misuse of the platform, incorrect medication information, or failure to adhere to medical advice.</li>
            </p>
            
            <h3 className="text-lg font-semibold">8. Service Interruptions</h3>
            <p>
              <li>While we strive to provide uninterrupted services, DoseTune does not guarantee that the platform will always operate without disruptions or errors.</li>
            </p>
            
            <h3 className="text-lg font-semibold">9. Privacy Policy</h3>
            <p>
              <li>Your personal and medical information will be handled in accordance with our Privacy Policy. By using DoseTune, you agree to our data practices as outlined in the Privacy Policy.</li>
            </p>
            
            <h3 className="text-lg font-semibold">10. Modification of Terms</h3>
            <p>
              <li>DoseTune reserves the right to update or modify these Terms & Conditions at any time. Changes will be communicated through our platform.</li>
            </p>
            
            <h3 className="text-lg font-semibold">11. Governing Law</h3>
            <p>
              <li>These Terms & Conditions are governed by the laws of [Your Country/Region]. Any disputes arising will be subject to the jurisdiction of the courts in [Your City].</li>
              <li>By using DoseTune, you confirm that you understand and accept these Terms & Conditions. If you do not agree, please refrain from using the platform.</li>
            </p>
          </div>
        </div>
        
        <div className="p-4 border-t">
          <button
            onClick={onClose}
            className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/80 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
