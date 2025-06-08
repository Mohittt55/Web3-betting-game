"use client";
import { Freckle_Face } from "next/font/google";
import { Outfit } from "next/font/google";
import { Press_Start_2P } from "next/font/google";
import { Urbanist } from "next/font/google";
import { Inter } from "next/font/google";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/login", label: "Login" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/subscription", label: "Subscription" },
  { href: "/predict", label: "Predict" },
];

export default function Navbar() {
  const pathname = usePathname();
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  useEffect(() => {
    if (!vantaEffect) {
      const loadScript = (src) =>
        new Promise((res) => {
          const script = document.createElement("script");
          script.src = src;
          script.onload = res;
          document.head.appendChild(script);
        });

      const loadVanta = async () => {
        if (!window.THREE)
          await loadScript("https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js");
        if (!window.VANTA)
          await loadScript("https://cdn.jsdelivr.net/npm/vanta@0.5.21/dist/vanta.rings.min.js");

        const effect = window.VANTA.RINGS({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 50.0,
          minWidth: 50.0,
          scale: 1.0,
          scaleMobile: 1.0,
          backgroundColor: 0x000000,
          color: 0xc4a0c,
        });

        setVantaEffect(effect);
      };

      loadVanta();
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <nav
      ref={vantaRef}
      className="relative flex items-center justify-between px-6 border-b"
      style={{ height: "500px" }}
    >
      {/* Overlay for darkening background */}
      <div className="absolute inset-0 bg-black pointer-events-none z-0" />

      {/* Logo, Site Name & Tagline */}
      <Link href="/" className="relative z-10 flex flex-col -mt-50 space-y-1">
        <div className="flex items-center space-x-3">
          <Image
            src="/logo.png"
            alt="VelvetVaults Logo"
            width={110}
            height={100}
            priority
          />
          <h1 className="text-4xl text-white/100 -translate- font-press">VelvetVaults.com</h1>
        </div>
        <p className="text-xl text-purple-200 text-right font-outfit">
          Rug pulls ? Not here ! just your luck...
        </p>
      </Link>

      {/* Navigation Links */}
      <ul className="relative z-10 flex -mt-100 gap-4">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className={cn(
                "text-sm font-serif hover:underline",
                pathname === href
                  ? "text-purple-300 underline"
                  : "text-white"
              )}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
