"use client";

import {
  useAccount,
  useConnect,
  useDisconnect,
  usePrepareContractWrite,
  useContractWrite,
} from "wagmi";
import { injected } from "wagmi/connectors";
import { decentralizedPokerABI, decentralizedPokerAddres } from "@/lib/contractDetails";

export default function PokerGamePage() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({ connector: injected() });
  const { disconnect } = useDisconnect();

  const { config: joinConfig, error: joinPrepError } = usePrepareContractWrite({
    address: pokerAddress,
    abi: pokerABI,
    functionName: "joinGame",
    enabled: isConnected,
    overrides: { value: BigInt(0.1 * 1e18) }, // 0.1 ETH
  });

  const { config: winnerConfig, error: winnerPrepError } = usePrepareContractWrite({
    address: pokerAddress,
    abi: pokerABI,
    functionName: "declareWinner",
    enabled: isConnected,
  });

  const {
    write: joinGame,
    isLoading: isJoining,
    isSuccess: joined,
    error: joinError,
  } = useContractWrite(joinConfig);

  const {
    write: declareWinner,
    isLoading: isDeclaring,
    isSuccess: winnerDeclared,
    error: declareError,
  } = useContractWrite(winnerConfig);

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">🃏 Heads-Up Texas Hold’em</h1>
      <p>1v1 decentralized Poker match — 0.1 ETH entry!</p>

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
            onClick={() => joinGame?.()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            disabled={isJoining || !joinGame}
          >
            {isJoining ? "Joining..." : "Join Game"}
          </button>
          <button
            onClick={() => declareWinner?.()}
            className="mt-4 ml-4 px-4 py-2 bg-green-600 text-white rounded"
            disabled={isDeclaring || !declareWinner}
          >
            {isDeclaring ? "Declaring..." : "Declare Winner"}
          </button>
          <button
            onClick={() => disconnect()}
            className="mt-4 ml-4 px-4 py-2 bg-gray-500 text-white rounded"
          >
            Disconnect
          </button>
        </>
      )}

      {joined && <p className="mt-2 text-green-600">✅ Successfully joined the game!</p>}
      {winnerDeclared && <p className="mt-2 text-green-600">🏆 Winner declared!</p>}

      {(joinPrepError || joinError) && (
        <p className="mt-2 text-red-500">
          ❌ Join Error: {joinError?.message || joinPrepError?.message}
        </p>
      )}
      {(winnerPrepError || declareError) && (
        <p className="mt-2 text-red-500">
          ❌ Declare Error: {declareError?.message || winnerPrepError?.message}
        </p>
      )}
    </main>
  );
}
