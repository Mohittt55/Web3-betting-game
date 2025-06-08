"use client";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function DashboardPage() {
  const { data: session } = useSession();
  const [betAmount, setBetAmount] = useState("");
  const [selectedBet, setSelectedBet] = useState("");
  const [bettingStats, setBettingStats] = useState({
    totalBets: 0,
    totalWins: 0,
    totalLosses: 0,
  });

  // Handle Sign-out
  const handleSignOut = () => {
    signOut();
  };

  // Handle Place Bet
  const handlePlaceBet = () => {
    alert(`Bet placed: ${selectedBet} for ${betAmount}`);
    // Place bet functionality here
  };

  return (
    <main className="p-4">
      <h2 className="text-2xl font-serif mb-6">Betting Dashboard</h2>

      {/* User Profile Section */}
      {session ? (
        <Card className="w-full max-w-md mb-6">
          <CardContent>
            <h3 className="text-lg font-semibold">User Profile</h3>
            <p>Name: {session.user.name}</p>
            <p>Email: {session.user.email}</p>
            <Button className="w-full mt-4" onClick={handleSignOut}>
              Log Out
            </Button>
          </CardContent>
        </Card>
      ) : (
        <p className="text-red-500">You are not logged in.</p>
      )}

      {/* Betting Stats */}
      <Card className="w-full max-w-md mb-6">
        <CardContent>
          <h3 className="text-lg font-semibold">Betting Stats</h3>
          <p>Total Bets: {bettingStats.totalBets}</p>
          <p>Total Wins: {bettingStats.totalWins}</p>
          <p>Total Losses: {bettingStats.totalLosses}</p>
        </CardContent>
      </Card>

      {/* Place Bet Section */}
      <Card className="w-full max-w-md mb-6">
        <CardContent>
          <h3 className="text-lg font-semibold">Place a Bet</h3>
          <form onSubmit={(e) => e.preventDefault()}>
            <Input
              type="number"
              placeholder="Bet Amount"
              value={betAmount}
              onChange={(e) => setBetAmount(e.target.value)}
              className="w-full mb-4"
            />
            <Input
              type="text"
              placeholder="Select Bet (e.g., Team A wins)"
              value={selectedBet}
              onChange={(e) => setSelectedBet(e.target.value)}
              className="w-full mb-4"
            />
            <Button className="w-full" onClick={handlePlaceBet}>
              Place Bet
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Upcoming Bets */}
      <Card className="w-full max-w-md mb-6">
        <CardContent>
          <h3 className="text-lg font-semibold">Upcoming Bets</h3>
          <ul>
            <li>Match 1: Team A vs Team B - Bet on Team A</li>
            <li>Match 2: Team C vs Team D - Bet on Team D</li>
            <li>Match 3: Team E vs Team F - Bet on Team E</li>
          </ul>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="w-full max-w-md mb-6">
        <CardContent>
          <h3 className="text-lg font-semibold">Recent Activity</h3>
          <ul>
            <li>Bet 1: Team A wins - $50 (Win)</li>
            <li>Bet 2: Team B wins - $20 (Loss)</li>
            <li>Bet 3: Team C wins - $30 (Win)</li>
          </ul>
        </CardContent>
      </Card>
    </main>
  );
}
