"use client";

import { useState, useEffect } from "react";

const teaserTexts = [
  "In the digital ruins of forgotten ledgers, the true legends rise. Will your name be etched in the blockchain?",
  "Across encrypted realms, whispers of glory echo. Are you ready to write your saga?",
  "Chains forged in code bind fates untold. Dare to define your destiny?",
  "From vault to vault, the chronicles grow. Become the myth that echoes in data blocks.",
  "In the ledger of the lost, heroes are born. Will you be remembered?",
  "Beneath the surface of smart contracts lies untold power. Can you wield it?",
  "Time forgets all but the blocks that hold truth. Will you carve your name in permanence?",
  "Legends are not born, they're minted. Will your hash become history?",
  "In the silence of servers, stories are stored. Add your verse to the chain.",
  "Echoes of the chain ripple through the void. Will yours be heard?"
];

export default function LoreTeaser() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % teaserTexts.length);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 px-6 flex flex-col items-center text-center max-w-4xl mx-auto rounded-2xl bg-white border border-gray-300 shadow-md text-gray-800">
      <h2 className="text-3xl md:text-4xl font-serif mb-6 text-purple-600 drop-shadow-sm">
        Vault Chronicles
      </h2>
      <p
        key={index}
        className="text-lg md:text-xl transition-opacity duration-1000 ease-in-out text-gray-600"
      >
        {teaserTexts[index]}
      </p>
    </section>
  );
}
