'use client';
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const SubHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  // const router = useRouter();

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
          className=" text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-xs sm:text-sm tracking-widest uppercase mb-4 
          sm:mb-6 animate-fadeIn"
        >
          Essancia Style Guide
        </span>

        <div className="relative space-y-6 sm:space-y-8">
          <h1
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-center font-light 
            text-white leading-tight sm:leading-tight md:leading-tight"
          >
            Tips for staying cool and comfortable while maintaining style in hot
            weather.
          </h1>

          <div
            className={`button-container flex sm:flex-row items-center justify-center gap-4
              ${isMobile ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} 
              transition-opacity duration-500`}
          >
            <Link href="/about-us">
              <button
                className="w-full sm:w-auto px-6 py-2.5 text-sm text-black
              hover:text-black transition-all duration-300 relative overflow-hidden
              group/button bg-white rounded-full border border-white
              hover:bg-white/90 active:scale-95"
              >
                <span className="relative z-10">Read More →</span>
              </button>
            </Link>

            <span className="hidden sm:block w-[1px] h-7 bg-white/20" />

            <Link href="/customize">
              <button
                className="w-full sm:w-auto px-6 py-2.5 text-sm text-white
              hover:text-white transition-all duration-300 relative overflow-hidden
              group/button bg-transparent rounded-full border border-white
              hover:bg-white/10 active:scale-95"
              >
                <span className="relative z-10">Customize →</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubHero;
