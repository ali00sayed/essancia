'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    id: 1,
    image: '/images/f1.webp',
    title: 'Men leather jacket',
    price: 210.0,
    alt: 'Summer fashion model 1',
    category: "1-Men's Fashion",
  },
  {
    id: 2,
    image: '/images/i1.webp',
    title: 'Women casual wear',
    price: 180.0,
    discount: '15% OFF',
    alt: 'Summer fashion model 2',
    category: "Women's Fashion",
  },
  {
    id: 3,
    image: '/images/m4.webp',
    title: 'Summer collection',
    price: 150.0,
    alt: 'Summer fashion model 3',
    category: "Men's Fashion",
  },
  {
    id: 4,
    image: '/images/d1.webp',
    title: 'Men leather jacket',
    price: 210.0,
    alt: 'Summer fashion model 1',
    category: "Men's Fashion",
  },
  {
    id: 5,
    image: '/images/c1.webp',
    title: 'Women casual wear',
    price: 180.0,
    discount: '15% OFF',
    alt: 'Summer fashion model 2',
    category: "Women's Fashion",
  },
  {
    id: 6,
    image: '/images/b1.webp',
    title: 'Summer collection',
    price: 150.0,
    alt: 'Summer fashion model 3',
    category: "Men's Fashion",
  },
];

const SummerCollection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    if (!sectionRef.current || cardsRef.current.length === 0) return;

    const cardHeight = cardsRef.current[0]?.offsetHeight || 0;
    const totalScroll = cardHeight * (cards.length - 1);
    const middleOffset = (window.innerHeight - cardHeight) / 2;
    const startOffset = cardHeight * Math.floor(cards.length / 2);

    // Initial setup
    gsap.set(cardsRef.current, {
      y: i => middleOffset + i * cardHeight - startOffset,
      opacity: 0,
      scale: 0.9,
      rotateY: -15,
    });

    // Fade in animation
    gsap.to(cardsRef.current, {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
    });

    // Content animation
    gsap.from(contentRef.current?.children || [], {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
    });

    // Scroll animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${totalScroll}`,
        scrub: 1.5,
        pin: true,
        anticipatePin: 1,
      },
      onComplete: () => {
        ScrollTrigger.refresh();
      },
    });

    // Animate cards from middle position
    cardsRef.current.forEach(card => {
      if (card) {
        tl.to(
          card,
          {
            y: middleOffset - (totalScroll + startOffset),
            ease: 'none',
          },
          0
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background with overlay - removed parallax */}
        <div className="absolute inset-0 bg-[#F8F8F8]">
          <Image
            src="/images/slider_3.webp"
            alt="Summer collection background"
            fill
            className="object-cover object-right"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>

        <div className="relative h-full max-w-[1400px] mx-auto px-4">
          {/* Enhanced content section */}
          <div
            ref={contentRef}
            className="absolute left-0 top-[25%] max-w-[600px] text-white z-20 space-y-8"
          >
            <h2 className="text-[72px] font-light leading-[1.1] animate-fade-in">
              Perfect Picks for
              <span className="block bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">
                Hot Summer Days
              </span>
            </h2>
            <p className="text-xl opacity-90 leading-relaxed">
              Stay cool & stylish all summer long with our perfect picks for hot
              summer days.
            </p>
            <button
              className="group bg-white text-black px-8 py-3 rounded-full
              hover:bg-black hover:text-white transition-all duration-300
              transform hover:scale-105 hover:shadow-lg"
            >
              SHOP NOW
              <span className="inline-block ml-2 transform group-hover:translate-x-1 transition-transform">
                →
              </span>
            </button>
          </div>

          {/* Enhanced cards section - with smaller size */}
          <div className="absolute right-[8%] h-screen flex items-center">
            <div className="relative flex flex-col items-center">
              {cards.map((card, index) => (
                <div
                  key={card.id}
                  ref={el => {
                    cardsRef.current[index] = el;
                  }}
                  className="relative w-[350px] transform-gpu mb-4"
                  onMouseEnter={() => setHoveredCard(card.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div
                    className={`bg-white rounded-xl overflow-hidden shadow-lg
                    transform transition-all duration-500
                    ${hoveredCard === card.id ? 'scale-105 shadow-2xl' : ''}`}
                  >
                    <div className="relative aspect-[3/4] rounded-xl overflow-hidden">
                      {card.discount && (
                        <span
                          className="absolute top-3 right-3 bg-red-500 text-white
                          px-3 py-0.5 rounded-full z-10 shadow-lg text-sm"
                        >
                          {card.discount}
                        </span>
                      )}
                      <Image
                        src={card.image}
                        alt={card.alt}
                        fill
                        className={`object-cover transition-transform duration-700
                          ${hoveredCard === card.id ? 'scale-110' : 'scale-100'}`}
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 
                        transition-opacity duration-300 hover:opacity-100"
                      />
                    </div>
                    <div className="p-4 space-y-1">
                      <p className="text-xs text-gray-500">{card.category}</p>
                      <h3 className="text-base font-medium text-gray-900">
                        {card.title}
                      </h3>
                      <p className="text-lg font-semibold text-gray-900">
                        ${card.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SummerCollection;
