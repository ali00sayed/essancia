'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Button from '../ui/Button';
import { useRouter } from 'next/navigation';

// Client-side only component wrapper
const ClientOnly = ({ children }: { children: React.ReactNode }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <>{children}</>;
};

interface FashionItem {
  id: number;
  image: string;
  title: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  colors: string[]; // Array of color hex codes
}

const fashionItems: FashionItem[] = [
  {
    id: 1,
    image: '/images/esf-clothes/esf-hoodie-5.jpeg',
    title: 'Street Luxe Hoodie',
    price: 1199.0,
    originalPrice: 1350.0,
    discount: '28% OFF',
    colors: ['#000000', '#fb5607', '#eaecee'], // Black, Dark Gray, Charcoal
  },
  {
    id: 2,
    image: '/images/esf-clothes/esf-hoodie-1.webp',
    title: 'Midnight Glow Hoodie',
    price: 1499.0,
    colors: ['#FFBF00', '#DFFF00', '#40E0D0', '#CCCCFF'], // Brown, Black, Dark Brown, Copper
  },
  {
    id: 3,
    image: '/images/esf-clothes/esf-hoodie-2.jpg',
    title: 'Slate Street Hoodie',
    price: 1455.0,
    colors: ['#000000', '#85929e', '#333333'], // Black, Rich Black, Dark Gray
  },
  {
    id: 4,
    image: '/images/esf-clothes/esf-tshirt-3.jpeg',
    title: 'The Hype Tee',
    price: 480.0,
    originalPrice: 550.0,
    discount: '18% OFF',
    colors: ['#000000', '#36454F', '#1B1B1B'], // Black, Charcoal, Deep Black
  },
  {
    id: 5,
    image: '/images/esf-clothes/esf-tshirt-2.jpeg',
    title: 'ShadowFlex Tee',
    price: 588.0,
    colors: ['#000000', '#1B1B1B', '#36454F'], // Black, Charcoal, Deep Black
  },
  {
    id: 6,
    image: '/images/esf-clothes/esf-tshirt-1.jpeg',
    title: 'Tiger Strike T-Shirt',
    price: 2360.0,
    colors: ['#000000', '#1B1B1B', '#36454F'], // Black, Charcoal, Deep Black
  },
  {
    id: 7,
    image: '/images/esf-clothes/esf-zipper-hoodie-2.jpg',
    title: 'Drip Essential Hoodie',
    price: 1399.0,
    colors: ['#000000', '#1B1B1B', '#36454F'], // Black, Charcoal, Deep Black
  },
  {
    id: 8,
    image: '/images/esf-clothes/esf-zipper-hoodie-3.jpg',
    title: 'Redline Zipper Hoodie',
    price: 1248.0,
    originalPrice: 1689.0,
    discount: '11% OFF',
    colors: ['#000000', '#FFC300', '#F5F5F5'], // Black, Dark Gray, Rich Black    colors: ['#000000', '#1B1B1B', '#36454F'], // Black, Charcoal, Deep Black
  },
];

// Add ColorDots component
const ColorDots = ({
  colors,
  showMore = false,
}: {
  colors: string[];
  showMore?: boolean;
}) => (
  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3">
    {colors.slice(0, 3).map((color, index) => (
      <button
        key={index}
        className="w-7 h-7 rounded-full border-2 border-white shadow-lg 
          hover:scale-110 transition-transform duration-200 
          ring-2 ring-black/10"
        style={{ backgroundColor: color }}
        aria-label={`Select color ${index + 1}`}
      />
    ))}
    {showMore && colors.length > 3 && (
      <button
        className="w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm 
          flex items-center justify-center text-black text-xs font-medium
          shadow-lg hover:scale-110 transition-transform duration-200
          ring-2 ring-black/10"
        aria-label="More colors available"
      >
        +{colors.length - 3}
      </button>
    )}
  </div>
);

