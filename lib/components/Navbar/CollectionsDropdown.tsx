'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';

const categories = [
  {
    title: 'Essancia Collections',
    links: ['Hoodies', 'Tshirts', 'Sweatshirts', 'Cargos'],
  },
  {
    title: 'Fusion Wear Clothes',
    links: [
      'Kurtas & Suits',
      'Ethnic Wear',
      'Skirts & Palazzos',
      'Shorts & Skirts',
    ],
  },
  {
    title: 'Western Wear',
    links: ['Dresses', 'Playsuits', 'Shorts & Skirts', 'Trousers & Capris'],
  },
  {
    title: 'Handbags',
    links: ['Long Wallets', 'Compact Wallets', 'Card Holders', 'Phone Cases'],
  },
];

interface CollectionsDropdownProps {
  isOpen: boolean;
  onLinkClick?: () => void;
}

const CollectionsDropdown: React.FC<CollectionsDropdownProps> = ({
  isOpen,
  onLinkClick,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dropdown = dropdownRef.current;
    const content = contentRef.current;
    if (!dropdown || !content) return;

    if (isOpen) {
      // First ensure the dropdown is visible for proper height calculation
      gsap.set(dropdown, {
        display: 'block',
        height: 'auto',
        opacity: 0,
        overflow: 'hidden',
      });

      // Get natural height
      const naturalHeight = dropdown.scrollHeight;

      // Reset to initial state for animation
      gsap.set(dropdown, {
        height: 0,
        opacity: 0,
      });

      // Animate from collapsed to full height
      gsap.to(dropdown, {
        height: naturalHeight,
        opacity: 1,
        duration: 0.4,
        ease: 'power3.out',
        onComplete: () => {
          // After animation completes, allow scrolling if needed
          gsap.set(dropdown, {
            height: 'auto',
            overflow: 'visible',
          });
        },
      });

      gsap.fromTo(
        content,
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: 'power3.out',
        }
      );
    } else {
      gsap.to(dropdown, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power3.inOut',
        onComplete: () => {
          gsap.set(dropdown, {
            display: 'none',
            clearProps: 'overflow',
          });
        },
      });
    }
  }, [isOpen]);

  // Handle link click with smooth transition
  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    // Only apply special handling on mobile
    if (window.innerWidth < 768 && onLinkClick) {
      e.preventDefault();

      // First close the menu with animation
      onLinkClick();

      // Then navigate after animation completes
      setTimeout(() => {
        window.location.href = href;
      }, 400); // Match this with the animation duration
    }
    // On desktop, let the link work normally
  };

  return (
    <div
      ref={dropdownRef}
      className={`bg-white overflow-hidden ${isOpen ? 'block' : 'hidden'} mb-4`}
    >
      <div
        ref={contentRef}
        className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div key={index} className="text-black">
              <h3 className="font-medium text-[14px] sm:text-[15px] mb-3">
                {category.title}
              </h3>
              <ul className="space-y-2">
                {category.links.map((link, linkIndex) => {
                  const href = `/collections/${link.toLowerCase().replace(/\s+/g, '-')}`;
                  return (
                    <li key={linkIndex} className="block">
                      <Link
                        href={href}
                        className="text-gray-600 hover:text-black transition-all duration-300
                          text-[13px] sm:text-[14px] leading-relaxed block py-1 relative group"
                        onClick={e => handleLinkClick(e, href)}
                      >
                        <span className="relative z-10 inline-block">
                          {link}
                          <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full"></span>
                        </span>
                        <span className="absolute left-0 top-0 w-0 h-full bg-gray-50 -z-10 transition-all duration-300 ease-out group-hover:w-full rounded-sm"></span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollectionsDropdown;
