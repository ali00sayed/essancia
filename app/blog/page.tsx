'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IoSearchOutline } from 'react-icons/io5';
import { IoCloseOutline } from 'react-icons/io5';
import Loading from '@/lib/components/Loading/Loading';

gsap.registerPlugin(ScrollTrigger);

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  author: {
    name: string;
    avatar: string;
  };
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Summer 2024's Most Anticipated Fashion Trends",
    excerpt:
      'Discover the hottest trends that will dominate the fashion scene this summer season.',
    category: 'Fashion Trends',
    date: 'March 15, 2024',
    readTime: '5 min read',
    image: '/images/blog/avatar/avatar-1.jpg',
    author: {
      name: 'Jordan Araujo  ',
      avatar: '/images/blog/avatar/avatar-1.jpg',
    },
  },
  {
    id: 2,
    title: 'Sustainable Fashion: A Guide to Eco-Friendly Style',
    excerpt:
      'Learn how to build a sustainable wardrobe without compromising on style.',
    category: 'Sustainability',
    date: 'March 12, 2024',
    readTime: '7 min read',
    image: '/images/blog/avatar/avatar-2.jpg',
    author: {
      name: 'Sancia Araujo',
      avatar: '/images/blog/avatar/avatar-2.jpg',
    },
  },
  {
    id: 3,
    title: 'Winter Wardrobe Essentials You Need Now',
    excerpt:
      'Stay stylish and warm with these must-have winter fashion pieces.',
    category: 'Style Guide',
    date: 'March 10, 2024',
    readTime: '6 min read',
    image: '/images/blog/avatar/avatar-1.jpg',
    author: {
      name: 'Ali Sayed',
      avatar: '/images/blog/avatar/avatar-1.jpg',
    },
  },
  {
    id: 4,
    title: 'Accessorizing 101: Complete Your Look',
    excerpt:
      'Master the art of accessorizing with these expert tips and tricks.',
    category: 'Style Guide',
    date: 'March 8, 2024',
    readTime: '4 min read',
    image: '/images/blog/avatar/avatar-2.jpg',
    author: {
      name: 'Sarah Wilson',
      avatar: '/images/blog/avatar/avatar-2.jpg',
    },
  },
  {
    id: 5,
    title: '10 Styling Tips for a Perfect Outfit',
    excerpt: 'Professional styling advice to elevate your everyday looks.',
    category: 'Style Guide',
    date: 'March 5, 2024',
    readTime: '8 min read',
    image: '/images/blog/avatar/avatar-1.jpg',
    author: {
      name: 'Sarah Johnson',
      avatar: '/images/blog/avatar/avatar-1.jpg',
    },
  },
];

const categories = [
  { name: 'All', count: 12 },
  { name: 'Trends', count: 0 },
  { name: 'Style Guide', count: 3 },
  { name: 'Sustainability', count: 1 },
  { name: 'Collections', count: 0 },
];

