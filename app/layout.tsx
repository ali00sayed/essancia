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
  title: 'Essancia Fashion',
  description:
    'Discover trendy fashion at Essancia. Shop our curated collection of clothing and accessories for the modern enthusiast.',
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        sizes: 'any',
      },
      {
        url: '/icon.png',
        type: 'image/png',
        sizes: '32x32',
      },
      {
        url: '/apple-icon.png',
        type: 'image/png',
        sizes: '180x180',
      },
    ],
    apple: [
      {
        url: '/apple-icon.png',
        sizes: '180x180',
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
  metadataBase: new URL('https://essanciafashion.com'), // Replace with your actual domain
  openGraph: {
    title: 'Essancia Fashion',
    description:
      'Discover unique and trendy fashion at Essancia. Shop our curated collection of clothing and accessories.',
    url: 'https://essanciafashion.com', // Replace with your actual domain
    siteName: 'Essancia Fashion',
    images: [
      {
        url: '/images/og-image.png', // Add your OG image to public/images/
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-icon.png" sizes="180x180" />
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
