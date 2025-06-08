"use client";

import { useAccount, useConnect, useDisconnect, useWriteContract } from "wagmi";
import { injected } from "wagmi/connectors";
import { battleRoyaleABI, battleRoyaleAddress } from "@/lib/contractDetails";

export default function BattleRoyalePage() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({ connector: injected() });
  const { disconnect } = useDisconnect();

  const { writeContract, isPending, error, isSuccess } = useWriteContract();

  const handleEnterGame = () => {
    if (!isConnected) return;

    writeContract({
      address: battleRoyaleAddress,
      abi: battleRoyaleABI,
      functionName: "enterGame",
      args: [],
      value: BigInt(0.1 * 1e18), // 0.1 ETH in wei
    });
  };

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Battle Royale Betting</h1>
      <p>Enter the game by betting 0.1 ETH. Winner takes all!</p>

      {!isConnected ? (
        <button
          onClick={() => connect()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Connect Wallet
        </button>
      ) : (
        <>
          <button
            onClick={handleEnterGame}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
            disabled={isPending}
          >
            {isPending ? "Joining..." : "Join Battle Royale"}
          </button>
          <button
            onClick={() => disconnect()}
            className="ml-4 px-4 py-2 bg-gray-600 text-white rounded"
          >
            Disconnect
          </button>
        </>
      )}

      {isSuccess && <p className="text-green-600 mt-2">✅ Joined successfully!</p>}
      {error && <p className="text-red-500 mt-2">❌ Error: {error.message}</p>}
    </main>
  );
}
