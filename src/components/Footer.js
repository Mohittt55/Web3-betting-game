 "use client";

import { useEffect, useState } from "react";
import {
  FaTwitter,
  FaGithub,
  FaInstagram,
  FaDiscord,
  FaYoutube,
} from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="w-full border-t bg-gray-900 text-white py-8 px-4 text-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Left - Brand & Info */}
        <div className="flex flex-col md:items-start items-center gap-2">
          <h2 className="font-bold text-2xl text-white md:text-3xl">
            Velvet<span className="text-white">Vaults.com</span>
          </h2>
          <p className="text-gray-600 text-center md:text-left">
            © {currentYear} VelvetVaults — All rights reserved
          </p>
          <p className="text-gray-600">🕒 {currentTime}</p>
          <a
            href="mailto:velvetvaults@example.com"
            className="hover:underline text-blue-600"
          >
            velvetvaults@example.com
          </a>
          <Link
            href="/about"
            className="text-gray-700 hover:underline text-sm mt-1"
          >
            About Us
          </Link>
        </div>

        {/* Right - Social Media Icons */}
        <div className="flex gap-4 text-lg text-gray-700">
          <a
            href="https://twitter.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition"
          >
            <FaTwitter />
          </a>
          <a
            href="https://discord.gg/yourserver"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition"
          >
            <FaDiscord />
          </a>
          <a
            href="https://github.com/yourrepo"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition"
          >
            <FaGithub />
          </a>
          <a
            href="https://instagram.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition"
          >
            <FaInstagram />
          </a>
          <a
            href="https://youtube.com/yourchannel"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition"
          >
            <FaYoutube />
          </a>
        </div>
      </div>
    </footer>
  );
}
