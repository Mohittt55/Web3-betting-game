// src/app/layout.server.js
import React from 'react';
import { Navbar } from '@/components/Navbar'; // Assuming you have a Navbar component
import { Button } from 'shadcn/ui'; // Example of using Shadcn UI Button
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: "II Patron Picks",
  description: "AI-Powered Betting Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className={`${inter.className} bg-gray-900 text-white`}>
        {/* Wrap your app with Shadcn UI components */}
        <div className="min-h-screen flex flex-col">
          <Navbar />

          {/* Main Content Area */}
          <main className="flex-grow">{children}</main>

          {/* Example Shadcn UI Button */}
          <footer className="bg-gray-800 text-center p-4">
            <Button variant="outline" className="text-lg">
              Example Shadcn UI Button
            </Button>
          </footer>
        </div>
      </body>
    </html>
  );
}
