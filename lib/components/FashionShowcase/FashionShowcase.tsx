'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Declare the window property
declare global {
  interface Window {
    __FASHION_SHOWCASE_RENDERED: boolean;
  }
}

if (typeof window !== 'undefined') {
  window.__FASHION_SHOWCASE_RENDERED =
    window.__FASHION_SHOWCASE_RENDERED || false;
}

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    id: 1,
    image: '/images/fashion-showcase/fsc-hoodie-1.jpeg',
    title: 'AeroFlex Hoodie',
    price: 1800,
    // colors: ['#F3E5DC', '#C8B6A6', '#8C7C6D', '#545454'],
    alt: 'Black Blouson Crop Top model',
  },
  {
    id: 2,
    image: '/images/fashion-showcase/fsc-hoodie-2.jpeg',
    title: 'Elevate Essential Hoodie ',
    price: 1480,
    originalPrice: 1680,
    discount: '11% OFF',
    alt: 'Black dress model',
  },
  {
    id: 3,
    image: '/images/fashion-showcase/fsc-ss-1.jpeg',
    title: 'Velvet Storm Sweatshirt',
    price: 2100,

    alt: 'Casual Blazer model',
  },
  {
    id: 4,
    image: '/images/fashion-showcase/fsc-ss-2.jpeg',
    title: 'Noir Edge Sweatshirt',
    price: 1600,
    discount: '15% OFF',
    originalPrice: 1880,
    alt: 'Summer Collection model',
  },
  {
    id: 5,
    image: '/images/fashion-showcase/fsc-shirt-1.jpeg',
    title: 'Vertex Dimension Tee',
    price: 2200,
    colors: ['#1B1B1B', '#363636', '#4F4F4F', '#696969'],
    alt: 'Vertex Dimension Tee',
  },
  {
    id: 6,
    image: '/images/fashion-showcase/fsc-shirt-3.jpeg',
    title: 'Omniverse Graphite Mode Tee',
    price: 1750,
    alt: 'Omniverse Graphite Mode Tee',
  },
  {
    id: 7,
    image: '/images/fashion-showcase/fsc-shirt-2.jpeg',
    title: 'Deathborn Tee',
    price: 1950,
    discount: '20% OFF',
    originalPrice: 2440,
    alt: 'Deathborn Tshirt',
  },
  {
    id: 8,
    image: '/images/fashion-showcase/fsc-hoodie-4.jpeg',
    title: 'Velvet Armor Hoodie',
    price: 2300,
    alt: 'Velvet Armor Hoodie',
  },
  {
    id: 9,
    image: '/images/fashion-showcase/fsc-tshirt-4.jpeg',
    title: 'Phantom Wing Tee',
    price: 1850,
    discount: '10% OFF',
    originalPrice: 2050,
    alt: 'Phantom Wing tee',
  },
  {
    id: 10,
    image: '/images/joggers-collections/jogger-8.webp',
    title: 'Minimal Luxe – The Perfect Everyday Joggers',
    price: 1200,
    alt: 'Minimal Luxe – The Perfect Everyday Joggers',
  },
  {
    id: 11,
    image: '/images/joggers-collections/jogger-6.webp',
    title: 'Monochrome Edge – Classic Yet Modern',
    price: 1200,
    alt: 'Monochrome Edge – Classic Yet Modern',
  },
  {
    id: 12,
    image: '/images/joggers-collections/jogger-15.jpeg',
    title: 'Street Art Reloaded: The Joggers',
    price: 1200,
    alt: 'Street Art Reloaded: The Joggers',
  },
  {
    id: 13,
    image: '/images/joggers-collections/jogger-14.jpeg',
    title: 'Urban Chaos',
    price: 1200,
    alt: 'Summer Top model',
  },
  {
    id: 14,
    image: '/images/joggers-collections/jogger-13.jpeg',
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
  const [canRender, setCanRender] = useState(false);

  // Only mount once by checking global flag
  useEffect(() => {
    if (!window.__FASHION_SHOWCASE_RENDERED) {
      setCanRender(true);
      window.__FASHION_SHOWCASE_RENDERED = true;
    }
    return () => {
      window.__FASHION_SHOWCASE_RENDERED = false;
    };
  }, []);

  if (!canRender) return null;

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-gradient-to-br from-gray-50 to-gray-100"
    >
      <div ref={containerRef} className="w-full px-4 md:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
            >
              <div className="aspect-[3/4] relative overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading={index === 0 ? 'eager' : 'lazy'}
                  quality={90}
                />
                {product.discount && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                    {product.discount}
                  </div>
                )}
                {product.colors && (
                  <ColorDots
                    colors={product.colors}
                    showMore={product.colors.length > 3}
                  />
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  {product.title}
                </h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-semibold text-gray-900">
                    ₹{product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      ₹{product.originalPrice}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
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
