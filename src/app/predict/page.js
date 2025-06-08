import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function PredictPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-lg">
        <CardContent className="space-y-4 mt-6">
          <h2 className="text-2xl font-serif text-center"> Predictor</h2>
          <Input placeholder="Enter your match/team/odds data" />
          <Button className="w-full">Predict Outcome</Button>
        </CardContent>
      </Card>
    </main>
  );
}
