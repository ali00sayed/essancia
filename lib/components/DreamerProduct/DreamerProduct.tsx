import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const DreamerProduct = () => {
  const dreamerProduct = [
    {
      id: 1,
      img: '/images/collections/hoodies/leather-Hoodie.jpeg',
      title: 'Hoodies',
      description:
        'These are comfortable clothes that are suitable for everyday.',
      color: 'from-purple-500 to-blue-500',
      link: '/collections/hoodies',
    },
    {
      id: 2,
      img: '/images/fashion-showcase/fsc-ss-2.jpeg',
      title: 'Sweat-Shirts',
      description:
        'These are comfortable clothes that are suitable for everyday.',
      color: 'from-pink-500 to-orange-500',
      link: '/collections/sweatshirts',
    },
    {
      id: 3,
      img: '/images/esf-clothes/esf-tshirt-3.jpeg',
      title: 'T-Shirts',
      description:
        'These are comfortable clothes that are suitable for everyday.',
      color: 'from-green-500 to-teal-500',
      link: '/collections/tshirts',
    },
    {
      id: 4,
      img: '/images/about-us/women-img.webp',
      title: 'T-Shirts for women',
      description:
        'These are comfortable clothes that are suitable for everyday.',
      color: 'from-green-500 to-teal-500',
      link: '/collections',
    },
  ];

  return (
    <div className="bg-gradient-to-b from-white to-gray-100 py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-900 text-center mb-4">
          Our Products
        </h2>
        <p className="text-gray-700 text-center max-w-2xl mx-auto mb-12 sm:mb-16 md:mb-20">
          Discover our premium collection of comfortable and stylish clothing
          designed for everyday wear
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
          {dreamerProduct.map(product => (
            <Link href={product.link} key={product.id} className="group">
              <div className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 h-full bg-white">
                <div className="relative z-20 flex flex-col h-full">
                  {/* Image container */}
                  <div className="relative w-full pt-[100%] bg-white">
                    <Image
                      src={product.img}
                      alt={product.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                      priority
                    />
                  </div>

                  {/* Content container */}
                  <div className="p-6 flex-grow bg-white">
                    <h3 className="text-xl sm:text-2xl font-bold mb-2 text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-700 transition-all duration-300">
                      {product.title}
                    </h3>
                    <p className="text-gray-700 text-sm sm:text-base mb-4">
                      {product.description}
                    </p>
                    <div className="flex justify-end">
                      <span className="inline-flex items-center text-sm font-medium text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-700">
                        Explore
                        <svg
                          className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DreamerProduct;
