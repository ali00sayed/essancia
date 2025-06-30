import React from 'react';
import Image from 'next/image';
import Button from '../ui/Button';

const OutFitWarm = () => {
  return (
    <section className="bg-white min-h-[80vh] md:min-h-screen flex items-center px-4 sm:px-6 md:px-8 lg:px-16 py-8 sm:py-12 md:py-16 lg:py-20">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 w-full">
        <div className="relative order-2 lg:order-1 w-full max-w-xl mx-auto lg:mx-0">
          <div className="relative w-full aspect-[3/4] max-w-[450px] mx-auto lg:mx-0">
            <Image
              src="/images/essancia-cloths/brand-27.jpeg"
              alt="Woman in blue sportswear"
              fill
              className="object-cover rounded-2xl shadow-xl"
              sizes="(max-width: 768px) 90vw, (max-width: 1024px) 50vw, 40vw"
              priority
            />
          </div>
          <div className="absolute bottom-[-5%] sm:bottom-[-10%] right-[-5%] sm:right-[-10%] w-[60%] sm:w-[70%] md:w-[80%] aspect-[3/4] max-w-[400px] hidden sm:block">
            <Image
              src="/images/essancia-cloths/brand-31.jpeg"
              alt="Woman in black sportswear"
              fill
              className="object-cover rounded-2xl shadow-xl"
              sizes="(max-width: 768px) 60vw, (max-width: 1024px) 35vw, 30vw"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center order-1 lg:order-2 max-w-xl lg:max-w-none mx-auto w-full">
          <h2 className="text-xl sm:text-3xl  md:text-4xl lg:text-5xl text-gray-900 mb-3 sm:mb-6 md:mb-8 leading-tight">
            From the stress of London to the gates of India - we&apos;re
            Essancia, and this is our Limitless story.
          </h2>
          <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 md:mb-3 leading-relaxed">
            It all started with five of us, too many ideas, and not enough
            sleep. Now we&apos;re 25+ strong, still running on caffeine and
            chaos, but building something that actually matters.
          </p>
          <p className="text-base sm:text-lg text-gray-700  mb-6 sm:mb-8 md:mb-3 leading-relaxed">
            We believe being limitless isn&apos;t about being perfect -
            it&apos;s about showing up, messing up, getting back up, and doing
            it all over again (preferably in a great t-shirt). Whether
            you&apos;re chasing dreams or just trying to survive Monday, that
            drive? That&apos;s what we&apos;re here for.
          </p>

          <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 md:mb-3 leading-relaxed">
            Essancia isn&apos;t just a clothing brand - it&apos;s how you say,
            “this is me” without saying a word. Every drop is designed to feel
            fresh, look sharp, and speak louder than your group chat.
          </p>
          <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 md:mb-10 leading-relaxed">
            We&apos;re not reinventing the wheel - we&apos;re just making it
            look cooler. And reminding you: you&apos;re already limitless.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
            <Button
              href="/collections"
              variant="primary"
              size="lg"
              className="w-full sm:w-auto text-center justify-center"
            >
              Shop Collection
            </Button>
            <Button
              href="/customize"
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto text-center justify-center"
            >
              Customize Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OutFitWarm;
