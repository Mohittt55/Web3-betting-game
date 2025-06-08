"use client";
import { SessionProvider } from "next-auth/react";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation"; // ✅ import useRouter
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter(); // ✅ initialize router for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Call NextAuth.js sign-in method
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false, // Don't automatically redirect, handle this yourself
    });

    if (result?.error) {
      setError("Invalid email or password");
    } else {
      // Redirect to the dashboard or home page after successful login
      router.push("/dashboard"); // ✅ use router.push instead of window.location.href
    }

    setLoading(false);
  };

  return (
    <main className="flex justify-center items-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardContent className="space-y-4 mt-6">
          <h2 className="text-2xl font-serif text-center">Login</h2>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
