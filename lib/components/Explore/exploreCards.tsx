'use client';
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Image from 'next/image'; // Using Next.js Image for better performance
import Link from 'next/link';

type Image = {
  src: string;
};

type Category = {
  id: string;
  title: string;
  images: Image[];
};

interface ExploreCardsProps {
  categories: Category[];
}

gsap.registerPlugin(ScrollTrigger);

const Explore: React.FC<ExploreCardsProps> = ({ categories }) => {
  // const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Handle responsive state
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const sections = sectionRefs.current.filter((ref): ref is HTMLElement =>
      Boolean(ref)
    );

    if (!container || sections.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.set(sections, {
        position: 'absolute',
        width: '100%',
        height: '100%',
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: isMobile ? 0.8 : 1.2,
          start: 'top top',
          end: `+=${sections.length * 100}%`,
          onUpdate: self => {
            const newIndex = Math.round(self.progress * (sections.length - 1));
            setActiveIndex(newIndex);
          },
        },
      });

      sections.forEach((section, i) => {
        const card = section.querySelector('.card-wrapper');
        const content = section.querySelector('.content-wrapper');
        const image = section.querySelector('.image-wrapper');
        const title = section.querySelector('.title-line');
        const description = section.querySelector('.description');

        if (i === 0) {
          gsap.set(section, { opacity: 1, scale: 1 });
        } else {
          gsap.set(section, { opacity: 0, scale: 0.8 });
        }

        // Exit animation
        timeline.to(
          sections[i - 1],
          {
            opacity: 0,
            scale: 0.8,
            duration: 1,
            ease: 'power2.inOut',
          },
          i
        );

        // Enter animation
        timeline.fromTo(
          section,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 1, ease: 'power2.inOut' },
          i
        );

        if (card && content && image && title && description) {
          // Card animation
          timeline.fromTo(
            card,
            { y: 100, rotation: isMobile ? -3 : -5 },
            { y: 0, rotation: 0, duration: 1 },
            i
          );

          // Content animation
          timeline.fromTo(
            [title, description],
            { opacity: 0, x: isMobile ? -20 : -30 },
            {
              opacity: 1,
              x: 0,
              duration: 0.6,
              stagger: 0.1,
              ease: 'power2.out',
            },
            i + 0.3
          );

          // Image animation
          timeline.fromTo(
            image,
            { scale: 1.2, filter: 'brightness(0.5)' },
            { scale: 1, filter: 'brightness(1)', duration: 1.5 },
            i
          );
        }
      });
    });

    return () => ctx.revert();
  }, [categories.length, isMobile]);

  const handleSkip = (): void => {
    const categoryShowcase = document.querySelector('#category-showcase');
    if (categoryShowcase) {
      const yOffset = -80;
      const y =
        categoryShowcase.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={containerRef}
      className=" h-screen overflow-hidden bg-gradient-to-br from-white via-gray-50 to-gray-100 relative"
    >
      {/* Progress indicator */}
      <div className="fixed top-1/2 right-4 md:right-8 transform -translate-y-1/2 z-50">
        <div className="flex flex-col gap-2 md:gap-3">
          {categories.map((_, i) => (
            <div
              key={i}
              className={`w-1 rounded-full transition-all duration-300 
                ${
                  i === activeIndex
                    ? 'h-8 md:h-12 bg-black'
                    : 'h-3 md:h-4 bg-black/30'
                }`}
            />
          ))}
        </div>
      </div>

      <div className="relative h-full">
        {categories.map((category, index) => (
          <section
            key={category.id}
            ref={el => {
              sectionRefs.current[index] = el;
            }}
            className="absolute inset-0 w-full h-full flex items-center justify-center px-4 md:px-0"
          >
            {/* Background Image with updated overlay */}
            <div className="absolute inset-0 image-wrapper">
              <Image
                src={category.images[0].src}
                alt={category.title}
                fill
                className="object-cover opacity-60 transition-transform duration-1000"
                sizes="100vw"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/80 to-transparent" />
            </div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-20">
              {/* Text Content */}
              <div className="text-black space-y-4 md:space-y-6 w-full md:w-[400px] text-center md:text-left">
                <h2 className="title-line text-4xl md:text-6xl font-light leading-tight">
                  {category.title}
                </h2>
                <div className="h-0.5 w-16 md:w-24 bg-black/30 mx-auto md:mx-0" />
                <p className="description text-gray-600 text-base md:text-lg max-w-md mx-auto md:mx-0">
                  Discover our latest collection of{' '}
                  {category.title.toLowerCase()}, featuring unique designs and
                  premium quality.
                </p>
                <Link href="/collections">
                  <button
                    ref={buttonRef}
                    className="bg-black relative mt-4 md:mt-8 px-6 md:px-8 py-2.5 md:py-3 
                    rounded-full transition-all duration-300 group
                    text-sm md:text-base overflow-hidden"
                  >
                    {/* Button content */}
                    <span
                      className=" relative z-10 flex items-center gap-2 text-white
                    group-hover:text-white transition-colors duration-300"
                    >
                      Explore Collection
                      <svg
                        className="w-4 h-4 transition-transform duration-300
                        group-hover:translate-x-1"
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

              {/* Card with updated styling */}
              <div className="card-wrapper perspective-1000">
                <div
                  className="relative w-[280px] h-[350px] md:w-[400px] md:h-[500px] 
                  rounded-xl md:rounded-2xl overflow-hidden 
                  shadow-[0_8px_32px_rgba(0,0,0,0.1)] 
                  transform-gpu hover:scale-[1.02] transition-all duration-500 group
                  bg-white/80 backdrop-blur-sm"
                >
                  <Image
                    src={category.images[0].src}
                    alt={category.title}
                    fill
                    className="object-cover transition-all duration-700 
                      group-hover:scale-110 group-hover:rotate-1"
                    sizes="(max-width: 768px) 280px, 400px"
                    priority={index === 0}
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t 
                    from-white/60 via-transparent to-white/20
                    group-hover:opacity-80 transition-opacity duration-500"
                  />
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Updated Skip button */}
      <button
        onClick={handleSkip}
        className={`
          fixed bottom-4 md:bottom-8 right-4 md:right-8 z-50 
          px-4 md:px-6 py-2 md:py-3 rounded-full flex items-center gap-2
          transition-all duration-300 text-sm md:text-base
          text-gray-600 hover:text-gray-900
          ${activeIndex > 0 ? 'bg-black/5' : 'bg-black/10'} 
          backdrop-blur-sm hover:bg-black/15
        `}
        aria-label="Skip to next section"
      >
        <span className="hidden md:inline">Skip</span>
        <svg
          className="w-4 h-4 md:w-5 md:h-5 animate-bounce"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </button>
    </div>
  );
};

export default Explore;
