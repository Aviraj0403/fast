import React from 'react';

export const AdBanner = ({ slot = 'default' }: { slot?: string }) => {
  return (
    <div className="w-full bg-gray-100 border border-dashed border-gray-200 rounded-md p-6 text-center">
      <p className="text-sm text-gray-600">Ad slot: {slot} — place your banner here</p>
      <div className="mt-3 h-20 bg-gray-200 rounded flex items-center justify-center text-gray-500">Banner Preview</div>
    </div>
  );
};

export default AdBanner;
