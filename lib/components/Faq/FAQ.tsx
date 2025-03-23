'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: 'What is your return policy?',
    answer:
      'We offer a 30-day return policy for all unworn items in their original condition with tags attached. Shipping costs for returns are the responsibility of the customer unless the item is defective.',
  },
  {
    question: 'How long does shipping take?',
    answer:
      'Standard shipping typically takes 3-5 business days within the continental US. International shipping can take 7-14 business days. Express shipping options are available at checkout.',
  },
  {
    question: 'Do you ship internationally?',
    answer:
      'Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by location. You can view specific shipping rates during checkout.',
  },
  {
    question: 'How do I track my order?',
    answer:
      'Once your order ships, you will receive a confirmation email with tracking information. You can also track your order by logging into your account on our website.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay. All transactions are secure and encrypted.',
  },
  {
    question: 'How do I know if an item  fit?',
    answer:
      "We provide detailed size guides for all our products. You can find the size guide link on each product page. If you're still unsure, our customer service team is happy to help with specific measurements.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] overflow-hidden">
        <Image
          src="/images/logo/essancia-fashion.jpeg"
          alt="FAQ Banner"
          className="object-cover w-full h-full"
          fill
          priority
          sizes="100vw"
          quality={90}
        />
      </div>
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 text-center mb-8 sm:mb-12 lg:mb-16">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4 sm:space-y-6">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <button
                  className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-300"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="text-base sm:text-lg text-gray-900 font-medium pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-700 flex-shrink-0 transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index ? 'max-h-[500px]' : 'max-h-0'
                  }`}
                >
                  <p className="px-6 py-5 text-gray-700 bg-gray-50 leading-relaxed text-base">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 sm:mt-16 text-center">
            <p className="text-gray-700 text-base sm:text-lg">
              Still have questions?{' '}
              <a
                href="/contact"
                className="text-gray-900 font-medium hover:text-gray-700 underline underline-offset-4 transition-colors"
              >
                Contact our support team
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQ;
