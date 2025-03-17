import React from 'react';

const MarQuee = () => {
  return (
    <div className="w-full bg-black overflow-hidden relative group border-t border-white/10">
      <div className="relative flex hover:pause-animation">
        {/* First moving text */}
        <div className="animate-marquee whitespace-nowrap flex items-center transition-all duration-300 group-hover:[animation-play-state:paused]">
          {[...Array(3)].map((_, index) => (
            <span
              key={`primary-${index}`}
              className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 
                text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500
                text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium
                flex items-center transition-transform duration-300 hover:scale-105
                [text-shadow:_0_0_10px_rgba(219,39,119,0.5),_0_0_20px_rgba(147,51,234,0.3)]"
            >
              <span className="inline-block hover:text-pink-400 transition-colors">
                Essancia SALE
              </span>
              <span className="mx-2 sm:mx-3 inline-block text-white/70">-</span>
              <span className="inline-block hover:text-blue-400 transition-colors">
                FLAT ₹400 OFF ON ALL PRODUCTS
              </span>
              <span className="mx-4 sm:mx-6 md:mx-8 inline-block text-purple-500">
                •
              </span>
            </span>
          ))}
        </div>

        {/* Duplicate for seamless loop */}
        <div className="animate-marquee2 whitespace-nowrap flex items-center absolute top-0 left-0 transition-all duration-300 group-hover:[animation-play-state:paused]">
          {[...Array(3)].map((_, index) => (
            <span
              key={`secondary-${index}`}
              className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 
                text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500
                text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium
                flex items-center transition-transform duration-300 hover:scale-105
                [text-shadow:_0_0_10px_rgba(219,39,119,0.5),_0_0_20px_rgba(147,51,234,0.3)]"
            >
              <span className="inline-block hover:text-pink-400 transition-colors">
                Essancia SALE
              </span>
              <span className="mx-2 sm:mx-3 inline-block text-white/70">-</span>
              <span className="inline-block hover:text-blue-400 transition-colors">
                FLAT ₹400 OFF ON ALL PRODUCTS
              </span>
              <span className="mx-4 sm:mx-6 md:mx-8 inline-block text-purple-500">
                •
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarQuee;
