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
import { sportsPredictionABI, sportsPredictionAddress } from "@/lib/contractDetails";

export default function SportsPredictionPage() {
  const [team, setTeam] = useState("");
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({ connector: injected() });
  const { disconnect } = useDisconnect();

  const {
    config,
    error: prepareError,
  } = usePrepareContractWrite({
    address: sportsPredictionAddress,
    abi: sportsPredictionABI,
    functionName: "placePrediction",
    args: [team],
    enabled: isConnected && team.length > 0,
    overrides: { value: BigInt(0.05 * 1e18) },
  });

  const {
    write: bet,
    isLoading,
    isSuccess,
    error: betError,
  } = useContractWrite(config);

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">🏆 Sports Prediction Market</h1>
      <p>Example: Enter "TeamA" or "TeamB" to place your prediction.</p>

      <input
        type="text"
        placeholder="Your team name"
        value={team}
        onChange={(e) => setTeam(e.target.value)}
        className="border p-2 rounded mt-2 w-full max-w-md"
      />

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
            onClick={() => bet?.()}
            disabled={isLoading || !bet || team.length === 0}
            className="mt-4 px-4 py-2 bg-green-700 text-white rounded disabled:opacity-50"
          >
            {isLoading ? "Placing Bet..." : "Place Bet (0.05 ETH)"}
          </button>
          <button
            onClick={() => disconnect()}
            className="ml-4 mt-4 px-4 py-2 bg-gray-500 text-white rounded"
          >
            Disconnect
          </button>
        </>
      )}

      {isSuccess && (
        <p className="mt-2 text-green-600">✅ Bet placed successfully!</p>
      )}
      {(prepareError || betError) && (
        <p className="mt-2 text-red-500">
          ❌ Error: {prepareError?.message || betError?.message}
        </p>
      )}
    </main>
  );
}
