'use client';
import { useEffect, useState } from 'react';
import { FaWhatsapp, FaPhoneAlt } from 'react-icons/fa';

export const FixedButtons = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed right-4 bottom-10 flex flex-col gap-4 z-50 transition-all duration-700 ease-in-out ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
    >
      {/* WhatsApp */}
      <a
        href="https://wa.me/919212271699"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl animate-float hover:scale-110 transition-all duration-300 ease-in-out"
        aria-label="WhatsApp"
      >
        <FaWhatsapp size={22} />
      </a>

      {/* Call */}
      <a
        href="tel:+919212271699"
        className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-2xl animate-float-alt hover:scale-110 transition-all duration-300 ease-in-out"
        aria-label="Call"
      >
        <FaPhoneAlt size={20} />
      </a>
    </div>
  );
};
