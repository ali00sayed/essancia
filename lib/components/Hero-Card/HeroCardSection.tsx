'use client';
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Image from 'next/image';
import Link from 'next/link';

const HeroCardSection = () => {
  const shinyRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (shinyRef.current && isHovered) {
      const shinyElement = shinyRef.current;
      const tl = gsap.timeline({ repeat: 0 });

      tl.fromTo(
        shinyElement,
        {
          left: '-200px',
          opacity: 1,
          width: '200px',
        },
        {
          left: '100%',
          opacity: 0,
          duration: 1.5,
          ease: 'power1.inOut',
        }
      );
    }
  }, [isHovered]);

  return (
    <section
      className="bg-white w-full px-4 sm:px-8 lg:px-16 py-8 lg:py-16 border-t border-gray-100"
      aria-label="Summer Fashion Collection"
    >
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-32">
        <div
          ref={containerRef}
          className="w-full lg:w-1/2 relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-[1.02]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Image
            src="/images/hero-card-section/hero-card-section.jpg"
            alt="Style That Travels With You."
            width={800}
            height={800}
            className="w-full h-full object-cover"
            priority
            quality={90}
          />
          <div
            ref={shinyRef}
            className={`absolute top-0 h-full w-24 rotate-[20deg] pointer-events-none
              bg-gradient-to-r from-transparent via-white to-transparent
              shadow-[0_0_30px_30px_rgba(255,255,255,0.5)]
              transition-opacity duration-300
              ${!isHovered ? 'opacity-0' : 'opacity-100'}`}
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.9) 50%, transparent 100%)',
            }}
            aria-hidden="true"
          />
        </div>

        <div className="w-full lg:w-1/2">
          <div className="flex flex-col space-y-6">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-light text-black leading-tight text-center lg:text-left">
              Style That Travels With You.
            </h2>
            <p className="text-base md:text-lg text-gray-800 text-center lg:text-left">
              From casual streetwear to cozy essentials, discover apparel that
              moves with your lifestyle. Whether you&apos;re embracing urban
              adventures or unwinding in your favorite spot, our ESSaNCIA
              collection ensures you stay effortlessly stylish and comfortable.
            </p>
            <p className="text-base md:text-lg text-gray-800 text-center lg:text-left">
              Designed for every season, our T-shirts, Hoodies, and Sweatshirts
              blend fashion with function—keeping you cool in summer and snug in
              winter. Elevate your everyday wardrobe with versatile pieces made
              for trendsetters on the go.
            </p>
            <div className="flex justify-center lg:justify-start">
              <Link href="/collections">
                <button
                  className="inline-flex items-center justify-center px-6 py-3 
                    bg-black text-white rounded-full 
                    transition-colors duration-300 mt-4 group hover:bg-gray-900"
                  aria-label="Explore summer collection"
                >
                  <span className="flex items-center gap-2">
                    Explore Collection
                    <svg
                      className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroCardSection;