const BlogPage = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const postsRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  // Filter posts based on category and search
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory =
      selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    setIsMounted(true);

    // Initialize animations after mounting
    const initializeAnimations = () => {
      const tl = gsap.timeline();

      tl.from(headerRef.current, {
        y: -100,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
      }).from(
        heroContentRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
        },
        '-=0.8'
      );

      // Enhanced posts animation with better performance
      const posts = postsRef.current?.children;
      if (posts) {
        gsap.from(posts, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: postsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      // Optimized search animation
      if (searchRef.current) {
        gsap.from(searchRef.current, {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
          delay: 0.3,
        });
      }

      setIsLoading(false);
    };

    const timer = setTimeout(initializeAnimations, 100);
    return () => clearTimeout(timer);
  }, []);

  if (!isMounted) return <Loading />;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (postsRef.current) {
      gsap.from(postsRef.current.children, {
        y: 15,
        opacity: 0,
        duration: 0.3,
        stagger: 0.05,
        ease: 'power2.out',
      });
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    if (postsRef.current) {
      gsap.from(postsRef.current.children, {
        y: 15,
        opacity: 0,
        duration: 0.3,
        stagger: 0.05,
        ease: 'power2.out',
      });
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {isLoading && <Loading />}

      {/* Enhanced Hero Section */}
      <div
        ref={headerRef}
        className="relative h-[70vh] sm:h-[70vh] lg:h-[80vh] flex items-center justify-center"
      >
        <Image
          className="object-cover object-center"
          src="/images/about-us/group-1.jpeg"
          alt="Blog hero"
          fill
          sizes="100vw"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div
          ref={heroContentRef}
          className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light mb-2 sm:mb-4 lg:mb-6 leading-tight">
            Essancia Fashion Blog
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-8 sm:mb-10 lg:mb-12">
            Discover the latest trends, styling tips, and fashion insights
          </p>

          {/* Enhanced Search Bar */}
          <div ref={searchRef} className="relative max-w-xl mx-auto">
            <div
              className={`relative transition-all duration-300 ${
                isSearchFocused ? 'scale-[1.02]' : 'scale-100'
              }`}
            >
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={handleSearch}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full px-6 sm:px-8 py-3 sm:py-4 pl-12 sm:pl-14 rounded-full 
                  bg-white/10 backdrop-blur-md border border-white/20 text-white 
                  text-base sm:text-lg placeholder-white/60 focus:outline-none 
                  focus:ring-2 focus:ring-white/50 transition-all duration-300
                  shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              />
              <IoSearchOutline
                className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 
                text-white/60 text-xl sm:text-2xl"
              />

              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 
                    text-white/60 hover:text-white transition-colors
                    p-1 rounded-full hover:bg-white/10"
                >
                  <IoCloseOutline className="text-lg sm:text-xl" />
                </button>
              )}
            </div>

            {searchQuery && (
              <div className="absolute -bottom-6 sm:-bottom-8 left-0 right-0 text-center text-white/80 text-sm">
                Found {filteredPosts.length}{' '}
                {filteredPosts.length === 1 ? 'result' : 'results'}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Enhanced Categories Section */}
      <div className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          {categories.map(category => (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className={`group relative px-6 sm:px-8 py-2.5 sm:py-3 rounded-full 
                transition-all duration-300 text-sm sm:text-base
                ${
                  selectedCategory === category.name
                    ? 'bg-black text-white shadow-xl scale-105'
                    : 'bg-white text-black hover:bg-gray-50 shadow-md hover:shadow-xl'
                }`}
            >
              <span className="relative z-10 flex items-center gap-2 sm:gap-3">
                {category.name}
                <span className="text-xs sm:text-sm opacity-60">
                  ({category.count})
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Enhanced Blog Posts Grid */}
      <div
        ref={postsRef}
        className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPosts.map(post => (
            <div
              key={post.id}
              className="group relative bg-white rounded-2xl overflow-hidden
                border border-black/5 hover:border-black/10
                shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-2 cursor-pointer"
            >
              <div className="relative aspect-[16/9]">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700
                    group-hover:scale-110"
                  quality={85}
                />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span
                  className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-white/95 backdrop-blur-sm
                  px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium 
                  text-black shadow-md"
                >
                  {post.category}
                </span>
                <span
                  className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-black/90 backdrop-blur-sm
                  px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs text-white shadow-md"
                >
                  {post.readTime}
                </span>
              </div>

              <div className="p-6 sm:p-8 space-y-3 sm:space-y-4">
                <h2
                  className="text-lg sm:text-xl font-semibold text-black 
                  group-hover:text-gray-600 transition-colors line-clamp-2"
                >
                  {post.title}
                </h2>
                <p className="text-sm sm:text-base text-gray-600 line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between pt-4 sm:pt-6 border-t border-gray-100">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div
                      className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden 
                      border-2 border-white shadow-md"
                    >
                      <Image
                        src={post.author.avatar}
                        alt={post.author.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <span className="block text-sm font-medium text-black">
                        {post.author.name}
                      </span>
                      <span className="block text-xs text-gray-500 mt-0.5">
                        {post.date}
                      </span>
                    </div>
                  </div>
                  <span
                    className="text-sm font-medium text-gray-600 group-hover:text-black 
                    transition-colors flex items-center gap-1"
                  >
                    View Details
                    <span className="transform transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default BlogPage;
