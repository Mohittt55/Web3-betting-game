"use client";

import Image from "next/image";
import Link from "next/link";

// Components
import CommunityCTA from "@components/CommunityCTA";
import Leaderboard from "@components/Leaderboard";
import Tournaments from "@components/Tournaments";
import LoreTeaser from "@components/LoreTeaser";
// ❌ Don't import Footer here

export default function HomePage() {
  const games = [
    {
      title: "Battle Royale",
      href: "/battleroyale",
      img: "/images/Battleroyale.png",
    },
    {
      title: "Decentralized Poker",
      href: "/poker",
      img: "/images/Metapoker.png",
    },
    {
      title: "Prediction Duel",
      href: "/predictionduel",
      img: "/images/Duelmind.png",
    },
    {
      title: "Horse Racing NFT",
      href: "/horserace",
      img: "/images/Horserace.png",
    },
    {
      title: "Sports Prediction",
      href: "/sportspredict",
      img: "/images/Sportsprediction.png",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-black">
      <main className="py-10 px-4">

        {/* Game Grid */}
        <section className="w-2/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto">
          {games.map((game) => (
            <Link key={game.href} href={game.href}>
              <div className="cursor-pointer transition transform hover:scale-105 text-center">
                <Image
                  src={game.img}
                  alt={game.title}
                  width={300}
                  height={200}
                  className="rounded-2xl shadow-lg"
                />
                
              </div>
            </Link>
          ))}
        </section>

        {/* Other Sections */}
        <div className="mt-16 space-y-12">
          <Leaderboard />
          <Tournaments />
          <CommunityCTA />
          <LoreTeaser />
        </div>

      </main>
    </div>
  );
}
