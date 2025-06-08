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
import { predictionDuelABI, predictionDuelAddress } from "@/lib/contractDetails";

export default function PredictionDuelPage() {
  const [prediction, setPrediction] = useState("");
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({ connector: injected() });
  const { disconnect } = useDisconnect();

  const {
    config,
    error: prepareError,
  } = usePrepareContractWrite({
    address: predictionDuelAddress,
    abi: predictionDuelABI,
    functionName: "joinAndPredict",
    args: [prediction],
    enabled: isConnected && prediction.length > 0,
    overrides: { value: BigInt(0.1 * 1e18) },
  });

  const {
    write: join,
    isLoading,
    isSuccess,
    error: joinError,
  } = useContractWrite(config);

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">🧠 PvP Prediction Duel</h1>
      <p>Submit your prediction and stake 0.1 ETH. Best prediction wins!</p>

      <input
        type="text"
        placeholder="Enter your prediction"
        value={prediction}
        onChange={(e) => setPrediction(e.target.value)}
        className="border p-2 rounded mt-4 w-full max-w-md"
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
            onClick={() => join?.()}
            disabled={isLoading || !join || prediction.length === 0}
            className="ml-0 mt-4 px-4 py-2 bg-purple-600 text-white rounded disabled:opacity-50"
          >
            {isLoading ? "Submitting..." : "Submit & Bet 0.1 ETH"}
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
        <p className="mt-2 text-green-600">✅ Prediction submitted successfully!</p>
      )}
      {(prepareError || joinError) && (
        <p className="mt-2 text-red-500">
          ❌ Error: {prepareError?.message || joinError?.message}
        </p>
      )}
    </main>
  );
}
