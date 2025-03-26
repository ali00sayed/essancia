'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';

const categories = [
  {
    title: 'About Us',
    link: '/about-us',
  },
  {
    title: 'Terms & Conditions',
    link: '/terms-conditions',
  },
  {
    title: 'Shipping Policy',
    link: '/shipping-policy',
  },
  {
    title: 'Privacy',
    link: '/privacy',
  },
  {
    title: 'Frequently asked question',
    link: '/faq',
  },
];

interface PagesDropDownProps {
  isOpen: boolean;
  onLinkClick?: () => void;
}

const PagesDropDown: React.FC<PagesDropDownProps> = ({
  isOpen,
  onLinkClick,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive state
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check initially
    checkMobile();

    // Add resize listener
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const dropdown = dropdownRef.current;
    const content = contentRef.current;
    if (!dropdown || !content) return;

    // Kill any existing animations
    gsap.killTweensOf([dropdown, content]);

    if (isOpen) {
      // Set initial states
      gsap.set(dropdown, {
        height: 'auto',
        display: 'block',
        opacity: isMobile ? 1 : 0, // Always visible on mobile
      });

      const height = dropdown.offsetHeight;

      // Create timeline
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
      });

      if (isMobile) {
        // Mobile animation
        tl.fromTo(
          dropdown,
          { height: 0 },
          { height: height, duration: 0.4 }
        ).fromTo(
          content,
          { x: 50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.3 },
          '-=0.2'
        );
      } else {
        // Desktop animation
        tl.to(dropdown, {
          height: height,
          opacity: 1,
          duration: 0.4,
        }).fromTo(
          content,
          { x: -30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.3 },
          '-=0.2'
        );
      }
    } else {
      // Create closing timeline
      const tl = gsap.timeline({
        defaults: { ease: 'power3.inOut' },
        onComplete: () => {
          if (!isMobile) {
            gsap.set(dropdown, { display: 'none' });
          }
        },
      });

      if (isMobile) {
        // Mobile closing animation
        tl.to(content, {
          x: 50,
          opacity: 0,
          duration: 0.3,
        }).to(
          dropdown,
          {
            height: 0,
            duration: 0.3,
          },
          '-=0.1'
        );
      } else {
        // Desktop closing animation
        tl.to(content, {
          x: -30,
          opacity: 0,
          duration: 0.3,
        }).to(
          dropdown,
          {
            height: 0,
            opacity: 0,
            duration: 0.3,
          },
          '-=0.1'
        );
      }
    }
  }, [isOpen, isMobile]);

  // Handle link click with smooth transition
  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    if (isMobile && onLinkClick) {
      e.preventDefault();

      // First close the menu with animation
      onLinkClick();

      // Then navigate after animation completes
      setTimeout(() => {
        window.location.href = href;
      }, 400);
    }
  };

  return (
    <div
      ref={dropdownRef}
      className={`overflow-hidden bg-white ${isMobile ? 'mobile-dropdown' : ''}`}
      style={{
        height: 0,
        display: isMobile ? 'block' : 'none',
      }}
    >
      <div
        ref={contentRef}
        className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-8"
      >
        {categories.map((category, index) => (
          <Link
            key={index}
            href={category.link}
            className="block px-4 py-2 text-gray-600 hover:text-black
              transition-all duration-300 relative group overflow-hidden"
            onClick={e => handleLinkClick(e, category.link)}
          >
            <span className="relative z-10 inline-block">
              {category.title}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full"></span>
            </span>
            <span className="absolute left-0 top-0 w-0 h-full bg-gray-50 -z-10 transition-all duration-300 ease-out group-hover:w-full"></span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PagesDropDown;
