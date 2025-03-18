import React from 'react';

const DreamerMarquee = () => {
  const brands = ['ESSaNCIA', 'ESSaNCIA', 'ESSaNCIA', 'ESSaNCIA', 'ESSaNCIA'];

  return (
    <div className="relative overflow-hidden whitespace-nowrap bg-gray-100 py-1 sm:py-1">
      <div className="flex animate-marquee">
        {brands.map((brand, index) => (
          <div
            key={`${brand}-${index}`}
            className="mx-4 sm:mx-6 md:mx-8 text-xl sm:text-2xl md:text-3xl text-center font-bold text-gray-700 border-r-2 border-gray-300 px-4 sm:px-6 md:px-8 py-2 sm:py-4 md:py-6"
          >
            {brand}
          </div>
        ))}
        {/* Repeat for smooth looping */}
        {brands.map((brand, index) => (
          <div
            key={`${brand}-repeat-${index}`}
            className="mx-4 sm:mx-6 md:mx-8 text-xl sm:text-2xl md:text-3xl text-center font-bold text-gray-700 border-r-2 border-gray-300 px-4 sm:px-6 md:px-8 py-2 sm:py-4 md:py-6"
          >
            {brand}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DreamerMarquee;
