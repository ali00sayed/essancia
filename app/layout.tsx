import React from 'react';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Footer from '@/lib/components/Footer/Footer';
import Navbar from '@/lib/components/Navbar/Navbar';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Essancia Fashion',
    template: '%s | Essancia Fashion',
  },
  description:
    'Discover unique and trendy fashion at Essancia. Shop our curated collection of clothing and accessories for the modern fashion enthusiast.',
  icons: {
    icon: '/images/logo/e-favicon.jpeg',
    shortcut: '/images/logo/e-favicon.jpeg',
    apple: '/images/logo/e-favicon.jpeg',
  },
  keywords: [
    'fashion',
    'clothing',
    'accessories',
    'trendy fashion',
    'online shopping',
    'Essancia',
  ],
  authors: [{ name: 'Essancia Fashion' }],
  creator: 'Essancia Fashion',
  publisher: 'Essancia Fashion',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://essancia.com'), // Replace with your actual domain
  openGraph: {
    title: 'Essancia Fashion',
    description:
      'Discover unique and trendy fashion at Essancia. Shop our curated collection of clothing and accessories.',
    url: 'https://essancia.com', // Replace with your actual domain
    siteName: 'Essancia Fashion',
    images: [
      {
        url: '/images/og-image.jpg', // Add your OG image to public/images/
        width: 1200,
        height: 630,
        alt: 'Essancia Fashion',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Essancia Fashion',
    description:
      'Discover unique and trendy fashion at Essancia. Shop our curated collection of clothing and accessories.',
    images: ['/images/og-image.jpg'], // Same as OG image
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Add your Google Search Console verification code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
