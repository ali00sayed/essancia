'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import CollectionsDropdown from './CollectionsDropdown';
import PagesDropDown from '../PagesDropDown/PagesDropDown';
import gsap from 'gsap';

const Navbar: React.FC = () => {
  const [isCollectionsOpen, setIsCollectionsOpen] = useState<boolean>(false);
  const [isPageOpen, setIsPageOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isHeroSection, setIsHeroSection] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<
    'collections' | 'pages' | null
  >(null);

  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const collectionsRef = useRef<HTMLDivElement>(null);
  const pagesRef = useRef<HTMLDivElement>(null);
  const mainMenuRef = useRef<HTMLDivElement>(null);
  const submenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Add this to determine if we're on a page with white background
  const isWhiteBackgroundPage = pathname === '/customize';

  useEffect(() => {
    // Close dropdowns when route changes
    setIsCollectionsOpen(false);
    setIsPageOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero-section');
      const heroBottom = heroSection?.getBoundingClientRect().bottom || 0;
      setIsHeroSection(heroBottom > 0);
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeAllMenus = () => {
    setIsCollectionsOpen(false);
    setIsPageOpen(false);
    setIsMobileMenuOpen(false);
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Don't close if clicking inside a link or button
      if ((event.target as HTMLElement).closest('a, button')) return;

      if (
        collectionsRef.current &&
        !collectionsRef.current.contains(event.target as Node)
      ) {
        setIsCollectionsOpen(false);
      }
      if (
        pagesRef.current &&
        !pagesRef.current.contains(event.target as Node)
      ) {
        setIsPageOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleCollections = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsCollectionsOpen(!isCollectionsOpen);
    setIsPageOpen(false);
  };

  const togglePages = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPageOpen(!isPageOpen);
    setIsCollectionsOpen(false);
  };

  // Enhanced mobile menu animation
  useEffect(() => {
    const mobileMenu = mobileMenuRef.current;
    const mainMenu = mainMenuRef.current;
    const submenu = submenuRef.current;

    if (!mobileMenu || !mainMenu || !submenu) return;

    if (isMobileMenuOpen) {
      // First set display to block to ensure proper height calculation
      gsap.set(mobileMenu, {
        display: 'block',
        height: 'auto',
        overflow: 'hidden',
      });

      const height = mobileMenu.scrollHeight;

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
      });

      tl.fromTo(
        mobileMenu,
        {
          height: 0,
          opacity: 0,
        },
        {
          height: height,
          opacity: 1,
          duration: 0.4,
          onComplete: () => {
            // After animation, allow scrolling if content is taller than viewport
            gsap.set(mobileMenu, { overflow: 'auto' });
          },
        }
      ).fromTo(
        mainMenu.children,
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.3,
          stagger: 0.05,
        },
        '-=0.2'
      );
    } else {
      gsap.to(mobileMenu, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power3.inOut',
        onComplete: () => {
          gsap.set(mobileMenu, { display: 'none' });
        },
      });
    }
  }, [isMobileMenuOpen]);

  // Enhanced submenu animation
  useEffect(() => {
    const submenu = submenuRef.current;
    const mainMenu = mainMenuRef.current;
    const authButtons = document.querySelector('.mobile-auth-buttons');

    if (!submenu || !mainMenu || !authButtons) return;

    if (activeSubmenu) {
      // First ensure submenu is visible for height calculation
      gsap.set(submenu, {
        display: 'block',
        opacity: 0,
        x: 50,
        overflow: 'hidden',
        height: '100%',
      });

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
      });

      tl.to(authButtons, {
        opacity: 0,
        y: 20,
        duration: 0.2,
      })
        .to(mainMenu, {
          x: -30,
          opacity: 0,
          duration: 0.3,
          onComplete: () => {
            gsap.set(mainMenu, { display: 'none' });
          },
        })
        .fromTo(
          submenu,
          {
            x: 50,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.3,
            onStart: () => {
              // Ensure submenu is visible and can scroll
              gsap.set(submenu, {
                display: 'block',
                overflow: 'hidden',
                height: '100%',
              });
            },
            onComplete: () => {
              // After animation, allow scrolling
              gsap.set(submenu, {
                overflow: 'auto',
                height: '100%',
              });
            },
          },
          '-=0.1'
        );
    } else {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.inOut' },
      });

      tl.to(submenu, {
        x: 50,
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          gsap.set(submenu, {
            display: 'none',
            overflow: 'hidden',
            height: '100%',
          });
        },
      })
        .to(
          mainMenu,
          {
            x: 0,
            opacity: 1,
            duration: 0.3,
            onStart: () => {
              gsap.set(mainMenu, { display: 'block' });
            },
          },
          '-=0.1'
        )
        .to(authButtons, {
          opacity: 1,
          y: 0,
          duration: 0.2,
        });
    }
  }, [activeSubmenu]);

  const openSubmenu = (menu: 'collections' | 'pages') => {
    setActiveSubmenu(menu);
  };

  const closeSubmenu = () => {
    setActiveSubmenu(null);
  };

  // Add this to handle mobile menu toggle
  const toggleMobileMenu = () => {
    if (activeSubmenu) {
      // If submenu is open, close it first
      setActiveSubmenu(null);
    } else {
      // Otherwise toggle mobile menu
      setIsMobileMenuOpen(!isMobileMenuOpen);
    }
  };

  // Add useEffect to handle body scroll
  useEffect(() => {
    if (activeSubmenu || isMobileMenuOpen) {
      // Prevent main page scroll
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable main page scroll
      document.body.style.overflow = 'unset';
    }

    // Cleanup
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activeSubmenu, isMobileMenuOpen]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full">
      <nav
        className={`
          w-full transition-all duration-500
          ${
            isScrolled && !isHeroSection
              ? 'bg-white/95 backdrop-blur-lg shadow-lg'
              : isWhiteBackgroundPage
                ? 'bg-white/95 backdrop-blur-lg'
                : 'bg-transparent hover:bg-white/95 hover:backdrop-blur-lg'
          }
          ${
            isWhiteBackgroundPage
              ? 'text-black'
              : isHeroSection
                ? 'text-white hover:text-black'
                : 'text-black'
          }
        `}
      >
        <div className="flex items-center justify-between h-14 sm:h-16 px-4 sm:px-6 md:px-8 lg:px-16 max-w-[1400px] mx-auto">
          <Link
            href="/"
            className={`text-xl font-medium tracking-wide whitespace-nowrap
              transition-all duration-300 transform hover:scale-105
              ${
                isWhiteBackgroundPage
                  ? 'text-black hover:text-gray-800'
                  : isHeroSection
                    ? 'group-hover/nav:text-black'
                    : 'hover:text-gray-800'
              }`}
          >
            Essancia Fashion
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10 ml-12">
            <div ref={collectionsRef} className="relative group">
              <button
                className={`flex items-center transition-all duration-300
                  ${
                    isWhiteBackgroundPage
                      ? 'text-black hover:text-gray-800'
                      : isHeroSection
                        ? 'group-hover/nav:text-black hover:text-black'
                        : 'hover:text-gray-800'
                  }`}
                onClick={toggleCollections}
              >
                Collections
                <svg
                  className={`ml-1.5 w-4 h-4 transition-transform duration-300 ${isCollectionsOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <span
                className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full
                bg-black`}
              />
            </div>
            <Link
              href="/customize"
              className={`relative group transition-colors duration-300
                ${
                  isWhiteBackgroundPage
                    ? 'text-black hover:text-gray-800'
                    : isHeroSection
                      ? 'group-hover/nav:text-black hover:text-black'
                      : 'hover:text-gray-800'
                }`}
            >
              <span>Customise</span>
              <span
                className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full
                bg-black`}
              />
            </Link>
            <div ref={pagesRef} className="relative group">
              <button
                className={`flex items-center transition-all duration-300
                  ${
                    isWhiteBackgroundPage
                      ? 'text-black hover:text-gray-800'
                      : isHeroSection
                        ? 'group-hover/nav:text-black hover:text-black'
                        : 'hover:text-gray-800'
                  }`}
                onClick={togglePages}
              >
                Pages
                <svg
                  className={`ml-1.5 w-4 h-4 transition-transform duration-300 ${isPageOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <span
                className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full
                bg-black`}
              />
            </div>
            <Link
              href="/blog"
              className={`relative group transition-colors duration-300
                ${
                  isWhiteBackgroundPage
                    ? 'text-black hover:text-gray-800'
                    : isHeroSection
                      ? 'group-hover/nav:text-black hover:text-black'
                      : 'hover:text-gray-800'
                }`}
            >
              <span>Blog</span>
              <span
                className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full
                bg-black`}
              />
            </Link>
            <Link
              href="/contact"
              className={`relative group transition-colors duration-300
                ${
                  isWhiteBackgroundPage
                    ? 'text-black hover:text-gray-800'
                    : isHeroSection
                      ? 'group-hover/nav:text-black hover:text-black'
                      : 'hover:text-gray-800'
                }`}
            >
              <span>Contact</span>
              <span
                className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full
                bg-black`}
              />
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/login"
              className={`px-6 py-2 transition-all duration-300 rounded-full border-2
                ${
                  isWhiteBackgroundPage
                    ? 'border-black/20 hover:border-black/40 text-black'
                    : isHeroSection
                      ? 'border-white/20 hover:border-black/40 hover:text-black'
                      : 'border-black/20 hover:border-black/40 hover:text-black'
                }`}
            >
              Login
            </Link>
            <Link
              href="/signup"
              className={`
                px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105
                ${
                  isWhiteBackgroundPage || !isHeroSection
                    ? 'bg-black text-white hover:bg-gray-800'
                    : 'bg-white text-black hover:bg-black hover:text-white'
                }
              `}
            >
              Sign up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2.5 rounded-full transition-all duration-300
              ${
                isHeroSection
                  ? 'hover:bg-white/10 group-hover/nav:hover:bg-black/5'
                  : 'hover:bg-black/5'
              }`}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen || activeSubmenu ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          ref={mobileMenuRef}
          className="md:hidden overflow-hidden"
          style={{ height: 0 }}
        >
          <div className="bg-white border-t border-gray-400">
            <div
              className={`
              flex flex-col px-4 py-2 relative
              ${activeSubmenu ? 'h-[calc(100vh-4rem)] overflow-hidden' : ''}
            `}
            >
              {/* Main Menu Items */}
              <div
                ref={mainMenuRef}
                className="flex flex-col"
                style={{
                  opacity: activeSubmenu ? 0 : 1,
                  transform: activeSubmenu ? 'translateX(-30px)' : 'none',
                }}
              >
                <button
                  className="flex items-center justify-between py-4 border-b border-gray-200 text-gray-800 
                    hover:text-black transition-colors duration-300 w-full"
                  onClick={() => openSubmenu('collections')}
                >
                  <span>Collections</span>
                  <svg
                    className="w-5 h-5 transition-transform duration-300"
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
                </button>
                <Link
                  href="/customize"
                  className="flex items-center justify-between py-3 border-b border-gray-200 text-gray-800 
                    hover:text-black transition-colors duration-300 w-full"
                  onClick={closeAllMenus}
                >
                  Customise
                </Link>
                <button
                  className="flex items-center justify-between py-4 border-b border-gray-200 text-gray-800 
                    hover:text-black transition-colors duration-300 w-full"
                  onClick={() => openSubmenu('pages')}
                >
                  <span>Pages</span>
                  <svg
                    className="w-5 h-5 transition-transform duration-300"
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
                </button>
                <Link
                  href="/blog"
                  className="py-4 border-b border-gray-200 text-gray-800 hover:text-black transition-colors duration-300 block w-full"
                  onClick={closeAllMenus}
                >
                  Blog
                </Link>
                <Link
                  href="/contact"
                  className="pt-3  text-gray-800 hover:text-black transition-colors duration-300 block w-full"
                  onClick={closeAllMenus}
                >
                  Contact
                </Link>
              </div>

              {/* Submenu */}
              <div
                ref={submenuRef}
                className={`
                  absolute top-0 left-0 w-full h-full bg-white
                  ${activeSubmenu ? 'pointer-events-auto' : 'pointer-events-none'}
                  overflow-hidden
                `}
                style={{
                  opacity: activeSubmenu ? 1 : 0,
                  transform: activeSubmenu ? 'none' : 'translateX(50px)',
                }}
              >
                {activeSubmenu && (
                  <div className="h-full flex flex-col">
                    <button
                      onClick={closeSubmenu}
                      className="flex items-center text-gray-800 hover:text-black 
                        bg-white py-3 transition-colors duration-300 z-10
                        border-b border-gray-200 w-full sticky top-0"
                    >
                      <svg
                        className="w-5 h-5 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                      Back to Menu
                    </button>
                    <div className="flex-1 overflow-y-auto overscroll-contain pb-20">
                      {activeSubmenu === 'collections' ? (
                        <CollectionsDropdown
                          isOpen={true}
                          onLinkClick={closeAllMenus}
                        />
                      ) : (
                        <PagesDropDown
                          isOpen={true}
                          onLinkClick={closeAllMenus}
                        />
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Auth Buttons */}
              <div
                className={`
                mobile-auth-buttons
                py-6 space-y-3 border-t border-gray-200 mt-6
                transition-all duration-300
                ${activeSubmenu ? 'opacity-0 pointer-events-none' : 'opacity-100'}
              `}
              >
                <Link
                  href="/login"
                  className="block w-full py-3 text-center border-2 border-gray-200 
                    rounded-full text-gray-800 hover:text-black hover:border-gray-300
                    transition-all duration-300"
                  onClick={closeAllMenus}
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="block w-full py-3 text-center bg-black text-white 
                    rounded-full hover:bg-gray-800 transition-all duration-300"
                  onClick={closeAllMenus}
                >
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Desktop Dropdowns */}
      {isCollectionsOpen && !isMobileMenuOpen && (
        <div className="hidden md:block bg-white w-full">
          <CollectionsDropdown isOpen={isCollectionsOpen} />
        </div>
      )}
      {isPageOpen && !isMobileMenuOpen && (
        <div className="hidden md:block bg-white w-full">
          <PagesDropDown isOpen={isPageOpen} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
