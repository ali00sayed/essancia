'use client';
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useRouter } from 'next/navigation';

gsap.registerPlugin(ScrollTrigger);

const SubHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  // Check for mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;

    if (!container || !content) return;

    const ctx = gsap.context(() => {
      // Animate lines
      gsap.fromTo(
        '.animated-line',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 80%',
          },
        }
      );

      // Animate content with buttons
      const elements = [...content.children];
      const buttons = content.querySelector('.button-container');

      gsap.fromTo(
        elements,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 80%',
          },
        }
      );

      // Special animation for buttons on mobile
      if (isMobile && buttons) {
        gsap.fromTo(
          buttons,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: 0.8,
            ease: 'power2.out',
          }
        );
      }
    });

    return () => ctx.revert();
  }, [isMobile]);

  const handleCustomize = () => {
    router.push('/customize');
  };

  return (
    <div
      ref={containerRef}
      className="bg-black min-h-[200px] relative group overflow-hidden 
        px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-12"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/5 via-transparent to-black/5" />

      {/* Main content */}
      <div
        ref={contentRef}
        className="flex flex-col items-center justify-center h-full relative 
          max-w-4xl mx-auto text-center"
      >
        <span
          className="text-white text-xs sm:text-sm tracking-widest uppercase mb-4 
          sm:mb-6 animate-fadeIn"
        >
          Summer Style Guide
        </span>

        <div className="relative space-y-6 sm:space-y-8">
          <h1
            className="text-6xl sm:text-4xl md:text-5xl lg:text-6xl text-center font-light 
            text-white leading-tight sm:leading-tight md:leading-tight"
          >
            Tips for staying cool and comfortable while maintaining style in hot
            weather.
          </h1>

          <div
            className={`button-container flex flex-col sm:flex-row items-center justify-center gap-4
              ${isMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} 
              transition-opacity duration-500`}
          >
            <button
              className="w-full sm:w-auto px-6 py-2.5 text-sm text-black
              hover:text-black transition-all duration-300 relative overflow-hidden
              group/button bg-white rounded-full border border-white
              hover:bg-white/90 active:scale-95"
            >
              <span className="relative z-10">Read More →</span>
            </button>

            <span className="hidden sm:block w-[1px] h-7 bg-white/20" />

            <button
              className="w-full sm:w-auto px-6 py-2.5 text-sm text-white
              hover:text-white transition-all duration-300 relative overflow-hidden
              group/button bg-transparent rounded-full border border-white
              hover:bg-white/10 active:scale-95"
              onClick={handleCustomize}
            >
              <span className="relative z-10">Customize →</span>
            </button>
          </div>
        </div>
      </div>

      {/* Corner decorations */}
      {/* <div
        className="absolute top-4 left-4 w-6 sm:w-8 h-6 sm:h-8 border-l border-t 
        border-black/10 group-hover:w-8 sm:group-hover:w-12 group-hover:h-8 
        sm:group-hover:h-12 transition-all duration-300"
      />
      <div
        className="absolute bottom-4 right-4 w-6 sm:w-8 h-6 sm:h-8 border-r 
        border-b border-black/10 group-hover:w-8 sm:group-hover:w-12 group-hover:h-8 
        sm:group-hover:h-12 transition-all duration-300"
      /> */}
    </div>
  );
};

export default SubHero;
