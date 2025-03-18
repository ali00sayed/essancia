import React from 'react';

const FashionStages = () => {
  return (
    <div className="bg-white px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16 border-t border-gray-200">
      <div className="flex flex-col items-center justify-center max-w-7xl mx-auto">
        <h1 className="text-gray-900 text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-center mb-4 sm:mb-6 md:mb-8 leading-tight">
          Fashion clothes can be classified into different categories based on
          their design
        </h1>

        <div className="h-0.5 w-24 bg-gray-900 mx-auto mb-8 sm:mb-10"></div>

        <div className="max-w-4xl mx-auto">
          <p className="text-gray-700 text-sm sm:text-sm md:text-base text-center px-2 sm:px-4 py-2 sm:py-4 leading-relaxed">
            Fashion refers to the prevailing style or trend in clothing,
            accessories, makeup, and hairstyle that people adopt for a
            particular period. It is a dynamic industry that keeps changing with
            time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FashionStages;
