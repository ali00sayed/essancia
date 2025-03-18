'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const CargosSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef1 = useRef<HTMLDivElement>(null);
  const imageRef2 = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (isMobile) {
        // Simplified mobile animations
        const elements = [imageRef1.current, imageRef2.current];
        elements.forEach((el, index) => {
          gsap.from(el, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.2,
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'top center',
              toggleActions: 'play none none none',
            },
          });
        });

        // Content animation for mobile
        const contentElements =
          contentRef.current?.querySelectorAll('h2, p') || [];
        const linkElement = contentRef.current?.querySelector('a');

        gsap.from(contentElements, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top bottom',
            end: 'top center',
            toggleActions: 'play none none none',
          },
        });

        // Separate animation for the link to ensure visibility
        if (linkElement) {
          gsap.set(linkElement, { opacity: 1, y: 0 });
        }
      } else {
        // Desktop animations
        gsap.from(imageRef1.current, {
          x: -100,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: imageRef1.current,
            start: 'top 80%',
            end: 'top 30%',
            scrub: 1,
          },
        });

        gsap.from(imageRef2.current, {
          x: 100,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: imageRef2.current,
            start: 'top 80%',
            end: 'top 30%',
            scrub: 1,
          },
        });

        // Content animation
        gsap.from(
          contentRef.current?.querySelectorAll('h2, p, button, a') || [],
          {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 70%',
              end: 'top 20%',
              scrub: 1,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#F5F5F5] min-h-screen flex items-center 
        px-4 sm:px-6 md:px-8 lg:px-16 py-16 sm:py-20 md:py-24 lg:py-28 
        overflow-hidden"
    >
      <div
        className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 
        gap-8 sm:gap-12 md:gap-16 lg:gap-20 relative"
      >
        {/* Left Side - Images with enhanced positioning */}
        <div
          className="relative min-h-[400px] sm:min-h-[500px] md:min-h-[600px] 
          w-full max-w-[600px] mx-auto lg:mx-0"
        >
          {/* Main Image */}
          <div
            ref={imageRef1}
            className="relative w-full aspect-[3/4] max-w-[300px] sm:max-w-[350px] 
              md:max-w-[400px] transform transition-transform duration-700 
              hover:scale-105 mx-auto lg:mx-0"
          >
            <Image
              src="/images/joggersCollections/jogger-1.jpeg"
              alt="Woman in blue sportswear"
              fill
              className="object-cover rounded-2xl shadow-2xl"
              priority
              sizes="(max-width: 768px) 80vw, (max-width: 1200px) 40vw, 33vw"
            />
            <div
              className="absolute inset-0 rounded-2xl 
              bg-gradient-to-t from-black/20 to-transparent"
            />
          </div>

          {/* Secondary Image - Enhanced positioning */}
          <div
            ref={imageRef2}
            className="absolute bottom-[-15%] sm:bottom-[-20%] md:bottom-[-23%] 
              right-[0%] sm:right-[3%] md:right-[7%] 
              w-[70%] sm:w-[75%] md:w-[80%] aspect-[3/4] 
              max-w-[300px] sm:max-w-[350px] md:max-w-[400px]
              transform transition-transform duration-700 hover:scale-105"
          >
            <Image
              src="/images/joggersCollections/jogger-15.jpeg"
              alt="Woman in black sportswear"
              fill
              className="object-cover rounded-2xl shadow-2xl"
              sizes="(max-width: 768px) 60vw, (max-width: 1200px) 35vw, 30vw"
            />
            <div
              className="absolute inset-0 rounded-2xl 
              bg-gradient-to-t from-black/20 to-transparent"
            />
          </div>
        </div>

        {/* Right Side - Enhanced Content */}
        <div
          ref={contentRef}
          className="flex flex-col justify-center lg:pl-8 
            text-center lg:text-left mt-12 lg:mt-0"
        >
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-normal 
              mb-6 sm:mb-8 leading-tight
              bg-gradient-to-r from-black via-black/80 to-black 
              bg-clip-text text-transparent"
          >
            Stylish and Perfect Cargo Picks.
          </h2>

          <div className="space-y-4 sm:space-y-6 text-gray-600">
            <p className="text-base sm:text-lg leading-relaxed">
              Discover the perfect blend of utility and style with our curated
              selection of cargo pants. Designed for comfort and durability, our
              collection ensures you stay effortlessly stylish while embracing
              everyday functionality.
            </p>

            <p className="text-base sm:text-lg leading-relaxed">
              Whether you&apos;re exploring the city, heading on an adventure,
              or just looking for a casual yet trendy look, our cargo pants
              offer the perfect balance of fashion and practicality. Explore our
              range today and redefine versatility in your wardrobe.
            </p>
          </div>

          <Link
            href="/collections/cargos"
            className="inline-flex items-center justify-center rounded-full mt-10 
              relative z-50 w-fit mx-auto lg:mx-0 bg-black text-white 
              hover:bg-gray-800 shadow-lg hover:shadow-xl 
              transition-all duration-300 px-8 py-2 text-lg font-medium
              !opacity-100 !translate-y-0"
          >
            View Cargos
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CargosSection;
