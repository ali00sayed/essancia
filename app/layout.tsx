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
    'Discover premium streetwear clothing at Essancia Fashion. Shop our collection of hoodies, t-shirts, and sweatshirts for man.',
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
  metadataBase: new URL('https://essanciafashion.com'),
  openGraph: {
    title: 'Essancia Fashion',
    description:
      'Discover premium streetwear clothing at Essancia Fashion. Shop our collection of hoodies, t-shirts, and sweatshirts for man.',
    url: 'https://essanciafashion.com',
    siteName: 'Essancia Fashion',
    images: [
      {
        url: '/images/og-image.png', // Add your OG image to public/images/
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
    images: ['/images/og-image.png'], // Same as OG image
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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
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
