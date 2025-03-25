'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Declare custom window property type
declare global {
  interface Window {
    __FASHION_SHOWCASE_RENDERED: boolean;
  }
}

// Global rendering control
if (typeof window !== 'undefined') {
  window.__FASHION_SHOWCASE_RENDERED =
    window.__FASHION_SHOWCASE_RENDERED || false;
}

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    id: 1,
    image: '/images/fashionShowcase/fsc-hoodie-1.jpeg',
    title: 'AeroFlex Hoodie',
    price: 1800,
    // colors: ['#F3E5DC', '#C8B6A6', '#8C7C6D', '#545454'],
    alt: 'Black Blouson Crop Top model',
  },
  {
    id: 2,
    image: '/images/fashionShowcase/fsc-hoodie-2.jpeg',
    title: 'Elevate Essential Hoodie ',
    price: 1480,
    originalPrice: 1680,
    discount: '11% OFF',
    alt: 'Black dress model',
  },
  {
    id: 3,
    image: '/images/fashionShowcase/fsc-ss-1.jpeg',
    title: 'Velvet Storm Sweatshirt',
    price: 2100,

    alt: 'Casual Blazer model',
  },
  {
    id: 4,
    image: '/images/fashionShowcase/fsc-ss-2.jpeg',
    title: 'Noir Edge Sweatshirt',
    price: 1600,
    discount: '15% OFF',
    originalPrice: 1880,
    alt: 'Summer Collection model',
  },
  {
    id: 5,
    image: '/images/fashionShowcase/fsc-shirt-1.jpeg',
    title: 'Vertex Dimension Tee',
    price: 2200,
    colors: ['#1B1B1B', '#363636', '#4F4F4F', '#696969'],
    alt: 'Vertex Dimension Tee',
  },
  {
    id: 6,
    image: '/images/fashionShowcase/fsc-shirt-3.jpeg',
    title: 'Omniverse Graphite Mode Tee',
    price: 1750,
    alt: 'Omniverse Graphite Mode Tee',
  },
  {
    id: 7,
    image: '/images/fashionShowcase/fsc-shirt-2.jpeg',
    title: 'Deathborn Tee',
    price: 1950,
    discount: '20% OFF',
    originalPrice: 2440,
    alt: 'Deathborn Tshirt',
  },
  {
    id: 8,
    image: '/images/fashionShowcase/fsc-hoodie-4.jpeg',
    title: 'Velvet Armor Hoodie',
    price: 2300,
    alt: 'Velvet Armor Hoodie',
  },
  {
    id: 9,
    image: '/images/fashionShowcase/fsc-tshirt-4.jpeg',
    title: 'Phantom Wing Tee',
    price: 1850,
    discount: '10% OFF',
    originalPrice: 2050,
    alt: 'Phantom Wing tee',
  },
  {
    id: 10,
    image: '/images/joggersCollections/jogger8.webp',
    title: 'Minimal Luxe – The Perfect Everyday Joggers',
    price: 1200,
    alt: 'Minimal Luxe – The Perfect Everyday Joggers',
  },
  {
    id: 11,
    image: '/images/joggersCollections/jogger6.webp',
    title: 'Monochrome Edge – Classic Yet Modern',
    price: 1200,
    alt: 'Monochrome Edge – Classic Yet Modern',
  },
  {
    id: 12,
    image: '/images/joggersCollections/jogger15.jpeg',
    title: 'Street Art Reloaded: The Joggers',
    price: 1200,
    alt: 'Street Art Reloaded: The Joggers',
  },
  {
    id: 13,
    image: '/images/joggersCollections/jogger14.jpeg',
    title: 'Urban Chaos',
    price: 1200,
    alt: 'Summer Top model',
  },
  {
    id: 14,
    image: '/images/joggersCollections/jogger13.jpeg',
    title: 'Neo-Street Fusion – Art on Joggers',
    price: 1200,
    alt: 'Joggers with street art',
  },
];

// Add ColorDots component from WinterFashionSection
const ColorDots = ({
  colors,
  showMore = false,
}: {
  colors: string[];
  showMore?: boolean;
}) => (
  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
    {colors.slice(0, 3).map((color, index) => (
      <button
        key={index}
        className="w-6 h-6 rounded-full border-2 border-white hover:scale-110 transition-transform duration-200"
        style={{ backgroundColor: color }}
        aria-label={`Select color ${index + 1}`}
      />
    ))}
    {showMore && colors.length > 3 && (
      <button
        className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-xs"
        aria-label="More colors available"
      >
        +{colors.length - 3}
      </button>
    )}
  </div>
);

