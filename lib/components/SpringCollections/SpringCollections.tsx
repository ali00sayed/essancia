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
    alt: 'Spring fashion model 1',
  },
  {
    id: 2,
    image: '/images/i1.webp',
    title: 'Women casual wear',
    price: 180.0,
    discount: '15% OFF',
    alt: 'Spring fashion model 2',
  },
  {
    id: 3,
    image: '/images/m4.webp',
    title: 'Spring collection',
    price: 150.0,
    alt: 'Spring fashion model 3',
  },
  {
    id: 4,
    image: '/images/d1.webp',
    title: 'Men leather jacket',
    price: 210.0,
    alt: 'Spring fashion model 4',
  },
  {
    id: 5,
    image: '/images/c1.webp',
    title: 'Women casual wear',
    price: 180.0,
    discount: '15% OFF',
    alt: 'Spring fashion model 5',
  },
  {
    id: 6,
    image: '/images/b1.webp',
    title: 'Spring collection',
    price: 150.0,
    alt: 'Spring fashion model 6',
  },
];

const SpringCollections = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    if (!sectionRef.current || cardsRef.current.length === 0) return;

    const cardHeight = cardsRef.current[0]?.offsetHeight || 0;
    const totalScroll = cardHeight * (cards.length - 1);
    const middleOffset = (window.innerHeight - cardHeight) / 2;
    const startOffset = cardHeight * Math.floor(cards.length / 2);

    // Set initial position with middle card centered
    gsap.set(cardsRef.current, {
      y: i => middleOffset + i * cardHeight - startOffset,
      opacity: 0,
      scale: 0.9,
      rotateY: -15,
    });

    // Fade in animation with 3D effect
    gsap.to(cardsRef.current, {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
    });

    // Enhanced scroll animation with middle card focus
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${totalScroll}`,
        scrub: 1.5,
        pin: true,
        anticipatePin: 1,
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
        <div className="absolute inset-0 bg-[#F8F8F8]">
          <Image
            src="/images/slider_2.webp"
            alt="Spring collection background"
            fill
            className="object-cover object-right"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>

        <div className="relative h-full max-w-[1400px] mx-auto px-4">
          <div className="absolute left-0 top-[25%] max-w-[600px] text-white z-20">
            <h2 className="text-[64px] font-light leading-[1.1] mb-6">
              Perfect Picks for Spring Days
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Stay fresh & stylish all spring long with our perfect picks for
              spring days.
            </p>
            <button className="bg-white text-black px-8 py-3 hover:bg-gray-100 transition-colors">
              SHOP NOW
            </button>
          </div>

          <div className="absolute right-[8%] h-screen flex items-center">
            <div className="relative flex flex-col">
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
                        className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent 
                        opacity-0 transition-opacity duration-300 hover:opacity-100"
                      />
                    </div>
                    <div className="p-4 space-y-1">
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

export default SpringCollections;
