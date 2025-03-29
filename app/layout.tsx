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
  title: 'Essancia Fashion - Premium Streetwear Brand in India',
  description:
    'Discover premium streetwear clothing at Essancia Fashion. Shop our exclusive collection of hoodies, t-shirts, and designer apparel. Free shipping available.',
  icons: {
    icon: [
      {
        rel: 'icon',
        url: '/favicon.ico',
        sizes: 'any',
      },
      {
        url: '/apple-touch-icon.png',
        type: 'image/png',
        sizes: '180x180',
      },
    ],
    apple: [
      {
        url: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },
  keywords: [
    'fashion',
    'clothing',
    'accessories',
    'trendy fashion',
    'online shopping',
    'essancia',
    'hoodies',
    'urban fashion',
    'streetwear',
    't-shirts',
    'sweatshirts',
    'men',
    "men's clothing",
    "men's hoodies",
    "men's t-shirts",
    "men's sweatshirts",
    "men's urban fashion",
    "men's streetwear",
    "men's clothing stores",
  ],
  authors: [{ name: 'Essancia Fashion' }],
  creator: 'Essancia Fashion',
  publisher: 'Essancia Fashion',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://essanciafashion.com'),
  openGraph: {
    title: 'Essancia Fashion',
    description:
      'Premium streetwear clothing brand featuring exclusive hoodies, t-shirts, sweatshirts and designer apparel.',
    url: 'https://essanciafashion.com',
    siteName: 'Essancia Fashion',
    images: [
      {
        url: '/og-image.png', // Make sure this image exists
        width: 1200,
        height: 630,
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
    images: ['/og-image.png'], // Same as OG image
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
    google: 'your-google-verification-code', // Add your Google verification code
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="favicon.svg" />

        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="icon" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" href="/favicon-192x192.png" sizes="192x192" />
        <link rel="icon" href="/favicon-512x512.png" sizes="512x512" />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />

        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="apple-mobile-web-app-title" content="Essancia" />
      </head>
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
