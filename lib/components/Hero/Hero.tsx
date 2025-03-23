'use client';
import React, { useEffect, useState, useRef } from 'react';
import ProgressBar from '../ProgressBar/ProgressBar';
import Image from 'next/image';

interface SlideContent {
  title: string;
  subtitle: string;
  media: string;
  type: 'image' | 'video';
  duration?: number; // in milliseconds
}

const slideContents: SlideContent[] = [
  {
    title: 'Essancia Fashion Picks',
    subtitle:
      'Discover our latest summer collection for your perfect seasonal.',
    media: '/videos/hero.mp4',
    type: 'video',
    duration: 6000, // Fallback duration for video
  },
  {
    title: 'Must-Have Winter Outfits',
    subtitle: 'Curated essentials to elevate your winter wardrobe beautifully.',
    media: '/images/hero/hero-1.png',
    type: 'image',
    duration: 4000, // 4 seconds for images
  },
];

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const mediaContainerRef = useRef<HTMLDivElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const retryCountRef = useRef(0);
  const maxRetries = 3;

  const updateProgress = (duration: number): void => {
    startTimeRef.current = Date.now();

    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }

    progressInterval.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const newProgress = Math.min((elapsed / duration) * 100, 100);

      setProgress(newProgress);

      if (newProgress >= 100) {
        startTimeRef.current = Date.now();
        setProgress(0);
        setCurrentSlide(prev => (prev + 1) % slideContents.length);
      }
    }, 16);
  };

  useEffect(() => {
    const slide = slideContents[currentSlide];
    setProgress(0);
    startTimeRef.current = Date.now();
    setVideoError(false);
    setIsVideoPlaying(false);
    retryCountRef.current = 0;

    const duration = slide.duration || 5000;
    updateProgress(duration);

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [currentSlide]);

  useEffect(() => {
    const updateDimensions = () => {
      if (mediaContainerRef.current) {
        const { width, height } =
          mediaContainerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    // Initial update
    updateDimensions();

    // Update on resize
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const handleSlideChange = (index: number) => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }
    setProgress(0);
    startTimeRef.current = Date.now();
    setCurrentSlide(index);
  };

  return (
    <div
      id="hero-section"
      ref={mediaContainerRef}
      className="relative h-[100svh] w-full overflow-hidden bg-black"
    >
      {/* Media Slides */}
      {slideContents.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            currentSlide === index ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {slide.type === 'video' ? (
            <div className="relative w-full h-full">
              {currentSlide === index && (
                <>
                  <video
                    key={`${slide.media}-${index}`}
                    ref={videoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster="/images/Hero/Hero-1.png"
                    className={`absolute w-full h-full object-cover transition-opacity duration-500 ${
                      videoError || !isVideoPlaying
                        ? 'opacity-0'
                        : 'opacity-100'
                    }`}
                    preload="metadata"
                    onLoadedMetadata={() => {
                      if (videoRef.current) {
                        videoRef.current
                          .play()
                          .then(() => {
                            setIsVideoPlaying(true);
                            setVideoError(false);
                          })
                          .catch(() => {
                            setIsVideoPlaying(false);
                            setVideoError(true);
                          });
                      }
                    }}
                    onError={() => {
                      setIsVideoPlaying(false);
                      setVideoError(true);
                    }}
                    onPause={() => setIsVideoPlaying(false)}
                    onPlay={() => setIsVideoPlaying(true)}
                  >
                    <source src={slide.media} type="video/mp4" />
                  </video>

                  {/* Fallback Image */}
                  <Image
                    src="/images/Hero/Hero-1.png"
                    alt={slide.title}
                    fill
                    priority
                    className={`object-cover transition-opacity duration-500 ${
                      videoError || !isVideoPlaying
                        ? 'opacity-100'
                        : 'opacity-0'
                    }`}
                    quality={90}
                  />

                  {/* Preload next video */}
                  {index < slideContents.length - 1 &&
                    slideContents[index + 1].type === 'video' && (
                      <link
                        rel="preload"
                        as="video"
                        href={slideContents[index + 1].media}
                        type="video/mp4"
                        crossOrigin="anonymous"
                      />
                    )}
                </>
              )}
            </div>
          ) : (
            <div className="relative w-full h-full">
              <Image
                src={slide.media}
                alt={slide.title}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
                quality={90}
              />
            </div>
          )}

          {/* Enhanced gradient overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-b 
            from-black/60 via-transparent to-black/60"
          />
        </div>
      ))}

      {/* Content and Navigation */}
      <div className="relative z-10 h-full flex flex-col justify-between">
        {/* Main Content */}
        <div className="flex-1 flex items-center pt-[20vh] sm:pt-[25vh]">
          <div className="w-full px-6 sm:px-8 md:px-12 lg:px-16">
            <div className=" sm:max-w-[85%] md:max-w-3xl lg:max-w-4xl">
              {/* If he want uncomment this and fix the size of the text */}

              {/* <h1
                className="text-4xl sm:text-7xl md:text-5xl lg:text-6xl 
                text-white font-light leading-[1]
                 sm:mb-6 md:mb-8 lg:mb-10
                opacity-0 animate-fadeIn"
              >
                {slideContents[currentSlide].title}
              </h1>
              <p
                className="text-xl sm:text-2xl md:text-3xl 
                text-white/80 max-w-3xl 
                opacity-0 animate-fadeInDelay
                leading-[1.2] font-light"
              >
                {slideContents[currentSlide].subtitle}
              </p> */}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="w-full pb-12 sm:pb-16 md:pb-20 lg:pb-24">
          <div className="px-6 sm:px-8 md:px-12 lg:px-16">
            <div
              className="flex flex-col sm:flex-row gap-8 sm:gap-12 
              max-w-4xl"
            >
              {slideContents.map((slide, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-4 group cursor-pointer"
                  onClick={() => handleSlideChange(index)}
                >
                  <h3
                    className={`
                    text-xl sm:text-2xl md:text-3xl
                    transition-all duration-300
                    font-light
                    ${
                      currentSlide === index
                        ? 'text-white'
                        : 'text-white/60 group-hover:text-white'
                    }`}
                  >
                    {slide.title}
                  </h3>
                  <ProgressBar
                    isActive={currentSlide === index}
                    progress={currentSlide === index ? progress : 0}
                    onClick={() => handleSlideChange(index)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
