"use client";

import { useState } from "react";
import {
  useAccount,
  useConnect,
  useDisconnect,
  usePrepareContractWrite,
  useContractWrite,
} from "wagmi";
import { injected } from "wagmi/connectors";
import { horseRaceABI, horseRaceAddress } from "@/lib/contractDetails";

export default function HorseRacePage() {
  const [horseId, setHorseId] = useState(0);

  const { address, isConnected } = useAccount();
  const { connect } = useConnect({ connector: injected() });
  const { disconnect } = useDisconnect();

  const { config, error: prepareError } = usePrepareContractWrite({
    address: horseRaceAddress,
    abi: horseRaceABI,
    functionName: "placeBet",
    args: [horseId],
    enabled: isConnected,
    overrides: {
      value: BigInt(0.05 * 1e18), // 0.05 ETH
    },
  });

  const {
    write: placeBet,
    isLoading,
    isSuccess,
    error: writeError,
  } = useContractWrite(config);

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">🏇 Horse Racing NFT Betting</h1>
      <p>Select a horse (ID 0 - 4) to bet 0.05 ETH</p>

      <input
        type="number"
        min={0}
        max={4}
        value={horseId}
        onChange={(e) => setHorseId(Number(e.target.value))}
        className="border p-2 rounded mt-2 w-32"
      />

      {!isConnected ? (
        <button
          onClick={() => connect()}
          className="ml-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Connect Wallet
        </button>
      ) : (
        <>
          <button
            onClick={() => placeBet?.()}
            className="ml-4 px-4 py-2 bg-yellow-600 text-white rounded"
            disabled={isLoading || !placeBet}
          >
            {isLoading ? "Placing Bet..." : "Bet on Horse"}
          </button>
          <button
            onClick={() => disconnect()}
            className="ml-4 px-4 py-2 bg-gray-500 text-white rounded"
          >
            Disconnect
          </button>
        </>
      )}

      {isSuccess && (
        <p className="mt-4 text-green-600">✅ Bet placed successfully!</p>
      )}

      {prepareError && (
        <p className="mt-2 text-red-500">
          ⚠️ Prepare Error: {prepareError.message}
        </p>
      )}
      {writeError && (
        <p className="mt-2 text-red-500">
          ❌ Write Error: {writeError.message}
        </p>
      )}
    </main>
  );
}