const WinterFashionSection = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);
  const [isHovered, setIsHovered] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const itemsPerPageRef = useRef(4);
  const totalPagesRef = useRef(Math.ceil(fashionItems.length / 4));
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(false);
  const autoScrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartXRef = useRef<number>(0);

  // Handle mounted state
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle responsive state
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkMobile = () => {
        const isMobileView = window.innerWidth < 768;
        setIsMobile(isMobileView);
        itemsPerPageRef.current = isMobileView ? 2 : 4;
        totalPagesRef.current = Math.ceil(
          fashionItems.length / itemsPerPageRef.current
        );
      };

      checkMobile();
      window.addEventListener('resize', checkMobile);

      // Enable auto-scroll after component is mounted
      setAutoScrollEnabled(true);

      return () => window.removeEventListener('resize', checkMobile);
    }
  }, []);

  const currentItems = mounted
    ? fashionItems.slice(
        currentPage * itemsPerPageRef.current,
        (currentPage + 1) * itemsPerPageRef.current
      )
    : [];

  const handlePrevious = useCallback(() => {
    setIsLoading(true);
    setCurrentPage(prev => (prev > 0 ? prev - 1 : prev));
    setTimeout(() => setIsLoading(false), 300);
  }, []);

  const handleNext = useCallback(() => {
    setIsLoading(true);
    setCurrentPage(prev =>
      prev < totalPagesRef.current - 1 ? prev + 1 : prev
    );
    setTimeout(() => setIsLoading(false), 300);
  }, []);

  // Auto scroll function
  const autoScroll = useCallback(() => {
    if (mounted && isMobile && autoScrollEnabled) {
      autoScrollTimeoutRef.current = setTimeout(() => {
        setCurrentPage(prev => (prev + 1) % totalPagesRef.current);
      }, 3000); // Change slide every 3 seconds
    }
  }, [isMobile, autoScrollEnabled, mounted]);

  // Handle auto scroll
  useEffect(() => {
    if (autoScrollTimeoutRef.current) {
      clearTimeout(autoScrollTimeoutRef.current);
    }

    if (mounted) {
      autoScroll();
    }

    return () => {
      if (autoScrollTimeoutRef.current) {
        clearTimeout(autoScrollTimeoutRef.current);
      }
    };
  }, [currentPage, autoScroll, mounted]);

  // Handle touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    setAutoScrollEnabled(false);
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartXRef.current - touchEndX;

    if (Math.abs(diffX) > 50) {
      // Minimum swipe distance
      if (diffX > 0 && currentPage < totalPagesRef.current - 1) {
        handleNext();
      } else if (diffX < 0 && currentPage > 0) {
        handlePrevious();
      }
    }

    // Resume auto scroll after 5 seconds of no interaction
    setTimeout(() => setAutoScrollEnabled(true), 5000);
  };

  // If not mounted yet, render a placeholder with the same dimensions
  if (!mounted) {
    return (
      <section className="px-4 sm:px-6 lg:px-12 py-12 sm:py-16  mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-12 gap-4">
          <div>
            <h2 className="text-black text-3xl sm:text-4xl md:text-5xl font-normal mb-2">
              Essancia Winter Fashion
            </h2>
            <p className="text-sm text-black">Loading items...</p>
          </div>
          <div className="px-4 sm:px-6 py-3 bg-primary-500 text-black rounded-full">
            <span>View Collection</span>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {[1, 2, 3, 4].map(item => (
            <div key={item} className="animate-pulse">
              <div className="aspect-[3/4] bg-gray-200 rounded-xl mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 sm:px-6 lg:px-12 py-12 sm:py-16 mx-auto">
      {/* Enhanced Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-12 gap-4">
        <div>
          <h2 className="text-black text-3xl sm:text-4xl md:text-5xl font-normal mb-2">
            Essancia Fashion
          </h2>
          <p className="text-sm text-black">
            {currentPage * itemsPerPageRef.current + 1}-
            {Math.min(
              (currentPage + 1) * itemsPerPageRef.current,
              fashionItems.length
            )}{' '}
            of {fashionItems.length} items
          </p>
        </div>
        <Button href="/collections" variant="primary" className="rounded-full">
          View Collection
        </Button>
      </div>

      <div className="relative">
        <div
          className="overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Navigation Buttons - Hidden on mobile */}
          {!isMobile && (
            <>
              {currentPage > 0 && (
                <button
                  onClick={handlePrevious}
                  className="absolute -left-6 sm:-left-8 top-[35%] -translate-y-1/2 z-10 
                    w-12 h-12 sm:w-14 sm:h-14 bg-white shadow-lg rounded-full 
                    flex items-center justify-center
                    hover:bg-gray-50 hover:scale-110 active:scale-95
                    transition-all duration-300 ease-out
                    ring-2 ring-black/5"
                  aria-label="Previous items"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="w-6 h-6 sm:w-7 sm:h-7 text-gray-800"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
              )}

              {currentPage < totalPagesRef.current - 1 && (
                <button
                  onClick={handleNext}
                  className="absolute -right-6 sm:-right-8 top-[35%] -translate-y-1/2 z-10 
                    w-12 h-12 sm:w-14 sm:h-14 bg-white shadow-lg rounded-full 
                    flex items-center justify-center
                    hover:bg-gray-50 hover:scale-110 active:scale-95
                    transition-all duration-300 ease-out
                    ring-2 ring-black/5"
                  aria-label="Next items"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="w-6 h-6 sm:w-7 sm:h-7 text-gray-800"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              )}
            </>
          )}

          {/* Conditional rendering based on device */}
          {isMobile ? (
            // Mobile Slider Layout
            <div
              className="flex flex-nowrap transition-transform duration-300 ease-out"
              style={{
                transform: `translateX(-${currentPage * 100}%)`,
              }}
            >
              {fashionItems.map(item => (
                <div
                  key={item.id}
                  className="w-full flex-shrink-0 px-2 animate-fadeIn cursor-pointer group"
                >
                  {item.discount && (
                    <span
                      className="absolute top-3 right-3 z-10
                      bg-red-500 text-white text-xs px-3 py-1 rounded-full
                      shadow-lg"
                    >
                      {item.discount}
                    </span>
                  )}
                  <div
                    className="aspect-[3/4] relative overflow-hidden rounded-xl mb-4 
                    bg-gradient-to-b from-gray-50 to-gray-100 
                    group-hover:shadow-xl transition-all duration-500 ease-out"
                    onClick={() => {
                      console.log(item.id, 'redirect to collection page');
                      router.push(`/collections/jackets/${item.id}`);
                    }}
                  >
                    <div
                      className={`w-full h-full transform transition-all duration-700 relative
                      ${isHovered === item.id ? 'scale-110' : 'scale-100'}`}
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        priority={currentPage === 0 && item.id <= 4}
                      />
                    </div>

                    {/* Color dots overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-t 
                      from-black/40 via-transparent to-transparent
                      transition-opacity duration-300 ease-out
                      ${isHovered === item.id ? 'opacity-100' : 'opacity-0'}`}
                    >
                      <ColorDots colors={item.colors} showMore={true} />
                    </div>
                  </div>

                  {/* Centered title and price for mobile */}
                  <div
                    className="space-y-2 transition-transform duration-300 ease-out
                    group-hover:translate-y-[-4px] text-center sm:text-left"
                  >
                    <h3
                      className="text-black text-base  sm:text-lg font-medium transition-colors 
                      duration-300 group-hover:text-black"
                    >
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-3 justify-center sm:justify-start">
                      <span className="text-lg font-semibold text-black">
                        ₹{item.price.toFixed(2)}
                      </span>
                      {item.originalPrice && (
                        <span className="text-black line-through text-sm">
                          ₹{item.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Desktop Grid Layout
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 
                gap-6 sm:gap-8 transition-opacity duration-300 
                ${isLoading ? 'opacity-50' : 'opacity-100'}`}
            >
              {currentItems.map(item => (
                <div
                  key={item.id}
                  className="relative animate-fadeIn cursor-pointer group"
                  onMouseEnter={() => setIsHovered(item.id)}
                  onMouseLeave={() => setIsHovered(null)}
                >
                  {item.discount && (
                    <span
                      className="absolute top-3 right-3 z-10
                      bg-red-500 text-white text-xs px-3 py-1 rounded-full
                      shadow-lg"
                    >
                      {item.discount}
                    </span>
                  )}
                  <div
                    className="aspect-[3/4] relative overflow-hidden rounded-xl mb-4 
                    bg-gradient-to-b from-gray-50 to-gray-100 
                    group-hover:shadow-xl transition-all duration-500 ease-out"
                    onClick={() => {
                      console.log(item.id, 'redirect to collection page');
                      router.push(`/collections/jackets/${item.id}`);
                    }}
                  >
                    <div
                      className={`w-full h-full transform transition-all duration-700 relative
                      ${isHovered === item.id ? 'scale-110' : 'scale-100'}`}
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        priority={currentPage === 0 && item.id <= 4}
                      />
                    </div>

                    {/* Color dots overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-t 
                      from-black/40 via-transparent to-transparent
                      transition-opacity duration-300 ease-out
                      ${isHovered === item.id ? 'opacity-100' : 'opacity-0'}`}
                    >
                      <ColorDots colors={item.colors} showMore={true} />
                    </div>
                  </div>

                  <div
                    className="space-y-2 transition-transform duration-300 ease-out
                    group-hover:translate-y-[-4px]"
                  >
                    <h3
                      className=" text-black text-base sm:text-lg font-medium transition-colors 
                      duration-300 group-hover:text-black"
                    >
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-semibold text-black">
                        ₹{item.price.toFixed(2)}
                      </span>
                      {item.originalPrice && (
                        <span className="text-black line-through text-sm">
                          ₹{item.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Enhanced Mobile Pagination Dots */}
          {isMobile && (
            <div className="flex justify-center mt-8 gap-3 px-4">
              {Array.from({ length: totalPagesRef.current }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentPage(index);
                    setAutoScrollEnabled(false);
                    setTimeout(() => setAutoScrollEnabled(true), 3000);
                  }}
                  className={`h-2.5 rounded-md transition-all duration-300
                    ${currentPage === index ? 'w-8 bg-black' : 'w-2.5 bg-gray-300'}
                    relative overflow-hidden shadow-sm`}
                  aria-label={`Go to page ${index + 1}`}
                >
                  {currentPage === index && autoScrollEnabled && (
                    <span
                      className="absolute inset-0 bg-black"
                      style={{
                        transformOrigin: 'left',
                        animation: 'progress 3s linear infinite',
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Desktop Page Indicators */}
          {!isMobile && (
            <div className="flex justify-center mt-12 gap-3">
              {Array.from({ length: totalPagesRef.current }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`h-2 rounded-full transition-all duration-500 ease-out
                    ${
                      currentPage === index
                        ? 'w-8 bg-black'
                        : 'w-2 bg-gray-300 hover:bg-gray-400 hover:scale-110'
                    }`}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// Export the component wrapped in ClientOnly to prevent hydration errors
const WinterFashionSectionWithClientOnly = () => (
  <ClientOnly>
    <WinterFashionSection />
  </ClientOnly>
);

export default WinterFashionSectionWithClientOnly;
