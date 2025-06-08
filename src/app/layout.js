'use client';

import './globals.css';
import React from 'react';
import { SessionProvider } from 'next-auth/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Google Fonts
import { Freckle_Face } from 'next/font/google';
import { Outfit } from 'next/font/google';
import { Press_Start_2P } from 'next/font/google';
import { Urbanist } from 'next/font/google';
import { Inter } from 'next/font/google';

// WAGMI
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { config } from '@/lib/wagmiConfig';

// Initialize fonts with CSS variables
const freckleFace = Freckle_Face({ subsets: ['latin'], weight: '400', variable: '--font-freckle' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });
const pressStart2P = Press_Start_2P({ subsets: ['latin'], weight: '400', variable: '--font-pressstart' });
const urbanist = Urbanist({ subsets: ['latin'], variable: '--font-urbanist' });
const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const queryClient = new QueryClient();

export default function ClientLayout({ children }) {
  return (
    <SessionProvider>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <div
            className={`
              ${inter.variable}
              ${outfit.variable}
              ${urbanist.variable}
              ${freckleFace.variable}
              ${pressStart2P.variable}
              min-h-screen flex flex-col bg-white text-black
            `}
          >
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </QueryClientProvider>
      </WagmiProvider>
    </SessionProvider>
  );
}
