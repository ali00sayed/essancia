'use client';
import React, { useState } from 'react';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

type pos = {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
};
const categories = [
  {
    id: 'new-arrival',
    title: 'New Arrivals',
    color: 'text-white/90 hover:text-white',
    images: [
      {
        src: '/images/essancia-cloths/brand-35.jpeg',
        position: { top: '20%', left: '15%' },
      },
      {
        src: '/images/essancia-cloths/brand-25.jpeg',
        position: { top: '20%', right: '15%' },
      },
    ],
  },
  {
    id: 'most popular',
    title: 'Most Popular',
    color: 'text-white/90 hover:text-white',
    images: [
      {
        src: '/images/essancia-cloths/brand-1.3.jpeg',

        position: { top: '20%', left: '15%' },
      },
      {
        src: '/images/essancia-cloths/brand-1.jpeg',

        position: { top: '20%', right: '15%' },
      },
    ],
  },
  {
    id: 'bestseller',
    title: 'Best Seller',
    color: 'text-white/90 hover:text-white',
    images: [
      {
        src: '/images/essancia-cloths/brand-9.jpeg',
        position: { top: '20%', left: '15%' },
      },
      {
        src: '/images/essancia-cloths/brand-11.jpeg',
        position: { top: '20%', right: '15%' },
      },
    ],
  },

  {
    id: 'summer',
    title: 'Summer',
    color: 'text-white/90 hover:text-white',
    images: [
      {
        src: '/images/showcase-category/summer-2.jpeg',
        position: { top: '20%', left: '15%' },
      },
      {
        src: '/images/showcase-category/summer-men-1.jpeg',
        position: { top: '20%', right: '15%' },
      },
    ],
  },
  {
    id: 'winter',
    title: 'Winter',
    color: 'text-white/90 hover:text-white',
    images: [
      {
        src: '/images/showcase-category/winter-1.jpeg',
        position: { top: '20%', left: '15%' },
      },
      {
        src: '/images/showcase-category/winter-2.jpeg',
        position: { top: '20%', right: '15%' },
      },
    ],
  },
];

const CategoryShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<Map<string, HTMLDivElement[]>>(new Map());
  const animationRef = useRef<gsap.Context | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useLayoutEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    animationRef.current = gsap.context(() => {}, containerRef);

    // Initial animation for the component
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.querySelector('.section-title'),
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.3 }
      );

      gsap.fromTo(
        containerRef.current.querySelectorAll('.category-title'),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          delay: 0.5,
        }
      );
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      animationRef.current?.revert();
    };
  }, []);

  const handleCategoryHover = (categoryId: string) => {
    setIsHovering(true);
    const images = imagesRef.current.get(categoryId) || [];

    // Optimized title animations with better performance
    gsap.to('.category-title', {
      opacity: 0.4,
      y: 10,
      scale: 0.98,
      filter: 'blur(0.5px)',
      textShadow: 'none',
      letterSpacing: '0',
      duration: 0.3,
      ease: 'power2.out',
      overwrite: true,
    });

    const activeTitle = document.getElementById(`category-${categoryId}`);
    if (activeTitle) {
      gsap.to(activeTitle, {
        opacity: 1,
        y: 0,
        scale: 1.05,
        filter: 'blur(0px)',
        textShadow: '0 0 30px rgba(255, 255, 255, 0.3)',
        letterSpacing: '0.05em',
        duration: 0.3,
        ease: 'power2.out',
        overwrite: true,
      });
    }

    // Enhanced image reveal animation with better performance
    images.forEach((image, index) => {
      const isLeft = index === 0;
      gsap.set(image, {
        opacity: 0,
        scale: 0.9,
        rotationY: isLeft ? -15 : 15,
        y: isLeft ? 50 : -50,
        force3D: true,
        backfaceVisibility: 'hidden',
      });

      gsap.to(image, {
        opacity: 1,
        scale: 1,
        rotationY: 0,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        force3D: true,
      });

      // Optimize continuous animations
      const img = image.querySelector('img');
      if (img) {
        gsap.to(img, {
          scale: 1.1,
          duration: 10,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          force3D: true,
        });
      }
    });

    // Enhanced background transition
    if (containerRef.current) {
      gsap.to(containerRef.current.querySelector('.overlay'), {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        duration: 0.8,
        ease: 'power2.inOut',
      });

      gsap.to(containerRef.current.querySelector('.bg-image'), {
        scale: 1.05,
        opacity: 0.6,
        filter: 'brightness(1.1)',
        duration: 1.2,
        ease: 'power2.out',
      });

      gsap.to(containerRef.current.querySelector('.section-title'), {
        opacity: 0.6,
        y: -10,
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  };

  const handleCategoryExit = (categoryId: string) => {
    setIsHovering(false);
    const currentImages = imagesRef.current.get(categoryId) || [];

    // Enhanced title reset animation
    categories.forEach((category, index) => {
      const element = document.getElementById(`category-${category.id}`);
      if (element) {
        gsap.to(element, {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          textShadow: 'none',
          letterSpacing: '0',
          duration: 0.3,
          delay: index * 0.02,
          ease: 'power1.out',
          overwrite: true,
        });
      }
    });

    // Enhanced image exit animation
    currentImages.forEach((image, index) => {
      gsap.killTweensOf(image);
      gsap.killTweensOf(image.querySelector('img'));

      const isLeft = index === 0;

      gsap.to(image, {
        opacity: 0,
        scale: 0.95,
        rotationY: isLeft ? -15 : 15,
        y: isLeft ? -50 : 50,
        duration: 0.5,
        ease: 'power3.inOut',
      });
    });

    // Enhanced background reset
    if (containerRef.current) {
      gsap.to(containerRef.current.querySelector('.overlay'), {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        duration: 0.6,
        ease: 'power2.inOut',
      });

      gsap.to(containerRef.current.querySelector('.bg-image'), {
        scale: 1,
        opacity: 0.9,
        filter: 'brightness(1.2)',
        duration: 0.8,
        ease: 'power2.inOut',
      });

      gsap.to(containerRef.current.querySelector('.section-title'), {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    if (isMobile) {
      setActiveCategory(prevActive => {
        // If clicking the same category, close it
        if (prevActive === categoryId) {
          const targetCategory = document.getElementById(
            `category-${categoryId}`
          );
          const imageGrid = targetCategory?.nextElementSibling;

          if (targetCategory && imageGrid) {
            const tl = gsap.timeline({
              defaults: { ease: 'power2.inOut' },
              onComplete: () => {
                (imageGrid as HTMLElement).style.display = 'none';
              },
            });

            // Kill any existing tweens
            gsap.killTweensOf([imageGrid, targetCategory]);

            // Animate grid items out first
            tl.to(imageGrid.querySelectorAll('.relative'), {
              y: -10,
              opacity: 0,
              duration: 0.2,
              stagger: {
                amount: 0.15,
                from: 'end',
              },
            })
              .to(
                targetCategory.querySelector('span:last-child'),
                {
                  rotation: 0,
                  duration: 0.3,
                },
                '<+=0.1'
              )
              .to(
                targetCategory,
                {
                  color: '#FFFFFF99',
                  duration: 0.2,
                },
                '<'
              )
              .to(
                imageGrid,
                {
                  height: 0,
                  paddingTop: 0,
                  paddingBottom: 0,
                  duration: 0.3,
                  clearProps: 'all',
                },
                '<+=0.1'
              );

            return null;
          }
          return null;
        }

        // If there's a previously active category, close it first
        if (prevActive) {
          const prevCategory = document.getElementById(
            `category-${prevActive}`
          );
          const prevImageGrid = prevCategory?.nextElementSibling;

          if (prevCategory && prevImageGrid) {
            const closeTl = gsap.timeline({
              defaults: { ease: 'power2.inOut' },
              onComplete: () => {
                (prevImageGrid as HTMLElement).style.display = 'none';
              },
            });

            // Kill any existing tweens
            gsap.killTweensOf([prevImageGrid, prevCategory]);

            closeTl
              .to(prevImageGrid.querySelectorAll('.relative'), {
                y: -10,
                opacity: 0,
                duration: 0.2,
                stagger: {
                  amount: 0.15,
                  from: 'end',
                },
              })
              .to(
                prevCategory.querySelector('span:last-child'),
                {
                  rotation: 0,
                  duration: 0.3,
                },
                '<+=0.1'
              )
              .to(
                prevCategory,
                {
                  color: '#FFFFFF99',
                  duration: 0.2,
                },
                '<'
              )
              .to(
                prevImageGrid,
                {
                  height: 0,
                  paddingTop: 0,
                  paddingBottom: 0,
                  duration: 0.3,
                  clearProps: 'all',
                },
                '<+=0.1'
              );
          }
        }

        // Open new category
        const targetCategory = document.getElementById(
          `category-${categoryId}`
        );
        const imageGrid = targetCategory?.nextElementSibling;

        if (targetCategory && imageGrid) {
          // Kill any existing tweens
          gsap.killTweensOf([imageGrid, targetCategory]);

          // Show grid first
          (imageGrid as HTMLElement).style.display = 'grid';

          // Get the auto height and store original styles
          const autoHeight = (imageGrid as HTMLElement).scrollHeight;

          // Create timeline for opening
          const openTl = gsap.timeline({
            defaults: { ease: 'power2.out' },
          });

          // Set initial states
          gsap.set(imageGrid, {
            height: 0,
            paddingTop: 0,
            paddingBottom: 0,
          });

          gsap.set(imageGrid.querySelectorAll('.relative'), {
            y: 20,
            opacity: 0,
          });

          // Smooth opening sequence
          openTl
            .to(targetCategory, {
              color: '#FFFFFF',
              duration: 0.3,
            })
            .to(
              targetCategory.querySelector('span:last-child'),
              {
                rotation: 180,
                duration: 0.4,
                ease: 'back.out(1.7)',
              },
              '<'
            )
            .to(
              imageGrid,
              {
                height: autoHeight,
                paddingTop: '1rem',
                paddingBottom: '1.5rem',
                duration: 0.4,
                ease: 'power4.out',
              },
              '<+=0.1'
            )
            .to(
              imageGrid.querySelectorAll('.relative'),
              {
                y: 0,
                opacity: 1,
                duration: 0.3,
                stagger: {
                  amount: 0.2,
                  ease: 'power2.out',
                },
              },
              '<+=0.1'
            );
        }

        return categoryId;
      });
    }
  };

  return (
    <div
      id="category-showcase"
      ref={containerRef}
      className="relative min-h-[90vh] overflow-hidden py-16 sm:py-20"
    >
      {/* Background with optimized blur */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-section/hero-1.jpeg"
          alt="background"
          className="bg-image w-full h-full object-cover opacity-90 transform-gpu filter brightness-[0.8] transition-all duration-700"
        />
        <div className="overlay absolute inset-0 bg-black/40 transition-all duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/80" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div
          className="relative flex flex-col items-center justify-center 
          min-h-[60vh] gap-5 sm:gap-6 md:gap-8 lg:gap-10 
          px-4 sm:px-6 md:px-8 max-w-4xl mx-auto"
        >
          {categories.map(category => (
            <div key={category.id} className="w-full md:w-auto">
              <h2
                id={`category-${category.id}`}
                className={`category-title text-3xl md:text-4xl lg:text-5xl font-medium cursor-pointer transform-gpu
                  transition-all duration-300 ease-out select-none relative group
                  ${isMobile ? 'flex items-center justify-between border-b border-white/20 pb-3' : ''}
                  ${activeCategory === category.id ? 'text-white' : category.color}
                  ${!isMobile ? 'hover:text-white' : ''}`}
                onClick={() => handleCategoryClick(category.id)}
                onMouseEnter={() =>
                  !isMobile && handleCategoryHover(category.id)
                }
                onMouseLeave={() =>
                  !isMobile && handleCategoryExit(category.id)
                }
              >
                <span className="relative inline-block tracking-wide">
                  {category.title}
                  {!isMobile && (
                    <span
                      className="absolute left-0 right-0 bottom-0 h-[1px] 
                      bg-gradient-to-r from-transparent via-white to-transparent 
                      transform scale-x-0 group-hover:scale-x-100 
                      transition-transform duration-500 ease-out"
                    />
                  )}
                </span>
                {isMobile && (
                  <span className="transform transition-transform duration-300 text-2xl">
                    ↓
                  </span>
                )}
              </h2>

              {/* Mobile Image Grid */}
              {isMobile && (
                <div
                  className={`grid grid-cols-2 gap-4 sm:gap-5 mt-4 pb-6 sm:pb-8 overflow-hidden will-change-transform
                    ${activeCategory === category.id ? 'block' : 'hidden'}`}
                >
                  {category.images.map((image, index) => (
                    <div
                      key={index}
                      className="relative aspect-[3/4] rounded-lg overflow-hidden 
                        transform transition-all duration-500 hover:scale-[1.03]
                        shadow-lg hover:shadow-xl will-change-transform"
                    >
                      <img
                        src={image.src}
                        alt={`${category.title} ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110 will-change-transform"
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-t 
                        from-black/80 via-black/30 to-transparent"
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-3 text-white text-sm font-light opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                        <div className="text-xs uppercase tracking-wider mb-1 opacity-70">
                          Featured
                        </div>
                        <div className="text-base">
                          {category.title} Collection
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Desktop category images */}
      {!isMobile &&
        categories.map(category => (
          <div key={category.id}>
            {category.images.map((image, imageIndex) => (
              <div
                key={`${category.id}-${imageIndex}`}
                ref={el => {
                  if (el) {
                    const images = imagesRef.current.get(category.id) || [];
                    images[imageIndex] = el;
                    imagesRef.current.set(category.id, images);
                  }
                }}
                className="absolute w-[280px] sm:w-[320px] md:w-[360px] lg:w-[400px] 
                  h-[420px] sm:h-[480px] md:h-[540px] lg:h-[600px] 
                  rounded-lg overflow-hidden opacity-0 shadow-xl transform-gpu cursor-pointer
                  transition-all duration-500"
                style={
                  {
                    ...image.position,
                    top: `calc(${image.position.top} - 5%)`,
                  } as pos
                }
              >
                <div className="w-full h-full transform-gpu">
                  <img
                    src={image.src}
                    alt={`${category.title} ${imageIndex + 1}`}
                    className="w-full h-full object-cover scale-105 transition-transform duration-10000 ease-in-out"
                  />
                  <div className="image-overlay absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

                  <div className="image-caption absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-10 opacity-0 transition-all duration-300">
                    <div className="text-xs uppercase tracking-widest mb-2 opacity-70">
                      Featured
                    </div>
                    <div className="text-xl font-light mb-1">
                      {category.title}
                    </div>
                    <div className="flex items-center mt-3">
                      <span className="text-sm font-light tracking-wider">
                        SHOP NOW
                      </span>
                      <span className="ml-2 text-xs">→</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}

      {/* Neon light effects */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-64 h-64 rounded-full bg-white/5 blur-[100px] animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-white/5 blur-[120px] animate-pulse-slow animation-delay-1000"></div>
      </div>

      {/* Subtle floating elements for visual interest */}
      <div
        className={`absolute top-1/4 left-1/4 w-32 h-32 border border-black/5 rounded-full transition-opacity duration-1000 ${isHovering ? 'opacity-0' : 'opacity-30'}`}
      ></div>
      <div
        className={`absolute bottom-1/3 right-1/4 w-48 h-48 border border-black/5 rounded-full transition-opacity duration-1000 ${isHovering ? 'opacity-0' : 'opacity-20'}`}
      ></div>
    </div>
  );
};

export default CategoryShowcase;
