'use client';
import React, { useEffect } from 'react';
import Hero from '../../lib/components/Hero/Hero';
import SubHero from '../../lib/components/Sub-Hero/SubHero';
import HeroCardSection from '../../lib/components/Hero-Card/HeroCardSection';
import MarQuee from '../../lib/components/MarQueee/MarQuee';
import WinterFashionSection from '../../lib/components/WinterFashion/WinterFashionSection';

import ProductDetails from '@/lib/components/ProductDetails/ProductDetails';
import Stores from '@/lib/components/Stores/Stores';
import DesignerSection from '@/lib/components/Designer/Designer';
import { categories } from '@/lib/constants/exploreCards';
import ParallaxSection from '@/lib/components/ParallaxSection/ParallaxSection';
import FashionShowcase from '@/lib/components/FashionShowcase/FashionShowcase';
import Explore from '@/lib/components/Explore/exploreCards';
import CargosSection from '../../lib/components/Cargos/CargosSection';
import VideoFashion from '@/lib/components/VideoFashion/VideoFashion';
import CategoryShowcase from '@/lib/components/Category-Showcase/Category';

const HomeScreen = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  return (
    <main className="w-full bg-white">
      <div className="w-full">
        <Hero />
        <SubHero />
        <HeroCardSection />

        <MarQuee />

        <Explore categories={categories} />
        <CategoryShowcase />

        <WinterFashionSection />
        <CargosSection />

        <ParallaxSection
          backgroundImage="/images/summer-collection/summer-collection-1.jpeg"
          cards={[
            {
              id: 1,
              image: '/images/summer-collection/summer-collection-1.jpeg',
              title: 'Men leather jacket',
              price: 2100.0,
              alt: 'Spring fashion model 1',
            },
            {
              id: 2,
              image: '/images/summer-collection/summer-collection-7.jpeg',
              title: 'Women casual wear',
              price: 1800.0,
              discount: '15% OFF',
              alt: 'Spring fashion model 2',
            },
            {
              id: 3,
              image: '/images/summer-collection/summer-collection-3.jpeg',
              title: 'Spring collection',
              price: 1290.0,
              alt: 'Spring fashion model 3',
            },
            {
              id: 4,
              image: '/images/summer-collection/summer-collection-5.jpeg',
              title: 'Men leather jacket',
              price: 2110.0,
              alt: 'Spring fashion model 4',
            },
            {
              id: 5,
              image: '/images/summer-collection/summer-collection-6.jpeg',
              title: 'Women casual wear',
              price: 1280.0,
              discount: '15% OFF',
              alt: 'Spring fashion model 5',
            },
            {
              id: 6,
              image: '/images/summer-collection/summer-collection-7.jpeg',
              title: 'Spring collection',
              price: 1499.0,
              alt: 'Spring fashion model 6',
            },
          ]}
          heading="Summer Vibes"
          subheading="Discover our latest summer collection with breathtaking designs and comfortable fits."
          backgroundColor="#000000"
        />
        <ParallaxSection
          backgroundImage="/images/winter-collection/winter-collection-2.jpeg"
          cards={[
            {
              id: 1,
              image: '/images/winter-collection/winter-collection-2.jpeg',
              title: 'Summer collection',
              price: 1500.0,
              alt: 'Summer fashion model 1',
            },
            {
              id: 2,
              image: '/images/winter-collection/winter-collection-women-3.jpeg',
              title: 'Summer dress',
              price: 1800.0,
              discount: '20% OFF',
              alt: 'Summer fashion model 2',
            },
            {
              id: 3,
              image: '/images/winter-collection/winter-collection-4.jpeg',
              title: 'Casual wear',
              price: 1600.0,
              alt: 'Summer fashion model 3',
            },
            {
              id: 4,
              image: '/images/winter-collection/winter-collection-2.jpeg',
              title: 'Beach collection',
              price: 1900.0,
              alt: 'Summer fashion model 4',
            },
            {
              id: 5,
              image: '/images/winter-collection/winter-collection-women-1.jpeg',

              title: 'Evening wear',
              price: 2200.0,
              discount: '10% OFF',
              alt: 'Summer fashion model 5',
            },
            {
              id: 6,
              image: '/images/winter-collection/winter-collection-women-2.jpeg',

              title: 'Party collection',
              price: 2400.0,
              alt: 'Summer fashion model 6',
            },
          ]}
          heading="Winter Elegance"
          subheading="Explore our premium winter collection featuring luxurious materials and timeless designs."
          backgroundColor="#000000"
        />
        <ParallaxSection
          backgroundImage="/images/spring-collection/spring-collection-both-2.jpeg"
          cards={[
            {
              id: 1,
              image: '/images/spring-collection/spring-collection-both-2.jpeg',
              title: 'Spring dress',
              price: 1700.0,
              alt: 'Spring fashion model 1',
            },
            {
              id: 2,
              image: '/images/spring-collection/spring-collection-1.jpeg',
              title: 'Casual blazer',
              price: 1900.0,
              discount: '15% OFF',
              alt: 'Spring fashion model 2',
            },
            {
              id: 3,
              image: '/images/spring-collection/spring-collection-women-2.jpeg',
              title: 'Spring collection',
              price: 1600.0,
              alt: 'Spring fashion model 3',
            },
            {
              id: 4,
              image: '/images/spring-collection/spring-collection-2.jpeg',
              title: 'Light jacket',
              price: 2000.0,
              alt: 'Spring fashion model 4',
            },
            {
              id: 5,
              image: '/images/spring-collection/spring-collection-women-1.jpeg',
              title: 'Floral dress',
              price: 1750.0,
              discount: '10% OFF',
              alt: 'Spring fashion model 5',
            },
            {
              id: 6,
              image: '/images/spring-collection/spring-collection-3.jpeg',
              title: 'Spring wear',
              price: 1650.0,
              alt: 'Spring fashion model 6',
            },
          ]}
          heading="Spring Fashion"
          subheading="Experience the freshness of spring with our latest collection of lightweight and stylish pieces."
          backgroundColor="#000000"
        />

        <ProductDetails />
        <VideoFashion />
        <FashionShowcase />
        <DesignerSection />
        <Stores />
      </div>
    </main>
  );
};

export default HomeScreen;
