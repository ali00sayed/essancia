'use client';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

const LOCATIONS = [
  {
    id: 1,
    name: ' Delhi',
    stores: 1,
    isActive: true,
    image: '/images/stores/store-2.jpeg',
  },
  {
    id: 2,
    name: 'Mumbai',
    stores: 12,
    isActive: false,
    isHighlighted: true,
    image: '/images/stores/store-1.jpeg',
  },
  {
    id: 3,
    name: 'United Kingdom',
    stores: 4,
    isActive: false,
    image: '/images/stores/store-3.jpeg',
  },
];

const Stores = () => {
  const [activeImage, setActiveImage] = useState(LOCATIONS[1].image);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    setActiveImage(LOCATIONS[1].image);
  }, []);

  return (
    <div className="relative flex flex-col md:flex-row w-full min-h-screen bg-[#010203]">
      {/* Left Image Section with Image Transitions */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-screen relative overflow-hidden">
        {LOCATIONS.map(location => (
          <Image
            key={location.id}
            src={location.image}
            alt={`${location.name} store`}
            fill
            sizes="50vw"
            priority={location.id === 2}
            className={`object-cover transition-all duration-700 transform
              ${activeImage === location.image ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}
          />
        ))}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Right Content Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-20 py-12 md:py-0">
        <div className="max-w-xl mx-auto md:mx-0">
          <h2 className="text-white text-4xl md:text-7xl font-light leading-tight mb-8 md:mb-16">
            Best Location
            <br />
            Your Brands
          </h2>

          <div className="space-y-8">
            {LOCATIONS.map(location => (
              <div
                key={location.id}
                className={`group cursor-pointer ${
                  location.isHighlighted ? 'text-[#CD7F32]' : 'text-white'
                }`}
                onMouseEnter={() => {
                  setActiveImage(location.image);
                  setHoveredIndex(location.id);
                }}
                onMouseLeave={() => {
                  setHoveredIndex(null);
                }}
              >
                <div className="flex items-center gap-3 md:gap-6 touch-manipulation">
                  {/* Location Name with Hover Effect */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 md:gap-4 group-hover:gap-4 md:group-hover:gap-6 transition-all duration-500">
                      <span
                        className={`text-xl md:text-2xl font-light tracking-wide
                        ${
                          hoveredIndex === location.id
                            ? 'text-[#CD7F32]'
                            : location.isHighlighted
                              ? 'text-[#CD7F32]'
                              : 'text-white/90'
                        }
                        group-hover:text-[#CD7F32]`}
                      >
                        {location.name}
                      </span>

                      {/* Arrow that appears on hover */}
                      <span
                        className={`hidden md:inline-block transform transition-all duration-500 text-[#CD7F32]
                        ${hoveredIndex === location.id ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                      >
                        →
                      </span>
                    </div>

                    {/* Animated line */}
                    <div
                      className={`h-[1px] bg-[#CD7F32] transition-all duration-500 mt-2
                      ${hoveredIndex === location.id ? 'w-full' : 'w-0'}`}
                    />
                  </div>

                  {/* Store Count */}
                  <div
                    className={`text-xs md:text-sm transition-opacity duration-500
                    ${hoveredIndex === location.id ? 'opacity-100' : 'opacity-60'}`}
                  >
                    {location.stores} stores
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-8 md:mt-16 text-white/60">
            <p className="text-xs md:text-sm max-w-xs md:max-w-none">
              Find our stores in prime locations across major cities. Experience
              luxury shopping at its finest.
            </p>
          </div>
        </div>
      </div>

      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />
    </div>
  );
};

export default Stores;
