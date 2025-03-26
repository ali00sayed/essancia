'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  IoLocationOutline,
  IoMailOutline,
  IoCallOutline,
} from 'react-icons/io5';
import { FaInstagram, FaLinkedinIn, FaFacebook } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

import Loading from '@/lib/components/Loading/Loading';


gsap.registerPlugin(ScrollTrigger);

const ContactPage = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const formContainerRef = useRef<HTMLDivElement>(null);
  const infoContainerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Initialize animations after mounting
    const initializeAnimations = () => {
      const tl = gsap.timeline();

      // Hero section animations - matching blog page style
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

      // Form and info section animations
      gsap.from(formContainerRef.current, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: formContainerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.from(infoContainerRef.current, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: infoContainerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });

      setIsLoading(false);
    };

    const timer = setTimeout(initializeAnimations, 100);
    return () => clearTimeout(timer);
  }, []);

  if (!isMounted) return <Loading />;

  return (
    <div className="min-h-screen bg-white">
      {isLoading && <Loading />}

      {/* Hero Section */}
      <section
        ref={headerRef}
        className="relative overflow-hidden h-screen w-full"
      >
        <div className="absolute inset-0 w-full h-full">
          {/* Desktop Image */}
          <div className="hidden sm:block w-full h-full">
            <Image
              src="/images/contact/contact1.jpeg"
              className="object-cover object-[center_35%] w-full h-full"
              alt="Contact hero"
              fill
              sizes="100vw"
              priority
              quality={100}
            />
          </div>

          {/* Mobile Image */}
          <div className="block sm:hidden w-full h-full">
            <Image
              src="/images/contact/contact2.jpeg"
              className="object-cover object-center w-full h-full"
              alt="Contact hero mobile"
              fill
              sizes="100vw"
              priority
              quality={100}
            />
          </div>
        </div>

        {/* Dark Overlay with gradient for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/70 to-black/90" />

        {/* Content Section */}
        <div className="absolute inset-0 flex items-end justify-center px-4 pb-12 sm:pb-16 md:pb-20">
          <div
            ref={heroContentRef}
            className="text-center space-y-4 max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white mx-auto leading-tigh">
              Let&apos;s Create Something Beautiful
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-lg sm:max-w-xl md:max-w-2xl mx-auto">
              Have a question or want to collaborate? We&apos;d love to hear
              from you.
            </p>

            {/* Animated Down Arrow */}
            <div className="flex justify-center pt-8">
              <div className="animate-bounce">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 50 50"
                  fill="none"
                  className="filter drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]
                    sm:w-[45px] sm:h-[45px] md:w-[50px] md:h-[50px]"
                >
                  <circle
                    cx="25"
                    cy="25"
                    r="23"
                    stroke="white"
                    strokeWidth="2"
                    className="opacity-30"
                  />
                  <path
                    d="M25 15 L25 35 M25 35 L33 27 M25 35 L17 27"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="drop-shadow-[0_0_5px_rgba(255,255,255,1)]"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Form Side */}
            <div ref={formContainerRef} className="space-y-8">
              <div>
                <h2 className="text-3xl font-light mb-4">Get in Touch</h2>
                <p className="text-gray-600">
                  Fill out the form below and we&apos;ll get back to you as soon
                  as possible.
                </p>
              </div>

              <form className="space-y-6">
                <div>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-6 py-4 bg-gray-50  rounded-xl
                      border-gray-200 focus:outline-none focus:ring-1
                      focus:ring-[#ff8c00] hover:shadow-[0_0_15px_rgba(255,140,0,0.2)]
                      hover:border-[#ff8c00] transition-all duration-300
                      transform hover:scale-[1.02]"
                    placeholder="Your Name"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-6 py-4 bg-gray-50  rounded-xl
                      border-gray-200 focus:outline-none focus:ring-1
                      focus:ring-[#ff8c00] hover:shadow-[0_0_15px_rgba(255,140,0,0.2)]
                      hover:border-[#ff8c00] transition-all duration-300
                      transform hover:scale-[1.02]"
                    placeholder="Your Email"
                  />
                </div>

                <div>
                  <textarea
                    name="message"
                    required
                    rows={6}
                    className="w-full px-6 py-4 bg-gray-50 rounded-xl
                      border-gray-200 focus:outline-none focus:ring-1
                      focus:ring-[#ff8c00] hover:shadow-[0_0_15px_rgba(255,140,0,0.2)]
                      hover:border-[#ff8c00] transition-all duration-300
                      transform hover:scale-[1.02] resize-none"
                    placeholder="Your Message"
                  />
                </div>

                <button
                  disabled
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-[#ff8c00] to-[#ff4500] text-white rounded-xl
                    transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,140,0,0.5)]
                    transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed
                    disabled:hover:scale-100 disabled:hover:shadow-none"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Info Side */}
            <div ref={infoContainerRef} className="space-y-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-6 bg-gray-50 rounded-xl transform hover:scale-105 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,140,0,0.3)]">
                  <div className="flex items-start gap-4">
                    <div
                      className="p-3 bg-gradient-to-r from-[#ff8c00] to-[#ff4500] rounded-lg text-white
                      shadow-[0_0_10px_rgba(255,140,0,0.5)]"
                    >
                      <IoLocationOutline className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#ff8c00] to-[#ff4500]">
                        Visit Us
                      </h3>
                      <p className="text-gray-600">Worli Lotus</p>
                      <p className="text-gray-600">Mumbai, 400018</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-gray-50 rounded-xl transform hover:scale-105 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,140,0,0.3)]">
                  <div className="flex items-start gap-4">
                    <div
                      className="p-3 bg-gradient-to-r from-[#ff8c00] to-[#ff4500] rounded-lg text-white
                      shadow-[0_0_10px_rgba(255,140,0,0.5)]"
                    >
                      <IoMailOutline className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#ff8c00] to-[#ff4500]">
                        Email Us
                      </h3>
                      <p className="text-gray-600">sales@essancia.com</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-gray-50 rounded-xl transform hover:scale-105 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,140,0,0.3)]">
                  <div className="flex items-start gap-4">
                    <div
                      className="p-3 bg-gradient-to-r from-[#ff8c00] to-[#ff4500] rounded-lg text-white
                      shadow-[0_0_10px_rgba(255,140,0,0.5)]"
                    >
                      <IoCallOutline className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#ff8c00] to-[#ff4500]">
                        Call Us
                      </h3>
                      <p className="text-gray-600">+91 77 108 707 60</p>
                      <p className="text-gray-600">Mon-Fri : 9AM - 6PM</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-light mb-6">Follow Us</h3>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="p-4 bg-gray-50 rounded-xl text-gray-600 
                    hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-600 hover:to-orange-500
                    hover:text-white transition-all duration-300"
                  >
                    <FaInstagram className="w-6 h-6" />
                  </a>
                  <a
                    href="#"
                    className="p-4 bg-gray-50 rounded-xl text-gray-600 
                    hover:bg-[#1877F2] hover:text-white transition-all duration-300"
                  >
                    <FaFacebook className="w-6 h-6" />
                  </a>
                  <a
                    href="#"
                    className="p-4 bg-gray-50 rounded-xl text-gray-600 
                    hover:bg-[#0A66C2] hover:text-white transition-all duration-300"
                  >
                    <FaLinkedinIn className="w-6 h-6" />
                  </a>
                  <a
                    href="#"
                    className="p-4 bg-gray-50 rounded-xl text-gray-600 
                    hover:hover:bg-black hover:text-white transition-all duration-300"
                  >
                    <FaXTwitter className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