// Wrap the entire component in React.memo to prevent unnecessary rerenders
const FashionShowcase = React.memo(() => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState<number | null>(null);
  const [canRender, setCanRender] = useState(false);

  // Only mount once by checking global flag
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Use a safer way to check/set the global flag
      if (window.__FASHION_SHOWCASE_RENDERED) {
        // If already rendered elsewhere, don't render here
        setCanRender(false);
      } else {
        // Mark as rendered and allow this instance to render
        window.__FASHION_SHOWCASE_RENDERED = true;
        setCanRender(true);

        // Add section ID for debugging
        if (sectionRef.current) {
          sectionRef.current.id = 'fashion-showcase-section';
        }
      }
    }

    return () => {
      // Clean up on unmount
      if (typeof window !== 'undefined' && window.__FASHION_SHOWCASE_RENDERED) {
        window.__FASHION_SHOWCASE_RENDERED = false;
      }
    };
  }, []);

  // Initialize scroll animation only if we're allowed to render
  useEffect(() => {
    if (!canRender || !sectionRef.current || !containerRef.current) return;

    // Clear any existing ScrollTrigger instances for this element
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.vars.trigger === sectionRef.current) {
        trigger.kill();
      }
    });

    // Set up the scroll animation with a single instance
    const scrollAnimation = () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => {
            const containerHeight = containerRef.current?.scrollHeight || 0;
            const viewportHeight = window.innerHeight;
            return `+=${Math.max(containerHeight - viewportHeight + 100, 0)}`;
          },
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          markers: false, // Set to true for debugging
          id: 'fashion-showcase', // Unique ID to avoid conflicts
        },
      });

      tl.to(containerRef.current, {
        y: () => {
          const containerHeight = containerRef.current?.scrollHeight || 0;
          const viewportHeight = window.innerHeight;
          return -Math.max(containerHeight - viewportHeight + 100, 0);
        },
        ease: 'none',
      });
    };

    // Delay initialization slightly to ensure DOM is ready
    const initTimer = setTimeout(() => {
      scrollAnimation();
    }, 300);

    return () => {
      clearTimeout(initTimer);
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.id === 'fashion-showcase') {
          trigger.kill();
        }
      });
    };
  }, [canRender]);

  // If we can't render, return an empty fragment to avoid taking up space
  if (!canRender) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      className="relative h-screen fashion-showcase"
      data-section-type="fashion-showcase"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="grid md:grid-cols-2 grid-cols-1 h-full">
          {/* Left: Static Image */}
          <div className="relative h-[50vh] md:h-full bg-white">
            <Image
              src="/images/fashionShowcase/fsc-2.jpeg"
              alt="Fashion model"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute bottom-6 md:bottom-10 left-4 md:left-10 text-white z-10">
              <h2 className="text-3xl md:text-5xl font-light mb-2 md:mb-4">
                New Collection
              </h2>
              <p className="text-base md:text-lg opacity-95">
                Discover our latest fashion arrivals
              </p>
            </div>
          </div>

          {/* Right: Scrolling Cards */}
          <div className="relative h-[50vh] md:h-full bg-white overflow-hidden">
            <div
              ref={containerRef}
              className="absolute inset-x-0 px-4 md:px-16 pt-8 md:pt-16"
              style={{ willChange: 'transform' }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
                {products.map(card => (
                  <div
                    key={card.id}
                    className="relative animate-fadeIn cursor-pointer group"
                    onMouseEnter={() => setIsHovered(card.id)}
                    onMouseLeave={() => setIsHovered(null)}
                  >
                    {card.discount && (
                      <span className="absolute top-4 right-4 bg-red-100 text-red-700 text-sm px-3 py-1 rounded-full z-10">
                        {card.discount}
                      </span>
                    )}
                    <div className="aspect-[3/4] relative overflow-hidden rounded-lg mb-2 md:mb-4 bg-[#F5F5F5] touch-manipulation">
                      <div
                        className={`relative w-full h-full transform transition-all duration-300 ${
                          isHovered === card.id ? 'scale-105' : 'scale-100'
                        }`}
                      >
                        <Image
                          src={card.image}
                          alt={card.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        />
                      </div>

                      {/* Color dots overlay */}
                      {isHovered === card.id && (
                        <div className="absolute inset-0 bg-black/30 transition-opacity duration-300">
                          <ColorDots
                            colors={card.colors || []}
                            showMore={true}
                          />
                        </div>
                      )}
                    </div>
                    <h3 className="text-base font-normal text-gray-900 mb-2 transition-colors duration-300 hover:text-gray-700">
                      {card.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-medium text-gray-900">
                        ₹{card.price.toFixed(2)}
                      </span>
                      {card.originalPrice && (
                        <span className="text-gray-700 line-through text-sm">
                          ₹{card.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

// Force display name for debugging
FashionShowcase.displayName = 'FashionShowcase';

// Create a dynamic loader component
const FashionShowcaseLoader = () => {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // Delay loading slightly to ensure we don't conflict with page transitions
    const timer = setTimeout(() => {
      setShouldLoad(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (!shouldLoad) return null;

  return <FashionShowcase />;
};

export default FashionShowcaseLoader;
